## 什麼是反向代理（Reverse proxy）？

Server 端會有很多個 server，反向代理作為好幾個 Server 的替身。反向代理伺服器負責接收來自 Client 端的 request，再把 request 轉給背後對應的 Server，並把處理完後的 Response 也先透過反向代理伺服器返回給 Client 端。而在使用反向代理的情況下， Client 端不會知道真正接收及處理 request 的 IP 位址。

這兩週使用到的 nginx 就是反向代理伺服器的角色，一般的 Server 就會佔用一個 Port，若要在同一個 Server 上執行不同的服務，就需要在網址後面加上 Port 去連接到對應的服務。若使用 nginx y 作為反向代理伺服器，則可以設定不同的 Sub-domain 對應到不同 Port 上的服務，這種方法不僅能讓網址變得簡潔，也不會直接讓 Client 端知道服務對應的是什麼 Port。


## 什麼是 ORM？

ORM 的全名為 Object Relational Mapping，是一種將 SQL query 模組化，幫助使用者用更簡便的方式到資料庫讀取資料的工具。如這兩週使用的 Sequelize 即為一種 ORM 套件，在 Sequelize 中已經寫好一套能將 Node.js 程式碼轉換為 SQL 語法的方法，使用者只要以 Node.js 語法建立物件，ORM  負責把物件翻譯成 SQL query，就能對資料庫進行操作。

使用 ORM 的好處，第一個當然是能簡化使用者下指令的方式，在需要下簡易的查詢指令時，不需要重複寫落落長的 SQL query，只要用物件的方式寫入讀取條件即可；但相對的，若需要其他比較複雜的條件，還是需要寫入原生的 SQL 語法。第二，是可以避開 SQL injection 的風險，ORM 會自動阻檔帶有敏感字眼的變數，例如 DELETE、UPDATE 等等。第三，可以避免在資料庫轉移時，需要一一檢查 query 語法的狀況，因為在不同資料庫下可以直接交由 ORM 去轉成所需的語法，而使用者仍只需要操作物件。


## 什麼是 N+1 problem？

在使用 ORM 進行數個資料表的關聯查詢時，回傳的 Response 通常會有多個結果，這時可能就會出現重複下多次 Query 的情形。所需共 N 個結果的情況下就會進行 N+1 次的 Query，就是 N+1 Problem。

以 Sequelize 來舉例，假設現在有兩個資料表，我分別叫它們 `Order` 和 `Orderitem`，`Order`裡存放每個使用者的訂單，每筆訂單都有一個訂單編號 (orderitemId)，而 `Orderitem` 裡存放每一筆訂單的訂單內容，在 `Order` 資料表裡的訂單編號 `orderitemId` 欄位會對應到 `Orderitem` 資料表裡的 id。假設現在要查詢 `user = 2` 這個人的所有訂單及其訂單內容，直覺可能會寫成先把 `Order` 裡 user 是 2 的訂單編號找出來、再用迴圈的方式去 `Orderitem` 裡找這些訂單編號的內容：

```javascript
Order.findAll({
  where: {
    user: 2
  }
}).then(orders => {
  orders.forEach(order => {
    Orderitem.findOne({
      where: {
        id: order.orderitemId
      }
    }).then(item => {
      console.log(item.items)
    })
  })
})
```

假設總共有 5 筆訂單好了，執行資料庫的 log 總共會出現 6 筆，第 1 筆是先找出所有訂單編號，第 2 ~ 6 筆才是去抓訂單內容：

```
1. SELECT `id`, `user`, `orderitemId`, `createdAt`, `updatedAt`, `OrderitemId` FROM `Orders` AS `Order` WHERE `Order`.`user` = 2;
2. SELECT `id`, `items`, `createdAt`, `updatedAt` FROM `Orderitems` AS `Orderitem` WHERE `Orderitem`.`id` = 3;
3. SELECT `id`, `items`, `createdAt`, `updatedAt` FROM `Orderitems` AS `Orderitem` WHERE `Orderitem`.`id` = 5;
c
4. SELECT `id`, `items`, `createdAt`, `updatedAt` FROM `Orderitems` AS `Orderitem` WHERE `Orderitem`.`id` = 6;
ee
5. SELECT `id`, `items`, `createdAt`, `updatedAt` FROM `Orderitems` AS `Orderitem` WHERE `Orderitem`.`id` = 7;
6. SELECT `id`, `items`, `createdAt`, `updatedAt` FROM `Orderitems` AS `Orderitem` WHERE `Orderitem`.`id` = 11;
```

因為舉的例子筆數很少，但在資料龐大的情形下，會變成每一筆都需要遍歷去做查詢，非常耗效能，回傳結果的速度也會很慢。但若使用 SQL query 的原生語法加入 JOIN 的條件查詢，只需要做 1 次 query，因此解決辦法就是要善用 Sequelize 的 `include`。在 Sequelize 中需要先對資料表間作關聯定義，並把 findAll 的條件新增 `include: Orderitem`，直接引入資料表，最後 ORM 實際只需要跟資料庫要一次資料就能完成需求。

```javascript
Order.findAll({
  include: Orderitem,
  where: {
    user: 2
  }
}).then((orders) => {
  orders.forEach(order => {       
    console.log(order.Orderitem.items)
  })
})
```
Query log 只會有一次而已：

```
SELECT `Order`.`id`, `Order`.`user`, `Order`.`orderitemId`, `Order`.`createdAt`, `Order`.`updatedAt`, `Order`.`OrderitemId`, `Orderitem`.`id` AS `Orderitem.id`, `Orderitem`.`items` AS `Orderitem.items`, `Orderitem`.`createdAt` AS `Orderitem.createdAt`, `Orderitem`.`updatedAt` AS `Orderitem.updatedAt` FROM `Orders` AS `Order` LEFT OUTER JOIN `Orderitems` AS `Orderitem` ON `Order`.`OrderitemId` = `Orderitem`.`id` WHERE `Order`.`user` = 2;
```