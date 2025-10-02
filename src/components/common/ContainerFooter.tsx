/* =======================================
 * TOPページFOOTER
 * URL:src/components/common/ContainerFooter.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-25
 * Last updated: 2025-09-25
 * ======================================= */
import styles from '@/components/common/ContainerFooter.module.scss';
import { SHOP_INFO } from '@/config/shop';
import ExternalLink from '@/components/common/ExternalLink';
const ContainerFooter = () => {
  return (
    <footer className={styles.containerFooter}>
      <section>
        <article>
          <p className={styles.announce}>
            神戸・三宮で出会うのは、ただの快楽ではありません。
            <br />
            上質で艶やかな人妻たちが放つ、真珠のように輝く大人の魅力。
            <br />
            “誰かの奥さん”という現実と、禁断の官能が交わる特別な瞬間――
            <br />
            その深く濃密な時間の先に、あなたの知らない大人の悦びが待っています。
          </p>
          <div className={styles.blockInfo}>
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
                href="https://maps.app.goo.gl/B3a8ovipnuvp12HJ9"
                className={styles.linkMap}
              >
                google map
              </ExternalLink>
            </div>
          </div>
        </article>
      </section>
      <div className={styles.copyright}>( C ) 2025.SHINJUFUJIN</div>
    </footer>
  );
};

export default ContainerFooter;
