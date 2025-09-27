export type ScheduleConfig = {
  switchHour: number;
  days: number;
};

/**
 * schedule-config.json を取得し、設定を返す
 * @returns ScheduleConfig オブジェクト
 */
export const loadScheduleConfig = async (): Promise<ScheduleConfig> => {
  const res = await fetch('/data/kobe/schedule/schedule-config.json');
  if (!res.ok) {
    throw new Error('Failed to load schedule config');
  }
  return await res.json();
};
