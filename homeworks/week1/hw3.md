## 教你朋友 CLI

### 問：Command Line 是什麼？
答：把它想像成是用文字指令來操作資料夾。我們一般使用電腦是直接以圖像化的方式，點選檔案、點選資料夾、新增檔案、回上一頁......，而 Command Line 只是換成用文字指令的方式來控制而已，作用都是一樣的！

***

### 問：怎麼使用 Command Line？
答：如果是使用 Macbook 如我，只要打開 terminal 就可以直接使用了，或者是下載 iTerm。

***

### 問：怎麼用 command line 建立一個叫做 wifi 的資料夾？
答：首先要先輸入 `pwd` 指令確定現在在電腦的哪個位置，跑出來的結果會像下面這樣，就可以知道我的位置目前是在 Desktop 桌面。  

```
peichuan:Desktop chinpeijuan$ pwd
/Users/chinpeijuan/Desktop
```

然後只要輸入 `mkdir 資料夾名稱` 就可以創建新資料夾。因此在這裡我們輸入 `mkdir wifi` ，就順利創建好名為 wifi 的資料夾。

```
peichuan:Desktop chinpeijuan$ mkdir wifi
```

***

### 問：如何在 wifi 資料夾裡建立一個叫 afu.js ？
答：上一步已經建立好資料夾了，因此要先用 `cd wfi` 把目前位置移動到 wifi 資料夾裡才可以開始創建檔案。移動完後可以再用一次 `pwd` 確認一下所在位置是不是已經確實移到 wifi 資料夾裡。

```
peichuan:Desktop chinpeijuan$ cd wifi
peichuan:wifi chinpeijuan$ pwd
/Users/chinpeijuan/Desktop/wifi
```

接下來用 `touch 檔名` 建立新檔案，也就是輸入 `touch afu.js`，查看一下資料夾就可以看到多了一個檔案了。**大功告成！**

```
peichuan:wifi chinpeijuan$ touch afu.js
```
