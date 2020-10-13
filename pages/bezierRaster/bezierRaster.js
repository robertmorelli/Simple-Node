
async function printImage(evt) {
        var canvas = document.createElement("canvas");
        canvas.width = 1000
        canvas.height = 1000
        var ctx = canvas.getContext("2d");
            
        var imgData = ctx.getImageData(0, 0, 1000,1000)
        

        ctx.putImageData(parab(imgData),0,0)
        document.body.appendChild(canvas);

}


function redLol(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        //alpha
        if((ind+1)% 4 == 0){
            acc[ind]=255
        }
        //red
        if((ind)% 4 == 0 ){
            acc[ind]=255
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[ind]=0
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[ind]=0
        }
        return acc
    },clamp)


    return new ImageData(data,imgData.width,imgData.height)
}


function coolColors(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    
    
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        
        //red
        if((ind)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)/imgData.width)*255/1000
        }
        //green
        if((ind+3)% 4 == 0 ){
            acc[ind]=((Math.floor((ind)/(4*imgData.width)-500))**2+((ind/4)%(imgData.width)-500)**2)**.5*(300/1000)
        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)%imgData.width)*255/1000
        }
        
        return acc
    },clamp)


    return new ImageData(data,imgData.width,imgData.height)
}



function parab(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    
    
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        
        //red
        if((ind)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)/imgData.width)*255/1000
            var dists=Array(3)
            var dist=((Math.floor((ind)/(4*imgData.width)-500))**2+((ind/4)%(imgData.width)-500)**2)**.5
            dists[0]=((Math.floor((ind)/(4*imgData.width)-200))**2+((ind/4)%(imgData.width)-200)**2)**.5
            dists[1]=((Math.floor((ind)/(4*imgData.width)-800))**2+((ind/4)%(imgData.width)-200)**2)**.5
            dists[2]=((Math.floor((ind)/(4*imgData.width)-500))**2+((ind/4)%(imgData.width)-800)**2)**.5
            //var dif=dist-Math.min(...dists)
            //dif=Math.sqrt(Math.abs(dif))*Math.sign(dif)
            //(Math.floor(ind/4)/imgData.width)*255/1000*
            //255*((dif<-10)+(dif<0)*(dif>-10)*(Math.abs(dif)))
            acc[ind]=(Math.floor(ind/4)/imgData.width)*255/1000*(dist>Math.min(...dists))
        
        
        }
        //green
        if((ind+3)% 4 == 0 ){
            var dif=((Math.floor((ind)/(4*imgData.width)-500))**2+((ind/4)%(imgData.width)-500)**2)**.5-(Math.floor(ind/4)/imgData.width)
            
            
            acc[ind]=(dif<3)*(255*(dif<0)+(3-dif)*85)
            
            
            return acc
            

        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)%imgData.width)*255/1000
        }
        
        return acc
    },clamp)


    return new ImageData(data,imgData.width,imgData.height)
}



function parabNoAlias(imgData){
    var clamp = new Uint8ClampedArray(imgData.data.length)
    
    
    var data=imgData.data.reduce((acc,itt,ind,lis)=>{
        if((ind+1)% 4 == 0){
            acc[ind]=255
            return acc
        }
        
        //red
        if((ind)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)/imgData.width)*255/1000
        }
        //green
        if((ind+3)% 4 == 0 ){
           
            
            
            acc[ind]=((Math.abs((Math.floor((ind)/(4*imgData.width)-500))**2+((ind/4)%(imgData.width)-500)**2)**.5-(Math.floor(ind/4)/imgData.width)<20))*255
            
            
            return acc
            

        }
        //blue
        if((ind+2)% 4 == 0 ){
            acc[ind]=(Math.floor(ind/4)%imgData.width)*255/1000
        }
        
        return acc
    },clamp)


    return new ImageData(data,imgData.width,imgData.height)
}