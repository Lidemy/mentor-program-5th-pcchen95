## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 加密：
密碼和經過加密的結果為`一對一`關係，且有一定的規律，稱為`金鑰`，因此只要取得金鑰就能將加密後的密碼轉回原始字串。  

- 實例：凱薩加密法  
利用依英文字母順序，固定位移幾個位置的加密方法。例如： `Hello` 經過加密後可能變成  `Jgnnq` （這裡的金鑰，也就是位移量，就是 2）。

### 雜湊：  
密碼和經過雜湊後的結果為`多對一`關係，是把各個字元放到某個公式計算的後結果，不管長度多長的密碼，雜湊出來的結果都是固定長度。因此，多組密碼雜湊後會產生相同結果，所以無法輕易回推原始密碼。  

- 實例：SHA-256，是目前較安全的雜湊機制。


密碼需要先經過雜湊再存入資料庫，原因是若資料庫直接存明碼，一旦被駭入資料庫，所有資訊將直接一覽無遺；相對的，若是存雜湊結果，即使被駭，也只能被取得雜湊後的密碼，取得原始密碼的難度大大提升。

***

## `include`、`require`、`include_once`、`require_once` 的差別

### include v.s. require
若引入檔案發生錯誤的情況下，include 會繼續執行後面的程式碼，而 require 不會。因此若需要判斷引入是否成功後再繼續進行接下來的指令，需要用 include，反之則使用 require。

### include\_once v.s. include、require\_once v.s. require
include\_once 和 include 大致相同，require\_once 也和 require 也大致相同，有 `once` 的差異是如果檔案已經引入過了，則不會再重複做一次引入的動作，以防函式或變數被重複定義。

***

## 請說明 SQL Injection 的攻擊原理以及防範方法

### 攻擊原理

利用字串拼接的特性，使用者可用 SQL 語法形式輸入內容，改變原始語義，以對資料庫進行 query。  

- 範例  

若留言板的新增留言程式碼，字串拼接的部分寫成這樣：

```php
$sql = sprintf(" 
  INSERT INTO comments(username, content) VALUES ('%s', '%s')", 
  $username, 
  $content
);
```

username 不是使用者可自行輸入控制的，但留言內容可以。如果將留言內容以類似 SQL 語法輸入：

```
'), ((SELECT nickname FROM users WHERE id = 50), (SELECT password FROM users WHERE id = 50))#
```

把這串字串放進第二個 `%s` 的位置後，拼接結果為

```sql
INSERT INTO comments(username, content) VALUES (username, ''), 
((SELECT nickname FROM users WHERE id = 50), (SELECT password FROM users WHERE id = 50))#')
```

執行結果會產生兩則留言，第一則為空白，第二則會冒用`id=50`的使用者身份，並發布該使用者密碼，如此一來便可輕易取得其他使用者的帳號資訊。

### 防範方法：使用 Prepared Statement

PHP 語法如下，首先先宣告要執行的指令，並將要傳入的變數以`?`表示：

```php
$sql = "INSERT INTO comments(username, content) VALUES (?, ?)";
```
接下來用`prepare()` 來執行 prepared statement：

```php
$statement = $connection->prepare('$sql');
```

接著用`bind_param`引入變數，`s`同樣代表字串，逗號後面依順序放相對應的變數：

```php
$statement->bind_param("ss", $username, $content);
```

這將就完成指令的拼接，和原本的字串拼接不同的是，使用 prepared statement 會<font color=blue>自動將引入的變數視為一個字串</font>，即使輸入 SQL 語法也只會被當成一般字串處理，因此可以解決 SQL injection 的風險。

***

##  請說明 XSS 的攻擊原理以及防範方法

### 攻擊原理
利用將使用者自行填入的部分以 Javascript 語法輸入，這段內容被加進資料庫並顯示在頁面上後，網頁會把這段 JS 語法自動解讀成網頁本身的程式碼，進而完成轉址、或獲取資料的目的。

- 範例

留言板新增留言內容如下：

```
<script> location.href = 'url' </script>
```

新增這則留言後，網頁再載入這則留言時，會把這行判斷成 JavaScript 程式碼的一部份，如此一來往後每造訪這個網站，都會被自動轉址到輸入的位址。駭客可利用這個方法把網站自動導向一個外觀幾乎一模一樣的惡意網站，進而盜取資料。

### 防範方法：加入 htmlspecialchars

因為瀏覽器會自動把<font color=blue>小於`<`、大於`>`、單引號`'`、雙引號`"`、`&`</font>這些會讓瀏覽器辨識為 HTML 裡有功能的符號，轉成另一種 HTML 的編碼形式，如此一來瀏覽器才能分辨是符號原始的樣子、還是是程式碼的一部分。而在 PHP 語法裡使用的是 `htmlspecialchars`。

引入的格式如下：

```php
htmlspecialchars($string,  $quote_flags, $encoding, $double_encode)
```

1. `$string`：要進行轉換的字串
2. `$quote_flags`：常見的有以下三種

- ENT_COMPAT：不轉換單引號。(Default)
- ENT_QUOTES：全部都轉換。
- ENT_NOQUOTES：單引號和雙引號都不轉換。

3. `$encoding`：轉換用的編碼，預設是 UTF-8。
4. `$double_encode`：預設為 true

>官網說明：「When double_encode is turned off PHP will not encode existing html entities, the default is to convert everything.」這一段有點看不太懂，自己實際用了 true 和 false 分別試試看也看不太出差異


轉換後的結果如下

 | 原始符號 | 轉換後   |
 |:------:|:-------:|
 |    &   |&amp;amp;|
 |    '   |&amp;#039;|
 |    "   |&amp;quot;|
 |    <   |&amp;lt;|
 |    >   |&amp;gt;|

當網頁讀取轉換後的結果，就能正確解讀成原始符號意義，不會和程式碼中的意義搞混，因此即使寫了 JS 語法也不會被判斷成程式碼。

***

## 請說明 CSRF 的攻擊原理以及防範方法

### 攻擊原理

利用在不同網域的情形下，強迫使用者發出 Request，達成偽造是由使用者本人發出請求的目的，而Server 判斷為本人而繼續處理請求的攻擊方式。

- 範例

這次寫留言板是利用在網址帶上 id 及確認使用者是否為作者本人或管理員，來判斷是否可刪除該文章。如果攻擊者在惡意網頁中加入一個按鈕，且按鈕的連結為 `http://board.com/delete?id=1`，當使用者按下後就會從自己的瀏覽器發送 Request，Server 判斷是從本人的網域發送、也有辦法取得正確 Session ID，即會在不知情的情況下完成刪除 id 是 1 資料。即使改成用 POST 來刪除資料，惡意網站中仍可以使用 `form` 或 `iframe` 來達成相同的目的。



### 防範方法：Double Submit Cookie

由客戶端或伺服器來隨機產生一組 token，並將 token 同時放在 form 和客戶端產生的 Cookie 裡，每次傳送請求都需要比對這兩組 token 是否相同才能執行。利用無法設定不同網域 Cookie 的特性，因此攻擊者發送的請求中沒有帶有 token 的 Cookie，所以無法順利執行。

另外也可以在瀏覽器端設置 Cookie 的 header 後面加入`Samesite`，瀏覽器就只會讓同來源的請求帶上這組 Cookie。

兩種 Samedite 屬性：

1. Samedite=Lax：POST 相關方法的 form 不允許帶上 Cookie，其他（例如： GET）仍會帶上。（Default）
2. Samedite=Strict：任何 request 都不會帶上 Cookie