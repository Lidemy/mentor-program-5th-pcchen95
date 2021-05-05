## 請以自己的話解釋 API 是什麼

API 可以看成是一種傳送需求及回應結果的溝通媒介，在 request 和 response 之間穿梭傳遞訊息。例如：若在要訂房網站上查詢某家飯店是否有空房，選擇入住及退房日期、人數、地點等資訊送出後，訂房網站即會透過 API 將這個需求傳送給該飯店的網站，接著再一次由 API 回傳從飯店網站查詢的結果，如：是否有空房、價格等資訊，給使用者。若用餐廳來舉例的話， API 就是服務生的角色，負責將客人的點單內容（request）交給內場廚房，再將餐點（response）送到客人手上。

***
## 請找出三個課程沒教的 HTTP status code 並簡單介紹

**409 Conflict**  
新增的資料與 Server 現有版本有衝突，或多個更新間的編輯衝突，導致無法完成 request。

**413 Payload Too Large**  
提交需求的資料大小超出 Server 可以處理的大小限制，因此拒絕處理此需求。

**511 Network Authentication Required**  
需要通過身份驗證才能獲得網路權限，例如：wifi 熱點連線。

***

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


| 說明 | Method | path| 參數| 範例|
| ---------------- | ------ | ---------- | ------- | -----|  
| 回傳所有餐廳資料 | GET| /restaurants| _limit:限制回傳資料數量 | /restaurants?_limit=5 |  
| 回傳單一餐廳資料 | GET    | /restaurants /:id | NA| /restaurants /10      |  
  刪除餐廳| DELETE | /restaurants /:id | NA| NA |  
| 新增餐廳| POST   | /restaurants| name: 餐廳名| NA|  
| 更改餐廳| PATCH  | /restaurants /:id | name: 餐廳名 | NA |