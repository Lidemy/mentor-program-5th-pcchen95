```javascript=
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

### 模擬 JS 引擎行為如下：

初始化 global EC

- 第 1 行 `var a`：變數宣告
- 第 2 行 `function fc()`：函式宣告

```
globalEC {
  VO: {
    a: undefined,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

&darr;

- 第 1 行 `a = 1`：賦值

```
globalEC {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

&darr;

初始化 `fnEC`

- 第 3 行 `console.log(a)`：在 fn scope 裡沒有變數 a，產生 hoisting 現象，將 a 的變前宣告提高在程式碼前面
  
  ```javascript
  function fn(){
    var a
    console.log(a)
  .
  .
  .
  ```

```
fnEC {
  AO: {
    a: undefined,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
             =[fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [globalEC.VO]

globalEC {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```
- 第 3 行：`console.log(a)` => a 尚未被賦值

  => <font color= blue>a = undefined</font>

&darr;

第 4 行：

1. 變數宣告 `var a`：在 `fnEC.VO` 有找到 `a` => 不再重新定義
3. 賦值`a = 5`：將`fnEC.VO`內的 `a` 賦值為 5。

```
fnEC {
  AO: {
    a: 5,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
             =[fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [globalEC.VO]

globalEC {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```
- 第 5 行：`console.log(a)`=> 找到`fnEC.VO`內的 `a` 

  => <font color= blue>a = 5</font>

&darr;

- 第 6 行：`a++`：在 `fnEC.VO` 找到 `a` 並重新賦值為 6。

```
fnEC {
  AO: {
    a: 6,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
             =[fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [globalEC.VO]

globalEC {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

- 第 7 行 `var a` ：在 `fnEC.VO` 已被宣告過，不再重新宣告。

- 第 8 行：`fn2()`：`fn2` 是一個 function，往後找到 `fn2` 這個函式內容並做 hoisting。

  ```javascript=
  ...
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
  fn2()
  console.log(a)
  ...
  ```

&darr;

初始化 fn2EC

```
fn2EC {
  AO: {

  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]]
            = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC {
  AO: {
    a: 6,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
            = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [fnEC.AO, globalEC.VO]

globalEC {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

- 第 11 行 `console.log(a)`：`fn2EC.AO` 裡沒有宣告變數 a，根據 `fn2EC.scopeChain` 先往 `fnEC.AO` 找 => 有找到 `a` 

  => <font color= blue>a = 6</font> 

&darr;

- 第 12 行：`a = 20`：一樣根據 `fn2EC.scopeChain` 找 a，在`fnEC.AO` 找到 => 重新賦值為 20。
- 第 13 行：`b = 100`：一樣根據 `fn2EC.scopeChain`找 b，最後都沒有找到 => 在 `globalEC.VO` 新增變數 b 並賦值為 100。

```
fn2EC {
  AO: {

  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]]
            = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
            = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [fnEC.AO, globalEC.VO]

globalEC {
  VO: {
    a: 1,
    b: 100,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

`fn2` 結束，清空 `fn2EC`

&darr;

```
fnEC {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
            = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
              = [fnEC.AO, globalEC.VO]

globalEC {
  VO: {
    a: 1,
    b: 100,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

- 第 9 行 `console.log(a)`：在 `fnEC.AO` 裡找到 a

  => <font color= blue>a = 20 </font>

`fn` 結束，清空 `fnEC`

&darr;

```
globalEC {
  VO: {
    a: 1,
    b: 100,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
```

- 第 17 行 `console.log(a)`：在本身存在的`globalEC.VO`內找到 `a` 

  => <font color= blue>a = 1 </font>

&darr;

- 第 18 行 `a = 10`：在本身存在的`globalEC.VO`內找到 `a` => 賦值為 10。

```
globalEC {
  VO: {
    a: 10,
    b: 100,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
             = [globalEC.VO]
``` 

- 第 19 行 `console.log(a)`：在本身存在的`globalEC.VO`內找到 `a` 

  => <font color= blue>a = 10 </font>

- 第 20 行 `console.log(b)`：在本身存在的`globalEC.VO`內找到 `b` 

  => <font color= blue>b = 100 </font>

### 輸出結果

```
undefined
5
6
20
1
10
100
```