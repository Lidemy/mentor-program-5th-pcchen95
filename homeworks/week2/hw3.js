function reverse(str) {
 	var arr=[]
 	for(var i=str.length-1;i>=0;i--){
 		arr.push(str[i])
 	} 
 	console.log(arr.join(''))
}

reverse('hello');
