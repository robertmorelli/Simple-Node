function imgDataFunctionMaker(lis){
    var lister=lis.map((x) => x);
    return function (e) { console.log(lister[e])} 
}

async function printImage(evt) {

    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    var reader = new FileReader()
    
    reader.addEventListener("load", function () {
    }, false);
    if (files[0]) {
        reader.readAsDataURL(files[0])
    }
    reader.onload = function () {
        var img = new Image();
        img.src = reader.result
        var canvas = document.createElement("canvas");
        img.onload = function () {
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext("2d");
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height
            );
            var imgData = ctx.getImageData(0, 0, img.width, img.height)
            var imgEdges=getSobel(imgData)
            var pointsRGB=getRandomCoords(imgEdges,200)
            var pointsALL=pointsRGB[0]
            pointsRGB[1].map(e=>pointsALL[0].push(e))
            pointsRGB[2].map(e=>pointsALL[0].push(e))
            //var parallelParams=generateParallelParameter(imgData)
            //var p = new Parallel(parallelParams,{maxWorkers:300})
            //var ParallelFunction=closestCellmaker(pointsALL)
            //p.map(ParallelFunction).then(function (data) {
            //    console.log('success') // logs sdrawrof
            //},function(err){console.log(err)});
            

            var p = new Parallel(generateParallelParameterMapMap(imgData))
            p.map(closestCellmakerMapMap(pointsALL)).then(function (data) {
                console.log('success') // logs sdrawrof
                var withClosestCel=MapMapUnzipper(p.data)
                var celled=createMosaic(withClosestCel,img.width,img.height,pointsALL.length)
                ctx.putImageData(celled,0,0)
                document.body.appendChild(canvas);

            },function(err){console.log(err)});
            


            //var withClosestCel=parallelParams.map(ParallelFunction)
            //var celled=createMosaic(withClosestCel,img.width,img.height,pointsALL.length)
            //ctx.putImageData(celled,0,0)
            //document.body.appendChild(canvas);
        
        };
        
    }
}

function getSobel(imgData){
    var COX=[[-1,0,1],[-2,0,2],[-1,0,1]]
    var COY=[[1,2,1],[0,0,0],[-1,-2,-1]]
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>(imgData.width+1)*4&&ind<imgData.data.length-((imgData.width+1)*4)){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                var rows=[]
                rows[0]=[lis[ind-((imgData.width+1)*4)],lis[ind-((imgData.width)*4)],lis[ind-((imgData.width-1)*4)]]
                rows[1]=[lis[ind-4],lis[ind],lis[ind+4]]
                rows[2]=[lis[ind+(imgData.width*4)-4],lis[ind-(imgData.width)*4],lis[ind-(imgData.width*4)+4]]
                //console.log(rows)
                var xSum=Math.abs(rows.reduce((acc1,itt1,ind1)=>{return acc1+itt1.reduce((acc2,itt2,ind2)=>{return acc2+itt2*COX[ind1][ind2]},0)},0))


                var ySum=Math.abs(rows.reduce((acc1,itt1,ind1)=>{return acc1+itt1.reduce((acc2,itt2,ind2)=>{return acc2+itt2*COY[ind1][ind2]},0)},0))
                //console.log(xSum)
                //console.log(ySum)
                acc[ind]=Math.round((xSum**2+ySum**2)**.5)
                return acc
            }
        }
        else{
            acc[ind]=0
            return acc
        }
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}

function getRandomCoords(imgData,amount){
    var init=[0,0,0]
    var sums=imgData.data.reduce((acc,itt,ind,lis)=>{
        //alpha
        if((ind+1)% 4 == 0){
            return acc
        }
        //red
        if((ind)% 4 == 0 ){
            acc[0]+=(itt)
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[1]+=(itt)
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[2]+=(itt)
            return acc
    }
    },init)
    var amount=amount||255
    var weightedCursors=[[],[],[]]
    for(var i=0;i<amount*2;i++){
        weightedCursors[0].push(Math.round(Math.random()*sums[0]))
        weightedCursors[1].push(Math.round(Math.random()*sums[1]))
        weightedCursors[2].push(Math.round(Math.random()*sums[2]))
    }
    weightedCursors[0].sort((a,b)=>a-b)
    weightedCursors[1].sort((a,b)=>a-b)
    weightedCursors[2].sort((a,b)=>a-b)
    var redInd=0
    var greenInd=0
    var blueInd=0
    var pixelNums=[[],[],[]]
    imgData.data.reduce((acc,itt,ind,lis)=>{
         //alpha
         if((ind+1)% 4 == 0){
            return acc
        }
        //red
        if((ind)% 4 == 0 ){
            acc[0]+=itt
            if(acc[0]>weightedCursors[0][redInd]){
                pixelNums[0].push(ind/4)
                redInd+=1
            }
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[1]+=itt
            if(acc[1]>weightedCursors[1][greenInd]){
                pixelNums[1].push(Math.floor(ind/4))
                greenInd+=1
            }
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[2]+=itt
            if(acc[2]>weightedCursors[2][blueInd]){
                pixelNums[2].push(Math.floor(ind/4))
                blueInd+=1
            }
            return acc
        }
    },[0,0,0])

    var coords=[]

    coords[0]=pixelNums[0].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })
    coords[1]=pixelNums[1].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })
    coords[2]=pixelNums[2].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })
    return coords
}


function makeCellsRGBCorrect(imgData,cells){
    var celltotals=[cells[0].map(E=>[0,0]),cells[0].map(E=>[0,0]),cells[0].map(E=>[0,0])]
    console.log(celltotals)
    var initclamp=new Uint16Array(imgData.data.length);
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind%Math.round(imgData.data.length/100)==0){
            console.log(Math.floor(100*((ind+1)/imgData.data.length)))
        }
        
        //red
        if((ind)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells[0].reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            acc[ind]=close[0]
            celltotals[0][close[0]][0]+=1
            celltotals[0][close[0]][1]+=itt
            
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells[0].reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            acc[ind]=close[0]
            celltotals[1][close[0]][0]+=1
            celltotals[1][close[0]][1]+=itt
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells[0].reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            acc[ind]=close[0]
            celltotals[2][close[0]][0]+=1
            celltotals[2][close[0]][1]+=itt
            return acc
        }
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
    },initclamp)
    var clamp2=new Uint8ClampedArray(imgData.data.length)
    var colorarray=celltotals.map(set=>set.map(E=>E[1]/E[0]))
    var outs=data.reduce((acc,itt,ind,lis)=>{
        //alpha
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        //red
        if((ind)% 4 == 0 ){
            acc[ind]=Math.floor(colorarray[0][itt])
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[ind]=Math.floor(colorarray[1][itt])
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[ind]=Math.floor(colorarray[2][itt])
            return acc
    }
    },clamp2)

    return new ImageData(outs,imgData.width,imgData.height)
}

function pythagorean([x1, y1], [x2, y2]) {
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
}

function generateParallelParameter(data){
    var arr=data.data
    var out=arr.reduce((acc,itt,ind,lis)=>{
        //red
        if((ind)% 4 == 0 ){
            var loc=ind/4
            //array --> [red,green,blue,alpha=255,x,y]
            acc[loc]=new Array(6)
            acc[loc][0]=itt
            //alpha
            acc[loc][3]=255
            //coordinates
            acc[loc][4]=(ind/4)%data.width
            acc[loc][5]=Math.floor((ind/4)/data.width)
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[Math.floor(ind/4)][1]=itt
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[Math.floor(ind/4)][2]=itt
            return acc
        }
        return acc
    },Array(arr.length/4))
    return out
}



function closestCellmaker(cells){
    var outString=`function(lis){
        var loc=[lis[4],lis[5]]
        cells=[${cells.map(e=>'['+e.join(',')+']').join(',') }]
        pythagorean=function([x1, y1], [x2, y2]) {
            return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
        }
        var cell=cells.reduce((acc,itt,ind)=>{
            var dist=pythagorean(itt,loc)
            if(acc[1]>dist){
                acc=[ind,dist]
            }
            return acc
        },[0,100000000])
        return Array(lis[0],lis[1],lis[2],lis[3],cell[0])
    }`
    eval(`var out=${outString}`)

    return out
}

function createMosaic(lis,width,height,cellcount){
    var cellcolorRaw=new Array()
    for(var k=0;k<cellcount;k++){
        cellcolorRaw.push(Array(0,0,0,0,0))
    }
    lis.map((pix)=>{
        cellcolorRaw[pix[4]][0]+=pix[0]
        cellcolorRaw[pix[4]][1]+=pix[1]
        cellcolorRaw[pix[4]][2]+=pix[2]
        cellcolorRaw[pix[4]][3]+=pix[3]
        cellcolorRaw[pix[4]][4]+=1
    })
    var trueColors=cellcolorRaw.map(([r,g,b,a,c])=>[r/c,g/c,b/c,a/c])
    //console.log(trueColors)
    var out=lis.reduce((acc,itt,ind)=>{
        
        acc[ind*4]=trueColors[itt[4]][0]
        acc[ind*4+1]=trueColors[itt[4]][1]
        acc[ind*4+2]=trueColors[itt[4]][2]
        acc[ind*4+3]=trueColors[itt[4]][3]
        
        return acc
        },new Uint8ClampedArray(width*height*4))
    return new ImageData(out,width,height)
}



function generateParallelParameterMapMap(data){
    var arr=data.data
    



    var arrT=arr.reduce((acc,itt,ind,lis)=>{
        //red
        if((ind)% 4 == 0 ){
            var loc=ind/4
            //array --> [red,green,blue,alpha=255,x,y]
            acc[loc]=new Array(6)
            acc[loc][0]=itt
            //alpha
            acc[loc][3]=255
            //coordinates
            acc[loc][4]=(ind/4)%data.width
            acc[loc][5]=Math.floor((ind/4)/data.width)
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[Math.floor(ind/4)][1]=itt
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[Math.floor(ind/4)][2]=itt
            return acc
        }
        return acc
    },Array(arr.length/4))

    var arrSplit=[]
    var chunk=arrT.length/(data.width*128)
    for (i=0; i<arrT.length; i+=chunk) {
        var adder=Math.min(i+chunk,arrT.length)
        arrSplit.push(arrT.slice(i,adder))
    }



    return arrSplit
}








function closestCellmakerMapMap(cells){
    var outString=`function(lislis){
        var out=lislis.map(lis=>{
        var loc=[lis[4],lis[5]]
        cells=[${cells.map(e=>'['+e.join(',')+']').join(',') }]
        pythagorean=function([x1, y1], [x2, y2]) {
            return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
        }
        var cell=cells.reduce((acc,itt,ind)=>{
            var dist=pythagorean(itt,loc)
            if(acc[1]>dist){
                acc=[ind,dist]
            }
            return acc
        },[0,100000000])
        return Array(lis[0],lis[1],lis[2],lis[3],cell[0])
    })
    return out
    }
    `
    eval(`var out=${outString}`)

    return out
}


function MapMapUnzipper(lis){
    var out=[]
    lis.map(arr=>{arr.map(ele=>{out.push(ele)})})
    return out
}