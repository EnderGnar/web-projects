var c = document.getElementById("freeDcanvas");
var ctx = c.getContext("2d");
Math.SQRT3=Math.sqrt(3);
function freeVector(xi,yi,zi){
	this.type='vector';
	this.x=xi||0;
	this.y=yi||0;
	this.z=zi||0;
	this.add=function(vi,yi,zi){
        if(isNaN(yi)){
            this.x+=vi.x;
			this.y+=vi.y;
			this.z+=vi.z;
        }
        else{
            this.x+=vi;
			this.y+=yi;
			this.z+=zi||0;
        }
    };
	this.sub=function(vi,yi,zi){
        if(isNaN(yi)){
            this.x-=vi.x;
			this.y-=vi.y;
			this.z-=vi.z;
        }
        else{
            this.x-=vi;
			this.y-=yi;
			this.z-=zi||0;
        }
    };
	this.mul=function(fi){
        this.x*=fi;
		this.y*=fi;
		this.z*=fi;
    };
	this.div=function(fi){
        this.x/=fi;
		this.y/=fi;
		this.z/=fi;
    };
	this.sum=function(vi){
        return new freeVector(this.x+vi.x,this.y+vi.y,this.z+vi.z);
    };
	this.dif=function(vi){
        return new freeVector(this.x-vi.x,this.y-vi.y,this.z-vi.z);
    };
	this.pro=function(fi){
		return new freeVector(this.x*fi,this.y*fi,this.z*fi);
	};
	this.quo=function(fi){
		return new freeVector(this.x/fi,this.y/fi,this.z/fi);
	};
	this.set=function(vi,yi,zi){
		if(isNaN(vi)){
			this.x=vi.x;
			this.y=vi.y;
			this.z=vi.z;
		}
		else{
			this.x=vi;
			this.y=yi||this.y;
			this.z=zi||this.z;
		}
	};
	this.lensq=function(){
		return this.x*this.x+this.y*this.y+this.z*this.z;
	}
	this.len=function(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}
	this.copy=function(){
		return new freeVector(this.x,this.y,this.z);
	};
	this.toString=function(){
		return '['+this.x+','+this.y+','+this.z+']';
	}
	
}

function oncampos(cam,vi){
	var ao=cam.pos.dif(vi).lensq();
	var bx=cam.pos.sum(cam.canaxis.x).dif(vi).lensq();
	var by=cam.pos.sum(cam.canaxis.y).dif(vi).lensq();
	var bz=cam.pos.sum(cam.canaxis.z).dif(vi).lensq();
	var co=cam.canaxis.z.lensq();
	var xo=((-1)*bx+co+ao)/(2*cam.canaxis.len);
	var yo=((-1)*by+co+ao)/(2*cam.canaxis.len);
	var zo=((-1)*bz+co+ao)/(2*cam.canaxis.len);
	return new freeVector(xo,yo,zo);
}
function lense(vec){
	let xo=Math.atan2(vec.x,vec.z)/Math.PI*2*c.width;
	let yo=Math.atan2(vec.y,vec.z)/Math.PI*2*c.width;
	return new freeVector(xo,yo);
}
function freeDCamera(pi,ri){
	this.pos=pi.copy();
	this.viewdir=ri.copy();
	this.rot={
		width: Math.atan2(this.viewdir.x,this.viewdir.y),
		height:Math.atan2(Math.sqrt(this.viewdir.x*this.viewdir.x+this.viewdir.y*this.viewdir.y),this.viewdir.z)
	}
	this.canaxis={
		x:new freeVector(),
		y:new freeVector(),
		z:new freeVector(),
		len:10
	}
	this.uaxis=function(){
		var platz=[];
        if(this.viewdir.x===0){platz[0]=0.0000000000000001;}else{platz[0]=this.viewdir.x;}
        if(this.viewdir.y===0){platz[1]=0.0000000000000001;}else{platz[1]=this.viewdir.y;}
        if(this.viewdir.z===0){platz[2]=0.0000000000000001;}else{platz[2]=this.viewdir.z;}
        platz[3]=platz[1]/Math.abs(platz[1])*Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[0]*platz[0] / (platz[1]*platz[1])))||0;
        platz[4]=(-1)*platz[0]/Math.abs(platz[0])*Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[1]*platz[1] / (platz[0]*platz[0])))||0;
        platz[5]=0;
        platz[6]=Math.sqrt((platz[0]*platz[0]+platz[1]*platz[1]+platz[2]*platz[2]) / (1 + platz[2]*platz[2]*(platz[3]*platz[3] + platz[4]*platz[4]) / ((platz[3]*platz[1]- platz[0]*platz[4])*(platz[3]*platz[1]- platz[0]*platz[4]))));
        platz[7]=(platz[6]*platz[2]*platz[4])/(platz[3]*platz[1]-platz[0]*platz[4])||0;
        platz[8]=(-1)*(platz[6]*platz[2]*platz[3])/(platz[3]*platz[1]-platz[0]*platz[4])||0;
        this.canaxis.x.set(platz[3],platz[4],platz[5]);
        this.canaxis.y.set(platz[7],platz[8],platz[6]);
        this.canaxis.z.set(platz[0],platz[1],platz[2]);
		this.canaxis.len=this.canaxis.z.len();
	};
	this.rotate=function(ai,bi){
		if(ai.type=='vector'){
			this.viewdir.set(ai);
			this.viewdir.mul(10/this.viewdir.len());
			width= Math.atan2(this.viewdir.x,this.viewdir.y),
			height=Math.atan2(Math.sqrt(this.viewdir.x*this.viewdir.x+this.viewdir.y*this.viewdir.y),this.viewdir.z);
		}
		else{
			this.rot.width=ai;
			this.rot.height=bi;
			this.viewdir.set(10*Math.cos(bi)*Math.sin(ai),10*Math.cos(bi)*Math.cos(ai),10*Math.sin(bi)*Math.cos(ai));
		}
	};
}

function freeDot(oi){
	this.type='dot';
	this.matrix=oi.parnt;
	this.pos=oi.pos;
	this.color=oi.color;
	this.cpos=new freeVector();
	this.dpos=new freeVector();
	this.draw=oi.dcall;
	this.update=function(){
		this.cpos=oncampos(this.matrix.cam,this.pos);
		this.dpos=lense(this.cpos);
	}
	
}
function freeArea(oi){
	this.type='area';
	this.matrix=oi.parnt;
	this.parts=oi.parts;
	this.pos=oi.pos;
	this.color=oi.color;
	this.draw=oi.dcall;
	this.cpos=new freeVector();
	this.dpos=new freeVector();
	this.update=function(){
		this.cpos=oncampos(this.matrix.cam,this.pos);
		this.dpos=lense(this.cpos);
	}
	this.uemphasis=function(){
		this.pos.set({x:0,y:0,z:0})
		for(o in this.parts){
			this.pos.add(this.parts[o].pos);
		}
		this.pos.mul(1/this.parts.length)
	}
}
function freeMatrix(){
	this.sectionsize=1000;
	this.sections=[];
	this.zero=new freeVector(c.width/2,c.height/2);
	this.cam= new freeDCamera(new freeVector(100,0,0),new freeVector(-10,0,0));
	this.cam.uaxis();
	this.addDot=function(oi){
		var oo=oi||{}
		if(oo.pos==undefined){oo.pos=new freeVector(0,0,0);}
		if(oo.color==undefined){oo.col="#000000";}
		if(oo.dcall==undefined){oo.dcall=draw.normal}
		oo.parnt=this;
		var sve=[Math.round(oo.pos.x/1000),Math.round(oo.pos.y/1000),Math.round(oo.pos.z/1000)]
		if(!Array.isArray(this.sections[sve[0]])){this.sections[sve[0]]=[]}
		if(!Array.isArray(this.sections[sve[0]][sve[1]])){this.sections[sve[0]][sve[1]]=[]}
		if(!Array.isArray(this.sections[sve[0]][sve[1]][sve[2]])){this.sections[sve[0]][sve[1]][sve[2]]=[]}
		this.sections[sve[0]][sve[1]][sve[2]].push(new freeDot(oo));
		return this.sections[sve[0]][sve[1]][sve[2]][this.sections[sve[0]][sve[1]][sve[2]].length-1];

	};
	this.addArea=function(oi){
		let vec=new freeVector();
		if(oi.parts.length<=1){console.log('not enough polygons');}
		else{
			for(let i of oi.parts){
				vec.add(i.pos)
			}
			vec.mul(1/oi.parts.length);
			oi.pos=vec.copy();
			oi.parnt=this;
			if(oi.dcall==undefined){oi.dcall=draw.standartarea;}
			if(oi.color==undefined){oi.col="#000000";}
			var sve=[Math.round(oi.pos.x/1000),Math.round(oi.pos.y/1000),Math.round(oi.pos.z/1000)]
			if(!Array.isArray(this.sections[sve[0]])){this.sections[sve[0]]=[]}
			if(!Array.isArray(this.sections[sve[0]][sve[1]])){this.sections[sve[0]][sve[1]]=[]}
			if(!Array.isArray(this.sections[sve[0]][sve[1]][sve[2]])){this.sections[sve[0]][sve[1]][sve[2]]=[]}
			this.sections[sve[0]][sve[1]][sve[2]].push(new freeArea(oi));
			return this.sections[sve[0]][sve[1]][sve[2]][this.sections[sve[0]][sve[1]][sve[2]].length-1];
		}
	};
	this.deleteselecteds=function(){
		for(let i in this.sections){
			let a =this.sections[i];
			for(let j in a){
				let b=a[j];
				for(let h in b){
					let c=b[h];
					for(let k=0;k<c.length;k++){
						if(c[k].delete){
							c.splice(k,1)
							k--;
						}
					}
				}
			}
		}
	}
	this.render=function(){
		var polygons=[];
		for(let i in this.sections){
			let a =this.sections[i];
			for(let j in a){
				let b=a[j];
				for(let h in b){
					let c=b[h];
					for(let k in c){
						polygons.push({op:c[k],sv:c[k].cpos.lensq()});
					}
				}
			}
		}
		polygons=quicksort(polygons);
		for(let i in polygons){
			polygons[i].draw();
		}
	};
}
setup();
var updatinginterval=window.setInterval(updating,50)