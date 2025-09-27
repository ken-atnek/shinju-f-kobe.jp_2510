/* =======================================
 *真珠夫人 スケジュール
 * URL: src/app/schedule/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */

import styles from '@/styles/PageSchedule.module.scss';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerFooter from '@/components/common/ContainerFooter';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
import ScheduleList from '@/components/PageSchedule/ScheduleList';
export const metadata: Metadata = {
  title:
    '在籍キャスト一覧｜神戸・三宮の風俗｜ファッションヘルス「真珠夫人神戸本店」',
  description: isRealProduction
    ? '神戸・三宮エリアの人気店「真珠夫人神戸本店」在籍キャスト一覧。出勤状況・待ち時間・キャンセル待ちをリアルタイムで更新し、今すぐ会える女の子がひと目でわかる！人気嬢の出勤予定や最新スケジュールも要チェック。'
    : undefined,
};
export default function PageSchedule() {
  return (
    <main>
      <section className={styles.containerDetails}>
        <div className={styles.boxBlockBg}></div>
        <div className={styles.subPageH2}>
          <span>schedule</span>
          <h2>出勤スケジュール</h2>
        </div>
        <ScheduleList />
      </section>
      <PearlLineTopRight zIndex={1} positionClass="center" />
      <ContainerFooter />
    </main>
  );
}
