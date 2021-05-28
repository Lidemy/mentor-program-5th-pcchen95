## 什麼是 DOM？
DOM（Document Object Model, 文件物件模型）是把 HTML 結構中各個元素都看成是一個物件，可提供 JavaScript 取得及改變 HTML 的呈現方式。

![DOM](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/220px-DOM-model.svg.png)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制的順序：Capture Phase（捕獲）&rarr; Target Phase（點擊目標） &rarr; Bubbling Phase（冒泡）。  

- 捕獲：事件從最外層的 window 開始一層一層往內傳給 Target。  
- 冒泡：事件從 Target 開始一層一層傳回去給 window 。

![Capture & Bubbling](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)

## 什麼是 event delegation，為什麼我們需要它？
若有很多個相似元素，而要為他們都新增相同事件的情況下，就可使用 Event Delegation 事件代理機制。原理是在事件傳遞機制中，每個事件都會冒泡到目標元素的上層元素；換句話說，無論如何上層元素都會接受到來自下層每個元素的事件，因此可拿這個上層元素作為下層元素們的代理人。

例如，要對 100 個按鈕進行事件處理，不需對 100 個按鈕都加 addEventListener，只要針對它們的上層元素寫一個 addEventListener 就好。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
`event.preventDefault()` 只是**阻止預設行為發生**，但事件仍會繼續傳遞；而 `event.stopPropagation()` 則是**防止事件繼續傳遞**。

>範例

```html
//html
<div class="outer">outer
	<a href="https://google.com" class="inner">inner</a>
</div>

//javascript
document.querySelector('.inner').addEventListener('click', function(e) {
	console.log('inner')
})
document.querySelector('.outer').addEventListener('click', function() {
	console.log('outer')
})
 
```

`inner` 為一個連到 google 首頁的超連結，外面包一層 `outer` 。

此時若點選 `inner` 會印出  

```
inner
outer
```

並跳轉至 google 首頁。

<font color = blue>狀況一、在 inner 加入 e.preventDefault() </font>

``` html
//javascript
document.querySelector('.inner').addEventListener('click', function(e) {
	e.preventDefault()
	console.log('inner')
})
document.querySelector('.outer').addEventListener('click', function() {
	console.log('outer')
})

```
同樣會印出

```
inner
outer
```
但不會跳轉到 google 首頁。

原因是 `e.preventDefault()` 僅取消超連結的預設行為，但事件還是會繼續傳遞到外層的 `outer`，所以仍然會印出 `outer`。

<font color = blue>狀況二、在 inner 加入 e.stopPropagation() </font>

``` html
//javascript
document.querySelector('.inner').addEventListener('click', function(e) {
	e.stopPropagation()
	console.log('inner')
})
document.querySelector('.outer').addEventListener('click', function() {
	console.log('outer')
})

```
這時會跳轉到 google 首頁，但只會印出```inner```。   

原因是 `e.stopPropagation()` 是阻止事件傳遞，因此事件不會繼續傳到外層的 `outer`，所以`outer`不會被印出，且`e.stopPropagation()` 不影響超連結這個預設行為，所以仍會跳轉頁面。

<font color = blue>狀況三、在 inner 同時加入 e.preventDefault() 和 e.stopPropagation() </font>

``` html
//javascript
document.querySelector('.inner').addEventListener('click', function(e) {
	e.preventDefault()
	e.stopPropagation()
	console.log('inner')
})
document.querySelector('.outer').addEventListener('click', function() {
	console.log('outer')
})

```
這時只會印出```inner```，且不會跳轉到 google 首頁。

原因是`e.preventDefault()`先阻止了超連結的預設行為，因此不會跳轉頁面；接著`e.stopPropagation()`又阻止了事件傳遞，事件不會傳到`outer`，所以只印出 `inner`。

