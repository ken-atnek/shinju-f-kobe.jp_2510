/* =======================================
 * TOPページ ショップインフォ
 * URL:src/components/PageTop/ContainerShopInfo.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import { SHOP_INFO } from '@/config/shop';

const ContainerShopInfo = () => {
  return (
    <section className={styles.containerShopInfo}>
      <article className={styles.blockInfo}>
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
          <ExternalLink
            href="https://share.google/oj5rSdGOkHc2vIRiX"
            className={styles.linkMap}
          >
            GOOGLE MAP
          </ExternalLink>
        </div>
      </article>
    </section>
  );
};

export default ContainerShopInfo;
