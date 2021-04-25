function join(arr, concatStr) {
	var result=''
	for(var i=0;i<arr.length-1;i++){
		result+=arr[i]+concatStr
	}
	result+=arr[arr.length-1]
	return result
}

function repeat(str, times) {
	var result=''
	for(var i=0;i<times;i++){
		result+=str
	}
	return result
}

console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(repeat('a', 5));
