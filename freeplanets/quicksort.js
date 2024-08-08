var quicksortsteps=4;
function quicksort(arr){//{op:"NICOLAS",sv:1
	var groups=[];
	var sumgroups=Math.pow(2,quicksortsteps);
	for(l=0;l<sumgroups;l++){
		groups[l]=[];
	}
	var offset=0;
	var savegroup;
	groups[0]=arr.slice(0);
	for(j=0;j<quicksortsteps;j++){
		var times=Math.pow(2,j);
		var distance=Math.pow(2,quicksortsteps-(j+1));
		offset=0;
		for(k=0;k<times;k++){
			offset=distance*2*k;
			if(groups[offset].length!==0){
				savegroup=groups[offset].slice(0);
				var sel=savegroup[Math.floor(savegroup.length/2)].sv;
				groups[offset]=[];
				for(var i=0;i<savegroup.length;i++){
					if(savegroup[i].sv>sel){
						groups[offset].push(savegroup[i]);
					}else{
						groups[offset+distance].push(savegroup[i]);
					}
				}
			}
		}
		
	}
	var array=[];
	for(t=0;t<groups.length;t++){	
	var sleng=groups[t].length;
		for(v=0;v<sleng;v++){
			var saves=0;
			for(u=1;u<groups[t].length;u++){
				if(groups[t][saves].sv<groups[t][u].sv){
					saves=u;
				}
			}
			array.push(groups[t][saves].op);
			groups[t]=groups[t].slice(0,saves).concat(groups[t].slice(saves+1));
		}
	}
	return array;
}

