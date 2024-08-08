const c=document.getElementById('mycanvas');
const ctx=c.getContext('2d');
let mover;
let ghosts=[];
let nodes=[];
let points=[];
let timealive;
function setup(){
	ghosts=[];
	points=[];
	pacpac();
	mover = new Mover(nodes[0],2,pacdraw);
	mover.check=function(){
		this.current.point.check(this.pos);
		if(this.next!==undefined&&this.current.connects[this.next]){
			let c=this.current.connects[this.next]
			c.point.check(this.pos);
			c.goal.point.check(this.pos);
		}
	}
	ghosts.push(new Mover(nodes[89],1.5,gostdraw,'#FF0000'));
	ghosts.push(new Mover(nodes[7],1.5,gostdraw,'#FF88FF'));
	ghosts.push(new Mover(nodes[44],1.5,gostdraw,'#00FF00'));
	ghosts.push(new Mover(nodes[32],1.5,gostdraw,'#0000FF'));
	ghosts[0].calc=gostroute;
	ghosts[1].calc=gostroute;
	ghosts[2].calc=gostroute;
	ghosts[3].calc=gostroute;
	timealive=new Date();
}
function updating(){
	nodes.forEach((e)=>e.mul=1);
	mover.step();
	mover.check();
	if(ghosts[0].route) ghosts.sort((a,b)=>a.route.length-b.route.length);
	ghosts.forEach((e)=>e.calc(mover));
	ghosts.forEach((e)=>(e.step()));
	ctx.clearRect(0,0,1000,1000);
	ctx.beginPath();
	ctx.rect(0,0,1000,1000);
	ctx.fillStyle='#000000'
	ctx.fill();
	ctx.strokeStyle='#310cb5'
	nodes.forEach(e => e.draw([e.pos.x,e.pos.y],e.rot));
	ctx.fillStyle='#f7cade'
	points.forEach(e=>e.draw());
	mover.draw();
	ghosts.forEach((e)=>(e.draw()));
	ghosts.forEach((e)=>{if(dis(e.pos,mover.pos)<20)endgame()})
}

function dis(A,B){return Math.sqrt((A.x-B.x)**2+(A.y-B.y)**2)};

async function endgame(){
	let t=new Date();
	let lived=t.getTime()-timealive.getTime();
	await alert(`Game over \n you lived for: ${Math.floor(lived/100)/10} s`);
	setup();
}

function route(N,G){
	let visits=new Array(nodes.length);
	visits.fill(0);
	visits.forEach((e,i,a)=>a[i]={cost:Infinity,last:null});
	visits[N.id]={cost:0,last:true};
	searcher=[N.id];
	for(let i=0;i<1000&&visits[searcher[0]].cost<visits[G.id].cost;i++){
		let active=searcher.splice(0,1)[0];
		for(let con of nodes[active].connects) if(con&&visits[active].cost+con.l*con.goal.mul<visits[con.goal.id].cost){
			searcher.push(con.goal.id);
			visits[con.goal.id]={cost:visits[active].cost+con.l*con.goal.mul,last:active}
		}
		searcher.sort((a,b)=>visits[a].cost-visits[b].cost);
	}
	if(visits[G.id].cost<Infinity){
		let backs=[]
		let back=G.id
		while(back!==N.id){
			backs.push(back);
			back=visits[back].last;
		}
		backs.push(N.id);
		return backs;
	}
	console.log(visits);
}

class Node{
	constructor(x,y){
		this.pos={x:x,y:y};
		this.connects=[];
		this.mul=1;
		this.point=new Point(this.pos.x,this.pos.y);
		points.push(this.point)
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.pos.x,this.pos.y,7,0,Math.PI*2);
		if(this.active)ctx.fillStyle='#77FF77';
		else ctx.fillStyle='#CCCCCC';
		ctx.fill();
		if(this.active)ctx.fillStyle='#77FF77';
		else ctx.strokeStyle='#CCCCCC';
		var p2=this.pos;
		this.connects.forEach(function({goal,active}){
			ctx.beginPath();
			ctx.moveTo(p2.x,p2.y);
			ctx.lineTo(goal.pos.x,goal.pos.y);
			if(active){
				ctx.lineWidth=3;
				ctx.strokeStyle='green';
			}
			ctx.stroke();
			if(active){
				ctx.lineWidth=1;
				ctx.strokeStyle='#CCCCCC';
			}
		})
	}
	connect(a,n=0){
		let len=dis(this.pos,a.pos);
		let p=new Point((this.pos.x+a.pos.x)/2,(this.pos.y+a.pos.y)/2);
		points.push(p);
		this.connects[n]={goal:a,l:len,point:p};
		a.connects[(n+2)%4]={goal:this,l:len,point:p};
	}
}

class Mover{
	constructor(startnode,speed=2,draw=pacdraw,color){
		this.color=color;
		this.current=startnode;
		this.next;
		this.wish;
		this.pos={...this.current.pos};
		this.dis=0;
		this.draw=draw;
		this.speed=speed;
	}
	step()
		{if((this.wish+2)%4===this.next&&this.dis>0){
			this.dis=this.current.connects[this.next].l-this.dis;
			this.current=this.current.connects[this.next].goal;
			this.next=this.wish;
		}
		if((this.next===undefined||!this.current.connects[this.next])&&this.wish!==undefined)this.next=this.wish;
		if(this.next!==undefined){
			let nx=this.current.connects[this.next];
			if(!nx)return;
			this.dis+=this.speed;
			if(this.dis>nx.l){
				if(this.wish!==undefined&&nx.goal.connects[this.wish]) this.next=this.wish;
				this.dis-=nx.l;
				this.current=nx.goal;
				nx=this.current.connects[this.next];
				if(!nx)this.dis=0;
			}
			this.pos={...this.current.pos}
			if(nx){
				this.pos.x+=(nx.goal.pos.x-this.pos.x)/nx.l*this.dis;
				this.pos.y+=(nx.goal.pos.y-this.pos.y)/nx.l*this.dis;
			}
		
		}	
	}
}

var pointsize=10;
class Point{
	constructor(x,y){
		this.pos=[x,y];
		this.eaten=false;
	}
	draw(){
		if(!this.eaten){
			ctx.beginPath();
			ctx.arc(...this.pos,3,0,Math.PI*2);
			ctx.fill();
		}
	}
	check(pos){
		if(dis({x:this.pos[0],y:this.pos[1]},pos)<10)this.eaten=true;
	}
}
let pacdraw=function(){
	ctx.beginPath();
	ctx.arc(this.pos.x,this.pos.y,10,0,Math.PI*2);
	ctx.fillStyle='#EEEE00';
	ctx.fill();
}
let gostdraw=function(){
	ctx.beginPath();
	ctx.arc(this.pos.x,this.pos.y,10,0,Math.PI*2);
	ctx.fillStyle=this.color;
	ctx.fill();
}

function gostroute(pac){
	let fir=(this.current.connects[this.next])?this.current.connects[this.next].goal:this.current;
	let is=this.current.connects[this.next]==undefined;
	let sec=(pac.current.connects[pac.next])?pac.current.connects[pac.next].goal:pac.current;
	this.route=route(fir,sec);
	this.route.pop();
	let next=this.route[this.route.length-1];
	this.route.forEach((e,i)=>(nodes[e].mul+=10/(1+i)));
	if(is){
		for(let con in this.current.connects) if(this.current.connects[con].goal.id==next){
			this.wish=con;
		}
	}
	else{
		let node=this.current.connects[this.next].goal;
		for(let con in node.connects) if(node.connects[con].goal.id==next){
			this.wish=con;
		}
	}
}


$(document).keydown(function(e) {
    switch(e.which) {
		case 37: // left
		mover.wish=3;
        break;

        case 38: // up
		mover.wish=0;
        break;

        case 39: // right
		mover.wish=1;
        break;

        case 40: // down
		mover.wish=2;
        break;
    }
});
setup();
let interval=setInterval(updating,30);