/* =======================================
 * システムページ 料金・オプション
 * URL:src/components/PageSystem/BlockPriceList.tsx
 * Referenced in: :src/app/system/page.tsx
 * Created: 2025-09-26
 * Last updated: 2025-09-26
 * ======================================= */

import styles from '@/styles/PageSystem.module.scss';

type PriceItem = {
  time: number;
  oldPrice: number;
  newPrice: number;
};

type PriceOptions = {
  title: string;
  price?: number;
  notice?: string;
};

const priceList: PriceItem[] = [
  { time: 40, oldPrice: 16000, newPrice: 14000 },
  { time: 60, oldPrice: 22000, newPrice: 19000 },
  { time: 90, oldPrice: 32000, newPrice: 28000 },
];

const optionList: PriceOptions[] = [
  { title: 'ローター', price: 1000 },
  { title: '電マ', price: 2000 },
  { title: '全身網タイツ', price: 3000 },
  { title: '裸エプロン', price: 3000, notice: '（パンティープレゼント）' },
  { title: 'その他etc...' },
];

const BlockPriceList = () => {
  return (
    <article className={styles.blockPriceList}>
      <ul className={styles.listStar}>
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <svg width="22" height="21" aria-hidden="true">
              <use href="#svg_iconStar" />
            </svg>
          </li>
        ))}
      </ul>
      <span className={styles.sidebarH3}>OPENING PRICE</span>
      <h3>オープン特別特価</h3>
      <ul className={styles.priceList}>
        {priceList.map((item) => (
          <li key={item.time} className={styles.priceItem}>
            <div className={styles.old}>
              <span className={styles.time}>
                {item.time}
                <i>分</i>
              </span>
              <span className={styles.oldPrice}>
                {item.oldPrice.toLocaleString()}
                <i>円</i>
              </span>
            </div>
            <div className={styles.new}>
              <span className={styles.time}>
                {item.time}
                <i>分</i>
              </span>
              <span className={styles.newPrice}>
                {item.newPrice.toLocaleString()}
                <i>円</i>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.nominationFee}>
        <h4>別途、指名料金</h4>
        <span className={styles.price}>
          1,000<i>円</i>
        </span>
        <span className={styles.price}>
          10,000<i>円</i>
        </span>
      </div>
      <hr />
      <div className={styles.boxOption}>
        <h4>option</h4>
        <ul>
          {optionList.map((item, i) => (
            <li key={i}>
              <div className={styles.title}>
                <h5>{item.title}</h5>
                {item.notice && (
                  <span className={styles.notice}>{item.notice}</span>
                )}
              </div>
              {item.price && (
                <span className={styles.price}>
                  {item.price.toLocaleString()}
                  <i>円</i>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
export default BlockPriceList;
