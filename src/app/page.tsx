/* =======================================
 *真珠夫人 TOPページ
 * URL: /app/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-26
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerMovie from '@/components/PageTop/ContainerMovie';
import ContainerShopInfo from '@/components/PageTop/ContainerShopInfo';
// import ContainerPickUp from '@/components/PageTop/ContainerPickUp';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
// import ContainerSlideBan from '@/components/PageTop/ContainerSlideBan';
// import ContainerRanking from '@/components/PageTop/ContainerRanking';
import ContainerSystem from '@/components/PageTop/ContainerSystem';
// import ContainerSchedule from '@/components/PageTop/ContainerSchedule';
import ContainerJobOffer from '@/components/PageTop/ContainerJobOffer';
import ContainerMensJobOffer from '@/components/PageTop/ContainerMensJobOffer';
import ContainerAccess from '@/components/common/ContainerAccess';
import ContainerFooter from '@/components/common/ContainerFooter';
// import ContainerMobileMenu from '@/components/PageTop/ContainerMobileMenu';
export const generateMetadata = (): Metadata => {
  return {
    title:
      '神戸・三宮の人気風俗｜癒しと快楽のファッションヘルス「真珠夫人神戸本店」公式サイト',
    description: isRealProduction
      ? '神戸・三宮エリアで大人の癒しと快楽を求めるなら「真珠夫人神戸本店」。選び抜かれた女性による上質なサービスと贅沢なひとときをご提供いたします。出勤情報・在籍キャスト・イベント・キャンペーンなど最新情報を毎日更新中。。'
      : undefined,
  };
};
export default function PageTop() {
  return (
    <main>
      <ContainerMovie />
      {/* <ContainerMobileMenu /> */}
      <ContainerShopInfo />
      <PearlLineTopRight zIndex={2} positionClass="tpoPage" />
      {/* <ContainerPickUp /> */}
      {/* <ContainerSlideBan /> */}
      {/* <ContainerRanking /> */}
      <ContainerSystem />
      {/* <ContainerSchedule /> */}
      <ContainerJobOffer />
      <ContainerMensJobOffer />
      <ContainerAccess />
      <ContainerFooter />
    </main>
  );
}
