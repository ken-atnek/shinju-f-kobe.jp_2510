/* =======================================
 *真珠夫人 料金システム
 * URL: src/app/system/page.tsx
 * Created: 2025-09-27
 * Last updated: 2025-09-27
 * ======================================= */

import styles from '@/styles/PageSystem.module.scss';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerFooter from '@/components/common/ContainerFooter';
import ContainerAccess from '@/components/common/ContainerAccess';
import BlockPriceList from '@/components/PageSystem/BlockPriceList';
import BlockShopInfo from '@/components/PageSystem/BlockShopInfo';

export const metadata: Metadata = {
  title:
    '在籍キャスト一覧｜神戸・三宮の風俗｜ファッションヘルス「真珠夫人神戸本店」',
  description: isRealProduction
    ? '神戸・三宮エリアの人気店「真珠夫人神戸本店」在籍キャスト一覧。出勤状況・待ち時間・キャンセル待ちをリアルタイムで更新し、今すぐ会える女の子がひと目でわかる！人気嬢の出勤予定や最新スケジュールも要チェック。'
    : undefined,
};
export default function PageSystem() {
  return (
    <main>
      <section className={styles.containerDetails}>
        <div className={styles.boxBlockBg}></div>
        <div className={styles.subPageH2}>
          <span>system</span>
          <h2>料金システム</h2>
        </div>
        <BlockPriceList />
      </section>
      <BlockShopInfo />
      <ContainerAccess />
      <ContainerFooter />
    </main>
  );
}
