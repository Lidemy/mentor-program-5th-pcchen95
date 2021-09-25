## 為什麼我們需要 Redux？

若只單用 React，在大專案的身上可能會有以下幾個問題：  
1. 不容易管理 state，因為 state 可以直接在元件中被輕易更改，難以追蹤  
2. 直接在元件裡寫改變 state 的邏輯，程式可能會很肥大雜亂  
3. 如果多個元件都會需要用到 state，可能會需要多層傳遞 state，或者定義許多 context  

如果使用 Redux，則可以事先定義好每個 action 代表的 state 改變，state 僅能透過 dispatch 一個 action 去修改，在專案越來越大、越來越複雜的情況下，比較好管理資料改變。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

### Redux 元件  
- `action`：描述改變 state 的事件行為，通常是用物件儲存類型名稱 (type) 和其所帶的資訊 (payload)。  
- `reducer`：將目前的 state 根據 action 做狀態變化而獲得新的 state 的函式。
- `store`：存取所有的 state，可透過 `store.getState()` 拿狀態。

### Reduc Flow
![Redux flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

#### 初始化
建立 store 並首次呼叫 reducer，並將回傳的值設為 initial state，並根據 state 做畫面渲染。

### state 更新
事件發生（例如：點按按鈕）後，透過 dispatch action 給 store，store 再呼叫一次 reducer，根據目前的 state 和 action 獲得一個新 state，接著 UI 再根據新的 state 重新渲染。

## 該怎麼把 React 跟 Redux 串起來？

建立好  store 及 reducer 後，可以使用 `react-redux` 套件，先引入 `<Provider>` 作為 context 將 store 傳到元件內  

```jsx=
<Provider store={store}>
  <App />
</Provider>
```  

並用 `useSelector` 將 Redux state 取出來（這裡以 `todoState` 舉例）。

```jsx=
const state = useSelector((store) => store.todoState))
```
即能使用 state 做 UI render、
