## 交作業流程

1. 連線至 GitHub 作業區： `git clone https://github.com/Lidemy/mentor-program-5th-pcchen95`
2.  建立新 branch，設定 branch 名稱為 week1： ` git branch week1`
3. 切換至剛開好的新 branch： ` git checkout week1`   
**（此時 week1 這個 branch 僅新建在自己的電腦上而已，還沒有同步至 GitHub）**
4.  開始編輯檔案寫作業啦～
5. 寫完作業後將修改完成的檔案 commit： `git commit -am "hw1 done"`
6. 將在自己電腦上的 week1 branch push 到 GitHub上，才是將 local 和 remote 同步： `git push origin week1`
7. 此時 GitHub 上會出現 week1  這個 branch，並點選 pull request 到 "master" branch。
8. 打完 commit messege 後點選 Create pull request。
9. 到學習系統點選繳交作業，貼上 pull request 後的網址繳交。