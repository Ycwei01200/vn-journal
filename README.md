# TWILIGHT ARCHIVE｜Visual Novel Journal

以視覺小說與文字冒險為中心的靜態閱讀手帖。首頁背景是為本專案生成的原創暮色雲海插畫（OpenAI ImageGen）；評論畫格與 favicon 則為原創 SVG。站內沒有外部字型、取材圖片、角色圖或授權不明素材。

評論和遊玩記錄都由 `src/content/` 下的 Markdown 檔管理。空白版型只用作編輯說明，不會出現在公開索引；目前沒有代填的作品心得、評分或遊玩經驗。

## 本機預覽

需要 Node.js 22.12 或更新的偶數版本。

```sh
npm install
npm run dev
```

建置靜態網站並執行輸出檢查：

```sh
npm run verify
```

`npm run smoke` 會檢查建置後頁面、GitHub Pages 路徑、標題選單、範本路由，以及評論劇情區是否保持關閉。

## 新增評論

1. 複製 `src/content/reviews/review-template.md`，另存為描述作品的英文檔名，例如 `moonlit-window.md`。
2. 填寫 `title`、`gameTitle`、`date`、`platforms` 與 `spoilerFreeSummary`。`rating` 可省略；沒有評分時不要加入評分欄位。
3. 無劇透評論寫在 frontmatter 之後的 Markdown 正文。劇情內容寫入 frontmatter 的 `spoilerContent` 區塊，這段會放在初始關閉的「展開劇情分析」區內。
4. 可加入最多五個自有或已獲授權的畫格。先把圖片放進 `public/`，再以 `/scenes/example.svg` 這種網站根路徑填入 `frames.image`；畫格說明也請避開關鍵劇情。
5. 先保留 `status: template` 預覽版型。內容完成後才改成 `status: published`；`draft` 和 `template` 狀態都不會出現在評論索引。

評論索引只讀取標題、作品名稱、日期和 `spoilerFreeSummary`，不讀取 Markdown 正文或 `spoilerContent`。不要把劇透寫入檔名、標題、摘要或畫格替代文字。

## 新增遊玩記錄

複製 `src/content/play-log/play-log-template.md`，換成新的 `.md` 檔，填入真實遊玩日期、作品名稱、章節或回合，再於正文記錄自己的遊玩內容。完成後將 `status` 設為 `published`；空白模板不會出現在索引。

## 發佈到 GitHub Pages

Astro 已將網站根目錄設為 `/vn-journal/`，部署網域為 `https://ycwei01200.github.io`。GitHub Pages 來源目前已設定為 **GitHub Actions**；`.github/workflows/deploy.yml` 會在 `main` 分支更新或手動啟動時建置並部署 Pages。
