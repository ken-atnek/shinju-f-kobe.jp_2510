/* =======================================
 * TOPページ アクセス
 * URL:src/components/common/ContainerAccess.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-25
 * Last updated: 2025-09-25
 * ======================================= */
import styles from '@/components/common/ContainerAccess.module.scss';
import { SHOP_INFO } from '@/config/shop';
import ExternalLink from '@/components/common/ExternalLink';
const ContainerAccess = () => {
  return (
    <section className={styles.containerAccess}>
      <div className={styles.boxMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5155739100514!2d135.18849447574414!3d34.69217377292269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008ee3503c6ff3%3A0x9e0c93798838d9a0!2z44CSNjUwLTAwMTIg5YW15bqr55yM56We5oi45biC5Lit5aSu5Yy65YyX6ZW354ut6YCa77yS5LiB55uu77yR4oiS77yU!5e0!3m2!1sja!2sjp!4v1758791257190!5m2!1sja!2sjp"
          width="100%"
          height="552"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <article>
        <address>{SHOP_INFO.address}</address>
        <ExternalLink
          href="https://maps.app.goo.gl/B3a8ovipnuvp12HJ9"
          className={styles.linkMap}
        >
          google map
        </ExternalLink>
      </article>
    </section>
  );
};

export default ContainerAccess;
