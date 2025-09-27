/* =======================================
 * 店舗  プロフィール内 キャストスケジュール
 * URL: src/components/PageProfile/CastSchedule.tsx
 * Referenced in:  src/components/PageProfile/CastProfile.tsx
 * Created: 2025-09-27
 * Last updated: 2025-09-27
 * ======================================= */
'use client';
import styles from '@/styles/PageProfile.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import PearlArc from '@/components/Decoration/PearlArc';
import { useMediaQuery } from '@/hooks/useMediaQuery';
type ScheduleItem = {
  date: string;
  weekday: string;
  startTime?: string;
  endTime?: string;
  scheduleStatus?: string;
};

type CastScheduleProps = {
  castId: string;
};

export default function CastSchedule({ castId }: CastScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // キャストスケジュールは常にキャッシュバスティング
        const timestamp = Date.now();
        const dataPath = `/cast/kobe/${castId}/schedule.json${timestamp ? `?t=${timestamp}` : ''}`;

        const res = await fetch(dataPath);
        if (!res.ok) {
          throw new Error('スケジュールの読み込みに失敗しました');
        }

        const data: ScheduleItem[] = await res.json();
        setSchedule(data);
        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchSchedule();
  }, [castId]);

  if (error) return <p>スケジュールの読み込みに失敗しました。</p>;
  if (!schedule || schedule.length === 0) {
    return null;
  }

  return (
    <section className={styles.containerSchedule}>
      <div className={clsx(styles.objectCirclePearl, styles.potionRight)}>
        <PearlArc
          count={isMobile ? 21 : 21}
          radius={isMobile ? 200 : 200}
          startAngle={90}
          endAngle={270}
          size={isMobile ? 30 : 30}
        />
      </div>
      <div className={clsx(styles.objectCirclePearl, styles.potionLeft)}>
        <PearlArc
          count={isMobile ? 25 : 21}
          radius={isMobile ? 240 : 200}
          startAngle={-90}
          endAngle={90}
          size={isMobile ? 30 : 30}
        />
      </div>
      <article>
        <div className={styles.boxH3}>
          <span className={styles.sidebarH3}>schedule</span>
          <h3>週間出勤スケジュール</h3>
        </div>
        <ul className={styles.scheduleList}>
          {schedule.map((item) => {
            const dateObj = new Date(item.date);
            return (
              <li key={item.date}>
                <div
                  className={clsx(
                    styles.wrapDate,
                    item.weekday === 'sat' && styles.saturday,
                    item.weekday === 'sun' && styles.sunday
                  )}
                >
                  <span className={styles.itemDate}>
                    {dateObj.getMonth() + 1}.{dateObj.getDate()}
                  </span>
                  <span className={styles.itemWeek}>
                    {item.weekday.toUpperCase()}
                  </span>
                </div>
                {item.startTime && item.endTime ? (
                  <div className={styles.scheduleTime}>
                    <span>{item.startTime}</span>
                    <span>{item.endTime}</span>
                  </div>
                ) : item.scheduleStatus ? (
                  <p className={styles.scheduleStatus}>{item.scheduleStatus}</p>
                ) : (
                  <span className={styles.noData}>ー</span>
                )}
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
