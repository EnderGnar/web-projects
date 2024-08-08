var draw={
	normal:function(){
		ctx.beginPath();
		ctx.arc(this.matrix.zero.x+this.dpos.x, this.matrix.zero.y-this.dpos.y, 2, 0, 2 * Math.PI, true);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	},
	hide:function(){
	},
	standartarea:function(){
		ctx.beginPath();
		ctx.moveTo(this.matrix.zero.x+this.parts[0].dpos.x,this.matrix.zero.y-this.parts[0].dpos.y);
		for(u=1;u<this.parts.length;u++){
			ctx.lineTo(this.matrix.zero.x+this.parts[u].dpos.x,this.matrix.zero.y-this.parts[u].dpos.y)
		}
		ctx.fillStyle= this.color;
		ctx.fill();
	},
	strokearea:function(){
		ctx.beginPath();
		ctx.moveTo(this.matrix.zero.x+this.parts[0].dpos.x,this.matrix.zero.y-this.parts[0].dpos.y);
		for(u=1;u<this.parts.length;u++){
			ctx.lineTo(this.matrix.zero.x+this.parts[u].dpos.x,this.matrix.zero.y-this.parts[u].dpos.y)
		}
		ctx.lineTo(this.matrix.zero.x+this.parts[0].dpos.x,this.matrix.zero.y-this.parts[0].dpos.y);
		ctx.fillStyle= this.color;
		ctx.fill();
		ctx.strokeStyle=this.color2;
		ctx.stroke();
	},
	line:function(){
		ctx.beginPath();
		ctx.moveTo(this.matrix.zero.x+this.parts[0].dpos.x,this.matrix.zero.y-this.parts[0].dpos.y);
		for(u=1;u<this.parts.length;u++){
			ctx.lineTo(this.matrix.zero.x+this.parts[u].dpos.x,this.matrix.zero.y-this.parts[u].dpos.y)
		}
		ctx.strokeStyle=this.color;
		ctx.stroke();
	}
}