function pacpac(){
    nodes=[];
    createmap(JSON.parse('{"nodes":[{"x":25,"y":25},{"x":25,"y":75},{"x":25,"y":125},{"x":25,"y":225},{"x":25,"y":325},{"x":25,"y":375},{"x":25,"y":425},{"x":25,"y":475},{"x":75,"y":25},{"x":75,"y":75},{"x":75,"y":125},{"x":75,"y":225},{"x":75,"y":325},{"x":75,"y":375},{"x":75,"y":425},{"x":75,"y":475},{"x":125,"y":25},{"x":125,"y":75},{"x":125,"y":125},{"x":125,"y":175},{"x":125,"y":225},{"x":125,"y":275},{"x":125,"y":325},{"x":125,"y":375},{"x":125,"y":425},{"x":125,"y":475},{"x":175,"y":25},{"x":175,"y":75},{"x":175,"y":125},{"x":175,"y":175},{"x":175,"y":225},{"x":175,"y":275},{"x":175,"y":325},{"x":175,"y":375},{"x":175,"y":425},{"x":175,"y":475},{"x":225,"y":25},{"x":225,"y":75},{"x":225,"y":125},{"x":225,"y":175},{"x":225,"y":275},{"x":225,"y":325},{"x":225,"y":375},{"x":225,"y":425},{"x":225,"y":475},{"x":275,"y":25},{"x":275,"y":75},{"x":275,"y":125},{"x":275,"y":175},{"x":275,"y":275},{"x":275,"y":325},{"x":275,"y":375},{"x":275,"y":425},{"x":275,"y":475},{"x":325,"y":25},{"x":325,"y":75},{"x":325,"y":125},{"x":325,"y":175},{"x":325,"y":225},{"x":325,"y":275},{"x":325,"y":325},{"x":325,"y":375},{"x":325,"y":425},{"x":325,"y":475},{"x":375,"y":25},{"x":375,"y":75},{"x":375,"y":125},{"x":375,"y":175},{"x":375,"y":225},{"x":375,"y":275},{"x":375,"y":325},{"x":375,"y":375},{"x":375,"y":425},{"x":375,"y":475},{"x":425,"y":25},{"x":425,"y":75},{"x":425,"y":125},{"x":425,"y":225},{"x":425,"y":325},{"x":425,"y":375},{"x":425,"y":425},{"x":425,"y":475},{"x":475,"y":25},{"x":475,"y":75},{"x":475,"y":125},{"x":475,"y":225},{"x":475,"y":325},{"x":475,"y":375},{"x":475,"y":425},{"x":475,"y":475},{"x":500,"y":225},{"x":0,"y":225}],"connects":[[0,8,"1"],[0,1,"2"],[1,9,"1"],[1,2,"2"],[2,10,"1"],[3,11,"1"],[4,12,"1"],[4,5,"2"],[5,13,"1"],[6,14,"1"],[6,7,"2"],[7,15,"1"],[8,16,"1"],[9,17,"1"],[10,18,"1"],[11,20,"1"],[12,22,"1"],[13,14,"2"],[14,24,"1"],[15,25,"1"],[16,26,"1"],[16,17,"2"],[17,27,"1"],[17,18,"2"],[18,19,"2"],[19,20,"2"],[20,30,"1"],[20,21,"2"],[21,22,"2"],[22,32,"1"],[22,23,"2"],[23,33,"1"],[23,24,"2"],[25,35,"1"],[26,36,"1"],[27,37,"1"],[27,28,"2"],[28,38,"1"],[29,39,"1"],[29,30,"2"],[30,31,"2"],[31,40,"1"],[31,32,"2"],[32,41,"1"],[33,42,"1"],[33,34,"2"],[34,43,"1"],[35,44,"1"],[36,37,"2"],[37,46,"1"],[38,39,"2"],[39,48,"1"],[40,49,"1"],[41,42,"2"],[42,51,"1"],[43,44,"2"],[44,53,"1"],[45,54,"1"],[45,46,"2"],[46,55,"1"],[47,56,"1"],[47,48,"2"],[48,57,"1"],[49,59,"1"],[50,60,"1"],[50,51,"2"],[51,61,"1"],[52,62,"1"],[52,53,"2"],[53,63,"1"],[54,64,"1"],[55,65,"1"],[55,56,"2"],[57,58,"2"],[58,68,"1"],[58,59,"2"],[59,60,"2"],[60,70,"1"],[61,71,"1"],[61,62,"2"],[63,73,"1"],[64,74,"1"],[64,65,"2"],[65,75,"1"],[65,66,"2"],[66,76,"1"],[66,67,"2"],[67,68,"2"],[68,77,"1"],[68,69,"2"],[69,70,"2"],[70,78,"1"],[70,71,"2"],[71,72,"2"],[72,80,"1"],[73,81,"1"],[74,82,"1"],[75,83,"1"],[76,84,"1"],[77,85,"1"],[78,86,"1"],[79,87,"1"],[79,80,"2"],[80,88,"1"],[81,89,"1"],[82,83,"2"],[83,84,"2"],[86,87,"2"],[88,89,"2"],[85,90,"1"],[3,91,"3"],[90,91,"1"]]}'))
    nodes[90].draw=()=>(0);
    nodes[91].draw=()=>(0);
    nodes[90].connects[1].l=0;
    nodes[90].connects[3].point.eaten=true;
    nodes[90].connects[1].point.eaten=true;
    nodes[91].connects[1].point.eaten=true;
    nodes[91].connects[3].l=0;
    nodes.forEach((e,i)=>{
        e.id=i;
        let dc=getdrawcall(e.connects,true);
        e.draw=dc.dc;
        e.rot=dc.rot;
    });
}