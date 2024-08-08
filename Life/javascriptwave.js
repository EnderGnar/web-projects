var c = document.getElementById("wavey");
var ctx = c.getContext("2d");
var cwidth=c.width;
var cheight=c.height;
var relX = 0;
var relY = 0;
var parentOffset = $('#wavey').offset();
var updatelist=[];
var go=false;
var intergo;	
var updateinter;
var savesss=1;
var seleoffsetx;
var seleoffsety;
var cto = document.getElementById("notwavey");
var ctxto = cto.getContext("2d");

/*$(document).mousedown(function(){go=true;});
$(document).mouseup(function(){go=false;});
$('#wavey').mousemove(trigger);*/

$('#wavey').click(triggertwo);
$('#wavey').mousemove(hover);
$('#wavey').hover(fin,fout);

var pprow=cwidth/10;
var mplir=0.1;
var psize=Math.floor(cwidth/pprow);
var ppcolumn=cheight/10;
var dots;
var alerady=false;
var names=['NORMAL','GLIDER','PULSATOR','CANNON','EXPLOSION','OCTAGON','INFINITY','HWSS','CANNONFLOWERS'];
var description=['Normal pen, eraser and selector!','Walks to the infinity and beyond!','More beautiful than your face','Pew pew motherfucker! DIE!','(NO CLICKBAIT)','Your still ugly','\"My Valentinsday\"','<b>H</b>eavy-<b>W</b>eight-<b>S</b>pace<b>s</b>hip','ValentinsdayPresent'];
var value=[];
if(true!=false){
	value[0]=[];
	value[0][0]=[0,0];//PENKIND,DOT,[x,y]
	value[1]=[[0,0],[-1,0],[-2,0],[0,-1],[-1,-2]];
	value[2]=[[0,0],[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],[0,-1],[-2,-1],[-3,-1],[-4,-1],[-5,-1],[-7,-1],[0,-2],[-1,-2],[-2,-2],[-3,-2],[-4,-2],[-5,-2],[-6,-2],[-7,-2]];
	value[3]=[[0,-5],[0,-6],[-1,-5],[-1,-6],[-11,-2],[-11,-3],[-11,-7],[-11,-8],[-13,-3],[-13,-7],[-14,-4],[-14,-5],[-14,-6],[-15,-4],[-15,-5],[-15,-6],[-18,-3],[-19,-2],[-19,-3],[-19,-4],[-20,-1],[-20,-5],[-21,-3],[-22,0],[-22,-6],[-23,0],[-23,-6],[-24,-1],[-24,-5],[-25,-2],[-25,-3],[-25,-4],[-34,-3],[-34,-4],[-35,-3],[-35,-4]];
	value[4]=[[0,0],[0,-1],[0,-2],[0,-4],[0,-5],[0,-6],[-1,0],[-1,-6],[-2,0],[-2,-1],[-2,-2],[-2,-4],[-2,-5],[-2,-6]];
	value[5]=[[0,-1],[0,-4],[-1,0],[-1,-2],[-1,-3],[-1,-5],[-2,-1],[-2,-4],[-3,-1],[-3,-4],[-4,0],[-4,-2],[-4,-3],[-4,-5],[-5,-1],[-5,-4]];
	value[6]=[[0,0],[0,-6],[-1,0],[-1,-1],[-1,-5],[-1,-6],[-2,0],[-2,-6]];
	value[7]=[[0,-2],[0,-3],[0,-4],[-1,-1],[-1,-4],[-2,-4],[-3,0],[-3,-4],[-4,0],[-4,-4],[-5,-4],[-6,-1],[-6,-3]];
	value[8]=[[0,-4],[0,-5],[0,-55],[0,-56],[-1,-4],[-1,-5],[-1,-55],[-1,-56],[-5,-5],[-5,-55],[-6,-4],[-6,-5],[-6,-6],[-6,-54],[-6,-55],[-6,-56],[-7,-3],[-7,-7],[-7,-53],[-7,-57],[-8,-2],[-8,-4],[-8,-5],[-8,-6],[-8,-8],[-8,-52],[-8,-54],[-8,-55],[-8,-56],[-8,-58],[-9,-3],[-9,-4],[-9,-5],[-9,-6],[-9,-7],[-9,-53],[-9,-54],[-9,-55],[-9,-56],[-9,-57],[-15,-2],[-15,-3],[-15,-6],[-15,-54],[-15,-57],[-15,-58],[-16,-4],[-16,-6],[-16,-54],[-16,-56],[-17,-6],[-17,-7],[-17,-53],[-17,-54],[-18,-7],[-18,-8],[-18,-52],[-18,-53],[-19,-5],[-19,-7],[-19,-8],[-19,-52],[-19,-53],[-19,-55],[-20,-5],[-20,-6],[-20,-7],[-20,-53],[-20,-54],[-20,-55],[-23,0],[-23,-1],[-23,-5],[-23,-6],[-23,-54],[-23,-55],[-23,-59],[-23,-60],[-24,-3],[-24,-57],[-25,0],[-25,-6],[-25,-54],[-25,-60],[-26,-1],[-26,-2],[-26,-4],[-26,-5],[-26,-12],[-26,-14],[-26,-46],[-26,-48],[-26,-55],[-26,-56],[-26,-58],[-26,-59],[-27,-2],[-27,-4],[-27,-13],[-27,-14],[-27,-46],[-27,-47],[-27,-56],[-27,-58],[-28,-3],[-28,-13],[-28,-47],[-28,-57],[-29,-3],[-29,-57],[-31,-20],[-31,-21],[-31,-39],[-31,-40],[-32,-19],[-32,-24],[-32,-36],[-32,-41],[-33,-20],[-33,-40],[-34,-2],[-34,-3],[-34,-20],[-34,-26],[-34,-34],[-34,-40],[-34,-57],[-34,-58],[-35,-2],[-35,-3],[-35,-21],[-35,-22],[-35,-27],[-35,-33],[-35,-38],[-35,-39],[-35,-57],[-35,-58],[-36,-20],[-36,-21],[-36,-23],[-36,-26],[-36,-34],[-36,-37],[-36,-39],[-36,-40],[-37,-25],[-37,-35],[-40,-25],[-40,-35],[-41,-20],[-41,-21],[-41,-23],[-41,-26],[-41,-34],[-41,-37],[-41,-39],[-41,-40],[-42,-2],[-42,-3],[-42,-21],[-42,-22],[-42,-27],[-42,-33],[-42,-38],[-42,-39],[-42,-57],[-42,-58],[-43,-2],[-43,-3],[-43,-20],[-43,-26],[-43,-34],[-43,-40],[-43,-57],[-43,-58],[-44,-20],[-44,-40],[-45,-19],[-45,-24],[-45,-36],[-45,-41],[-46,-20],[-46,-21],[-46,-39],[-46,-40],[-48,-3],[-48,-57],[-49,-3],[-49,-13],[-49,-47],[-49,-57],[-50,-2],[-50,-4],[-50,-13],[-50,-14],[-50,-46],[-50,-47],[-50,-56],[-50,-58],[-51,-1],[-51,-2],[-51,-4],[-51,-5],[-51,-12],[-51,-14],[-51,-46],[-51,-48],[-51,-55],[-51,-56],[-51,-58],[-51,-59],[-52,0],[-52,-6],[-52,-54],[-52,-60],[-53,-3],[-53,-57],[-54,0],[-54,-1],[-54,-5],[-54,-6],[-54,-54],[-54,-55],[-54,-59],[-54,-60],[-57,-5],[-57,-6],[-57,-7],[-57,-53],[-57,-54],[-57,-55],[-58,-5],[-58,-7],[-58,-8],[-58,-52],[-58,-53],[-58,-55],[-59,-7],[-59,-8],[-59,-52],[-59,-53],[-60,-6],[-60,-7],[-60,-53],[-60,-54],[-61,-4],[-61,-6],[-61,-54],[-61,-56],[-62,-2],[-62,-3],[-62,-6],[-62,-54],[-62,-57],[-62,-58],[-68,-3],[-68,-4],[-68,-5],[-68,-6],[-68,-7],[-68,-53],[-68,-54],[-68,-55],[-68,-56],[-68,-57],[-69,-2],[-69,-4],[-69,-5],[-69,-6],[-69,-8],[-69,-52],[-69,-54],[-69,-55],[-69,-56],[-69,-58],[-70,-3],[-70,-7],[-70,-53],[-70,-57],[-71,-4],[-71,-5],[-71,-6],[-71,-54],[-71,-55],[-71,-56],[-72,-5],[-72,-55],[-76,-4],[-76,-5],[-76,-55],[-76,-56],[-77,-4],[-77,-5],[-77,-55],[-77,-56]]
	}
var atnow=1;
var inside=false;
var updatelisthover=[];
var selectmode=false;
var spoints=[[],[]];
var saved=[];
var myson=false;
var lselected=[];

function selectit(){
	spoints=[[],[]];
	if(selectmode==false){
		saved=[];
		atnow=0;
		document.getElementById("lol").innerHTML = names[atnow];
		document.getElementById("textboxtext").innerHTML = description[atnow];
		drawlilcanvas();
		selectmode=true;
		document.getElementsByClassName("category")[1].style.backgroundColor='#41BE08';
		document.getElementsByClassName("category")[1].style.borderColor='#123800';
	}else{
		myson=false;
		selectmode=false;
		document.getElementsByClassName("category")[1].style.backgroundColor='#D9261A';
		document.getElementsByClassName("category")[1].style.borderColor='#891810';
	}
}

function selecting(){
	if(spoints[0][0]<spoints[1][0]){
		var sx=spoints[0][0];
		var mx=spoints[1][0];
	}else{
		var sx=spoints[1][0];
		var mx=spoints[0][0];
	}
	if(spoints[0][1]<spoints[1][1]){
		var sy=spoints[0][1];
		var my=spoints[1][1];
	}else{
		var sy=spoints[1][1];
		var my=spoints[0][1];
	}
	seleoffsetx=mx;
	seleoffsety=my;
	for(var i=mx; i>=sx; i-- ){
		for(var j= my; j>= sy; j--){
			if(dots[i][j].alive==true){
				saved[saved.length]=[i-mx,j-my];
			}
		}
	}
	
	mx=-pprow;
	my=-ppcolumn;
	
	for(var i=0; i<saved.length;i++){
		if(saved[i][0]>mx){
			mx=saved[i][0];
		}
		if(saved[i][1]>my){
			my=saved[i][1];
		}
	}
	
	for(var i=0; i<saved.length;i++){
		saved[i][0]-=mx;
		saved[i][1]-=my;
	}
	
	var justtry='';
	for(var k =0; k < saved.length; k++){
		justtry += '['+saved[k].toString()+']';
		if(k != saved.length-1){
			justtry+=',';
		}
	}
	if(justtry==''){
		console.log('No living celles selected');
	}else{
		console.log(justtry);
	}
}

function areaing(xi,yi){
	if(spoints[0][0]==undefined){
		myson=true;
		spoints[0][0]=xi;
		spoints[0][1]=yi;
	}else if(spoints[1][0]==undefined){
		myson=false;
		spoints[1][0]=xi;
		spoints[1][1]=yi;
		selecting();
	}else{
		myson=true;
		saved=[];
		spoints=[[],[]];
		spoints[0][0]=xi;
		spoints[0][1]=yi;
	}
}



function fin(){
	inside=true;
}
function fout(){
	inside=false;
}

function setup(){
	alerady=false;
	document.getElementById("speed").checked = true;
	clearInterval(updateinter);
	clearInterval(intergo);
	dots=[];
	for(var row=0;row<pprow;row++){
		dots[row]=[];
		for(var column=0;column<ppcolumn;column++){
			dots[row][column]=new Pixel(row,column);
		}
	}

	loadpixel();
	updatelist=[];
		updateinter = window.setInterval(updating,10);
}
window.onload=setup; 	
function getn(xi,yi){
	output=[];

		output[output.length]=[(xi+pprow-1)%pprow,(yi+ppcolumn-1)%ppcolumn];

		output[output.length]=[(xi+pprow-1)%pprow,(yi+ppcolumn)%ppcolumn];

		output[output.length]=[(xi+pprow-1)%pprow,(yi+ppcolumn+1)%ppcolumn];
		
		output[output.length]=[(xi+pprow)%pprow,(yi+ppcolumn-1)%ppcolumn];
		
		output[output.length]=[(xi+pprow)%pprow,(yi+ppcolumn+1)%ppcolumn];

		output[output.length]=[(xi+pprow+1)%pprow,(yi+ppcolumn-1)%ppcolumn];

		output[output.length]=[(xi+pprow+1)%pprow,(yi+ppcolumn)%ppcolumn];
		
		output[output.length]=[(xi+pprow+1)%pprow,(yi+ppcolumn+1)%ppcolumn];
	
	return output;
}

function Pixel(xi,yi){
	this.x=xi;
	this.y=yi;
	this.alive=false;
	this.power=0;
	this.lastalive=this.alive;
	this.nmbrs=getn(this.x,this.y);
	this.hovermode=false;
	
	this.overlive=function(){
		this.lastalive=this.alive;
		
	}
	this.overcheck=function(){
	     var surrounded=0;
	    for(var intt=0;intt<8;intt++){
		if(dots[this.nmbrs[intt][0]][this.nmbrs[intt][1]].lastalive==true){
	            surrounded++
	        }
		}
	    
	    if(this.alive===true){
			    if(surrounded<2||surrounded>3){
					this.alive=false;
					this.power=0;
				}else{
					this.alive=true;
					this.power=1;
				}
			}else{
				if(surrounded===3){
					this.alive=true;
					this.power=1;
				}else{
					this.alive=false;
					this.power=0;	
			    }
				
		   }
	}
	this.draw=function(){
		ctx.beginPath();
		ctx.rect(this.x*psize,this.y*psize,psize,psize);
		ctx.fillStyle="rgb("+(100+Math.floor(this.power*155))+","+Math.floor(this.power*255)+","+Math.floor(100+this.power*155)+")";
		ctx.fill();	
		ctx.stroke();
	}
	this.touched=function(){
		if(this.power!=1){
		this.power=1;
		this.alive=true;
		updatelist[updatelist.length]=[this.x,this.y];
		}else{
		this.power=0;
		this.alive=false;
		updatelist[updatelist.length]=[this.x,this.y];	
		}
	}
	this.touchedd=function(){
		this.power=1;
		this.alive=true;
		updatelist[updatelist.length]=[this.x,this.y];
	}
	
	this.hovered=function(){
		if(this.alive==false){
		this.power=0.5;
		updatelisthover[updatelisthover.length]=[this.x,this.y];		
		this.draw();
		}

	}
	
	this.rhover=function (){
		if(this.alive==false){
			this.power=0;
			this.draw();
		}
	}
	this.colored=function(){
		ctx.beginPath();
		ctx.rect(this.x*psize,this.y*psize,psize,psize);
		ctx.fillStyle="rgb("+(Math.floor(172-this.power*90))+","+Math.floor(83-this.power*41)+","+Math.floor(119-this.power*60)+")";
		//#CA5377
		//172 || 83 || 119
		//158 || 00 || 102
		ctx.fill();	
		ctx.stroke();
	}
	
	
}

function drawing(xi,yi){
	var arr=value[atnow]
	if(atnow==0){
		dots[arr[0][0]+xi][arr[0][1]+yi].touched();
	}else{
		for(i=0;i<arr.length;i++){
			dots[(arr[i][0]+xi+pprow)%pprow][(arr[i][1]+yi+ppcolumn)%ppcolumn].touchedd();
		}
	}
}


function loadpixel(){
	for(var row=0;row<pprow;row++){
		for(var column=0;column<ppcolumn;column++){
			dots[row][column].draw();
		}
	}
}



function mapping(a,b,c,d,e){
	if(c!=b){
		return(a-b)/(c-b)*(e-d)+d
	}
	if((c-b)==e-d){
		return a-b+d;
	}
	else{
		return Infinity;
	}
}

function coloring(xi,yi){
	if(spoints[0][0]<xi){
		var sx=spoints[0][0];
		var mx=xi;
	}else{
		var sx=xi;
		var mx=spoints[0][0];
	}
	if(spoints[0][1]<yi){
		var sy=spoints[0][1];
		var my=yi;
	}else{
		var sy=yi;
		var my=spoints[0][1];
	}
	
	for(var i = sy; i<=my;i++){
		for(var k = sx; k<=mx;k++){
			dots[k][i].colored();
			lselected[lselected.length]=[k,i]
		}
		
	}
}

function updating(){
		for(var e=0;e<lselected.length;e++){
		dots[lselected[e][0]][lselected[e][1]].draw();
	}
	lselected=[]
	for(var e=0;e<updatelist.length;e++){
		dots[updatelist[e][0]][updatelist[e][1]].draw();
	}
	for(var e=0;e<updatelisthover.length;e++){
			dots[updatelisthover[e][0]][updatelisthover[e][1]].rhover();
	}
	
	if(inside==true){

	var xo=Math.floor(mapping(relX,0,cwidth,0,pprow));
	var yo=Math.floor(mapping(relY,0,cheight,0,ppcolumn));
	if(xo<0){
		xo=0;
	}
	if(yo<0){
		yo=0;
	}
	preview(xo,yo);
	}
	if(myson==true){
		coloring(xo,yo);
	}

}


function preview(xi,yi){
	var arr=value[atnow]
	for(i=0;i<arr.length;i++){
		dots[(arr[i][0]+xi+pprow)%pprow][(arr[i][1]+yi+ppcolumn)%ppcolumn].hovered();
		
	}
	
}

function hover(e){
	relX = e.pageX - parentOffset.left;
	relY = e.pageY - parentOffset.top;
	var xo=Math.floor(mapping(relX,0,cwidth,0,pprow));
	var yo=Math.floor(mapping(relY,0,cheight,0,ppcolumn));
	if(xo<0){
		xo=0;
	}
	if(yo<0){
		yo=0;
	}
	//preview(xo,yo);
	
}



function trigger(e){
	if(go==true){
	relX = e.pageX - parentOffset.left;
	relY = e.pageY - parentOffset.top;
	var xo=Math.floor(mapping(relX,0,cwidth,0,pprow));
	var yo=Math.floor(mapping(relY,0,cheight,0,ppcolumn));
	drawing(xo,yo);
	}
}
function triggertwo(e){
	relX = e.pageX - parentOffset.left;
	relY = e.pageY - parentOffset.top;
	var xo=Math.floor(mapping(relX,0,cwidth,0,pprow));
	var yo=Math.floor(mapping(relY,0,cheight,0,ppcolumn));
	if(selectmode != true){
		drawing(xo,yo);
	}else if(true!=false){
		areaing(xo,yo);
	}
	
}
function doornot(){
	if(alerady==true){
		clearInterval(intergo);
		alerady=false;
	}
	
}

function lifego(){
	if(alerady==false){
		
		
		if(document.getElementById("speed").checked == true){
			alerady=true;
			intergo= window.setInterval(bevoreliffe,100);
		}else{
		update();
		liffe();
		}
	}
}
function bevoreliffe(){
	update();
	liffe();
}
function liffe(){
    for(i=0;i<dots.length;i++){
		for(j=0;j<dots[i].length;j++){
			dots[i][j].overcheck();
			dots[i][j].draw();
		}
	}
}
function update(){
	for(i=0;i<dots.length;i++){
		for(j=0;j<dots[i].length;j++){
			dots[i][j].overlive();
		}
	}
}

function drawlilcanvas(){
	ctxto.beginPath();
	ctxto.clearRect(0, 0, 100, 100);
	ctxto.stroke();
	var xoffset=0;
	var yoffset=0;
	var xsave=0;
	var ysave=0;
	var pixel;
	var arrrz=value[atnow];
	for(var i =0;i<arrrz.length;i++){		
		if(arrrz[i][0]<xsave){
			xsave=arrrz[i][0];
		}
		if(arrrz[i][1]<ysave){
			ysave=arrrz[i][1];
		}
		
	}
	if(ysave<xsave){
		pixel=Math.abs(ysave)+3;
		xoffset=(xsave-ysave)/2;
	}else{
		pixel=Math.abs(xsave)+3;
		yoffset=(ysave-xsave)/2;
	}
	var plilsize = Math.floor(cto.width/pixel);
	var abcde = Math.floor((cto.width - plilsize * pixel)/2);
	for(var j = 0; j<arrrz.length; j++){
		ctxto.beginPath();
		ctxto.rect((-xoffset+pixel-2+arrrz[j][0])*plilsize+abcde,(-yoffset+arrrz[j][1]+pixel-2)*plilsize+abcde,plilsize,plilsize);
		ctxto.fill();	
	}
}

function upscrole(){
	atnow-=1;
	if(atnow==-1){
		atnow=names.length-1;
	}
	document.getElementById("lol").innerHTML = names[atnow];
	document.getElementById("textboxtext").innerHTML = description[atnow];
	drawlilcanvas();
}
function downscrole(){		
	atnow+=1;
	if(atnow==names.length){
		atnow=0;
	}
	document.getElementById("lol").innerHTML = names[atnow];
	document.getElementById("textboxtext").innerHTML = description[atnow];
	drawlilcanvas();
}

upscrole();

function turnit(){
	var arr=value[atnow];
	var savex;
	var mx=0;
	var my=0;
	for( var i = 0; i < arr.length;i++){
		savex = arr[i][0];
		
		arr[i][0]=arr[i][1];
		arr[i][1]=savex*-1;
		
		if(arr[i][0]>mx){
			mx=arr[i][0];	
		}
		if(arr[i][1]>my){
			my=arr[i][1];	
		}
	}
	for(var i=0; i<arr.length;i++){
		arr[i][0]-=mx;
		arr[i][1]-=my;
	}
	
	drawlilcanvas();
}

function copyit(){
	glaststep();
	names.push('SAVE '+savesss);
	description.push('usersafe');
	value.push(saved);
	savesss++;
}
function glaststep(){
	var xof=seleoffsetx;
	var yof=seleoffsety;
	nsave=saved;
	poscene=[];
	for(var i=0; i<saved.length;i++){
		poscene.push([(saved[i][0]+xof),(saved[i][1]+yof)]);
		//poscene=poscene.concat(dots[saved[i][0]+xof][saved[i][1]+yof].nmbrs);
	}
	for(var e=0;e<poscene.length;e++){
		var goal=poscene[e];
		var f=e+1;
		while(f<poscene.length){
			if(goal.toString()===poscene[f].toString()){
				poscene.splice(f,1);
			}else{
				f++;
			}
		}
		goal[0]-=xof;
		goal[1]-=yof;
	}
	console.log('done');
}
/*we know we're nerds*/





var downc = document.getElementById("downloadc");
var downctx = downc.getContext("2d");
var dvalue=[];
var dname=[];
var ddes=[];
var dp=0;
var dwidth=downc.width;
var ppd=Math.floor(dwidth/5);
function downloadfile(inn){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onload=function(){
		return this.responseText;
		
	}
	xmlhttp.open("GET","download.php??nmbr="+inn,true);
	xmlhttp.send();
}
function redrawdownload() {
	downctx.clearRect(0, 0, dwidth, ppd);
	for(var ii=0;ii<5;ii++){
		inss=(ii+sonserver+dp)%sonserver
		if(dvalue[inss]==undefined){
			var got = downloadfile(inss);
			var namel = got.search("%");
			var desl = got.search("&");
			
			var nameres = got.substr(0,namel);
			var desres = got.substr(namel+1,desl-namel-1);
			var pointres = got.substr(desl+1,got.length);
			
			pointres = pointres.substr(1, pointres.length-2);
			var res = pointres.split("],[");
			var arrlol=[];
			for(i=0;i<res.length;i++){
				arrlol[i]=res[i].split(',');
			}
			
			for(j=0;j<arrlol.length;j++){
				arrlol[j][0]=parseInt(arrlol[j][0]);
				arrlol[j][1]=parseInt(arrlol[j][1]);
			}
			dvalue[inss]=arrlol;
			dname[inss]=nameres;
			ddes[inss]=desres;
		}
		downctx.beginPath();

		downctx.stroke();
		var xoffset=0;
		var yoffset=0;
		var xsave=0;
		var ysave=0;
		var pixel;
		var arrrz=dvalue[inss];
		for(var i =0;i<arrrz.length;i++){		
			if(arrrz[i][0]<xsave){
				xsave=arrrz[i][0];
			}
			if(arrrz[i][1]<ysave){
				ysave=arrrz[i][1];
			}
		
		}
		if(ysave<xsave){
			pixel=Math.abs(ysave)+3;
			xoffset=(xsave-ysave)/2;
		}else{
			pixel=Math.abs(xsave)+3;
			yoffset=(ysave-xsave)/2;
		}
		var plilsize = Math.floor(ppd/pixel);
		var abcde = Math.floor((ppd - plilsize * pixel)/2);
		for(var j = 0; j<arrrz.length; j++){
			ctxto.beginPath();
			ctxto.rect(ii*ppd+(-xoffset+pixel-2+arrrz[j][0])*plilsize+abcde,(-yoffset+arrrz[j][1]+pixel-2)*plilsize+abcde,plilsize,plilsize);
			ctxto.fill();	
		}
	}
}
function nrechtsgo(){
	dp=(dp+1+sonserver)%sonserver;
	redrawdownload();
}
function nlinksgo(){
	dp=(dp-1+sonserver)%sonserver;
	redrawdownload();
}
