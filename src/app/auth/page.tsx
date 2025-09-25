/* =======================================
 *真珠夫人神戸本店 認証ページ
 * URL: src/app/auth/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/PageEntrance.module.scss';
import { useRouter } from 'next/navigation';
import { setAgeVerified } from '@/lib/age';
import ExternalLink from '@/components/common/ExternalLink';
import { SHOP_INFO } from '@/config/shop';
import clsx from 'clsx';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import PearlArc from '@/components/Decoration/PearlArc';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';

export default function PageEntrance() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ページタイトルをuseEffectで設定
  useEffect(() => {
    document.title = '認証ページ | 真珠夫人神戸本店';
    // 必要ならmeta descriptionも動的に追加
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content =
        '神戸三宮のヘルス 真珠夫人 認証ページです。18歳未満の方はご退出ください。';
      document.head.appendChild(metaTag);
    } else {
      meta.setAttribute(
        'content',
        '神戸三宮のヘルス 真珠夫人 認証ページです。18歳未満の方はご退出ください。'
      );
    }
  }, []);

  const handleApprove = async () => {
    setIsLoading(true);
    await setAgeVerified();
    router.replace('/');
  };
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <main className={styles.pageEntrance}>
      <h1>神戸三宮のヘルス 真珠夫人</h1>
      <section className={styles.containerHead}>
        <div className={clsx(styles.objectCirclePearl, styles.potionLeft)}>
          <PearlArc
            count={21}
            radius={350}
            startAngle={90}
            endAngle={270}
            size={isMobile ? 32 : 54}
          />
        </div>
        <div className={clsx(styles.objectCirclePearl, styles.potionRight)}>
          <PearlArc
            count={21}
            radius={400}
            startAngle={-90}
            endAngle={90}
            size={isMobile ? 32 : 63}
          />
        </div>
        <div className={styles.name}>
          <span>真珠夫人</span>
          <p>上質で妖艶。真珠のように艶めき煌めく大人の女性。</p>
        </div>
        <button onClick={handleApprove} disabled={isLoading}>
          <span>enter</span>
          <p>{isLoading ? '認証中...' : '18歳以上'}</p>
        </button>
        <a href="https://www.yahoo.co.jp/" aria-label="Yahooへ">
          UNDER 18 EXIT
        </a>
        <p className={styles.caution}>
          当サイトは性風俗店を紹介する風俗店情報サイトです。
          <br />
          18歳未満の方が当サイトを閲覧しても役立つ情報は存在せず、
          <br />
          該当する方の訪問はご遠慮願います。
        </p>
      </section>
      <PearlLineTopRight zIndex={3} positionClass="left" />
      <section className={styles.containerBottom}>
        <p className={styles.announce}>
          神戸三宮発、厳選美女、特選美女、人妻専門店
          <br />
          上質で妖艶。真珠のように艶めき煌めく大人の女性。
          <br />
          ただの風俗では、もう満たされない本物志向のお客様の為のお店。
          <br />
          上質なリアル人妻（誰かの奥さん）と官能と癒しを追求したお店。
          <br />
          貴方が知らない、選ばれし女性の本当の顔を
          <br />
          三宮発、禁断の文学的官能を味わえるお店。
        </p>
        <div className={styles.blockInfo}>
          <div className={styles.name}>
            <span>真</span>
            <span>珠</span>
            <span>夫</span>
            <span>人</span>
          </div>
          <div className={styles.boxInfo}>
            <h3>営業時間</h3>
            <div className={styles.time}>
              <span>{SHOP_INFO.businessHours.open}</span>
              <span>{SHOP_INFO.businessHours.close}</span>
            </div>
            <h3>電話番号</h3>
            <div className={styles.tel}>
              <ExternalLink href={`tel:${SHOP_INFO.tel}`}>
                {SHOP_INFO.tel}
              </ExternalLink>
              <span>（受付00時~）</span>
            </div>
            <address>{SHOP_INFO.address}</address>
          </div>
        </div>
      </section>
      <div className={styles.copyright}>( C ) 2025.SHINJUFUJIN</div>
    </main>
  );
}
