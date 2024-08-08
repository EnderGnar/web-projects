var c = document.getElementById("freeDcanvas");
var ctx = c.getContext("2d");
c.width = $(document).width();
c.height = $(document).height();
var cwidth=c.width;
var cheight=c.height;
$('#freeDcanvas').css({
	'margin-top':'-10',
	'margin-left':'-10'
});
var cwidth=c.width;
var cheight=c.height;


var zerox=0.5*cwidth;
var zeroy=0.5*cheight;
var freeDcam;
var movespeed=10;
var dw=1;
var relX=0;
var relY=0;
var viewsize=0.2;
var tspeed=2;
var lasty=0;
var lastx=0;
var sensitivity=0.2;
var first=true;
var multiplier=10;
var dividier=multiplier*multiplier;
var minex=4;
var minexs=Math.pow(10,minex);
var maxsqr=minexs*dividier;
var sqroots=[];
var keys=[false,false,false,false,false,false];//A/D/W/S/SPACE/SHIFT
for(var st=0;st<=maxsqr;st++){
	sqroots[st]=Math.sqrt(st);
}

var world;
freeDcam=new freeDCamera(0,0,0);
world=new World();
addDot(0,0,0,'hidden');
var aop=1000;
var renderdistance=10000;

function squarerooot(inp){
	var aaa=0;
	var aab=inp;
	while(aab>maxsqr){
		aab/=dividier
		aaa++;
	}
	aab=sqroots[Math.floor(aab)];
	for(var c=0;c<aaa;c++){
		aab*=multiplier;
	}
	return aab;
}


function squareroot(aufgabe){
	var aufgabesave= aufgabe;
	var zmom=0;
	for(i=0;i<100;i++){
		aufgabesave=aufgabesave/10;
		if(aufgabesave<100){
			if(aufgabesave<10){
				zmom=2*Math.pow(10,i);
				i=1001;
				//console.log(zmom);
				
			}else{
				zmom=6*Math.pow(10,i);
				i=1001;
				//console.log(zmom);
				
			}
		}
	}
	//var zmom =aufgabe/2;
	var save=0;
	for(i=0;i<10;i++){
		zmom=0.5*(zmom+(aufgabe/zmom));
		if(save==zmom){
			i=11;
			return zmom;
		}else{
		save=zmom;
		}
	}
	return zmom;
	
}

function freeVector(xi,yi,zi){
    this.x=xi||0;
    this.y=yi||0;
    this.z=zi||0;
    this.lengthnorm;
    this.set=function(xi,yi,zi){
		this.x=xi||this.x;
		this.y=yi||this.y;
		this.z=zi||this.z;
	}
	this.distsqr=function(inputt){
		var result=(this.x-inputt.x)*(this.x-inputt.x)+(this.y-inputt.y)*(this.y-inputt.y)+(this.z-inputt.z)*(this.z-inputt.z);
		return result;
	}
	this.add=function(vi,yi,zi){
        if(yi!==undefined){
            this.x+=vi;
            this.y+=yi;
			this.z+=zi||0;
        }
        else{
            this.x+=vi.x||0;
            this.y+=vi.y||0;
			this.z+=vi.z||0;
        }
    };
    this.sub=function(vi,yi,zi){
        if(yi!==undefined){
            this.x-=vi;
            this.y-=yi;
			this.z-=zi||0;
        }
        else{
            this.x-=vi.x||0;
            this.y-=vi.y||0;
			this.z-=vi.z||0;
        }
    };
    this.mul=function(ai){
        this.x*=ai;
        this.y*=ai;
		this.z*=ai;
    };
    this.pro=function(ai){
        return new freeVector(this.x*ai,this.y*ai,this.z*ai);
    };
    this.dif=function(vi){
        return new freeVector(this.x-vi.x,this.y-vi.y,this.z-vi.z);
    };
    this.sum=function(vi){
        return new freeVector(this.x+vi.x,this.y+vi.y,this.z+vi.z);
    };
    this.set=function(xi,yi,zi){
        if(!isNaN(yi)){
            this.x=xi;
            this.y=yi;
			this.z=zi||0;
        }
        else{
            this.x=xi.x;
            this.y=xi.y;
			this.z=xi.z;
        }
    };
    this.copy=function(){
        return new freeVector(this.x,this.y,this.z);
    };
	this.len=function(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}
	this.lensq=function(){
		var op=(this.x)*(this.x)+(this.y)*(this.y)+(this.z)*(this.z);
		return op;
	}
	this.toString=function(){
		return '['+Math.floor(this.x*100)/100+','+Math.floor(this.y*100)/100+','+Math.floor(this.z*100)/100+']'
	}
}

function freeDCamera(xi,yi,zi,ri){
    this.pos= new freeVector(xi,yi,zi);
    this.czrot=ri||0;
    this.viewdir= new freeVector(-10,0,0);
    this.viewrot= Math.atan2(this.viewdir.x,this.viewdir.y);
	this.viewrotz=Math.atan2(Math.sqrt(this.viewdir.x*this.viewdir.x+this.viewdir.y*this.viewdir.y),this.viewdir.z);
    this.ccordslength;
	this.ccsystemx;
	this.ccsystemy;
	this.ccsystemz;
    this.height=cheight/100;
	this.width=cwidth/100;
    
    this.updaterotation=function(){
        var platz=[];
        if(this.viewdir.x===0){platz[0]=0.000000000001;}else{platz[0]=this.viewdir.x;}
        if(this.viewdir.y===0){platz[1]=0.000000000001;}else{platz[1]=this.viewdir.y;}
        if(this.viewdir.z===0){platz[2]=0.000000000001;}else{platz[2]=this.viewdir.z;}
        platz[3]=platz[1]/Math.abs(platz[1])*Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[0]*platz[0] / (platz[1]*platz[1])))||0;
        platz[4]=(-1)*platz[0]/Math.abs(platz[0])*Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[1]*platz[1] / (platz[0]*platz[0])))||0;
        platz[5]=0;
        platz[6]=Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[2]*platz[2]*(platz[3]*platz[3] + platz[4]*platz[4]) / ((platz[3]*platz[1]- platz[0]*platz[4])*(platz[3]*platz[1]- platz[0]*platz[4]))));
        platz[7]=(platz[6]*platz[2]*platz[4])/(platz[3]*platz[1]-platz[0]*platz[4])||0;
        platz[8]=(-1)*(platz[6]*platz[2]*platz[3])/(platz[3]*platz[1]-platz[0]*platz[4])||0;
        this.ccsystemx= new freeVector(platz[3],platz[4],platz[5]);
        this.ccsystemy= new freeVector(platz[7],platz[8],platz[6]);
        this.ccsystemz= new freeVector(platz[0],platz[1],platz[2]);
        this.ccordslength=this.ccsystemx.len();
    }
    this.set=function(xi,yi,zi,xd,yd,zd){
		this.pos.set(xi,yi,zi);
		this.viewdir.set(xd,yd,zd);
	}
	this.urot=function(){
		var xo=Math.sin(this.viewrot)*Math.sin(this.viewrotz)*10;
		var yo=Math.cos(this.viewrot)*Math.sin(this.viewrotz)*10;
		var zo=Math.cos(this.viewrotz)*10;
		this.viewdir.set(xo,yo,zo);
	};
}
function Dot(xi,yi,zi,nmr,type,color,vi){
    this.pos=new freeVector(xi,yi,zi);
    this.cpos=new freeVector(0,0,0);
    this.me=nmr;
	this.type=type;
	this.co=color;
	this.v=vi;
	this.dis;
	this.partof=[];
}
function Area(me,color,dA,dB,dC){
    this.me=me;
    this.dots=[];
    this.color=color;
    this.dots[0]=dA;
    this.dots[1]=dB;
    this.dots[2]=dC;
}
function camering(ir){
    var dissum=[freeDcam.pos.x,freeDcam.pos.y,freeDcam.pos.z,world.dots[ir].pos.x,world.dots[ir].pos.y,world.dots[ir].pos.z];
    var adis=(dissum[0]-dissum[3])*(dissum[0]-dissum[3])+(dissum[1]-dissum[4])*(dissum[1]-world.dots[ir].pos.y)+(dissum[2]-dissum[5])*(dissum[2]-dissum[5]);
    var bzdis=(dissum[0]+freeDcam.ccsystemz.x-dissum[3])*(dissum[0]+freeDcam.ccsystemz.x-dissum[3])+(dissum[1]+freeDcam.ccsystemz.y-dissum[4])*(dissum[1]+freeDcam.ccsystemz.y-dissum[4])+(dissum[2]+freeDcam.ccsystemz.z-dissum[5])*(dissum[2]+freeDcam.ccsystemz.z-dissum[5]);
    var bxdis=(dissum[0]+freeDcam.ccsystemx.x-dissum[3])*(dissum[0]+freeDcam.ccsystemx.x-dissum[3])+(dissum[1]+freeDcam.ccsystemx.y-dissum[4])*(dissum[1]+freeDcam.ccsystemx.y-dissum[4])+(dissum[2]+freeDcam.ccsystemx.z-dissum[5])*(dissum[2]+freeDcam.ccsystemx.z-dissum[5]);
    var bydis=(dissum[0]+freeDcam.ccsystemy.x-dissum[3])*(dissum[0]+freeDcam.ccsystemy.x-dissum[3])+(dissum[1]+freeDcam.ccsystemy.y-dissum[4])*(dissum[1]+freeDcam.ccsystemy.y-dissum[4])+(dissum[2]+freeDcam.ccsystemy.z-dissum[5])*(dissum[2]+freeDcam.ccsystemy.z-dissum[5]);
    var cdis=(freeDcam.ccordslength)*(freeDcam.ccordslength);
    world.dots[ir].cpos.z=((-1)*bzdis+cdis+adis)/(2*freeDcam.ccordslength);
    var cposxx=((-1)*bxdis+cdis+adis)/(2*freeDcam.ccordslength);
    var cposyy=((-1)*bydis+cdis+adis)/(2*freeDcam.ccordslength);
	var cposzz=((-1)*bzdis+cdis+adis)/(2*freeDcam.ccordslength);
    // Einheit = cm
    
    var distance = squarerooot(adis);
	world.dots[ir].dis=distance;
    /*world.dots[ir].cpos.x=cwidth/3*(cposxx/(distance*viewsize));
    world.dots[ir].cpos.y=cheight/3*(cposyy/(distance*viewsize));
	*/
	world.dots[ir].cpos.z=cposzz;
	world.dots[ir].cpos.x=cposxx/cposzz*cwidth;//Math.atan2(cposxx,cposzz)/Math.PI*3*cwidth;
	world.dots[ir].cpos.y=cposyy/cposzz*cwidth;//Math.atan2(cposyy,cposzz)/Math.PI*3*cwidth;
	//world.dots[ir].cpos.x=cheight/3*(cposxx/(distance*viewsize));
    //world.dots[ir].cpos.y=cheight/3*(cposyy/(distance*viewsize));
}
function addDot(xi,yi,zi,type,ci,vi){
	var x=xi||0;
	var y=yi||0;
	var z=zi||0;
	var typ=type||1;
	var color=ci||"#000000";
	var savnr=world.dots.length;
	var vo=vi||0;
	world.dots[world.dots.length]= new Dot(x,y,z,world.dots.length,typ,color,vo);
}

function addArea(color,A,B,C){
   
   world.dots[A].type='area';
   world.dots[A].partof[world.dots[A].partof.length]=world.areas.length;
   world.dots[B].type='area';
   world.dots[B].partof[world.dots[B].partof.length]=world.areas.length;
   world.dots[C].type='area';
   world.dots[C].partof[world.dots[C].partof.length]=world.areas.length;
   world.areas[world.areas.length]= new Area(world.areas.length,color,A,B,C);
}

function drawengine(x,y,type,nr){
     if(type=='z'){//Blauer Strich von Mitte(z-Achse)
		ctx.beginPath();
		ctx.moveTo(zerox+world.dots[0].cpos.x,zeroy-world.dots[0].cpos.y);
		ctx.lineTo(zerox+x, zeroy-y);
		ctx.strokeStyle = "#0000ff";
        ctx.stroke();
         
     }
     else if(type=='x'){//Roter Strich von Mitte(x-Achse)
		ctx.beginPath();
		ctx.moveTo(zerox+world.dots[0].cpos.x,zeroy-world.dots[0].cpos.y);
		ctx.lineTo(zerox+x, zeroy-y);
		ctx.strokeStyle = "#ff0000";
		ctx.stroke();
	}
	else if(type=='y'){//Grüner Strich von Mitte(y-Achse)
		ctx.beginPath();
		ctx.moveTo(zerox+world.dots[0].cpos.x,zeroy-world.dots[0].cpos.y);
		ctx.lineTo(zerox+x, zeroy-y);
		ctx.strokeStyle = "#00ff00";
		ctx.stroke();
	}
	else if(type=='area'){
		if(world.dots[nr].cpos.z>0){
	    for(var i=0;i<world.dots[nr].partof.length;i++){
	        var areanr=  world.dots[nr].partof[i];
			var doit=true;
	        ctx.beginPath();
	        ctx.moveTo(zerox+x, zeroy-y);
	        for(var e=0;e<world.areas[areanr].dots.length;e++){
				if(world.dots[world.areas[areanr].dots[e]].cpos.z<=0){
					doit=false;
				}
	            var xd=world.dots[world.areas[areanr].dots[e]].cpos.x;
	            var yd=world.dots[world.areas[areanr].dots[e]].cpos.y;
	            ctx.lineTo(zerox+xd, zeroy-yd);
	        }
			if(doit){
	        ctx.fillStyle = world.areas[areanr].color;
	        ctx.fill();
			ctx.stroke();
			}
	    }
		}
	}
	else if(type=='hidden'){
		
	}else if(type=='Planet'){
		var d=world.dots[nr];
		var col=d.co;
		var rad=d.v/d.cpos.z*cwidth;
		if(d.cpos.z>=0){
			ctx.beginPath();
			ctx.arc(zerox+x, zeroy-y, rad, 0, 2 * Math.PI, true);
			ctx.fillStyle = col;
			ctx.fill();
			ctx.stroke();
		}
	}
    else{//Standard Punktierung
		ctx.beginPath();
		ctx.arc(zerox+x, zeroy-y, 2, 0, 2 * Math.PI, true);
		ctx.strokeStyle = "#000000";
		ctx.stroke();
	}    
    
}

function drawing(){
	ctx.clearRect(0, 0, cwidth, cheight);
	world.show();
}




function World(){
	this.hitpoints=[];
    this.areas=[];
    this.dots=[];
    this.show=function(){
		
        freeDcam.updaterotation();
        this.czorder=[];
		
		for(var i=0;i<this.dots.length;i++){
			camering(i);
		}
		var doots=[];
		stime=new Date().getTime();
		for(n=0;n<this.dots.length;n++){
			doots.push({op:n,sv:this.dots[n].dis});
		}
		//console.log(doots)
        this.czorder=quicksort(doots);
		
        for(var i=0;i<this.czorder.length;i++){
            var dott=this.czorder[i];
            drawengine(this.dots[dott].cpos.x,this.dots[dott].cpos.y,this.dots[dott].type,dott);
        }
		
    }
}

function updating(){
	if(true){
		
		c=freeDcam;
		if(keys[0]===true){
			c.pos.x-=Math.cos(c.viewrot)*tspeed;
			c.pos.y+=Math.sin(c.viewrot)*tspeed;
		}
		if(keys[1]===true){
			c.pos.x+=Math.cos(c.viewrot)*tspeed;
			c.pos.y-=Math.sin(c.viewrot)*tspeed;
		}
		if(keys[2]===true){
			c.pos.x+=Math.sin(c.viewrot)*tspeed;
			c.pos.y+=Math.cos(c.viewrot)*tspeed;
		}
		if(keys[3]===true){
			c.pos.x-=Math.sin(c.viewrot)*tspeed;
			c.pos.y-=Math.cos(c.viewrot)*tspeed;
		}
		if(keys[4]===true){
			c.pos.z+=tspeed;
		}
		if(keys[5]===true){
			c.pos.z-=tspeed;
		}
	}
	world.dots=[];
	for(b=0;b<planets.length;b++){
		planets[b].setpos();
	}
	for(b=0;b<planets.length;b++){
		planets[b].update();
		planets[b].draw();
	}
	drawing();
}
window.onkeydown = function(event) {
	if (event.keyCode == 65) {//A
		keys[0]=true;
	}
	if (event.keyCode == 68) {//D
		keys[1]=true;
	}
	if (event.keyCode == 87) {//W
		keys[2]=true;		
	}
	if (event.keyCode == 83) {//S
		keys[3]=true;		
	}
	if (event.keyCode == 32) {//SPACE
		keys[4]=true;		
	}
	if (event.keyCode == 16) {//SHIFT
		keys[5]=true;		
	}
}
window.onkeyup=function(event) {
	if (event.keyCode == 65) {
		keys[0]=false;
	}
	if (event.keyCode == 68) {
		keys[1]=false;
	}
	if (event.keyCode == 87) {
		keys[2]=false;
	}
	if (event.keyCode == 83) {
		keys[3]=false;		
	}
	if (event.keyCode == 32) {
		keys[4]=false;		
	}
	if (event.keyCode == 16) {
		keys[5]=false;		
	}
}
var mpos;
var srotz;
var srot;
var mdown=false;
$('#freeDcanvas').mousedown(function(e){
	mdown=true;
	mpos=new freeVector(e.clientX,e.clientY);
	srotz=freeDcam.viewrotz;
	srot=freeDcam.viewrot;
});
$('#freeDcanvas').mousemove(function(e){
	if(mdown===true){
		c=freeDcam;
		var vec=new freeVector(e.clientX,e.clientY);
		vec=vec.dif(mpos);
		c.viewrot=srot+vec.x*Math.PI/1024;
		c.viewrotz=srotz+vec.y*Math.PI/1024;
		if(c.viewrotz>Math.PI-0.001){
			c.viewrotz=Math.PI-0.001
		}
		if(c.viewrotz<0.001){
			c.viewrotz=0.001;
		}
		c.urot();
	}
	console.log(freeDcam)
});
$('body').mouseup(function(e){
	mdown=false;
});
setup()
window.setInterval(updating,30);	
