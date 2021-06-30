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
DrawTool.threshhold = 4
DrawTool.Click = E => {}
DrawTool.Move = E => {
    var X = x(E)
    var Y = y(E)
    if(((Math.abs(DrawTool.points[DrawTool.points.length-1]-Y)**2+
    Math.abs(DrawTool.points[DrawTool.points.length-2]-X)**2)<DrawTool.threshhold**2)&&DrawTool.count>1
    ){
        if(DrawTool.threshhold>5){
            try{fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${DrawTool.string}Q ${
                ((((X | 0) - (DrawTool.points[DrawTool.points.length-2] | 0)) / 2) 
                + (DrawTool.points[DrawTool.points.length-2] | 0))
            } ${
                ((((Y | 0) - (DrawTool.points[DrawTool.points.length-1] | 0)) / 2) 
                + (DrawTool.points[DrawTool.points.length-1] | 0))
            } ${X} ${Y}"/>`)}catch{}
        }
        else{
            try{fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${DrawTool.string}"/>`)}catch{}
        }
        return
    }

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
    fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${DrawTool.string}L${X} ${Y}"/>`)
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
    if(DrawTool.count<2){return}
    if(DrawTool.threshhold>5){
        var X = x(E)
        var Y = y(E)
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
        DrawTool.points.push(X)
        DrawTool.points.push(Y)
    }
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
        datastring : `${DrawTool.string}` ,
        closeing : "</path>" ,
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
AnimateSnakeTool.Click = E => {}
AnimateSnakeTool.Move = E => {}
AnimateSnakeTool.End = E => {}
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
            document.getElementById(tool).setAttribute("color","secondary")
        }
        else{
            document.getElementById(tool).setAttribute("color","tertiary")
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
    if( ( E.timeStamp - clickTimeStamp ) < 200 ){
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
    if((E.timeStamp-clickTimeStamp)>=200){
        CurrentTool.End(E)
    }
    fastDraw("")
}

function touchUpHandle(E){
    document.removeEventListener('touchmove',CurrentTool.Move)
    if((E.timeStamp-clickTimeStamp)>=200){
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