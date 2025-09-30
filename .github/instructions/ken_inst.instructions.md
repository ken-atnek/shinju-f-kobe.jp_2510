## プロジェクト初期設定

- `npx create-next-app@latest . --typescript` でプロジェクト作成
  基本ツールのインストール
- `npm install --save-dev rimraf cross-env prettier sass stylelint`
  SCSS 用の Lint 拡張
- `npm install --save-dev stylelint-config-standard-scss stylelint-scss` を開発依存でインストール
- Next.js (app/ ルーティング対応) を使用
- `output: 'export'` で運用

---

## コーディング規約

- **SCSSファイル**
  - SCSSコード専用
  - クラス名・変数・ミックスインはケバブケースで記述
- **TSXファイル**
  - JSX/TSXコード専用
  - キャメルケース / パスカルケースで記述
- **JSONファイル**
  - ファイル名はスネークケース（小文字・単語間はアンダースコア）で統一  
    例：`top_movie.json`, `shop_info.json`, `news_list.json`

---

## Next.js App Router 開発ルール

- ページpropsの `params` は **Promise型禁止**
  - `{ params: { id: string } }` で受け取る
  - `await` で展開しない
- `generateMetadata` は **同期関数で書く**
  - async/await禁止
  - `Promise<Metadata>`を返さない
- `generateStaticParams` は **同期関数で書く**
  - async禁止
- Next.jsのバージョンを固定する
  - 公式型定義のバージョンずれ防止

### Splideカルーセル実装時の注意

- Splideカルーセルは「データ（items）が全て揃ってから」初期化しないと、レイアウト崩れや表示遅延が発生します。
- そのため、**必ず下記のような条件で描画してください。**

```tsx
{items.length > 0 && (
  <Splide ...>
    {/* ... */}
  </Splide>
)}
```
