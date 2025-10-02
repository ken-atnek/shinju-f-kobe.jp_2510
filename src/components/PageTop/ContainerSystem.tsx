/* =======================================
 * TOPページ 料金システム・スクエアバナー
 * URL:src/components/PageTop/ContainerSystem.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-24
 * Last updated: 2025-09-24
 * ======================================= */
'use client';
// import BlockSlideBanSquare from '@/components/PageTop/BlockSlideBanSquare';
import styles from '@/styles/PageTop.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useSplitText } from '@/hooks/useSplitText';
import PearlArc from '@/components/Decoration/PearlArc';
import { useMediaQuery } from '@/hooks/useMediaQuery';
const ContainerSystem = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { ref: h2Ref, isVisible: h2Visible } =
    useScrollTrigger<HTMLDivElement>();
  return (
    <section className={styles.containerSystem}>
      {/* <div className={styles.boxBlockBg}></div> */}
      {/* <div className={clsx(styles.objectCirclePearl, styles.potionRight)}>
        <PearlArc
          count={isMobile ? 21 : 21}
          radius={isMobile ? 200 : 450}
          startAngle={90}
          endAngle={270}
          size={isMobile ? 30 : 68}
        />
      </div> */}
      {/* <div className={clsx(styles.objectCirclePearl, styles.potionLeft)}>
        <PearlArc
          count={isMobile ? 25 : 23}
          radius={isMobile ? 240 : 500}
          startAngle={-90}
          endAngle={90}
          size={isMobile ? 30 : 68}
        />
      </div> */}
      <article className={styles.blockSystem}>
        <div className={styles.boxH2} ref={h2Ref}>
          <div
            className={clsx(styles.enH2, {
              [styles['is-active']]: h2Visible,
            })}
            aria-label="system"
          >
            {useSplitText('system')}
          </div>
          <h2>料金システム</h2>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.normalPrice}>
            <span className={styles.min}>
              40<i>分</i>
            </span>
            <span className={styles.price}>
              16,000<i>円</i>
            </span>
          </div>
          <div className={styles.specialPrice}>
            <h3>opening price</h3>
            <span className={styles.min}>
              40<i>分</i>
            </span>
            <span className={styles.price}>
              14,000<i>円</i>
            </span>
          </div>
          <div className={styles.nominationFee}>
            <h4>指名料</h4>
            <span className={styles.price}>
              1,000<i>円〜</i>
            </span>
          </div>
          {/* <Link href="/system/" className={styles.itemPageLink}>
            その他の料金システムはこちら
          </Link> */}
        </div>
      </article>
      {/* <BlockSlideBanSquare /> */}
    </section>
  );
};

export default ContainerSystem;
