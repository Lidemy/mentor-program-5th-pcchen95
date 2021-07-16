##虛擬主機＆網域部署心得
以前真的以為買主機是要買一台實體的電腦主機回來放著XD 主機我是選 AWS，只是因為老師說前幾期學生比較多人使用，加上 google 一下 AWS 的分享比較多，所以就選擇它了。

參考了幾篇學長姐分享的部署紀錄，以及 google 到的資料，其實從主機部署、到下載 LAMP 和 phpmyadmin 基本上沒遇到太大的困難，後來是在設定 FileZiila 連線時才卡關比較久。第一，剛開始沒有選用 SSH 傳輸，再來是不知道使用者名稱預設是 ubuntu，還以為和 phpmyadmin 一樣是 root，試了一陣子再爬文後才發現。

購買網域的部分，還先去爬文看一下[網域怎麼取名](https://www.wfublog.com/2014/04/how-to-choose-a-domain-name-sop.html)XD 但因為現在只有個人使用，所以還是先拿自己名字去當網域名稱。購買後的設定也不難，因此很快地就完成。

傳輸資料感謝有 FileZilla 的存在，如果全部都用 CLI 操作感覺要弄很久。剛開始把檔案放過去結果 API 串的資料跑不出來，發現是程式碼裡的 API URL 也需要更改，因為現在已經把資料放到虛擬主機裡的資料庫裡了。

以下是部署的 PHP 檔案：  
[留言板](http://pcchen.tw/mentor-program-file/board)  
[留言板 (API)](http://pcchen.tw/mentor-program-file/board-api)  
[部落格](http://pcchen.tw/mentor-program-file/blog)  
[Todo List](http://pcchen.tw/mentor-program-file/todo-api)
