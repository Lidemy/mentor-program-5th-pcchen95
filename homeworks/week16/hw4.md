```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

1. `obj.inner.hello()` 
= `obj.inner.hello.call(obj.inner)`
=> this = obj.inner
=> this.value = obj.inner.value
=> `2`

2. `obj2.hello()`
= `obj2.hello.call(obj2)`
=> this = obj2
=> this.value = obj2.value = obj.inner.value 
=> `2`

3. `hello()`
= `hello.call(undefined)`
=> this = undefined
=> this.value = undefined.value 
=> `undefined`

### 輸出結果
```
2
2
undefined
```