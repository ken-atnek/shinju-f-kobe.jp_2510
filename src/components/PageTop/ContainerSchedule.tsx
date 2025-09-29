/* =======================================
 * TOPページ スケジュール
 * URL:src/components/PageTop/ContainerSchedule.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import clsx from 'clsx';
import CastDetailsBox from '@/components/common/CastDetailsBox';
import { useEffect, useState } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useSplitText } from '@/hooks/useSplitText';
import type { CastDetail } from '@/types/CastDetails';
import dayjs from 'dayjs';
import Link from 'next/link';
const DATA_URL = '/data/kobe/top_schedule.json';

const ContainerSchedule = () => {
  const [rankingList, setRankingList] = useState<CastDetail[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string>('');

  const { ref: h2Ref, isVisible: h2Visible } =
    useScrollTrigger<HTMLDivElement>();
  const { ref: ulRef, isVisible: ulVisible } =
    useScrollTrigger<HTMLUListElement>();

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setScheduleDate(data.date);
        const casts: CastDetail[] = data.casts ?? [];
        // 現在時刻を「スケジュール日付＋現在時刻」で取得
        const now = dayjs(`${data.date} ${dayjs().format('HH:mm')}`);

        const sorted = [...casts].sort((a, b) => {
          // 1. scheduleStatusが空でないものは常に最後
          const aStatus = a.schedule?.scheduleStatus?.trim();
          const bStatus = b.schedule?.scheduleStatus?.trim();
          if (aStatus && !bStatus) return 1;
          if (!aStatus && bStatus) return -1;
          if (aStatus && bStatus) return 0;

          // 2. endTimeを超えているものは下に
          const aEnd = a.schedule?.endTime
            ? dayjs(`${data.date} ${a.schedule.endTime}`)
            : null;
          const bEnd = b.schedule?.endTime
            ? dayjs(`${data.date} ${b.schedule.endTime}`)
            : null;
          const aEnded = aEnd ? now.isAfter(aEnd) : false;
          const bEnded = bEnd ? now.isAfter(bEnd) : false;
          if (aEnded && !bEnded) return 1;
          if (!aEnded && bEnded) return -1;

          // 3. startTimeの昇順
          const aStart = a.schedule?.startTime
            ? dayjs(`${data.date} ${a.schedule.startTime}`)
            : null;
          const bStart = b.schedule?.startTime
            ? dayjs(`${data.date} ${b.schedule.startTime}`)
            : null;
          if (aStart && bStart) {
            return aStart.isBefore(bStart)
              ? -1
              : aStart.isAfter(bStart)
                ? 1
                : 0;
          }
          if (aStart) return -1;
          if (bStart) return 1;
          return 0;
        });

        setRankingList(sorted);
      });
  }, []);

  return (
    <section className={styles.containerSchedule}>
      <article>
        <div className={styles.boxH2} ref={h2Ref}>
          <div
            className={clsx(styles.enH2, {
              [styles['is-active']]: h2Visible,
            })}
            aria-label="schedule"
          >
            {useSplitText('schedule')}
          </div>
          <h2>本日出勤スケジュール</h2>
        </div>
        <time dateTime={scheduleDate} className={styles.todayDate}>
          {scheduleDate ? dayjs(scheduleDate).format('YYYY.MM.DD') : ''}
        </time>
        <div className={styles.todayNumber}>
          本日<span>{rankingList.length}</span>名出勤
        </div>
        <p className={styles.notice}>
          キャストの体調等により予告なく変更になる場合がございます。あらかじめご了承ください。
        </p>
        <ul
          className={clsx(styles.listSchedule, {
            [styles['is-active']]: ulVisible,
          })}
          ref={ulRef}
        >
          {rankingList.map((item, i) => (
            <li
              key={item.castId}
              className={styles.innerSchedule}
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              <CastDetailsBox item={item} typeParam="topschedule" />
            </li>
          ))}
        </ul>
        <Link href="/schedule/" className={styles.itemPageLink}>
          明日以降の出勤情報を見る
        </Link>
      </article>
    </section>
  );
};

export default ContainerSchedule;
