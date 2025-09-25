/* =======================================
 * パールライン 右上への区切りライン
 * URL: src/components/Decoration/PearlLineTopRight.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */

import styles from '@/components/Decoration/PearlLineTopRight.module.scss';
type Props = {
  zIndex?: number;
  positionClass?: string; // 追加
};

const PearlLineTopRight = ({ zIndex = 1, positionClass }: Props) => {
  return (
    <section
      className={`${styles.pearlLineTopRight} ${positionClass ? styles[positionClass] : ''}`}
      style={{ zIndex }}
    >
      <div className={styles.bgPearl}></div>
    </section>
  );
};
export default PearlLineTopRight;
