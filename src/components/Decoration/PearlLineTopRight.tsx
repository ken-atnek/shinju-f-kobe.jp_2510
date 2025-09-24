/* =======================================
 * パールライン 右上への区切りライン
 * URL: src/components/Decoration/PearlLineTopRight.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */

import styles from '@/components/Decoration/PearlLineTopRight.module.scss';
type Props = {
  zIndex?: number;
};

const PearlLineTopRight = ({ zIndex = 1 }: Props) => {
  return (
    <section className={styles.pearlLineTopRight} style={{ zIndex }}>
      <div className={styles.bgPearl}></div>
    </section>
  );
};
export default PearlLineTopRight;
