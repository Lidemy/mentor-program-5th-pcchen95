## 跟你朋友介紹 Git

### Git是什麼？

Git 是一項用來做「版本控制」的程式，就像平常在公司做報告，總是會一改再改，檔名通常都會用 V1、V2、V3 ，或後面加上日期來區別各版本，但通常單從檔名看不出各版本間的差異。

Git 的概念類似創立資料夾 （這裡注意，是「概念」類似，而不是實際就是這樣做），當產生一個新版本後即新建一個資料夾並將檔案 copy 一份過去，而此時在新資料夾編輯的檔案，就可以視為版本 2 ，以此類推。Git 每開一個新的資料夾，會用一串亂碼代號命名該資料夾，因此不會有版本名稱重複的問題。但用亂碼的缺點是無法看出版本的時間順序，所以會有個類似檔案紀錄來保存目前最新的版本是哪一個亂碼號，就能區別新舊版本順序。

***

### Git 基礎使用
安裝完 Git 後就可以開始在 terminal 下指令。  

**Step 1.** 初始化 Git： `` git init``  

**Step 2.**  將你的笑話加入版本控制（假設檔名叫 joke）： `` git add joke``  

**Step 3.** 確認目前版本控制的狀況： `` git status``，這時候會出現像這樣的訊息：

```
On branch master
Changes to be committed: 
  (use "git restore --staged <file>..." to unstage)  
	new file:   joke
```
出現在 Changes to be committed 底下就代表檔案成功加入版本控制清單裡。  

**Step 4.** 加入版本控制後，用``git commit -m "版本敘述"``開始幫你的笑話新建一個新版本，並加入和此版本相關的描述： ``git commit -m "new joke"``  。之後會跑出像這樣的訊息：

```
[master 1522dac] new joke
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 joke  
```
 這個動作就像上面提到的開資料夾概念一樣，新建一個資料夾，並把 joke 這個檔案放到這個資料夾裡了。  而這個動作比一般用檔案命名區分版本來得方便的地方，可以輸入敘述來說明版本間的差異。
 
**Step 5.** 查看版本紀錄：`` git log``，會出現像以下的畫面：

```
commit 1522dac064bb745e1fd83b2d19646246e5b8c53a (HEAD -> master)
Author: your name <you@example.com>
Date:   Fri Apr 16 22:55:17 2021 +0800

    new joke
```

"1522dac..." 這串亂碼就是這個版本（或想成資料夾）的名稱，這時候就是成功新創立好一個版本。

**Step 6.** 若還要有下一個版本，就重複 Step 2.～Step 5.，會得到如下的畫面：

```
commit bf806de180097359d7d473838f4f97d6cc66ad1d (HEAD -> master)
Author: your name <you@example.com>
Date:   Fri Apr 16 23:06:47 2021 +0800

    second version

commit 1522dac064bb745e1fd83b2d19646246e5b8c53a
Author: your name <you@example.com>
Date:   Fri Apr 16 22:55:17 2021 +0800

    new joke
```

如此一來即成功建立第二個版本的笑話，且此時新的版本（資料夾）名稱為 bf806...。往後想要幾個版本就有幾個，Git 都幫你做好各版本間的控制了。  

**Step 7.** 如果哪一天突然覺得以前版本的笑話比較好笑，可以用``git chekout 版本號“`` 回到你想要的那個版本，這裡的版本號就是代表該版本的那一串亂碼。若想再返回最新的版本（放心，新版本並沒有不見），只要用``git checkout master`` 就能再次回到最新版本了。  

到這裡，就是用 Git 做版本控制的的基本操作了～