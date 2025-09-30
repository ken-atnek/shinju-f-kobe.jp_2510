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
            子どもら数人と山へ遊びに行った。私が子どものころは子どもたちは小さな子も大きな子も、まちまちの年齢の子が近隣でひとかたまりのグループを作って遊んでいた。山へ遊びに行くときも、大きな子が小さな子を引き連れる形で行くのだった。アケビかなにかを採りに行ったのだと思う。木によじのぼったり、薮をがさがさ歩いているうちに、たぶんうっかり蜂の巣があるところに踏みこんでしまったのだろう。
          </p>
          <ExternalLink href="/" className={styles.itemPageLink}>
            女性求人情報はこちら
          </ExternalLink>
        </div>
      </article>
    </section>
  );
};

export default ContainerJobOffer;
