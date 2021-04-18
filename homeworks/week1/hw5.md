## 請解釋後端與前端的差異。
* 前端：使用者進入某個網頁後，肉眼所能看到的瀏覽器頁面部分。例如：圖片文字排版、選單及按鈕功能等等，可以讓使用者操作互動的，就是前端的領域。 使用的程式語言如 HTML（負責頁面內容）、CSS（負責頁面排版）、JavaScript（負責網頁的功能）。  

* 後段：相對於前端，由 Server處理的、使用者看不到的部分，像資料處理、系統架構。後端的程式語言有 PHP、Python、Node.js ...... 等。  




## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1.  瀏覽器將搜尋關鍵字 JavaScript 這個 Request 拋到作業系統
2. 作業系統再把 Request 拋到電腦的網路卡
3. 網路卡透過網路將 Request 送到 Google Server 
4. Google Server 寫入至 Google 的 DataBase
5. Goole Server 再次透過網路回傳搜尋結果的 Response 給電腦的網路卡
6. 電腦的網路卡把 Response 傳至作業系統
7. 作業系統將搜尋結果 （Response） 顯示在瀏覽器上


## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
```
git log --author="Name"

```
用來查詢某位作者的 Commit 紀錄，Name 的名字改成欲查詢對象的使用者名稱即可。  

```
git log  --since="5pm" --until="10pm" --after="2021-04-16"

```
用來查詢某個時間區間的 Commit 記錄，上面這個範例就是查詢「202 年 4 月 16 日，每天晚上 5 點 10 點」的所有 Commit。

```
git blame 檔名

```
可顯示某個檔案裡每一行內容是哪位作者修改的，用來抓戰犯。也可加上 `-L` 只顯示指定行數，例如： `git blame -L 5,10 檔名` 僅會顯示第 5～10 行的內容及其修改人。
