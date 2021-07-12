## Webpack 是做什麼用的？可以不用它嗎？

把各種模組，主要是 JavaScript，其他如 CSS、圖片等，也可以視為模組，一併打包引入至程式碼中，並把將瀏覽器不支援的語法轉換成瀏覽器看得懂的形式。例如：Node.js 中可用 exports / require 引入 JS 檔案，但在瀏覽器上不適用，即使目前已經出現 exports / import，但並非所有版本瀏覽器都支援，Webpack 可將它們翻譯成各瀏覽器都能使用的舊語法，將所需 JS 模組印入至網頁中。

## gulp 跟 webpack 有什麼不一樣？

雖然這兩種工具可以做的事大部分重複（例如：babel、sass、minify 等），但以下提到的兩種工作在預設情況下對方辦不到：

- gulp 主要定位為`任務管理`，透過 plugin 設定好不同 task（例如： minify、rename、compile ... 等），可決定需要進行哪些 task、什麼時間點進行哪些 task、或者是 task 的執行順序。

- webpack 主要負責`打包 (bundle)`，透過 loader 把每個不同 module 一起打包載入程式碼中，並轉換成瀏覽器看得懂的表達方式。 

## CSS Selector 權重的計算方式為何？

用四個數字來表達計算值：`a-b-c-d`，從左邊開始的權重比較高，各個位數的 Selector 如下：

- `0-0-0-0`：全域選擇器`*`。

- `0-0-0-1`： element，例如`div、p、ul、span、a...`等。
>範例：`main > div > p {...}` 共出現 3 個 element，所以權重為 `0-0-0-3`。

-  `0-0-1-0`： class、pseudo-class （如：`nth-child`）、attribute（如：`[type=text]`）。
> 範例：`.box .div {...}` 共選到兩個 class，所以權重為 `0-0-2-0`。

-  `0-1-0-0`：id。
>範例：`#form input[type=radio]  {...}` 共選到 1 個 id 、1 種 element、和 1  attribute，所以權重為 `0-1-1-1`。

- `1-0-0-0`：inline-style，直接寫在 html 裡的行內 CSS style。

	```HTML
	<div style="color:red">
	  Hello!
	</div>
	```
	
- <font color=red>`1-0-0-0-0`</font>：在屬性後加入 `!important`，權重位階變成最高！

	```CSS
	div {
	  color: red;!important
	}
	```

***
用上面方法計算後的權重，比較方式為兩兩相比由左至右、出現第一個不同的位數即可比較出大小。例如：`0-1-0-0` 和 `0-0-9-9` 比較，前者權重較高；`1-1-1-2` 和 `1-1-2-2` 比較，後者權重較高。