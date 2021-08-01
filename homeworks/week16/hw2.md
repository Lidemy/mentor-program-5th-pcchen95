```javascript=
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

先把 for loop 拆解可以看成

```javascript=
var i
i = 0
{
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

i = 1

{
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

i = 2
  
{
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

i = 3

{
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

i = 4

{
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

i = 5
```

### 第 4 行：`console.log('i: ' + i)`

- Stack:
  
  找變數`i`，會發現目前`i` 為全域變數且值為 0。
  
  ```
  console.log('i: ' + 0) 
  main()
  ```
  
  
  執行完後拿掉
  
  &darr;
  
  
  ```
  main()
  ```
- WebAPIs
  
  ```
  ```
  
- Task queue
  ```
  ```
 
### 第 5 ~ 7 行：`setTimeout(() => { console.log(i) }, i * 1000)`

- Stack:
  
  找變數`i`，會發現目前`i` 為全域變數且值為 0。
  
  ```
  setTimeout(() => { console.log(i) }, 0)
  main()
  ```
  
  放到 WebAPIs 後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  timer, console.log(i)
  ```
  
  等待 `0` 秒後清空
  
  &darr;
  
  ```
  ```
  
- Task queue
  
  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  ```
### 第 13 行：`console.log('i: ' + i)`

- Stack:
  
  找變數`i`，會發現目前`i` 為全域變數且值為 1。
  
  ```
  console.log('i: ' + 1)
  main()
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue

  ```
  console.log(i)
  ```
 
### 第 14 ~ 16 行：`setTimeout(() => { console.log(i) }, i * 1000)`

- Stack:

  找變數`i`，會發現目前`i` 為全域變數且值為 1。
  
  ```
  setTimeout(() => { console.log(i) }, 1000)
  main()
  ```
  
  放到 WebAPIs 後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  timer, console.log(i)
  ```
  
  等待 `1` 秒後清空
  
  &darr;
  
  ```
  ```
  
- Task queue
  
  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  ```
 
### 第 22 行：`console.log('i: ' + i)`

- Stack:

  上一段落的 WebAPI 等待的同時，開始執行這一行。
  找變數`i`，會發現目前`i` 為全域變數且值為 2。
  
  ```
  console.log('i: ' + 2)
  main()
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  ```
  console.log(i)
  console.log(i)
  ```
 
### 第 23 ~ 25 行：`setTimeout(() => { console.log(i) }, i * 1000)`

- Stack:
  
  找變數`i`，會發現目前`i` 為全域變數且值為 2。
  
  ```
  setTimeout(() => { console.log(i) }, 2000)
  main()
  ```
  
  放到 WebAPIs 後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs

  ```
  timer, console.log(i)
  ```
  
  等待 `2` 秒後清空 
  
  &darr;
  ```
  ```
  
- Task queue
  
  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  ```
  
### 第 31 行：`console.log('i: ' + i)`


- Stack:
  
  上一段落的 WebAPI 等待的同時，開始執行這一行。
    找變數`i`，會發現目前`i` 為全域變數且值為 3。
  
  ```
  console.log('i: ' + 3)
  main()
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  ```
 
### 第 32 ~ 34 行：`setTimeout(() => { console.log(i) }, i * 1000)`

- Stack:
  
  找變數`i`，會發現目前`i` 為全域變數且值為 3。
  
  ```
  setTimeout(() => { console.log(i) }, 3000)
  main()
  ```
  
  放到 WebAPIs 後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  timer, console.log(i)
  ```
  
  等待 `3` 秒後清空
  
  &darr;
  
  ```
  ```
  
- Task queue
  
  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  ```

### 第 40 行：`console.log('i: ' + i)`

- Stack:

  上一段落的 WebAPI 等待的同時，開始執行這一行。
  找變數`i`，會發現目前`i` 為全域變數且值為 4。
  
  ```
  console.log('i: ' + 4)
  main()
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  ```
 
### 第 41 ~ 43 行：`setTimeout(() => { console.log(i) }, i * 1000)`

- Stack:
  
  找`i`，會找到目前`i` 為全域變數且值為 4。
  
  ```
  setTimeout(() => { console.log(i) }, 4000)
  main()
  ```
  
  放到 WebAPIs 後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- WebAPIs
  
  ```
  timer, console.log(i)
  ```
  
  等待 `4` 秒後清空
  
  &darr;
  
  ```
  ```
  
- Task queue

  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  ```

### 程式執行完畢

- Stack:

  Stack 為空
  
  
  ```
  ``` 
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  Event loop 偵測 Stack 已被清空，開始將 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  ```
  
### 把 Task queue 裡的指令陸續放到 Stack 中 (1)

- Stack:
  
  這個時候 `i = 5`
  
  ```
  console.log(5)
  ```
  
  執行結束清空
  
  &darr;
  
  ```
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  Event loop 偵測 Stack 已被清空，開始將 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  console.log(i)
  ```
  
### 把 Task queue 裡的指令陸續放到 Stack 中 (2)

- Stack:
  
  這個時候 `i = 5`
  
  ```
  console.log(5)
  ```
  
  執行結束清空
  
  &darr;
  
  ```
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  Event loop 偵測 Stack 已被清空，開始將 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  console.log(i)
  ```

### 把 Task queue 裡的指令陸續放到 Stack 中 (3)

- Stack:
  
  這個時候 `i = 5`
  
  ```
  console.log(5)
  ```
  
  執行結束清空
  
  &darr;
  
  ```
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  Event loop 偵測 Stack 已被清空，開始將 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  console.log(i)
  ```

### 把 Task queue 裡的指令陸續放到 Stack 中 (4)

- Stack:
  這個時候 `i = 5`
  
  ```
  console.log(5)
  ```
  
  執行結束清空
  
  &darr;
  
  ```
  ```
  
- WebAPIs
  `
  ``
  ```
  
- Task queue

  Event loop 偵測 Stack 已被清空，開始將 Task queue 裡的指令放過去。
  
  ```
  console.log(i)
  ```
  
### 把 Task queue 裡的指令陸續放到 Stack 中 (5)

- Stack:
  
  這個時候 `i = 5`
  
  ```
  console.log(5)
  ```
  
  執行結束清空
  
  &darr;
  
  ```
  ```
  
- WebAPIs
  
  ```
  ```
  
- Task queue
  
  ```
  ```
  
=> Done!

### 總結
輸出結果為
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
>每次印出的 5 之間都會有時間差 1 秒

