## 為什麼我們需要 React？可以不用嗎？

以前沒有用 React 的時候，在增、刪、修資料時還要考慮到如何操作 DOM，可能會需要綁很多 class、id 之類的，去達到在更新時同時新增、刪除、或編輯 DOM 的 render。但有時候如果判斷條件複雜、或一種資料和許多頁面區塊有關聯時，要控制 DOM 的狀況就會較複雜且維護不易。

如果用 React 的話，我們並不需要直接去操作 DOM，只要告訴 React 要渲染的樣式會長怎樣，就能自己依照資料去完成渲染，所以我們不會在程式碼中使用到 `document.querySelector`、`append`、`remove` 這些操作 DOM 的指令。而且 React 也會自己判斷哪些是新的資料，而只更新更新後的資料的部分，效能較好。

## React 的思考模式跟以前的思考模式有什麼不一樣？

以前的思考模式是，要進行動作時，同時去改變資料和畫面，或者從畫面拿取資料；而 React 則是透過改變資料，而畫面是直接根據資料渲染，因此資料和畫面會永遠一致，而這邊的資料就是指  React 的 state。

例如，過去在做填寫表單的功能時，在填寫的途中，畫面已出現填入的內容，但事實上並沒有填入內容的這項資料，直到填完所有資料並按下送出後，才將畫面上的填入資訊加進最終結果的資料裡、並將欄位清空，這時資料與畫面才同步。所以在還沒送出之前，畫面與資料會是不一致的。

而 React 的思考模式要變成：如何改變 state，並將畫面與 state 做連結，才能在每次 state 有更新時都重新進行渲染。因此表單功能的模式會變成，每填入一個字，都代表著「更新 state  &rarr; 更新畫面」這個步驟，並非直接更新頁面，每個欄位都有自己的 state，讓 state 和畫面永遠保持同步。

## state 跟 props 的差別在哪裡？

state 是元件自己可以改變的狀態，而 props 是從外部控制元件，是靜態、不能改變的。

範例：

- props  
直接在呼叫元件時指定一個 props，這裡的 props 就是 `name`，內容為 `Jenny`。傳入後 Greet 這個元件並沒辦法再去對 props 進行修改，因為它是靜態內容。

```jsx
function Greet({name}) {
  return <div>Hello, {name}</div>
}

function App() {
  return (
    <Greet name={'Jenny'} />
  );
}
```

- state  
state 會先通過初始化給予預設值，接下來元件可以自己透過 `setState` 去更新 state，state 變更後就會進行畫面重新渲染。這裡的 inputbox 呼叫 `handleChangeName`，藉由 `setName` 去動態改變 `name` 這個 state，畫面就會同步印出當下 `name` 所存的內容。

```jsx
function App() {
  const [name, setName] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  return (
    <div>
      <input onChange={handleChangeName} />
      <div>Hello, {name}</div>
    </div>
  );
}

```