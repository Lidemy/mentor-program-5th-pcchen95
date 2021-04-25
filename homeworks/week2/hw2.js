function capitalize(str) {
  	if(str[0]>='a' && str[1]<='z'){
  		var charcode=str[0].charCodeAt(0)
  		replace(str[0],String.fromCharCode(charcode-32))
  	}
  	return str
}

console.log(capitalize('!!Hello'));
