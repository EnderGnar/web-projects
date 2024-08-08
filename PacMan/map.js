const mapsize=10;
function createmap(builder){
    if(builder){
        nodes=[];
        for(let {x,y} of builder.nodes)nodes.push(new Node(x,y));
        for(let arr of builder.connects)nodes[arr[0]].connect(nodes[arr[1]],eval(arr[2]));
        return
    }
    let dis=c.width/mapsize;
    for(let i=0;i<mapsize;i++)for(let j=0;j<mapsize;j++){
        nodes.push(new Node((i+.5)*dis,(j+.5)*dis));
        if(i>0)nodes[i*mapsize+j].connect(nodes[(i-1)*mapsize+j],3);
        if(j>0)nodes[i*mapsize+j].connect(nodes[i*mapsize+j-1],0);
    }
}
var lastnode;
document.getElementById('mycanvas').oncontextmenu = ()=> false;
$( "#mycanvas" ).mousedown(function(e) {
    e.preventDefault();
    let t=$(this)
    let pos={x:e.clientX-t.offset().left,y:e.clientY-t.offset().top};
    let node;
    for(let i of nodes)if(dis(pos,i.pos)<7){
        node=i;
        break;
    }
    if(!node)return
    switch(e.which){
        case 1:
            node.active =true;
            if(lastnode)for(i of node.connects)if(i&&i.goal==lastnode){
                i.active=true;
                for(let j of i.goal.connects)if(j&&j.goal==node)j.active=true;
            }
            lastnode=node;
            break;
        case 2:
            node.active =false;
            node.connects.forEach((e,i)=>{
                if(e.active){
                    e.active=false;
                    e.goal.connects[(i+2)%4].active=false;
                }
            });
            break;
        case 3:
            lastnode=undefined;
    }
});
function getmap(){
    nnodes=[];
    ncon=[];
    for(let n of nodes)if(n.active)nnodes.push(n.pos);
    for(let n of nodes){
        if(n.active){
            let i1=nnodes.findIndex((e)=>(e==n.pos))
            let  c=n.connects;
            for(let j in c)if(c[j]&&c[j].goal.active&&c[j].active){
                let i2=nnodes.findIndex((e)=>(e==c[j].goal.pos));
                if(i1<i2)ncon.push([i1,i2,j]);
            }
        }
    }
    return JSON.stringify({nodes:nnodes,connects:ncon});
}