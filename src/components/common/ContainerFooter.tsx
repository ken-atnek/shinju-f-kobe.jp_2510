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
        </article>
      </section>
      <div className={styles.copyright}>( C ) 2025.SHINJUFUJIN</div>
    </footer>
  );
};

export default ContainerFooter;
