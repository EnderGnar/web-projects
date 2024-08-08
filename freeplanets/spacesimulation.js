var planets=[];
var gconstant=0.004;
var shape=true;
var slength=6000;
document.onkeydown = function(event) {
	if (event.keyCode == 78) {//N
		if(shape===true){
			shape=false;
		}else{
			shape=true;
		}
	}
}
function ellipsoid(xm,ym,zm,ini,inii){
	var points=[];
	var al=Math.PI/(ini-1);
	var be=2*Math.PI/inii;
	for(var i=0;i<ini;i++){
		points[i]=[];
		for(var e=0;e<inii;e++){
			points[i][e]=new freeVector(Math.sin(be*e)*Math.sin(al*i)*xm,Math.cos(be*e)*Math.sin(al*i)*ym,Math.cos(al*i)*zm);
		}
	}
	
	return points;
}
function dplanet(vi,di,ci,ri){
	var dw=[];
	if(ri!==false){
		for(i=0;i<di.length;i++){
			dw[i]=[];
			for(e=0;e<di[i].length;e++){
				addDot(di[i][e].x*Math.cos(ri)+di[i][e].y*Math.sin(ri)+vi.x,di[i][e].x*Math.cos(ri+Math.PI/2)+di[i][e].y*Math.sin(ri+Math.PI/2)+vi.y,di[i][e].z+vi.z);
				dw[i][e]=world.dots.length-1;
			}
		}
	}else{
		for(i=0;i<di.length;i++){
			dw[i]=[];
			for(e=0;e<di[i].length;e++){
				addDot(di[i][e].x+vi.x,di[i][e].y+vi.y,di[i][e].z+vi.z);
				dw[i][e]=world.dots.length-1;
			}
		}
	}
	for(i=0;i<dw.length;i++){
		for(e=0;e<dw[i].length;e++){
			if(i>0){
				addArea(ci,dw[i][e],dw[i-1][e],dw[i-1][(e+1)%dw[i].length]);
			}
			if(i<dw.length-1){
				addArea(ci,dw[i][e],dw[i+1][e],dw[i+1][(e-1+dw[i].length)%dw[i].length]);
			}
		}
	}
};
function Planet(pi,vi,mi,ri,ci,rsi,ni){
	this.name=ni||'opfer';
	this.pos=pi;
    this.vel=vi;
	this.rotspeed=rsi||0;
	this.rot=0;
    this.mass=mi;
    this.r=ri||Math.sqrt(this.mass)+1;
    this.c=ci;
	this.spos=[];
    this.lastpos=new freeVector(0,0);
    this.acc=new freeVector(0,0);
	this.shapes=[];
	this.shapes[0]=ellipsoid(this.r,this.r,this.r,15,15);
	this.shapes[1]=ellipsoid(this.r,this.r,this.r,4,5);
	this.shapes[2]=ellipsoid(this.r,this.r,this.r,3,3);
	this.setpos=function(){
        this.lastpos.set(this.pos);
    };
	this.update=function(){
        this.acc.set(0,0);
        for(n=0;n<planets.length;n++){
            var vec=this.pos.dif(planets[n].lastpos);
            if(vec.lensq()!==0){
                this.acc.add(vec.x/vec.len()/vec.lensq()*gconstant*planets[n].mass,vec.y/vec.len()/vec.lensq()*gconstant*planets[n].mass,vec.z/vec.len()/vec.lensq()*gconstant*planets[n].mass);
                if(vec.lensq()<(this.r+planets[n].r)*(this.r+planets[n].r)){
                    if(this.mass>planets[n].mass){
						this.vel.add( planets[n].vel.pro(planets[n].mass/this.mass));
                        this.mass+=parseInt(planets[n].mass);
                        this.r=Math.sqrt(planets[n].r*planets[n].r+this.r*this.r);
                    }
                }
            }
           
        }
        this.vel.sub(this.acc);
        this.pos.add(this.vel);
		this.spos.push(this.pos);
		if(this.spos.length>slength){
			this.spos.shift();
		}
		this.rot+=this.rotspeed;
    };
	this.draw=function(){
		var adis=freeDcam.pos.dif(this.pos).lensq();
		var bdis=freeDcam.pos.sum(freeDcam.viewdir).dif(this.pos).lensq();
		var cdis=(freeDcam.ccordslength)*(freeDcam.ccordslength);
		var zz=((-1)*bdis+cdis+adis)/(2*freeDcam.ccordslength);
		if(zz>-this.r-10){
			if(shape===true){
				var pm=this.pos.dif(freeDcam.pos).len()/(this.r);
				if(pm>200){
					addDot(this.pos.x,this.pos.y,this.pos.z,'Planet',this.c,this.r);
				}else if(pm>180){
					dplanet(this.pos,this.shapes[2],this.c,false);
				}
				else if(pm>100){
					dplanet(this.pos,this.shapes[1],this.c,this.rot);
				}
				else{
					dplanet(this.pos,this.shapes[0],this.c,this.rot);
				}
				
			}else{
				addDot(this.pos.x,this.pos.y,this.pos.z,'Planet',this.c,this.r);
			}
		}
	}
}


function solarsystem(){
	planets.push(new Planet(new freeVector(0,0),new freeVector(0,0),333000,200,'#FFBB00',Math.PI/200,'sun'));//sun
	planets.push(new Planet(new freeVector(390,0),new freeVector(0,Math.sqrt(1332/390)),(3.3/59.7),4,'#883333',Math.PI/700,'mercury')); //mercury
	planets.push(new Planet(new freeVector(720,0),new freeVector(0,Math.sqrt(1332/720)),(48.7/59.7),10,'#FF5555',Math.PI/600,'venus')); //venus
	planets.push(new Planet(new freeVector(1000,0),new freeVector(0,Math.sqrt(1332/1000)),100,10,'#0000aa',Math.PI/10,'earth')); //Earth
	planets.push(new Planet(new freeVector(1020,0),new freeVector(0,Math.sqrt(1332/1000)+Math.sqrt(0.02)),(0.1),3,'#D3D3D3',Math.PI/280,'mun')); //Moon
	planets.push(new Planet(new freeVector(1520,0),new freeVector(0,Math.sqrt(1332/1520)),(6.42/59.7),5,'#882222',Math.PI/300,'mars')); //Mars
	planets.push(new Planet(new freeVector(5200,0),new freeVector(0,Math.sqrt(1332/5200)),(19000/59.7),112,'#d8ca9d',Math.PI/500,'jupiter')); //Jupiter
	planets.push(new Planet(new freeVector(9580,0),new freeVector(0,Math.sqrt(1332/9580)),(5690/59.7),94,'#ead6b8',Math.PI/2000,'saturn')); //Saturn

}
function setup(){
	solarsystem();
	freeDcam.pos.x = 1300
	freeDcam.pos.y = 100
	freeDcam.urot();
}
