/* =======================================
 * システムページ ショップインフォ
 * URL:src/components/PageSystem/BlockShopInfo.tsx
 * Referenced in: :src/app/system/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */

import styles from '@/styles/PageSystem.module.scss';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
import { SHOP_INFO } from '@/config/shop';
import ExternalLink from '@/components/common/ExternalLink';
const BlockShopInfo = () => {
  return (
    <section className={styles.blockShopInfo}>
      <PearlLineTopRight zIndex={1} positionClass="systemPage" />
      <article className={styles.blockInfo}>
        <div className={styles.logo}>
          <svg width="232" height="248" aria-label="真珠夫人">
            <title>真珠夫人</title>
            <use href="#svg_logoSquare" />
          </svg>
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
export default BlockShopInfo;
