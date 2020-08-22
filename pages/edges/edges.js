//const { transform } = require("typescript");

function imgDataFunctionMaker(lis){
    var lister=lis.map((x) => x);
    return function (e) { console.log(lister[e])} 
}

function printImage(evt) {


    

    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    var reader = new FileReader()
    
    
    // Spawn our slow function
    
    //preview=document.getElementById('preview')
    reader.addEventListener("load", function () {
        //preview.src = reader.result;
    }, false);
    if (files[0]) {
        reader.readAsDataURL(files[0])
    }
    reader.onload = function () {


        
        //ctx .fillStyle = "black";
        //ctx .fillRect(0, 0, canvas.width, canvas.height);

        //Load Image
        var img = new Image();
        //console.log(reader.result)
        img.src = reader.result
        var canvas = document.createElement("canvas");
        
        img.onload = function () {
            /*if(img.height>img.width){
                var rheight=254
                var rWidth=rheight*img.width/img.height
            }
            else{
                var rWidth=254
                var rheight=rWidth*img.height/img.width
            }*/
            var rheight=img.height
            var rWidth=img.width
            canvas.width = rWidth*2
            canvas.height = rheight*3
            var ctx = canvas.getContext("2d");
        //Get Context
            
            ctx.drawImage(
                img,
                0,
                0,
                rWidth,
                rheight
            );
            
            var imgData = ctx.getImageData(0, 0, rWidth, rheight)
            //console.log(imgData)
            

            
            
            
            //ctx.putImageData(dataTransform(imgData,getRed),0,img.height)
            //ctx.putImageData(dataTransform(imgData,getGreen),0,img.height*2)
            //ctx.putImageData(dataTransform(imgData,getBlue),0,img.height*3)
            ///var img2=getDifW(imgData)
            //var img3=getDifH(imgData)
            //var img7=getDif(getDif(imgData))
            //var img4=getPeakW(getDifW(imgData))
            //var img6=getPeakH(getDifH(imgData))
            
            //var img10=getPeak(getDif(imgData))
            
            var img5=getSobel(imgData)
            var img23=getSobelX(imgData)
            var img24=compareIMages(img5,img23)
            
            //console.log(getSums(imgData))
            //console.log(getSums(img4))
            Array(30,90,150,210,270,330).map(A=>console.log(`[${redByAngle(A)},${GreenByAngle(A)},${BlueByAngle(A)}] `))
            



            ctx.putImageData(img5,rWidth*1,0)
            ctx.putImageData(img23,rWidth*1,rheight)
            ctx.putImageData(img24,rWidth*1,rheight*2)
            //ctx.putImageData(getSobel(img5),0,rheight)
            //ctx.putImageData(img6,0,rheight*2)
            
            
            //ctx.putImageData(img7,rWidth,rheight)
            var coords=getRandomCoords(img5,200)

            coords[1].map(e=>coords[0].push(e))
            coords[2].map(e=>coords[0].push(e))
            //var celled=makeCellsRGBCorrect(imgData,coords)
            //ctx.putImageData(celled,0,rheight)
            //var cellines=getDifBW(celled)
            //var coords2=getRandomCoords(cellines,3)
            //var secondcells=makeCellsRGBCorrect(imgData,coords2)
            //ctx.putImageData(celled,0,0)
            //ctx.putImageData(cellines,0,rheight)
            //ctx.putImageData(secondcells,0,rheight*2)
            //console.log(coords)
            //coords[0].forEach(([x,y])=>{
            //    ctx.fillStyle = "#FF0000";
            //    ctx.fillRect(x+rWidth,y,10,10);
            //})
            //coords[1].forEach(([x,y])=>{
            //    ctx.fillStyle = "#00FF00";
            //    ctx.fillRect(x+rWidth,y,10,10);
            //})
            //coords[2].forEach(([x,y])=>{
            //    ctx.fillStyle = "#0000FF";
            //    ctx.fillRect(x+rWidth,y,10,10);
            //})
                //var firstpoints=
                //console.log('firstpoints')
                //firstpoints.forEach(([x,y])=>{
                //    ctx.fillStyle = "#FF00FF";
                //    ctx.fillRect(x+rWidth,y,10,10);
                //})

                //var path=drawlines(coords[1],img5.width,img5.height,false)

                
                //var path2=drawlines(coords[1],img5.width,img5.height,true)
                //var path4=drawlines(coords[0],img5.width,img5.height,false)
                //var path6=drawlines(coords[2],img5.width,img5.height,true)

                //path3= drawlines(drawlines(path2,img5.width,img5.height,true),img5.width,img5.height,false)
                //path5= drawlines(drawlines(path4,img5.width,img5.height,true),img5.width,img5.height,false)
                //path7= drawlines(drawlines(path6,img5.width,img5.height,true),img5.width,img5.height,false)


                //path4.forEach(([x,y])=>{
                //        ctx.fillStyle = "#FF00FF";
                //        ctx.fillRect(x+rWidth,y,10,10);
                //    })
                //var p = new Path2D(path4);
                //ctx.strokeStyle="#FFFF00"
                

                //var p3= new Path2D(path5);
                //ctx.strokeStyle="#00FFFF"
                //ctx.stroke(p3);

                //ctx.stroke(p);
                /*
                var p4= new Path2D(path7);
                ctx.strokeStyle="#FFFF00"
                ctx.stroke(p4);
                
                
                //console.log('second points')
                //console.log(path2)
                
                var p2= new Path2D(path3);
                ctx.strokeStyle="#FF00FF"
                ctx.stroke(p2);
                */



            //var img5=getDif(img4)
            //ctx.putImageData(img2,0,img.height)
            //ctx.putImageData(img5,img.width*2,0)
            
            //ctx.putImageData(img5,0,img.height*1)
            document.body.appendChild(canvas);
        
        };
        
    }
}

function dataTransform(imgData,funct){

    var newImgData= new ImageData(imgData.data.map(funct),
                                    imgData.width,
                                    imgData.height )
    return newImgData
}

function getRed(x,i){
    //alpha
    if((i+1)% 4 == 0){
        return x
    }
    //red
    if((i)% 4 == 0 ){
        return x
    }
    //green
    if((i+3)% 4 == 0 ){
        return 0
    }
    //blue
    if((i+2)% 4 == 0 ){
        return 0
    }
}
function getGreen(x,i){
    //alpha
    if((i+1)% 4 == 0){
        return x
    }
    //red
    if((i)% 4 == 0 ){
        return 0
    }
    //green
    if((i+3)% 4 == 0 ){
        return x
    }
    //blue
    if((i+2)% 4 == 0 ){
        return 0
    }
}
function getBlue(x,i){
    //alpha
    if((i+1)% 4 == 0){
        return x
    }
    //red
    if((i)% 4 == 0 ){
        return 0
    }
    //green
    if((i+3)% 4 == 0 ){
        return 0
    }
    //blue
    if((i+2)% 4 == 0 ){
        return x
    }
}

function getDifW(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>3){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.abs(itt-lis[ind-4])
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
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



function getSobelX(imgData){
    var COX=[[-2,-1,0],[-1,0,1],[0,1,2]]
    var COY=[[0,1,2],[-1,0,1],[-2,-1,0]]
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


function compareIMages(imgData1,imgData2){
    if(imgData1.width!=imgData2.width||imgData1.height!=imgData2.height){
        return 0
    }
    var clamp = new Uint8ClampedArray(imgData1.data.length)
    var dif=imgData1.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        acc[ind]=Math.abs(itt-imgData2.data[ind])
        return acc
    },clamp)
    var newImgData= new ImageData(dif,imgData1.width,imgData1.height)

    return newImgData

}


function getSobelDirectionRGB(imgData){
    //var COX=[[-1,0,1],[-2,0,2],[-1,0,1]]
    //var COY=[[1,2,1],[0,0,0],[-1,-2,-1]]
    var COX=[[-2,-1,0],[-1,0,1],[0,1,2]]
    var COY=[[0,1,2],[-1,0,1],[-2,-1,0]]
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>(imgData.width+1)*4&&ind<imgData.data.length-((imgData.width+1)*4)){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            if(ind%4==0){
                var rows=[]
                rows[0]=[lis[ind-((imgData.width+1)*4)],lis[ind-((imgData.width)*4)],lis[ind-((imgData.width-1)*4)]]
                rows[1]=[lis[ind-4],lis[ind],lis[ind+4]]
                rows[2]=[lis[ind+(imgData.width*4)-4],lis[ind-(imgData.width)*4],lis[ind-(imgData.width*4)+4]]
                //console.log(rows)
                var xSum=rows.reduce((acc1,itt1,ind1)=>{return acc1+itt1.reduce((acc2,itt2,ind2)=>{return acc2+itt2*COX[ind1][ind2]},0)},0)


                var ySum=rows.reduce((acc1,itt1,ind1)=>{return acc1+itt1.reduce((acc2,itt2,ind2)=>{return acc2+itt2*COY[ind1][ind2]},0)},0)
                var direction=Math.atan2(ySum,xSum)* 180 / Math.PI
                var anpletude=Math.round((xSum**2+ySum**2)**.5)*0.70710678118
                //acc[ind]=
                acc[ind]=redByAngle(direction)*Math.abs(anpletude)
                //acc[ind+1]=(GreenByAngle(direction+180)||GreenByAngle(direction-180))*Math.abs(anpletude)
                
                acc[ind+1]=GreenByAngle(direction)*Math.abs(anpletude)
                acc[ind+2]=BlueByAngle(direction)*Math.abs(anpletude)
                return acc
            }
            else{
                return acc
            }
        }
        return acc
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}
function getHextant(A){
    return Math.floor(A/60)
}


function redByAngle(A){
    switch(getHextant(A)) {
        case 0:
          return 1
        case 1:
            return (A%60)/60
        case 2:
            return 0
        case 3:
            return 0
        case 4:
            return 1-(A%60)/60
        case 5:
            return 1
    }
}

function GreenByAngle(A){
    switch(getHextant(A)) {
        case 0:
          return 1-(A%60)/60
        case 1:
            return 1
        case 2:
            return 1
        case 3:
            return (A%60)/60
        case 4:
            return 0
        case 5:
            return 0
    }
}

function BlueByAngle(A){
    switch(getHextant(A)) {
        case 0:
            return 0
        case 1:
            return 0
        case 2:
            return 1-(A%60)/60
        case 3:
            return 1
        case 4:
            return 1
        case 5:
            return (A%60)/60
    }
}

function getPeakW(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>3&&ind<imgData.data.length-4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                var forward=itt>lis[ind-4]+35
                var backward=itt>lis[ind+4]+35
                if(forward&&backward){
                    acc[ind]=itt
                }
                else{
                    acc[ind]=0
                }
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}




function getPeakH(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4&&ind<imgData.data.length-imgData.width*4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                var forward=itt>lis[ind-imgData.width*4]+35
                var backward=itt>lis[ind+imgData.width*4]+35
                if(forward&&backward){
                    acc[ind]=itt
                }
                else{
                    acc[ind]=0
                }
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}





function getPeak(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4&&ind<imgData.data.length-imgData.width*4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                var forward=itt>lis[ind-4]
                var backward=itt>lis[ind+4]
                var above=itt>lis[ind-imgData.width*4]
                var below=itt>lis[ind+imgData.width*4]
                if((forward&&backward)||(above&&below)){
                    acc[ind]=itt
                }
                else{
                    acc[ind]=0
                }
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)


    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}






function getDifH(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.abs(itt-lis[ind-imgData.width*4])
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)
    

    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}
function getDifold(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var verticaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.abs(itt-lis[ind-imgData.width*4])
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)
    var allData=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.sqrt(Math.abs(itt-lis[ind-4])**2,acc[ind]**2)
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },verticaldata)
    

    var newImgData= new ImageData(allData,imgData.width,imgData.height)

    return newImgData
}

function getDif(imgData){
    var count=0
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var allData=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4+4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.sqrt(Math.abs(itt-lis[ind-4])**2+Math.abs(itt-lis[ind-imgData.width*4])**2)
                //if(acc[ind]<10){
                //    acc[ind]=1
                //}
                
                return acc
            }
        }
        else{
            if(ind>3){
                if((ind+1)% 4 == 0){
                    acc[ind]=255
                    return acc
                }
                else{
                    acc[ind]=Math.abs(itt-lis[ind-4])
                    //if(acc[ind]<50){
                    //    acc[ind]=0
                    //}
                    return acc
                }
            }
            else{
                acc[ind]=imgData.data[ind]
                return acc
            }
        }
        
    },clamp)
    console.log(count)

    var newImgData= new ImageData(allData,imgData.width,imgData.height)

    return newImgData
}



function getDifBW(imgData){
    var count=0
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var allData=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width*4+4){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.sqrt(Math.abs(itt-lis[ind-4])**2+Math.abs(itt-lis[ind-imgData.width*4])**2)
                if(acc[ind]>0){
                    acc[ind]=255
                }
                else{
                    acc[ind]=0
                }
                return acc
            }
        }
        else{
            if(ind>3){
                if((ind+1)% 4 == 0){
                    acc[ind]=255
                    return acc
                }
                else{
                    acc[ind]=Math.abs(itt-lis[ind-4])
                    if(acc[ind]>0){
                        acc[ind]=255
                    }
                    else{
                        acc[ind]=0
                    }
                    return acc
                }
            }
            else{
                acc[ind]=imgData.data[ind]
                return acc
            }
        }
        
    },clamp)
    console.log(count)

    var newImgData= new ImageData(allData,imgData.width,imgData.height)

    return newImgData
}

function getSums(imgData){
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
    return sums
}

function makeCells(imgData,cells){
    var initclamp=new Uint8ClampedArray(imgData.data.length);
    var currcell=0
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        //red
        if((ind)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells.reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            
            currcell=close[0]
            
        }
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        
        acc[ind]=currcell
        return acc
        
        
    },initclamp)
    return new ImageData(data,imgData.width,imgData.height)
}

function makeCellsRGB(imgData,cells){
    var initclamp=new Uint8ClampedArray(imgData.data.length);
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
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
            return acc
        }
        //green
        if((ind+3)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells[1].reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            acc[ind]=close[0]
            return acc
        }
        //blue
        if((ind+2)% 4 == 0 ){
            var loc=[(ind/4)%imgData.width,Math.floor((ind/4)/imgData.width)]
            var close=cells[2].reduce((acc1,itt1,ind1)=>{
                var dist=pythagorean(itt1,loc)
                if(acc1[1]>dist){
                    acc1=[ind1,dist]
                }
                return acc1
            },[0,100000000])
            acc[ind]=close[0]
            return acc
        }
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        
        
        
        
    },initclamp)
    return new ImageData(data,imgData.width,imgData.height)
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
    console.log(data)
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



    console.log(outs)
    return new ImageData(outs,imgData.width,imgData.height)
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

    /*coords[0]=pixelNums[0].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })
    coords[1]=pixelNums[1].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })
    coords[2]=pixelNums[2].map(num=>{
        return [num%imgData.width,Math.floor(num/imgData.width)]
    })*/
    coords=pixelNums.map(Nums=>
        Nums.map(num=>{
            return [num%imgData.width+Math.random()*10.45645,Math.floor(num/imgData.width)+Math.random()*10.234]
        })).map(coordy=>
            getRandomSubarray(coordy,coordy.length).reduce((acc,itt,ind,lis)=>{
                if(true){
                    acc.push(itt)
                    
                    return acc
                }

                if(ind%2==0){
                    return acc
                }
                else{
                    acc.push(makemid(itt,lis[ind-1]))
                    return acc
                }
            },new Array()))
    return coords
}


function fun(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var horizontaldata=imgData.data.reduce((acc,itt,ind,lis)=>{
        if(ind>imgData.width){
            if((ind+1)% 4 == 0){
                acc[ind]=255
                return acc
            }
            else{
                acc[ind]=Math.abs(itt-lis[ind-imgData.width])
                return acc
            }
        }
        else{
            acc[ind]=imgData.data[ind]
            return acc
        }
    },clamp)
    

    var newImgData= new ImageData(horizontaldata,imgData.width,imgData.height)

    return newImgData
}











function drawlines(points,width,height,firstpass,finalamount) {
    
    for (var m = 0; m < points.length; m++) {
        //console.log("m loop")
        for (var n = m + 1; n < points.length; n++) {
            var line=new perpline(points[m], points[n])
            if(!line.b||!line.m||!line.getBoundaryIntercept(width,height)[0]||points[n][0]>width||points[n][1]>height){
                //console.log(points[n][0]>width||points[n][1]>height)
                //console.log(typeof(points))
                points.splice(n, 1);
            }
        }
    }
    //console.log(points.length)

    var middies=[]

    var stringer=''
    var finals=[]
    var point=0
    //elements += points.map((e,i) => {return maketext(e,i)}).join(' ')
    for(var point=0;point<points.length;point++){
        var dists2=[]
        var lines2=[]
        points.forEach((val,ind)=>{
            if(ind!=point){
                var dist = pythagorean(val, points[point])
                dists2.push({m:point, n:ind, dist: dist })
            }
        })
        //console.log(`starting ${point}... `)
        dists2.sort(sortFunction) 
        //console.log(`sorting for ${point} done... `)
        dists2.forEach(element => {
            lines2.push(new perpline(points[element.m], points[element.n]))
        })
        var accuracy=40
        if(lines2.length<40){
            accuracy=lines2.length
        }
        //console.log(`sorting for ${point} done... `)
        //console.log(lines[point])
        //console.log(lines2) 


        //var lines2=lines[point]
        var boundery = lines2[0].getBoundaryIntercept(width,height)
        var inters = [{ id: 0, left: 'b', right: 'b', points: boundery }]


        //console.log(`the polarities according to the new line ${[p0,p1]}`)
        //console.log(`polarities of origin ${p}`)
        //console.log(lines.length)
        //var doonce=true
        for (var j = 1; j < lines2.length; j++) {//lines2.length
            var bon = lines2[j].getBoundaryIntercept(width,height)
            if(!bon[0]||!bon[1]){
                continue
            }
            var toOut = {
                id: j,
                left: 'b',
                right: 'b',
                points: bon
            }
            //var possibleLeft = [bon[0]]
            //var possibleRight = [bon[1]]
            var use = false
            for (var i = 0; i < inters.length; i++) {
                //if(i>100){
                //    console.log('help')
                //}
                //the polarity of the old line segment according to the new line
                try{
                var [p0, p1] = [lines2[j].getPolarity(inters[i].points[0]), lines2[j].getPolarity(inters[i].points[1])]
                //console.log(`----------------------------------------------`)
                //console.log(` id of new line is ${j}`)
                //console.log(`the polarities according to this line are ${[p0, p1]} `)
                var p = lines2[j].getPolarity(points[point])
                //console.log()

                var int = lines2[j].intersection(lines2[inters[i].id])

                //polarity of new line boundery intercepts according to the line from the id for the current line segment
                var [pt1, pt2] = [lines2[inters[i].id].getPolarity(bon[0]), lines2[inters[i].id].getPolarity(bon[1])]

                var pp = lines2[inters[i].id].getPolarity(points[point])
                
                

                if (p0 != p1 && pt1!=pt2) {
                    if (p == p0 ) {
                        inters[i].right = j
                        inters[i].points[1] = int  
                    }
                    if (p == p1) {
                        inters[i].left = j
                        inters[i].points[0]=int
                    }
                    if (pt1 == pp) {
                        toOut.right=inters[i].id
                        toOut.points[1] = int
                    }
                    if(pt2 == pp){
                        toOut.left=inters[i].id
                        toOut.points[0] = int
                    
                    }
                use = true
                }
            }
                catch{
                    console.log("fail")
                    return 0
                }

            }
            //console.log(use)
            if (use){
                inters.push(toOut) 
                //console.log('out')
            } 
            else{
                if(inters[0].right=='b'&& inters[0].left=='b'){
                    inters.push(toOut) 
                }
            }   

            
      
        }
        
        //elements 
        //console.log(point)
        inters=clean(inters).list
        
        if(firstpass){
            //console.log('middies')
            inters.map(e => middies.push(makemid(e.points[0],e.points[1]).map(x=>x+Math.random()*40) ))
        }
        else{
            finals.push(inters)
        }
        
            
        
        
        stringer+=inters.map(e => `M${e.points[0].map(Math.floor)}L${e.points[1].map(Math.floor)}`)
        console.log((point+1)/points.length)
        //await delay(0)
        //await delay(500)
    }
    
     //+ makecircle(points[0], "green")
    
    //svg.innerHTML = elements
    if(firstpass){
        //console.log(middies)
        return getRandomSubarray(middies,1000||finalamount)
    }
    return stringer
}
class perpline {
    constructor([x1, y1], [x2, y2]) {
        


        this.b = this.y - this.m * this.x
        var [x0, y0] = makemid([x1, y1], [x2, y2])
        var r0 = (y2 - y1) / (x2 - x1)
        this.pointByT = (t) => { return [x0 + t * r0, y0 - t] }
        this.getTbyXY = ([x, y]) => y - y0

        var calc1 = this.pointByT(10)
        var calc2 = this.pointByT(-10)
        var dy = calc1[1] - calc2[1]
        var dx = calc1[0] - calc2[0]
        this.m = dy / dx
        this.b = calc1[1] - this.m * calc1[0]
        
    }
    getTscore([x, y]) {
        var t = this.getTbyXY([x, y])
        return Math.sign(t) * pythagorean(this.pointByT(t), this.pointByT(0))
    }
    pointByX(x) {
        return [x, this.m * x + this.b]
    }
    pointByY(y) {
        return [(y - this.b) / this.m, y]
    }
    mid() {
        return this.pointByT(0)
    }
    intersection(line) {
        var x = (line.b - this.b) / (this.m - line.m)
        return this.pointByX(x)
    }
    getBoundaryIntercept(xbound, ybound) {
        var yzero = this.pointByY(0)
        var ymax = this.pointByY(ybound)
        var xzero = this.pointByX(0)
        var xmax = this.pointByX(xbound)
        var bounders = []
        if (yzero[0] > 0 && yzero[0] < xbound) {
            bounders.push(yzero)
        }
        if (ymax[0] > 0 && ymax[0] < xbound) {
            bounders.push(ymax)
        }
        if (xzero[1] > 0 && xzero[1] < ybound) {
            bounders.push(xzero)
        }
        if (xmax[1] > 0 && xmax[1] < ybound) {
            bounders.push(xmax)
        }
        return bounders
    }
    getPolarity([x, y]) {
        var [cx, cy] = this.pointByX(x)
        if (cy > y) {
            return 0
        }
        else {
            return 1
        }
    }
}
function pythagorean([x1, y1], [x2, y2]) {
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
}
function sortFunction(a, b) {
    if (a.dist === b.dist) {
        return 0;
    }
    else {
        return (a.dist < b.dist) ? -1 : 1;
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function makemid([x1, y1], [x2, y2]) {
    return [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2]
}
function clean(lis){
    var outlis=[]
    var outObj={list:[],complete:false}
    
    

   var indexes=[]
    var curr=0
    //console.log(`og curr = ${curr}`)
    //console.log(`possibilities ${F(lis,curr).left} and ${F(lis,curr).right}`)
    //console.log(`defualt left`)
    indexes.push(curr)
    var right=true
    var last=curr 
    var that=F(lis,curr)
    curr=that.left
    if(curr=='b'){
        curr=that.right
        if(curr=='b'){
            outObj.list=[lis[0]]
            return outObj
        }
    }
    else{
        right=false
    }
    var currobj=F(lis,curr)
    outlis.push(lis[0])
    var count=0
    do{
        currobj=F(lis,curr)
        outlis.push(currobj)
        //console.log(outlis)
        //console.log(`curr = ${curr}`)
        //console.log(`possibilities ${currobj.left} and ${currobj.right}`)
        if(currobj.left==last){
            last=curr
            curr=currobj.right
            //console.log(`choose ${currobj.right}`)
        }
        else{
            last=curr
            curr=currobj.left
            //console.log(`choose ${currobj.left}`)
        }
        count+=1
        if(count>200){
            console.log(outlis)
            console.log(curr)
            break
        }
        //console.log("clean loop1")
        //console.log(outlis.map(E=>E.id))
        //console.log(curr)
    }while(curr!=0&&curr!='b'&&!outlis.map(E=>E.id).includes(curr))
    if(curr==0){
        outObj.complete=true
    }


    if(curr=='b'&&!right){
        curr=lis[0].right
        while(curr!=0&&curr!='b'){
            currobj=F(lis,curr)
            outlis.push(currobj)
            //console.log(outlis)
            //console.log(`curr = ${curr}`)
            //console.log(`possibilities ${currobj.left} and ${currobj.right}`)
            if(currobj.left==last){
                last=curr
                curr=currobj.right
                //console.log(`choose ${currobj.right}`)
            }
            else{
                last=curr
                curr=currobj.left
                //console.log(`choose ${currobj.left}`)
            }
            //console.log("clean loop2")
        }
    }
    var mentions=[]
    outlis.forEach(E=>{mentions.push(E.left); mentions.push(E.right)})
    var niglist=[...new Set(mentions)]
    outlis.filter(E=>{return niglist.includes(E.id)})

    outObj.list=outlis
    
    return outObj



}
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
function F(lis,key){
    return lis.filter(E=>E.id==key)[0]
}