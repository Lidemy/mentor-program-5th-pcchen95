function search(arr,n){
	var start=0
	var end =arr.length-1 

	while(end-start>1){
		var index=Math.floor((start+end)/2) 
		var target=arr[index] 
		
		if(target===n){
			return index 
		}
	
		if(target>n){
			end = index-1
		}else{
			start=index+1
		}
		
	}

	if(n===arr[end]){
		return end
	}else if(n===arr[start]){
		return start
	}else{
		return -1
	}
	
}

console.log(search([1, 3, 10, 14, 39], 299))
