function multiply(a, b) {
	var arr=[]
	var digitA=a.length
	var digitB=b.length
	var digitTotal=digitA+digitB

	//共會產生b的位數行相乘的結果，最後總位數最多是(a的位數+b的位數)，先全部補0
	for(var i=0;i<digitB;i++){
		arr[i]=[]
		for(var j=0;j<digitTotal;j++){
			arr[i].push(0)
		}
	}

	//分別拿b的每一個位數去和a的每一個位數相乘
	var m=0
	for(var i=digitB-1;i>=0;i--){  
		var k=0
		while(k<digitA){   //相乘的次數由a的位數決定
			arr[i][digitTotal-k-m-1]=a[digitA-k-1]*b[i]
			k++
		}
		m++
	}

	//共b的位數個陣列裡，每個相同位置的元素相加，進位的位數加到下一個位置的元素加總中
	var result=[]
	var carry=0
	for(var j=digitTotal-1;j>=1;j--){
		var addsum=0
		for(var i=0;i<digitB;i++){
			addsum+=arr[i][j]
		}
		result[j]=(addsum+carry)%10
		carry=Math.floor((addsum+carry)/10)
	}
	
	//第1位數如果沒有進位，拿掉0，若有進位，則第1位數就是最後進位的數字
	if(carry===0){
		result.splice(0,1)
	}else{
		result[0]=carry
	}
	return result.join('')
}

console.log(multiply('124902814902890825902840917490127902791247902479027210970941724092174091274902749012740921759037590347438758957283947234273942304239403274093275902375902374092410937290371093719023729103790123',
	'1239128192048129048129021830918209318239018239018239018249082490182490182903182390128390128903182309812093812093820938190380192381029380192381092380192380123802913810381203'))


