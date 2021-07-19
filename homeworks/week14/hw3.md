## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS，全名為 Domain Name System，一般我們都是在網址列輸入由英文、數字、及符號組成的網址（例如： www.google.com），但事實上電腦只看得懂 IP 位址（例如：172.217.24.14），但我們不可能去記住每個網站的 IP，因此需要 DNS 作為查號台，將域名轉換成 IP。

由於不太可能讓一台 DNS 伺服器記住全世界所有的網域對應之 IP 位址，因此採取樹狀目錄、分階層的方式進行查詢作業，而每一階層只會儲存下一階層 hostname 的 IP 資料而已，好處是易於管理，而下一層若有問題或更動，只要詢問上一階層就好。

<center>![DNS 階層圖](http://linux.vbird.org/linux_server/0350dns//dns_dot.gif)</center>
<center><font color=grey>DNS 的階層關係圖（資料來源：http://linux.vbird.org/linux_server/0350dns.php）</font></center>

樹的最頂層是 root，全世界共有 13 台 root name server，從這些 root name server 開始分階層往下查詢。假設要查詢 `www.nthu.edu.tw` 的 IP 位址，這串域名階層由高至低為從最後面開始數過來：<font color=blue>「.tw &rarr; .edu &rarr; .nthu &rarr; www」</font>，查詢步驟如下：

1. `Client` 端向 「DNS server」 查詢 www.nthu.edu.tw 的 IP 位址
2. `DNS server` 向 「Root server」 查詢 www.nthu.edu.tw 的 IP 位址
3. `Root server` 回傳「管理 .tw 的 DNS server」的 IP 位址
4. `DNS server` 向「管理.tw 的 DNS server」查詢 www.nthu.edu.tw 的 IP 位址
5. `管理 .tw 的 DNS server` 回傳「管理 .edu.tw 的 DNS server」的 IP 位址
6. `DNS server` 向「管理 .edu.tw 的 DNS server」查詢 www.nthu.edu.tw 的 IP 位址
7. `管理 .edu.tw 的 DNS server` 回傳「管理 .nthu.edu.tw 的 DNS server」的 IP 位址
8. `DNS server` 向「管理 .nthu.edu.tw 的 DNS server」查詢 www.nthu.edu.tw 的 IP 位址
9. `管理 .nthu.edu.tw 的 DNS server` 回傳 www.nthu.edu.tw 的 IP 位址是「140.114.69.135」

###Google Public DNS 的好處
 >主 DNS 伺服器 IP (IPv4)：8.8.8.8  
  次 DNS 伺服器 IP (IPv4) ：8.8.4.4
  
 >主 DNS 伺服器 IP (IPv6)：2001:4860:4860::8888  
  次 DNS 伺服器 IP (IPv6)：2001:4860:4860::8844
 
 1. DNS 查詢速度快：因為 Google Public DNS 有預抓 (Prefetch) 功能，在快取資料快到期之前先一份存在伺服器內，因此縮短 DNS server 的更新時間；再者，因 Google Public DNS Server 位於根伺服器的下一階，因此不需要像上面的舉例需經過層層關卡，直接往下一階層就能查到資料了。

2. 安全性較高：可減少 DNS 被攻擊者修改而導向惡意網站，Google Public DNS 的控管較嚴格。

3. 對於 Google 的優點：更精確掌握並統計使用者瀏覽網站的行為，可提昇搜尋引擎精確度，提供更精準的搜尋結果及資訊。

>Reference  
>1. Google Public DNS ([https://developers.google.com/speed/public-dns](https://developers.google.com/speed/public-dns))  
>2. 第十九章、主機名稱控制者： DNS 伺服器 ([http://linux.vbird.org/linux_server/0350dns.php](http://linux.vbird.org/linux_server/0350dns.php))  
>3. DNS 伺服器是什麼？如何運用？ ([https://www.stockfeel.com.tw/dns-伺服器是什麼？如何運用？/](https://www.stockfeel.com.tw/dns-伺服器是什麼？如何運用？/))    
>4. Google 更快更安全的 DNS 伺服器：8.8.8.8 與 8.8.4.4 （含 iPv6）([https://briian.com/6667/](https://briian.com/6667/))  
>5. Google Public DNS ([http://blog.dsp.idv.tw/2010/02/google-public-dns.html](http://blog.dsp.idv.tw/2010/02/google-public-dns.html))  
>6. Google Public DNS上網跑更快，用戶端趕快更換IPv4 DNS設定8.8.8.8與8.8.4.4 ([http://www.pcdiy.com.tw/detail/1412](http://www.pcdiy.com.tw/detail/1412))

## 什麼是資料庫的 lock？為什麼我們需要 lock？

當同時有多筆針對同一個資料表的交易存在時，可能會出現 race condition，例如在購物網站上，某物品數量剩下 2，A 交易下單數量 1 ，而 B 交易下單數量 2，若沒有對資料庫做 lock 的動作，兩筆交易同時發生時就會發生超賣。因次 lock 就是用來將先到的交易處理完，處理的同時將資料庫 lock 住不讓其他交易更新資料庫，結束後再處理後到的交易。

以同樣購物網站的例子來說，假設 A 交易先發生，而在 A 交易正在結帳的同時 B 交易也按下了結帳，但因為 A 先來，這時資料庫會先把 B 交易鎖住。等到 A 交易結束後，資料庫允許 B 開始進行交易，但因為這時庫存剩下數量 1，因此 B 交易失敗，如此才可避免超賣情形發生。

- 未使用 lock

| 庫存 | A 交易 | B 交易 |
|:--:|:-----:|:-----:|
| 2   |   結帳 (數量：1)  |     -    |
| 2   |  交易中 |   結帳 (數量：2)|
| 1    | 結帳成功  | 交易中 |
| <font color=red>-1 (超賣) </font>  | - | 結帳成功 |

- 使用 lock    

| 庫存 | A 交易 | B 交易 |
|:--:|:-----:|:-----:|
| 2   |   結帳 (數量：1)  |     -    |
| 2   |  交易中 |   結帳 (數量：2) |
| 2   | 交易中  | <font color=red> locked</font> |
| 1   | 結帳成功| 交易中|
| 1  |   -        | 結帳失敗 (庫存不足) |



## NoSQL 跟 SQL 的差別在哪裡？

SQL 為一種「關聯式資料庫」，而 NoSQL 全名為 `Not Only SQL`，是一種「非關連式資料庫」。

關連式資料庫內會多個資料表，每個資料表內有多筆資料，且資料表與資料表間有明確的關聯性。以購物網站的資料庫舉例，可能會有賣家的資料表、每個賣家上架商品的資料表、商品分類的資料表、銷售數據的資料表......等等，這些資料表間都各以賣家、商品編號、或類別為關聯。在關聯式資料表中也可以透過 SQL 語言操作，進行資料查詢 (SELECT)、新增 (INSERT)、修改 (UPDATE)、刪除 (DELETE)，以及資料表間的連結（JOIN)。

隨著網路越來越盛行，需儲存的資料量大幅提升，若單純以關聯式資料庫處理資料的速度比較慢，資料擴充性也較低，這時候就會選擇用 NoSQL，也就是非關聯式資料庫。NoSQL 是將資料（例如：Facebook 的貼文、留言、分享狀態等等）以 JSON 格式儲存，因此 NoSQL 不需要先定義 Schema，所以提升了資料彈性度，在查找資料的速度上也會比較快，但同時也不適用 SQL 語法。

>Reference  
>1. 課程影片  
>2. 閃開！讓專業的來：SQL 與 NoSQL ([https://ithelp.ithome.com.tw/articles/10187443](https://ithelp.ithome.com.tw/articles/10187443))  
>3. NoSQL 非關聯式資料庫 ([http://tx.liberal.ntu.edu.tw/infomgt/jx/is_im/NoSQL.htm](http://tx.liberal.ntu.edu.tw/infomgt/jx/is_im/NoSQL.htm))  
>4. SQL/NoSQL是什麼？認識資料庫管理系統DBMS ([https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction))

## 資料庫的 ACID 是什麼？

ACID 是保證資料庫交易（transaction）成功的四個性質：  

1. **A**tomicity（原子性）：像物理學上的原子不可分割性質，交易只能一起成功、或一起失敗，若其中一邊失敗，就一起返回原本的狀態。  

	>範例：A 轉帳給 B，若 A 在過程中失敗，一定是 A 沒扣款成功、B 也沒收到錢，不會發生沒扣 A 的錢而 B 卻多錢的狀況。

2. **C**onsistency （一致性）：類似物理學的「能量守恆定理」，交易前後的總額、資料庫的完整性都要保持一樣。

	>範例：A 轉帳給 B 後兩個人的總財產仍然會一樣多，如果 A 帳戶少了 500，但 B 帳戶只多了 300，就不符合這個特性。

3. **I**solation（隔離性）：多筆 transaction 間互不影響，要一個 transaction 結束後才能進行下一個 transaction。
	> 範例：兩個人同時對同一個商品下訂單，要在第一筆交易完成後才能進行第二筆，否則會造成實際數量與售出數量不符。

4. **D**urability（耐久性）：交易成功後的結果要永久保存在資料庫內。
	> 範例：轉帳成功後就是成功了，即使後來系統當機也不應該影響。


>Reference  
>1. 課程影片  
>2. Database Transaction & ACID ([https://oldmo860617.medium.com/database-transaction-acid-156a3b75845e](https://oldmo860617.medium.com/database-transaction-acid-156a3b75845e))  
>3. MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始 ([https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases))  