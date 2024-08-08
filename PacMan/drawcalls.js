function getdrawcall(conarr){
    let str="";
    for(let i=0; i < 4; i++){
        if(conarr[i])str+='1';
        else str+='0';
    }
    for(let i=0;i<4;i++){
        switch(str){
            case '0000':
                return {dc:draw.clean,rot:gemat(i)};
            case '1000':
                return {dc:draw.single,rot:(i)};
            case '1010':
                return {dc:draw.strait,rot:(i)};
            case '1100':
                return {dc:draw.curve,rot:(i)};
            case '1110':
                return {dc:draw.triangle,rot:i};
            case '1111':
                return {dc:draw.all,rot:(i)};
        }
        str = str.substr(1)+str[0];
    }
    console.log(str+'hi')
}
function getmat(i){
    i%=4;
    switch(i){
        case 0: return [[1,0],[0,1]];
        case 1: return [[0,1],[-1,0]];
        case 2: return [[-1,0],[0,-1]];
        case 3: return [[0,-1],[1,0]];
    }
}
const mul=(p,m)=>[p[0]*m[0][0]+p[1]*m[1][0],p[0]*m[0][1]+p[1]*m[1][1]];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const draw={
    borderWidth: 10,
    clean: i=>i,
    single: function(pos,rot){
        let mat = getmat(rot);
        let b=draw.borderWidth;
        ctx.beginPath();
        ctx.moveTo(...add(mul([-25+b,-25],mat),pos));
        ctx.arc(...add(mul([-(25-2*b),25-2*b],mat),pos),b,Math.PI/2*(rot+2),Math.PI/2*(rot+1),true);
        ctx.arc(...add(mul([25-2*b,25-2*b],mat),pos),b,Math.PI/2*(rot+1),Math.PI/2*(rot),true);
        ctx.lineTo(...add(mul([25-b,-25],mat),pos));
        ctx.stroke();
    },
    strait: function(pos,rot){
        let mat = getmat(rot);
        let b=draw.borderWidth;
        ctx.beginPath();
        ctx.moveTo(...add(mul([-25+b,-25],mat),pos));
        ctx.lineTo(...add(mul([-25+b,25],mat),pos));
        ctx.moveTo(...add(mul([25-b,25],mat),pos));
        ctx.lineTo(...add(mul([25-b,-25],mat),pos));
        ctx.stroke();
    },
    curve: function(pos,rot){
        let mat = getmat(rot);
        let b=draw.borderWidth;
        ctx.beginPath();
        ctx.moveTo(...add(mul([-25+b,-25],mat),pos));
        ctx.arc(...add(mul([-(25-2*b),25-2*b],mat),pos),b,Math.PI/2*(rot+2),Math.PI/2*(rot+1),true);
        ctx.lineTo(...add(mul([25,25-b],mat),pos));
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add(mul([25,-25],mat),pos),b,Math.PI/2*(rot+2),Math.PI/2*(rot+1),true);
        ctx.stroke();
    },
    triangle: function(pos,rot){
        let mat = getmat(rot);
        let b=draw.borderWidth;
        ctx.beginPath();
        ctx.moveTo(...add(mul([-25+b,-25],mat),pos));
        ctx.lineTo(...add(mul([-25+b,25],mat),pos));
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add(mul([25,-25],mat),pos),b,Math.PI/2*(rot+2),Math.PI/2*(rot+1),true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add(mul([25,25],mat),pos),b,Math.PI/2*(rot+2),Math.PI/2*(rot+3));
        ctx.stroke();
    },
    all: function(pos){
        let b=draw.borderWidth;
        ctx.beginPath();
        ctx.arc(...add([25,-25],pos),b,Math.PI/2,Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add([25,25],pos),b,Math.PI,Math.PI/2*3);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add([-25,25],pos),b,Math.PI/2*3,0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(...add([-25,-25],pos),b,0,Math.PI/2);
        ctx.stroke();
    }
};