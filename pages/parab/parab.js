

async function printImage() {
        var canvas = document.createElement("canvas");
        
            canvas.width = 1000
            canvas.height = 2000
            var ctx = canvas.getContext("2d");
            var imgData = ctx.getImageData(0, 0,1000,2000)
            var xScale=gaus(imgData,500,500,475)
            ctx.putImageData(xScale,0,0)
            document.body.appendChild(canvas);
        
        
}


function shadow1(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)-base
            
                acc[ind]=Math.abs(255*(dotdist/walldist))
                acc[ind]+=0
                
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}

function shadow2(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)-base
            
                acc[ind]=255-(Math.max(0,walldist-dotdist)**.7)*10
                
                
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}

function shadow3(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)-base
            
                acc[ind]=Math.abs((Math.floor(ind/4)%imgData.width)-500)*.4
                
                
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}

function shadow4(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)
            //dotdist>walldist-base
            if(true){
                acc[ind]=255
                if(Math.abs((Math.floor(ind/4)%imgData.width)-500)*1.3<Math.abs((Math.floor(ind/4)/imgData.width)-360)*.4){
                    //acc[ind]=Math.abs((Math.floor(ind/4)%imgData.width)-500)*250/walldist
                    acc[ind]=Math.abs((Math.floor(ind/4)/imgData.width)-360)*.4-Math.abs((Math.floor(ind/4)%imgData.width)-500)*((dotdist*1.2)/(walldist))*1.3
                    acc[ind]=255-acc[ind]
                
                }
            }
            
            else{ 
                    acc[ind]=255
            }   
            if(walldist<600){
                acc[ind]=255
                }
            
            
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}


function gaus(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)-base
            
                acc[ind]=20*Math.sqrt( -2.0 * Math.log( dotdist/1000 ) ) * Math.cos( 2.0 * Math.PI * dotdist/1000 );
                
                
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)


    
}

function yScaler(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            acc[ind]=(Math.floor(Math.floor(ind/4)/imgData.width))*.255
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}

function xScaler(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            acc[ind]=(Math.floor(ind/4)%imgData.width)*.255
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}


function distFromOrigin(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            acc[ind]=((pix%imgData.width)**2+(Math.floor(pix/imgData.width))**2)**.5*0.1803122292
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}



function manhattanFromOrigin(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            acc[ind]=((pix%imgData.width)+(Math.floor(pix/imgData.width)))*0.1275
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}


function distFromCenter(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            acc[ind]=((pix%imgData.width-500)**2+(Math.floor(pix/imgData.width)-500)**2)**.5*0.4
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}


function manhattanFromCenter(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            acc[ind]=(Math.abs((pix%imgData.width)-500)+Math.abs(Math.floor(pix/imgData.width)-500))*0.255
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}






function light(imgData,x,y,base){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var out=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        else{
            var pix=Math.floor(ind/4)
            var dotdist=((pix%imgData.width-x)**2+(Math.floor(pix/imgData.width)-y)**2)**.5
            var walldist=Math.floor(pix/imgData.width)-base
            
                acc[ind]=255*walldist/dotdist
        }
        return acc
    },clamp)
    return new ImageData(out,imgData.width,imgData.height)
}