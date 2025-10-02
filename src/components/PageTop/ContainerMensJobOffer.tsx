/* =======================================
 * TOPページ 男子求人情報
 * URL:src/components/PageTop/ContainerMensJobOffer.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2025-09-20
 * Last updated: 2025-09-20
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import PearlLineTopRight from '@/components/Decoration/PearlLineTopRight';
const ContainerMensJobOffer = () => {
  return (
    <>
      <PearlLineTopRight zIndex={1} positionClass="right5" />
      <section className={styles.containerMensJobOffer}>
        <article>
          <div className={styles.innerBlock}>
            <span className={styles.sidebarH2}>JOB OFFER</span>
            <h2>男性求人情報</h2>
            <p>
              「本気で稼ぎたい」その気持ちがあれば大歓迎！
              経験・学歴・スキルは一切不要。難しい作業はほとんどなく、未経験でも安心して始められます。
              スタッフの多くが他業種からの転職組です。
              「自分に合う仕事が見つからない…」という方も、ぜひ一度面接へ！
              ご質問・ご相談もお気軽にどうぞ。
            </p>
            <ExternalLink
              href="https://mens-qzin.jp/hyogo/area_28001/detail/snjkobe/"
              className={styles.itemPageLink}
            >
              男性求人情報はこちら
            </ExternalLink>
          </div>
        </article>
      </section>
    </>
  );
};

export default ContainerMensJobOffer;
