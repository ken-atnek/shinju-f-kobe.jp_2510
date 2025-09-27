/* =======================================
 * TOPページ スケジュールリスト
 * URL:src/components/PageSchedule/ScheduleList.tsx
 * Referenced in: : src/app/schedule/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */
'use client';
import styles from '@/styles/PageSchedule.module.scss';
import clsx from 'clsx';
import CastDetailsBox from '@/components/common/CastDetailsBox';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
import { loadScheduleConfig } from '@/lib/loadScheduleConfig';
import { getDateList } from '@/lib/getScheduleDataList';

type ScheduleData = {
  date: string;
  casts: CastDetail[];
};

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // デバッグ用にnotTodayクラス名を出力
  console.log('styles.notToday:', styles.notToday);

  useEffect(() => {
    // 設定を取得して日付リストを生成
    (async () => {
      const config = await loadScheduleConfig();
      const dateList = getDateList(config.switchHour, config.days);

      // 各日付のスケジュールデータを取得
      const scheduleData: ScheduleData[] = await Promise.all(
        dateList.map(async (date) => {
          const res = await fetch(`/data/kobe/schedule/${date}.json`);
          if (!res.ok) return { date, casts: [] };
          const data = await res.json();
          return { date, casts: data.casts ?? [] };
        })
      );
      setSchedules(scheduleData);
      setSelectedDate(dateList[0]); // 最初の日付を選択
    })();
  }, []);

  // 選択中の日付のスケジュール
  const dailySchedule = schedules.find((s) => s.date === selectedDate);

  return (
    <>
      <article className={styles.scheduleHead}>
        <nav className={styles.scheduleNav}>
          {schedules.map((schedule) => {
            const dateObj = new Date(schedule.date);
            const display = `${dateObj.getMonth() + 1}.${dateObj.getDate()}`;
            const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
              dateObj.getDay()
            ];
            return (
              <button
                key={schedule.date}
                onClick={() => setSelectedDate(schedule.date)}
                className={clsx(styles.tabButton, {
                  [styles.isActive]: schedule.date === selectedDate,
                  [styles.sat]: week === 'sat',
                  [styles.sun]: week === 'sun',
                })}
              >
                <span className={styles.day}> {display}</span>
                <span className={styles.week}>{week}</span>
              </button>
            );
          })}
        </nav>
      </article>
      <ul className={styles.listSchedule}>
        {dailySchedule &&
          dailySchedule.casts.length > 0 &&
          dailySchedule.casts.map((item) => (
            <li key={item.castId} className={styles.innerSchedule}>
              <CastDetailsBox
                item={item}
                variant={
                  selectedDate !== schedules[0]?.date ? 'notToday' : undefined
                }
              />
            </li>
          ))}
      </ul>
      {(!dailySchedule || dailySchedule.casts.length === 0) && (
        <div className={styles.noCast}>出勤予定はありません</div>
      )}
    </>
  );
};

export default ScheduleList;
