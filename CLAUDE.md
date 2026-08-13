# CLAUDE.md

このファイルは、このリポジトリで作業する際の Claude Code (claude.ai/code) 向けガイダンスです。

## プロジェクト概要

task-board はタスク管理ボードアプリケーションです。テキスト入力でのタスク追加、チェックボックスによる完了・未完了の切り替え、削除、完了済みタスクのグレー表示に対応しています。タスクはブラウザの localStorage に保存され、ページをリロードしても消えません。

## デプロイ先

https://nekomaru9.github.io/task-board/

`main` ブランチへのプッシュをトリガーに `.github/workflows/deploy.yml` が `npm run build` を実行し、GitHub Pages へ自動デプロイする。

## 技術スタック

- フレームワーク: React 19
- ビルドツール: Vite 8
- 言語: TypeScript
- Lint: oxlint (`npm run lint`)
- テスト: 未導入
- 状態管理: React の `useState` / `useEffect` のみ(外部の状態管理ライブラリは未使用)
- データ永続化: ブラウザの localStorage
- デプロイ: GitHub Actions + GitHub Pages

## コンポーネントの命名規約

- コンポーネントファイルは `src/components/` 配下に置き、ファイル名はコンポーネント名と一致させる(例: `TaskItem.tsx` → `TaskItem` コンポーネント)
- コンポーネント名・ファイル名は PascalCase、関数コンポーネントは `function ComponentName(props) { ... }` の形で定義しデフォルトエクスポートする
- Props の型は `ComponentNameProps` という名前のインターフェースで定義する(例: `TaskItemProps`)
- ドメインの型(`Task` など)は `src/types.ts` に集約する
- CSS のクラス名は `ブロック__要素`(BEM 風)とし、コンポーネント単位のプレフィックスを付ける(例: `task-item`, `task-item__label`, `task-item__delete`)。状態を表す修飾子は `--状態名` を付与する(例: `task-item--completed`)

## Git運用ルール

- **コードを変更するたびに、その変更をGitHubにプッシュすること。** 変更をローカルのコミットだけにとどめず、コードを編集したら必ず以下の手順を行う。
  1. `git add <変更したファイル>` (`git status` で内容を確認してから行う。`git add -A`/`git add .` は避ける)
  2. `git commit -m "..."` で変更内容を簡潔に説明するメッセージを付けてコミットする
  3. コミット後は直ちに `git push` で `origin` リモート(`https://github.com/nekomaru9/task-board.git`)へプッシュする
- 大きな変更をまとめてコミットするより、小さく頻繁にコミット・プッシュすることを優先する。各論理的な変更ごとにコミット・プッシュを行う。
- `main` などの共有ブランチに対して、ユーザーの明示的な承認なしに `git push --force` を使用しない。
- 既にプッシュ済みのコミットに対して `git commit --amend` を使用しない。
- ユーザーから明示的に指示がない限り、Git hooks をスキップ(`--no-verify`)しない。
- ステージングする前に `git status` で何がコミットされるかを確認し、プッシュ前に `.env` や認証情報、鍵などの機密情報が含まれていないか必ず確認する。

## 開発メモ

- パッケージマネージャー: npm
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- 型チェックのみ: `npx tsc -b --noEmit`
- テストランナー・formatコマンドは未導入。導入し次第このセクションに追記する。
