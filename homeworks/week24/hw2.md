## Redux middleware 是什麼？

Redux middleware 扮演在 dispatch action 和到達 reducer 中間，協助進行 log 、非同步動作、回報當機、routing 等工作的角色，例如 `redux thunk` 就可以協助 call API，並協助接收回傳的結果，然後把結果存到 store 裡面。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR (Client Side Rendering) 的是在瀏覽器發出 Request 後，接著需要先請求執行原始碼內的 Javascript，若有需要 call API 也要等 API response 回來後再完成 DOM 的初始化，接著使用者才看得到畫面；簡而言之，畫面上呈現的畫面都是由 JS 動態產生。SSR (Server Side Rendering) 顧名思義則是在 Server 端就已經先處理好，瀏覽器一旦發出 Request 就能立即看到完整網頁內容。

兩者差異主要在 `第一次渲染畫面的方式`，由於 SSR 的第一次渲染是在 server 執行，因此載入速度較快，也能直接在原始碼中看到網頁上呈現的內容，也較利於 SEO。


## React 提供了哪些原生的方法讓你實作 SSR？

可以先透過 `renderToString()` 將 React 元件 render 成初始的 HTML 形式，並將 HTML 格式轉為字串回傳，如此一來在首次 render 就能看到 HTML 內的文字內容。

```javascript
ReactDOMServer.renderToString(element)
```

接著原本使用 `ReactDOM.render()` 渲染內容時，改用 `ReactDOM.hydrate()`，才能將所需的 eventListener 功能附加到 DOM 上面。


## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

### Next.js

Next.js 除了可以達到 SSR，其他的特點還有  
1. 檔案的架構就是 Routing，將要 render 的內容放在 `pages` 資料夾底下，就是對應的 routing 名稱。
2. 執行非同步動作，如 call API，可透過 `getInitialProps`，初次載入頁面時就能在 server 端完成動作。
3. 提供 backend server 功能，可將 API 檔案放在 `api` 資料夾中，即會自動產生相對應路徑的 API route。

### Gatsby.js

在程式建立時一併產生靜態的 HTML 網頁，因此可以在沒有 server 的情況下進行。

### Prerender

這個 framework 會先提供渲染後的靜態 HTML 給搜尋引擎，但後續的只用仍然是用一般 React 的方式。

