```javascript=
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 1. `console.log(1)`
- Stack:

  先執行入口函數 `main()`，再把第一行程式碼放入 stack
  
  ```
  console.log(1)
  main()
  ```
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- Callback queue
  
  ```
  ```

### 2. `setTimeout(() => { console.log(2) }, 0)`
- Stack:
  
  
  ```
  setTimeout(() => { console.log(2) }, 0)
  main()
  ```
  setTimeout 是一種 WebAPI，同時是非同步函式。交給瀏覽器等待 0 秒後把 callback function 放到 callback queue 裡等候。
  
  &darr;
  
  ```
  main()
  ```
  
- Callback queue
  
  把 setTimeout 裡的 callback function 放進來。Event loop 偵測 Stack 中還有東西，還不能把 callback queue 裡的 function 放過去。
  
  ```
  () => { console.log(2) }
  ```

### 3. `console.log(3)`
- Stack:
  
  ```
  console.log(3)
  main()
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
- Callback queue
  
  Event loop 偵測 Stack 中還有東西，還不能把 callback queue 裡的 function 放過去。
  
  ```
  () => { console.log(2) }
  ```
 
### 4. `setTimeout(() => {  console.log(4) }, 0)`

- Stack:
  
  ```
  setTimeout(() => { console.log(4) }, 0)
  main()
  ```
  
  setTImeout 是一種 WebAPI，同時是非同步函式。交給瀏覽器等待 0 秒後把 callback function 放到 callback queue 裡等候。

  
  &darr;
  
  ```
  main()
  ```
    
- Callback queue
  
  把 setTimeout 裡的 callback function 放進來，並在後面排隊。Event loop 偵測 Stack 中還有東西，還不能把 callback queue 裡的 function 放過去。
  
  ```
  () => { console.log(2) }
  () => { console.log(4) }
  ```
 
### 5. `console.log(5)`

- Stack:
  
  
  ```
  console.log(5)
  main() 
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  main()
  ```
  
  全部程式碼都處理完了，`main()` 也可以清空。
  
  &darr;
  
  ```
  ```
  
- Task queue
  
  等到 Stack 全部清空，Event loop 偵測 stack 裡沒有東西了，呼喚 callback queue 陸續把 callback function 放過去
  
  ```
  () => { console.log(2) }
  () => { console.log(4) }
  ```

### 6. 把 Callback queue 裡的 function 陸續放到 Stack 中 (1)
- Stack:
  
  把在 queue 最前面的 function 放到 stack 裡
  
  ```
  () => { console.log(2) }
  ```
  
  &darr;
  
  function 內有指令需要處理，放到 stack 最上面
  
  ```
  console.log(2)
  () => { }
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  () => { }
  ```
  function 內沒有東西要執行了，再把 function 拿掉
  
  &darr;
  
  ```
  ```
  
- Callback queue
  
  等到 Stack 全部清空，Event loop 偵測 stack 裡沒有東西了，呼喚 callback queue 陸續把 callback function 放過去
  
  ```
  () => { console.log(4) }
  ```
  
### 7. 把 Callback queue 裡的指令陸續放到 Stack 中 (2)
- Stack:
  
  把在 queue 最前面的 function 放到 stack 裡
  
  ```
  () => { console.log(4) }
  ```
  
  &darr;
  
  function 內有指令需要處理，放到 stack 最上面
  
  ```
  console.log(4)
  () => { }
  ```
  
  執行完後拿掉
  
  &darr;
  
  ```
  () => { }
  ```
  function 內沒有東西要執行了，再把 function 拿掉
  
  &darr;
  
  ```
  ```
    
- Callback queue

  ```
  ```
  => Done!

### 輸出結果
```
1
3
5
2
4
```