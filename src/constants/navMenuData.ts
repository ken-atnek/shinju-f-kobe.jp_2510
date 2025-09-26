/* =======================================
 * 真珠夫人 メニュー項目
 * URL: src/constants/navMenuData.ts
 * Created: 2025-09-25
 * Last updated: 2025-09-25
 * ======================================= */
export const navMenu = [
  { id: 'navTop', href: '/', label: 'トップ', labelEn: 'top' },
  {
    id: 'navCastList',
    href: '/cast/',
    label: '女の子一覧',
    labelEn: 'cast list',
  },
  {
    id: 'navSystem',
    href: '/system/',
    label: 'システム',
    labelEn: 'system',
  },
  {
    id: 'navPhotoBlog',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/diarylist/?of=y',
    label: '写メ日記',
    labelEn: 'blog',
    target: true,
  },
  {
    id: 'navSchedule',
    href: '/schedule/',
    label: '出勤情報',
    labelEn: 'schedule',
  },
  {
    id: 'navRealTime',
    href: '/realtime/',
    label: 'リアルタイム',
    labelEn: 'real time info ',
  },
  {
    id: 'navReserve',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/S6ShopReservation/?pcmode=sp',
    label: 'WEB予約',
    labelEn: 'reservation',
    target: true,
  },
  {
    id: 'navRecruit',
    href: 'https://kobe-baito.jp/',
    label: '求人情報',
    labelEn: 'job offer',
    target: true,
  },
];
