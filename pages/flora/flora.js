/*
coldobject={
type=""
opening=""
openingstring=""
style={}
stylestring=""
data={}
datastring=""
closeing=""
autoclosed=false
interior={}
pausedVersion={}
}
*/

idCounter = 0



DrawTool = {}
DrawTool.name = "Draw"
DrawTool.string = ""
DrawTool.count = 0
DrawTool.points = []
DrawTool.pointsComputed = []
DrawTool.threshhold = 3
DrawTool.Click = E => {
    console.log("hello")
    X = x(E)
    Y = y(E)
    coldobject={
        id : `${idCounter++}` ,
        type : "Dot" ,
        opening : "circle" ,
        openingstring : "<circle>" ,
        style : {
            "style" : `fill:rgb(${redValue},${greenValue},${blueValue})` ,
            "r" : `${thickValue/2}` ,
            "x" : X,
            "y" : Y
        } ,
        stylestring : ` cx="${X}" cy="${Y}" style="fill:rgb(${redValue},${greenValue},${blueValue})" r="${thickValue/2}"` ,
        data : {
            x : X ,
            y : Y ,
        } ,
        datastring : "" ,
        closeing : "</circle>" ,
        selfclosed : true ,
        interior : {} ,
        hasinterior : false ,
        }
    coldobject.pausedVersion = coldobject
    slowItems.push(coldobject)
    DrawTool.string = ""
    DrawTool.count = 0
    DrawTool.points = []
    DrawTool.pointsComputed = []
    slowDraw()
}

DrawTool.Move = E => {
    X = x(E)
    Y = y(E)
    
    if(((Math.abs(DrawTool.points[DrawTool.points.length-1]-Y)**2+
    Math.abs(DrawTool.points[DrawTool.points.length-2]-X)**2)<DrawTool.threshhold**2)&&DrawTool.count>1
    ){return}

    if(DrawTool.count>1){
        DrawTool.string+=
        `Q ${
            DrawTool.points[DrawTool.points.length-2]
        } ${
            DrawTool.points[DrawTool.points.length-1]
        } ${
            ((((X | 0) - (DrawTool.points[DrawTool.points.length-2] | 0)) / 2) 
            + (DrawTool.points[DrawTool.points.length-2] | 0))
          } ${
            ((((Y | 0) - (DrawTool.points[DrawTool.points.length-1] | 0)) / 2) 
            + (DrawTool.points[DrawTool.points.length-1] | 0))
          } `
    }
    else if(DrawTool.count==0){
        DrawTool.string+=`M ${X} ${Y} `
    }
    fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${DrawTool.string}"/>`)
    if(DrawTool.count>1){
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length-2])
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length-1])
        DrawTool.pointsComputed.push( ((((X | 0) - (DrawTool.points[DrawTool.points.length-2] | 0)) / 2) 
        + (DrawTool.points[DrawTool.points.length-2] | 0)))
        DrawTool.pointsComputed.push(((((Y | 0) - (DrawTool.points[DrawTool.points.length-1] | 0)) / 2) 
        + (DrawTool.points[DrawTool.points.length-1] | 0)))
    }
    DrawTool.points.push(X)
    DrawTool.points.push(Y)
    DrawTool.count++
}
DrawTool.End = E => {
    //var X = x(E)
    //var Y = y(E)
    if(DrawTool.count<2){return}
    if(DrawTool.threshhold>5){
        //var X = x(E)
        //var Y = y(E)
        DrawTool.string+=
            `Q ${
                DrawTool.points[DrawTool.points.length-2]
            } ${
                DrawTool.points[DrawTool.points.length-1]
            } ${
                ((((X | 0) - (DrawTool.points[DrawTool.points.length-2] | 0)) / 2) 
                + (DrawTool.points[DrawTool.points.length-2] | 0))
            } ${
                ((((Y | 0) - (DrawTool.points[DrawTool.points.length-1] | 0)) / 2) 
                + (DrawTool.points[DrawTool.points.length-1] | 0))
            } `
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length-2])
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length-1])
        DrawTool.pointsComputed.push( ((((X | 0) - (DrawTool.points[DrawTool.points.length-2] | 0)) / 2) 
            + (DrawTool.points[DrawTool.points.length-2] | 0)))
        DrawTool.pointsComputed.push(((((Y | 0) - (DrawTool.points[DrawTool.points.length-1] | 0)) / 2) 
            + (DrawTool.points[DrawTool.points.length-1] | 0)))
        
    }
    DrawTool.points.push(X)
    DrawTool.points.push(Y)
    coldobject = {
        id : `${idCounter++}` ,
        type : "Drawing" ,
        opening : "path" ,
        openingstring : "<path>" ,
        style : {
            "stroke-linecap" : "round" ,
            "fill" : "none" ,
            "style" : `stroke:rgb(${redValue},${greenValue},${blueValue})` ,
            "stroke-width" : thickValue+"" ,
        } ,
        stylestring : `stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}"` ,
        data : {
            points : DrawTool.points ,
            computedpoints : DrawTool.computedpoints ,
        } ,
        datastring : `${DrawTool.string}L${X} ${Y}` ,
        closing : "</path>" ,
        selfclosed : true ,
        interior : {} ,
        hasinterior : false ,
        }
    coldobject.pausedVersion = coldobject
    slowItems.push(coldobject)
    DrawTool.string = ""
    DrawTool.count = 0
    DrawTool.points = []
    DrawTool.pointsComputed = []
    slowDraw()
}
DrawTool.Complete = E => {}

AnimateMoveTool = {}
AnimateMoveTool.name = "AnimateMove"
AnimateMoveTool.Click = E => {}
AnimateMoveTool.Move = E => {}
AnimateMoveTool.End = E => {}
AnimateMoveTool.Complete = E => {}

AnimateArchTool = {}
AnimateArchTool.name = "AnimateArch"
AnimateArchTool.Click = E => {}
AnimateArchTool.Move = E => {}
AnimateArchTool.End = E => {}
AnimateArchTool.Complete = E => {}

AnimateInsectTool = {}
AnimateInsectTool.name = "AnimateInsect"
AnimateInsectTool.Click = E => {}
AnimateInsectTool.Move = E => {}
AnimateInsectTool.End = E => {}
AnimateInsectTool.Complete = E => {}

AnimateSnakeTool = {}
AnimateSnakeTool.name = "AnimateSnake"
AnimateSnakeTool.string = ""
AnimateSnakeTool.count = 0
AnimateSnakeTool.points = []
AnimateSnakeTool.pointsComputed = []
AnimateSnakeTool.threshhold = 3
AnimateSnakeTool.Click = E => {
    console.log("hello")
    X = x(E)
    Y = y(E)
    coldobject={
        id : `${idCounter++}` ,
        type : "Dot" ,
        opening : "circle" ,
        openingstring : "<circle>" ,
        style : {
            "style" : `fill:rgb(${redValue},${greenValue},${blueValue})` ,
            "r" : `${thickValue/2}` ,
            "x" : X,
            "y" : Y
        } ,
        stylestring : ` cx="${X}" cy="${Y}" style="fill:rgb(${redValue},${greenValue},${blueValue})" r="${thickValue/2}"` ,
        data : {
            x : X ,
            y : Y ,
        } ,
        datastring : "" ,
        closeing : "</circle>" ,
        selfclosed : true ,
        interior : {} ,
        hasinterior : false ,
        }
    coldobject.pausedVersion = coldobject
    slowItems.push(coldobject)
    AnimateSnakeTool.string = ""
    AnimateSnakeTool.count = 0
    AnimateSnakeTool.points = []
    AnimateSnakeTool.pointsComputed = []
    slowDraw()
}

AnimateSnakeTool.Move = E => {
    X = x(E)
    Y = y(E)
    if(((Math.abs(AnimateSnakeTool.points[AnimateSnakeTool.points.length-1]-Y)**2+
    Math.abs(AnimateSnakeTool.points[AnimateSnakeTool.points.length-2]-X)**2)<AnimateSnakeTool.threshhold**2)&&AnimateSnakeTool.count>1
    ){return}

    if(AnimateSnakeTool.count>1){
        AnimateSnakeTool.string+=
        `Q ${
            AnimateSnakeTool.points[AnimateSnakeTool.points.length-2]
        } ${
            AnimateSnakeTool.points[AnimateSnakeTool.points.length-1]
        } ${
            ((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)) / 2) 
            + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0))
          } ${
            ((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)) / 2) 
            + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0))
          } `
    }
    else if(AnimateSnakeTool.count==0){
        AnimateSnakeTool.string+=`M ${X} ${Y} `
    }
    fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${AnimateSnakeTool.string}"/>`)
    if(AnimateSnakeTool.count>1){
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length-2])
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length-1])
        AnimateSnakeTool.pointsComputed.push( ((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)) / 2) 
        + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)))
        AnimateSnakeTool.pointsComputed.push(((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)) / 2) 
        + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)))
    }
    AnimateSnakeTool.points.push(X)
    AnimateSnakeTool.points.push(Y)
    AnimateSnakeTool.count++
}
AnimateSnakeTool.End = E => {
    //var X = x(E)
    //var Y = y(E)
    if(AnimateSnakeTool.count<2){return}
    if(AnimateSnakeTool.threshhold>5){
        //var X = x(E)
        //var Y = y(E)
        AnimateSnakeTool.string+=
            `Q ${
                AnimateSnakeTool.points[AnimateSnakeTool.points.length-2]
            } ${
                AnimateSnakeTool.points[AnimateSnakeTool.points.length-1]
            } ${
                ((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)) / 2) 
                + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0))
            } ${
                ((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)) / 2) 
                + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0))
            } `
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length-2])
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length-1])
        AnimateSnakeTool.pointsComputed.push( ((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)) / 2) 
            + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-2] | 0)))
        AnimateSnakeTool.pointsComputed.push(((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)) / 2) 
            + (AnimateSnakeTool.points[AnimateSnakeTool.points.length-1] | 0)))
        
    }
    AnimateSnakeTool.points.push(X)
    AnimateSnakeTool.points.push(Y)
    coldobject = {
        id : `${idCounter++}` ,
        type : "SnakePath" ,
        opening : "path" ,
        openingstring : "<path>" ,
        style : {
            "stroke-linecap" : "round" ,
            "fill" : "none" ,
            "style" : `stroke:rgb(${redValue},${greenValue},${blueValue})` ,
            "stroke-width" : thickValue+"" ,
            "Stroke-dasharray" : "100 1000000"
        } ,
        stylestring : `stroke-linecap="round" Stroke-dasharray="100 1000000" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}"` ,
        data : {
            points : AnimateSnakeTool.points ,
            computedpoints : AnimateSnakeTool.computedpoints ,
        } ,
        datastring : `${AnimateSnakeTool.string}L${X} ${Y}` ,
        closing : "</path>" ,
        selfclosed : false ,
        interior : {} ,
        hasinterior : true ,
        }
//<animate id="0,item"  attributeName="stroke-dashoffset" values="0;-675.715087890625" dur="2s" repeatCount="indefinite"  />
    var testPath=document.createElementNS("http://www.w3.org/2000/svg", "path");
    testPath.setAttribute("d", `${AnimateSnakeTool.string}L${X} ${Y}`)
    var lennn=testPath.getTotalLength()
    console.log(testPath)
    console.log(testPath)
    coldobject.interior = {
        id : `${idCounter++}` ,
        type : "SnakeAnimation" ,
        opening : "animate" ,
        openingstring : "<animate>" ,
        style : {
            "attributeName" : "stroke-dashoffset",
            "values" : "0;-${lennn-100}",
            "dur" : "2s",
            "repeatCount" : "indefinite"
        } ,
        stylestring : `attributeName="stroke-dashoffset" values="0;-${lennn-100}" dur="2s" repeatCount="indefinite"` ,
        
        datastring : `${AnimateSnakeTool.string}L${X} ${Y}` ,
        closing : "</animate>" ,
        selfclosed : true ,
        interior : {} ,
        hasinterior : false ,


    }
    coldobject.pausedVersion = coldobject
    slowItems.push(coldobject)
    AnimateSnakeTool.string = ""
    AnimateSnakeTool.count = 0
    AnimateSnakeTool.points = []
    AnimateSnakeTool.pointsComputed = []
    slowDraw()
}
AnimateSnakeTool.Complete = E => {}

AnimateTailTool = {}
AnimateTailTool.name = "AnimateTail"
AnimateTailTool.Click = E => {}
AnimateTailTool.Move = E => {}
AnimateTailTool.End = E => {}
AnimateTailTool.Complete = E => {}

SelectTool = {}
SelectTool.name = "Select"
SelectTool.Click = E => {}
SelectTool.Move = E => {}
SelectTool.End = E => {}
SelectTool.Complete = E => {}

BlobframeTool = {}
BlobframeTool.name = "Blobframe"
BlobframeTool.Click = E => {}
BlobframeTool.Move = E => {}
BlobframeTool.End = E => {}
BlobframeTool.Complete = E => {}


Tools={
    "Draw":DrawTool,
    "AnimateMove":AnimateMoveTool,
    "AnimateArch":AnimateArchTool,
    "AnimateInsect":AnimateInsectTool,
    "AnimateSnake":AnimateSnakeTool,
    "AnimateTail":AnimateTailTool,
    "Select":SelectTool,
    "Blobframe":BlobframeTool
}


function load(){
    slowItems = []
    HOTsvg = document.getElementById("HOTTsvg")
    COLDsvg = document.getElementById("COLDsvg")
    DIVsvg = document.getElementById("DIVsvg")
    sliderConstructor()
    mouseConstructor()
    buttonSetWidthAutomatic()
    toolConstructor()
}

function toolConstructor(){
    for(var tool in Tools){
        toolElement = document.getElementById(tool)
        toolElement.addEventListener('click',changeToolTo)
    }
}

function changeToolTo(E){
    CurrentTool = Tools[this.id]
    for(var tool in Tools){
        if(tool != this.id){
            //document.getElementById(tool).setAttribute("color","secondary")
            document.getElementById(tool).setAttribute("style",``)
        }
        else{
            //document.getElementById(tool).setAttribute("color","tertiary")
            document.getElementById(tool).setAttribute("style",`filter: invert()`)
        }
    }
}

function mouseConstructor(){
    clickTimeStamp = 0
    CurrentTool = DrawTool
    mouseIsDown = false
    DIVsvg.addEventListener( 'click' , clickHandle )
    DIVsvg.addEventListener( 'mousedown' , mouseDownHandle )
    DIVsvg.addEventListener( 'touchstart' , touchDownHandle )
    document.addEventListener( 'mouseup' , mouseUpHandle )
    document.addEventListener( 'touchend' , touchUpHandle )
}

function clickHandle( E ){
    if( ( E.timeStamp - clickTimeStamp ) < 100 ){
        CurrentTool.Click( E )
    }
}

function mouseDownHandle(E){
    document.addEventListener( 'mousemove' , CurrentTool.Move )
    clickTimeStamp=E.timeStamp
    DIVbox=DIVsvg.getBoundingClientRect()
}

function touchDownHandle(E){
    document.addEventListener( 'touchmove' , touchMoveHandle )
    clickTimeStamp=E.timeStamp
    DIVbox=DIVsvg.getBoundingClientRect()
}

function mouseUpHandle(E){
    document.removeEventListener('mousemove',CurrentTool.Move)
    if((E.timeStamp-clickTimeStamp)>=100){
        CurrentTool.End(E)
    }
    fastDraw("")
}

function touchUpHandle(E){
    document.removeEventListener('touchmove',CurrentTool.Move)
    if((E.timeStamp-clickTimeStamp)>=100){
        CurrentTool.End(E)
    }
    fastDraw("")
}

function touchMoveHandle(E){
    E.clientX = E.touches[0].clientX
    E.clientY = E.touches[0].clientY
    CurrentTool.Move(E)
}

function sliderConstructor(){
    redValue = 0
    greenValue = 0
    blueValue = 0
    thickValue = 9
    //red
    redSlider = document.getElementById("redSlider")
    redSlider.addEventListener("ionChange",setStrokeStyle)
    //green
    greenSlider = document.getElementById("greenSlider")
    greenSlider.addEventListener("ionChange",setStrokeStyle)
    //blue
    blueSlider = document.getElementById("blueSlider")
    blueSlider.addEventListener("ionChange",setStrokeStyle)
    //thickness
    thicknessSlider = document.getElementById("thicknessSlider")
    thicknessSlider.addEventListener("ionChange",setStrokeStyle)

    thicknessSlider.value = 3
}

function setStrokeStyle(){
    redValue = redSlider.value
    greenValue = greenSlider.value
    blueValue = blueSlider.value
    thickValue = thicknessSlider.value**2
}

function buttonSetWidthControlled(){
    maybeW = Number(document.getElementById("width").value)
    canvasH = Number(document.getElementById("height").value)
    canvasW = (maybeW > 350)?maybeW:350
    Array(HOTsvg, COLDsvg, DIVsvg).forEach(svg => {
        svg.setAttribute("width", canvasW.toString())
        svg.setAttribute("height", canvasH.toString())
    })
    document.getElementById("width").setAttribute("value", canvasW.toString())
    document.getElementById("height").setAttribute("value", canvasH.toString())
}

function buttonSetWidthAutomatic(){
    canvasH = window.innerHeight - 100;
    maybeW = window.innerWidth - 225;
    canvasW = (maybeW > 350)?maybeW:350
    Array(HOTsvg, COLDsvg, DIVsvg).forEach(svg => {
        svg.setAttribute("width", canvasW.toString())
        svg.setAttribute("height", canvasH.toString())
    })
    document.getElementById("width").setAttribute("value", canvasW.toString())
    document.getElementById("height").setAttribute("value", canvasH.toString())
}

function x(E){
    return Math.round(E.clientX - DIVbox.left)
}

function y(E){
    return Math.round(E.clientY - DIVbox.top)
}

function fastDraw(toDraw){
    HOTsvg.innerHTML = toDraw
}

function slowDraw(){
    var HTMLString = ""
    for(var elemNum = 0; elemNum < slowItems.length; elemNum++){
        elem = slowItems[elemNum]
        //console.log(stringifySlow(elem))
        HTMLString += stringifySlow(elem)
    }
    COLDsvg.innerHTML=HTMLString
}

function stringifySlow(elem){
    return `<${elem.opening
    } id="${elem.id
    }" ${elem.stylestring
    } ${(elem.datastring.length>0)?`d="${elem.datastring}"`:""
    } ${(!elem.selfclosed)?">":"/>"
    } ${elem.hasinterior?stringifySlow(elem.interior):""
    } ${(!elem.selfclosed)?elem.closing:""
    }`
}

function Reset(){
    slowItems = []
    slowDraw()
}

function BackOne(){
    slowItems.pop()
    slowDraw()
}


function save(button){
    var out = ` width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">${COLDsvg.innerHTML}</svg>`
    var clip = `data:image/svg+xml;utf8,<svg`
    button.setAttribute("download", document.getElementById("filename").value)
    button.href = clip + out
    setTimeout(function(){ button.removeAttribute("href"); }, 10);
    
}


/*
coldobject={
id=""
type=""
opening=""
openingstring=""
style={}
stylestring=""
data={}
datastring=""
closeing=""
selfclosed=false
interior={}
hasinterior=false
pausedVersion={}
}
*/