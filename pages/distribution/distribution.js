function start(){
    console.log("strarting")
    svg=document.getElementById("display")
    var params=[0,1000,2]
    var arr=[...Array(40000)]
    var randomNoCenterArray=arr.map(E=>params).map(E=>randomNoCenter(E[0],E[1],E[2]))
    var randomNoCenterString=randomNoCenterArray.map(E=>makeCircle(10,E/2)).join("")



    
    for(var i=0;i<200;i++){
        console.log(nthbinomial(i))
    }


    var randomOnCenterArray=arr.map(E=>params).map(E=>randomOnCenter(E[0],E[1],E[2]))
    var randomOnCenterString=randomOnCenterArray.map(E=>makeCircle(380,E)).join("")

    var randomOnCenterSymetricArray=arr.map(E=>params).map(E=>randomOnCenterSymetric(E[0],E[1],E[2]))
    var randomOnCenterSymetricString=randomOnCenterSymetricArray.map(E=>makeCircle(120,E)).join("")
    
    console.time("Noraml By Average")
    var norm2Array=arr.map(E=>params).map(E=>normBy2(E[0],E[1],15))
    console.timeEnd("Noraml By Average") 
    //var norm2String=norm2Array.map(E=>makeCircle(240,E/2)).join("")


    console.time("Noraml By Random Power")
    var normbypowerarray=arr.map(E=>params).map(E=>normalByRandomPower(0,500))
    console.timeEnd("Noraml By Random Power") 

    console.time("Normal By Powered Restriction")
    var randomOnCenterSymetricRootArray=arr.map(E=>params).map(E=>normalByDirac(0,500))
    console.timeEnd("Normal By Powered Restriction")
    //var randomOnCenterSymetricRootString=randomOnCenterSymetricRootArray.map(E=>makeCircle(120,E)).join("")
    
    console.time("Normal By Box-Muller Transform")
    var randomByBoxMullerArray=arr.map(E=>params).map(E=>randomByBoxMuller())
    console.timeEnd("Normal By Box-Muller Transform")

    /*console.time("Normal By Box-Muller Transform")
    var randomByBoxMullerArray=arr.map(E=>params).map(E=>randomByBoxMuller())
    console.timeEnd("Normal By Box-Muller Transform")

    console.time("Normal By Powered Restriction")
    var randomOnCenterSymetricRootArray=arr.map(E=>params).map(E=>normalByDirac(0,500))
    console.timeEnd("Normal By Powered Restriction")


    


    console.time("Noraml By Average")
    var norm2Array=arr.map(E=>params).map(E=>normBy2(E[0],E[1],15))
    console.timeEnd("Noraml By Average") 
    */

    console.time("Normal By Powered Restriction Fast")
    var randomOnCenterSymetricRootFastArray=arr.map(E=>params).map(E=>normalByDiracFast(0,500))
    console.timeEnd("Normal By Powered Restriction Fast")
    //var randomByBoxMullerString=randomOnCenterSymetricRootArray.map(E=>makeCircle(120,E)).join("")
    

    var histo=1
    //histogramMaker(randomOnCenterSymetricArray,histo,0,1000,0,"#f008")
    svg.innerHTML=histogramMaker(normbypowerarray,histo,0,1000,500,"#00Fa")+histogramMaker(norm2Array,histo,0,1000,0,"#00Fa")+histogramMaker(randomOnCenterSymetricRootArray,histo,0,1000,0,"#0F0a")+histogramMaker(randomByBoxMullerArray,histo,0,1000,500,"#F008")+histogramMaker(randomOnCenterSymetricRootFastArray,histo,0,1000,500,"#00F8") //norm2String+randomNoCenterString+randomOnCenterString+randomOnCenterSymetricString+`<line x1="0" x2="1000" y1="500" y2="500" stroke-width="10" stroke="black"  />`
}



function histogramMaker(data,int,bot,top,off,color){
    var range=top-bot
    var vals=[...Array(range/int)].map(E=>0)
    data.map(E=>{
        vals[Math.floor((E-bot)/int)]+=1
    })
    return vals.map((val,ind)=>`<rect x="${off}" y="${ind*int}" width="${val}" height="${int}" fill="${color}" />`).join("")
}


function randomByBoxMuller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    var randZO = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return (randZO*80+500)
}




function randomNoCenter(bot,top,many){
    if(many&&many>0){
        var new2=[randomBetween(bot,top),randomBetween(bot,top)]
        var newbot=Math.min(...new2)
        var newtop=Math.max(...new2)
        return randomNoCenter(newbot,newtop,many-1)
    }
    else{
        return randomBetween(bot,top)
    }
}







function randomOnCenter(bot,top,many){
    var mid=500
    if(many&&many>0){
        var [newbot,newtop]=[randomBetween(bot,mid),randomBetween(mid,top)]
        return randomOnCenter(newbot,newtop,many-1)
    }
    else{
        return randomBetween(bot,top)
    }
}




function randomOnCenterSymetric(bot,top,many){
    if(many&&many>0){
        var newbot=randomBetween(bot,500)
        return randomOnCenterSymetric(newbot,500,many-1)
    }
    else{
        return randomBetween(bot,1000-bot)
    }
}

function randomOnCenterSymetricRoot(bot,top,many,pow){
    if(many&&many>0){
        var newsq=randomBetween(bot,500)
        var newbot=(newsq-bot)**pow+bot
        return randomOnCenterSymetricRoot(newbot,500,many-1,pow)
    }
    else{
        return randomBetween(bot,1000-bot)
    }
}

//3 .94
function normalByDirac(bot,mid){
    var top=2*(mid-bot)
    var many=4
    while(many>0){
        var newsq=randomBetween(bot,mid)
        bot=(newsq-bot)**.898+bot
        many=many-1
    }
    return randomBetween(bot,top-bot)
}




function normalByRandomPower(bot,mid){
    return mid-((mid-bot)**(Math.random()))
}

function normalByDiracFast(bot,mid){
    bot=((randomBetween(bot,mid)-(bot)*1.11)**.98)+bot
    return ((Math.random()-.5)*(2*(mid-bot))/2)+mid
}

//((randomBetween(bot,top-bot)-mid)/2)+mid

//5 randoms 4 powers 
//2 randoms 1 power 1 log 1 cos
//15 randoms
function randomNewCenter(bot,top,center,many){

}

function normBy2(bot,top,many){
    var randoray=[...Array(many)].map(E=>Math.random())
    var randosum=randoray.reduce((acc,itt)=>acc+itt,0)
    return ((randosum)/many)*Math.abs(bot-top)+Math.min(bot,top)-1
}


function randomBetween(bot,top){
    var rando=Math.random()
    var stretch=rando*Math.abs(bot-top)
    var fit=stretch+Math.min(bot,top)
    return fit
}


function nthbinomial(n){
    var arr=new Array()
    curr=1
    for(var i=0;i<((n+1)/2);i++){
        arr.push(curr)
        curr=curr*(n-i)/(1+i)
    }
    
    return arr
}


function makeCircle(x,y){
    return `<circle cx="${x}" cy="${y}" r="10" stroke="none" fill="#F002" />`
}