## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState

先用 `const [state, setState] = useState(initialState)` 來設定 state 的初始值，state 存放若改變後會需要重新渲染畫面的資料，用 setState 來設定新的 state，若和前次 state 不同畫面就會被重新載入。

### useEffect

用 `useEffect( <render 後執行的動作> )` 來設定畫面選染後要執行什麼動作，或者是 `useEffect( <render 後執行的動作>, [value] )` 在後面放一個 dependency array 作為條件，只有在陣列內的值被改變時，才觸發 useEffect 內的動作，如果是放空陣列就表示只會做一次。

### useContext

先用 `const value = useContext(MyContext)` 指定 context 值，並在 component 最外層包上 `<MyContext.Provider>`，就可以將 context 內的值傳到裡面每一個 component，不需要一層一層的用 props 將所需的值傳下去。

### useReducer

概念類似於 useState，但若需要較複雜的 state 邏輯時，則可改用 useReducer，可避免重複 render。使用 `const [state, dispatch] = useReducer(reducer, initialState);` 初始化，將 state 邏輯放在 `reducer` 裡，並用 `dispatch` 修改變數。

### useCallback

```javascript
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
 },  [a, b]);
```
useCallback 會回傳一個函式，當後面傳入的 dependency array 改變時，會改變回傳的韓式的內容，但每次回傳的函式指向的記憶體位址都是一樣的，僅有內容不同，再搭配其他 hooks 使用時才不會造成重複 render 的狀況發生。

### useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo 會回傳一個值，可以用在需要經過複雜計算時，不需要每次 render 都被呼叫一次而浪費效能，僅在 dependencies 改變時才會重新回傳重新計算後的值。

### useRef

用 `const refContainer = useRef(initialValue);` 進行初始化，值會被放在 `refContainer.current` 內，資料改變時不需要再經過畫面的重新渲染的值就可以使用 useRef 來存放，

### useImperativeHandle

在需要用到像 `focus` 的 instance 時，可以用 `useImperativeHandle` 將這個 instance 讓它的父元素同時也能呼叫。用官方文件的範例來看，一樣要先使用 `useRef` 來定義 ref，接著用 `useImperativeHandle` 定義要給父元素可以使用的屬性，這裡就是 `focus`。最後一定要搭配 `forwardRef` 把 ref 屬性轉交出去，接著父元素就可以直接使用這個子元素的屬性。

```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

### useLayoutEffect

宣告的方式和 useEffect 一樣，只是動作是在渲染畫面前同步進行，所以假設 useLayoutEffect 裡面放了一個 call API 的 function，由於是同步的，在拿到資料前畫面都沒辦法 render。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![class component lifecycle](https://i.imgur.com/8GHcHWr.jpg)

### Mount

- `constructor`：初始化 state (`this.state`)
- `render`：依據元素、state 等資訊呈現在畫面上。
- `componentDidMount`：在第一次把 component 放上畫面（初始化畫面）時觸發。

### Update

- `render`：依據新的元素、state 等資訊呈現在畫面上。
- `componentDidUpdate`：透過 `setState` 改變 state 後觸發，表示畫面呈現有被更新。
	
### Unmount
- `componentWillUnmount`：當元素從畫面上被拿掉時觸發。

## 請問 class component 與 function component 的差別是什麼？

1. function component 可以用 useState 和其他 hooks，而 class component 沒有。
2. class component 每次都只執行 render 的部分，再把 mount / update / unmount 這幾個階段要執行的動作用 `componentDidMount`、`componentDidUpdate `、`componentWillUnmount` 定義；而 function component 則可看成每次都會重新呼叫一次整個 function，而 mount / update / unmount 要執行的動作是用 `useEffect` 來控制，mount 就是將空陣列作為 dependencies、update 則是將更新的條件作為 dependencies、若在 useEffect 裡 return function 就是 unmount 階段要做的指令。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

controlled component 是受 React 控制的資料，用 `<input />` 來舉例的話，就是先用 `useState` 存狀態給 React 管理，再用 `onChange` 監聽輸入的資料、改變 state、最後呈現在畫面上，因此一定會帶有 `value` 這個 prop。uncontrolled component 就是不受 React 控制，直接透過 DOM 取出 HTML 元素的資料，方法是加入 `ref` prop，可以從 `ref.current` 取出值。

React 官方建議在沒有特殊狀況下盡量都使用 controlled component，但像 file input 因為有安全性考量，只能使用 uncontrolled component。其他如不需要驗證、檢查等涉及 state 的簡單表單，也可以使用 uncontrolled component 以簡化 state。
