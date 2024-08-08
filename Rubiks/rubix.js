var Rubix;
var matrix;
var mastercube;
var colours=['white','yellow','red','#ef6300','green','blue'];
function colorit(){
	for(i in Rubix.cubes){
		if(Rubix.cubes[i].pos.z===1){
			Rubix.cubes[i].areas[4].color=colours[0];
		}
		if(Rubix.cubes[i].pos.z===-1){
			Rubix.cubes[i].areas[5].color=colours[1];
		}
		if(Rubix.cubes[i].pos.y===1){
			Rubix.cubes[i].areas[2].color=colours[2];
		}
		if(Rubix.cubes[i].pos.y===-1){
			Rubix.cubes[i].areas[3].color=colours[3];
		}
		if(Rubix.cubes[i].pos.x===1){
			Rubix.cubes[i].areas[0].color=colours[4];
		}
		if(Rubix.cubes[i].pos.x===-1){
			Rubix.cubes[i].areas[1].color=colours[5];
		}
	}
}
function Cube(pi){
	this.pos=pi.copy();
	this.dpos=pi.copy();
	this.areas=[];
	this.dots=[];
	this.dposs=mastercube;
	this.cords={$x:new freeVector(1,0,0),$y:new freeVector(0,1,0),$z:new freeVector(0,0,1)}
	this.dcords={$x:new freeVector(1,0,0),$y:new freeVector(0,1,0),$z:new freeVector(0,0,1)}
	this.update=function(){
		for($b in this.dots){
			this.dots[$b].pos.set(this.dpos.pro(10.5).sum(this.dcords.$x.pro(this.dposs[$b].x).sum(this.dcords.$y.pro(this.dposs[$b].y).sum(this.dcords.$z.pro(this.dposs[$b].z))).pro(5)));
			this.dots[$b].update();
		}
		for($b in this.areas){
			this.areas[$b].uemphasis();
			this.areas[$b].update();
		}
	}
	this.setup=function(){
		for($ii in this.dposs){
			this.dots.push(matrix.addDot({pos:this.dpos.pro(10.5).sum(this.dposs[$ii].pro(5)),dcall:draw.hide}))
		}
		var d=this.dots;
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[0],d[1],d[3],d[2]]}))//front
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[4],d[5],d[7],d[6]]}))//back
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[0],d[1],d[5],d[4]]}))//right
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[2],d[3],d[7],d[6]]}))//left
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[0],d[2],d[6],d[4]]}))//top
		this.areas.push(matrix.addArea({dcall:draw.strokearea,color:'#555555',color2:'#000000',parts:[d[1],d[3],d[7],d[5]]}))//bottom
	}
}
function setup(){
	matrix=new freeMatrix();
	{//}
	mastercube=[new freeVector(1,1,1),new freeVector(1,1,-1),new freeVector(1,-1,1),new freeVector(1,-1,-1),new freeVector(-1,1,1),new freeVector(-1,1,-1),new freeVector(-1,-1,1),new freeVector(-1,-1,-1)];
	}
	Rubix={cubes:[]};
	for(i=-1;i<2;i++){
		for(j=-1;j<2;j++){
			for(k=-1;k<2;k++){
				Rubix.cubes.push(new Cube(new freeVector(i,j,k)))
			}
		}
	}
	for(r in Rubix.cubes){
		Rubix.cubes[r].setup();
	}
	colorit();
	drawingg();
}
function updating(){
	
}

function drawingg(){
	ctx.clearRect(0,0,c.width,c.height)
	for($a in Rubix.cubes){
		Rubix.cubes[$a].update();
	}
	matrix.render();
}

var mpos;
var npos;
var takencubes={x:[],y:[]};
var $rotvar=Math.PI/200;
var mdown=false;
$('#freeDcanvas').mousedown(function(e){
	mdown=true;
	mpos=new freeVector(e.clientX,e.clientY);
	var rel=new freeVector(e.clientX-$('#freeDcanvas').offset().left-c.width/2,c.height/2-(e.clientY-$('#freeDcanvas').offset().top));
	takencubes={x:[],y:[]};
	for(l in Rubix.cubes){
		if(Rubix.cubes[l].pos.z===Math.round(rel.y/80)){
			takencubes.x.push(Rubix.cubes[l]);
		}
		if(Rubix.cubes[l].pos.y===Math.round(rel.x/80)){
			takencubes.y.push(Rubix.cubes[l]);
		}
	}
	if(takencubes.x[0]===undefined||takencubes.y[0]===undefined){
		takencubes.x=Rubix.cubes;
		takencubes.y=Rubix.cubes;
	}
});
$('#freeDcanvas').mousemove(function(e){
	
	if(mdown===true){
		for($al in Rubix.cubes){
			let $c=Rubix.cubes[$al];
			$c.dpos.set($c.pos);
			$c.dcords.$x.set($c.cords.$x)
			$c.dcords.$y.set($c.cords.$y)
			$c.dcords.$z.set($c.cords.$z)
		}
		npos=new freeVector(e.clientX,e.clientY);
		npos.sub(mpos);
		var xdom=Math.abs(npos.x)>Math.abs(npos.y);
		if(xdom){
			var vec=new freeVector(Math.cos(npos.x*$rotvar),Math.sin(npos.x*$rotvar));
			for($al in takencubes.x){
				let $c=takencubes.x[$al];
				$c.dpos.set({x:$c.pos.x*vec.x-$c.pos.y*vec.y,y:$c.pos.x*vec.y+$c.pos.y*vec.x,z:$c.pos.z});
				
				$c.dcords.$x.set({x:vec.x*$c.cords.$x.x-vec.y*$c.cords.$x.y,y:$c.cords.$x.x*vec.y+vec.x*$c.cords.$x.y,z:$c.cords.$x.z});
				$c.dcords.$y.set({x:vec.x*$c.cords.$y.x-vec.y*$c.cords.$y.y,y:$c.cords.$y.x*vec.y+vec.x*$c.cords.$y.y,z:$c.cords.$y.z});
				$c.dcords.$z.set({x:vec.x*$c.cords.$z.x-vec.y*$c.cords.$z.y,y:$c.cords.$z.x*vec.y+vec.x*$c.cords.$z.y,z:$c.cords.$z.z});
				
			}
		}
		else{
			var vec=new freeVector(Math.cos(-npos.y*$rotvar),Math.sin(-npos.y*$rotvar));
			for($al in takencubes.y){
				let $c=takencubes.y[$al];
				$c.dpos.set({x:$c.pos.x*vec.x-$c.pos.z*vec.y,y:$c.pos.y,z:$c.pos.x*vec.y+$c.pos.z*vec.x});
				$c.dcords.$x.set({x:vec.x*$c.cords.$x.x-vec.y*$c.cords.$x.z,y:$c.cords.$x.y,z:$c.cords.$x.x*vec.y+vec.x*$c.cords.$x.z});
				$c.dcords.$y.set({x:vec.x*$c.cords.$y.x-vec.y*$c.cords.$y.z,y:$c.cords.$y.y,z:$c.cords.$y.x*vec.y+vec.x*$c.cords.$y.z});
				$c.dcords.$z.set({x:vec.x*$c.cords.$z.x-vec.y*$c.cords.$z.z,y:$c.cords.$z.y,z:$c.cords.$z.x*vec.y+vec.x*$c.cords.$z.z});
				
			}
		}
		drawingg();
	}
	
});
$('body').mouseup(function(e){
	npos=new freeVector(e.clientX,e.clientY);
	npos.sub(mpos);
	var xdom=Math.abs(npos.x)>Math.abs(npos.y);
	var cons=(xdom)?(Math.round((npos.x*$rotvar)*2/Math.PI)+16)%4*Math.PI/2:(Math.round((-npos.y*$rotvar)*2/Math.PI)+16)%4*Math.PI/2;
	if(xdom){
			var vec=new freeVector(Math.cos(cons),Math.sin(cons));
			for($al in takencubes.x){
				let $c=takencubes.x[$al];
				$c.pos.set({x:Math.round($c.pos.x*vec.x-$c.pos.y*vec.y),y:Math.round($c.pos.x*vec.y+$c.pos.y*vec.x),z:$c.pos.z});
				
				$c.cords.$x.set({x:Math.round(vec.x*$c.cords.$x.x-vec.y*$c.cords.$x.y),y:Math.round($c.cords.$x.x*vec.y+vec.x*$c.cords.$x.y),z:$c.cords.$x.z});
				$c.cords.$y.set({x:Math.round(vec.x*$c.cords.$y.x-vec.y*$c.cords.$y.y),y:Math.round($c.cords.$y.x*vec.y+vec.x*$c.cords.$y.y),z:$c.cords.$y.z});
				$c.cords.$z.set({x:Math.round(vec.x*$c.cords.$z.x-vec.y*$c.cords.$z.y),y:Math.round($c.cords.$z.x*vec.y+vec.x*$c.cords.$z.y),z:$c.cords.$z.z});
				
			}
		}
	else{
		var vec=new freeVector(Math.cos(cons),Math.sin(cons));
		for($al in takencubes.y){
			let $c=takencubes.y[$al];
			$c.pos.set({x:Math.round($c.pos.x*vec.x-$c.pos.z*vec.y),y:$c.pos.y,z:Math.round($c.pos.x*vec.y+$c.pos.z*vec.x)});
			$c.cords.$x.set({x:Math.round(vec.x*$c.cords.$x.x-vec.y*$c.cords.$x.z),y:$c.cords.$x.y,z:Math.round($c.cords.$x.x*vec.y+vec.x*$c.cords.$x.z)});
			$c.cords.$y.set({x:Math.round(vec.x*$c.cords.$y.x-vec.y*$c.cords.$y.z),y:$c.cords.$y.y,z:Math.round($c.cords.$y.x*vec.y+vec.x*$c.cords.$y.z)});
			$c.cords.$z.set({x:Math.round(vec.x*$c.cords.$z.x-vec.y*$c.cords.$z.z),y:$c.cords.$z.y,z:Math.round($c.cords.$z.x*vec.y+vec.x*$c.cords.$z.z)});
				
		}
	}
	for($al in Rubix.cubes){
		let $c=Rubix.cubes[$al];
		$c.dpos.set($c.pos);
		$c.dcords.$x.set($c.cords.$x)
		$c.dcords.$y.set($c.cords.$y)
		$c.dcords.$z.set($c.cords.$z)
	}
	var same=true;
	for(m=1;m<Rubix.cubes.length&&same==true;m++){
		if(Rubix.cubes[m].cords.$x.dif(Rubix.cubes[0].cords.$x).lensq()>0){
			same=false;
		}
		if(Rubix.cubes[m].cords.$y.dif(Rubix.cubes[0].cords.$y).lensq()>0){
			same=false;
		}
		if(Rubix.cubes[m].cords.$z.dif(Rubix.cubes[0].cords.$z).lensq()>0){
			same=false;
		}
	}
	
	drawingg();
	if(same){
		alert('WIN!');
	}
	mdown=false;
});