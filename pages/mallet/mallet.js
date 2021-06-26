function start(){
    //makeMallet("text",[['click',e=>{console.log("hihih")}]])
    ele=document.getElementById("text")
    ele.addEventListener("click",e=>{console.log("hi")})
    //console.log("hi")
    
}



function makeMallet(id,fun){
    ele=document.getElementById(id)
    document.addEventListener(fun[0][0],fun[0][1])
}