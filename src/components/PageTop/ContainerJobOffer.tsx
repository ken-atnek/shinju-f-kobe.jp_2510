/* =======================================
 * TOPページ 女性求人情報
 * URL:src/components/PageTop/ContainerJobOffer.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
const ContainerJobOffer = () => {
  return (
    <section className={styles.containerJobOffer}>
      <PearlLineTopRight zIndex={-2} positionClass="right" />
      <div className={styles.boxBlockBg}></div>
      <article>
        <div className={styles.innerBlock}>
          <h2>女性求人情報</h2>
          <div className={styles.enTitle}>
            <em>job</em>offer
          </div>
          <p>
            「自分らしく輝ける場所で、新しい一歩を踏み出しませんか？」
            未経験でも安心してスタートできる体制と、あなたの個性を大切にする環境で、働き方の選択肢も豊富にご用意しています。
            あなたの“好き”や“得意”を活かしながら、無理なく成長できるフィールドがここにはあります。
            まずは「女性求人情報はこちら」から、詳しい募集内容をご覧ください。
          </p>
          <ExternalLink
            href="https://fuzoku.jp/hotpointgakuen/"
            className={styles.itemPageLink}
          >
            女性求人情報はこちら
          </ExternalLink>
        </div>
      </article>
    </section>
  );
};

export default ContainerJobOffer;
