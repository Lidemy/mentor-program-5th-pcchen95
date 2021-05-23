## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
### &lt;hr&gt; 分隔線
一種語意化標籤，產生分隔線。
可調整的屬性如下：  
- `size` 調整分隔線的縱向寬度  
- `width` 調整分隔線的橫向長度  
- `color` 調整分隔線顏色  
- `align` 調整對齊方式 (left / center/ right 等)  

> 範例

``` html
<body>
  <p>paragraph1</p>
  <hr size="5px" color="red">   <!-- 將分隔線高度設為 5px、顏色為紅色  -->
  <p>paragraph2</p>
</body>
```
顯示結果為：  

![hr示範](https://i.imgur.com/bcvIlcI.jpg)

***

### &lt;figure&gt; 、 &lt;figcation&gt; 圖片及圖片標題
`<figure>` 是一個 container，`<figucaption>` 需和 `<figure>` 搭配使用。`<figure>` 內可放多張圖片或其他內容，而 `<figucaption>` 放在圖片的最前面或最後面，作為圖片的標題或說明（不一定要放）。

>範例

``` html
<!DOCTYPE html>

<html>
<head>
  <style>
    figure { 
      width: 30%;
      text-align: center;    
    } 

    img {
      width: 100%;
    }
  </style>
</head>
<body>
  <figure>
    <img src="https://i.imgur.com/dQrMiiv.jpg">
    <figcaption>貓貓</figcaption>
  </figure>
</body>
</html>
```  
顯示結果為 ：  

![catcat](https://i.imgur.com/l0jCpJS.jpg)

***
### &lt;dl&gt;、&lt;dt&gt; 和 &lt;dd&gt; 定義列表 (definition lists)
`<dl> ` 是 container，裡面放 `<dt>` 放定義的名詞（項目），及 `<dd>` 放該名詞的解釋（敘述）。

>範例  

```
<body>
  <dl>
    <dt>直角三角形</dt>
    <dd>有一個角是直角（90°）的三角形為直角三角形。成直角的兩條邊稱為「直角邊」（cathetus），直角所對的邊是「斜邊」（hypotenuse）；或最長的邊稱為「弦」，底部的一邊稱作「勾」（又作「句」），另一邊稱為「股」。</dd>
    <br>
    <dt>等腰三角形</dt>
    <dd>等腰三角形是三條邊中有兩條邊相等（或是其中兩隻內角相等）的三角形。等腰三角形中的兩條相等的邊被稱為「腰」，而另一條邊被稱為「底邊」，兩條腰交叉組成的那個點被稱為「頂點」，它們組成的角被稱為「頂角」。</dd>
    <br>
    <dt>梯形</dt>
    <dd>梯形是只有一組對邊平行的凸四邊形。梯形平行的兩條邊為底邊，分別稱為上底和下底，其間的距離為高，不平行的兩條邊為腰。下底與腰的夾角為底角，上底與腰的夾角為頂角。</dd>
  </dl>
</body>
```
顯示結果為 ：

![dl](https://i.imgur.com/u4JGA04.jpg)  



## 請問什麼是盒模型（box model）
Box model 用於網頁排版設計，Chrome 的 DevTools 內有 box model，可以看到由外而內包含四個部分：**margin**、**bodrer**、**padding**、**content**，可藉由 box model 看出這幾個元素間的呈現並調整所需參數。

![box model](https://i.imgur.com/QIQi6Ol.jpg)

- **margin**：外邊距，也就是和其他元素的距離，不影響本身大小。  
- **border**：邊框，會影響原本元素的位置。
- **padding**：內容的周圍的留空。
- **content**：顯示在網頁上的文字、圖片內容。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

| 特性 | inline | block | inline-block |
| :---: | :---: | :----: | :----: |
| 代表標籤 | span、a | div、h1、p… | button、input、select… |
|大小和間距設定|無法設定|可設定|可設定|
| 排列方式 | 多個排在同一列 | 自己佔滿一列 | 多個排在同一列 |



## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？


|    特性     | static | relative | fixed | absolute |  
| :------: | :----: | :------: | :---: | :------: |
| 排版 | 遵循排版流 | 遵循排版流 | 跳脫排版流 | 跳脫排版流 |
| 定位基準點 | 瀏覽器 | 元素原本的位置 | 瀏覽器 | 往上找第一個非 static 的元素 |
| Remark | 網頁預設的定位方式 | 不影響其他元素的定位 | 不論網頁如何捲動，都不會改變位置 | 後面的元素會照原本的排版方式補位上來 |
