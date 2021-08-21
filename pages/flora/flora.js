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

function load() {

    Tools = {
        "Draw": DrawTool,
        "AnimateMove": AnimateMoveTool,
        "AnimateArch": AnimateArchTool,
        "AnimateInsect": AnimateInsectTool,
        "AnimateSnake": AnimateSnakeTool,
        "AnimateTail": AnimateTailTool,
        "Select": SelectTool,
        "Blobframe": BlobframeTool
    }


    slowItems = []
    HOTsvg = document.getElementById("HOTTsvg")
    COLDsvg = document.getElementById("COLDsvg")
    DIVsvg = document.getElementById("DIVsvg")
    sliderConstructor()
    mouseConstructor()
    buttonSetWidthAutomatic()
    toolConstructor()
}

function toolConstructor() {
    for (var tool in Tools) {
        toolElement = document.getElementById(tool)
        toolElement.addEventListener('click', changeToolTo)
    }
    document.getElementById("Draw").setAttribute("style", "filter: invert()")

}

function changeToolTo(E) {
    CurrentTool = Tools[this.id]
    for (var tool in Tools) {
        if (tool != this.id) {
            //document.getElementById(tool).setAttribute("color","secondary")
            document.getElementById(tool).setAttribute("style", ``)
        } else {
            //document.getElementById(tool).setAttribute("color","tertiary")
            document.getElementById(tool).setAttribute("style", `filter: invert()`)
        }
    }
}

function changeToolToName(name) {
    CurrentTool = Tools[name]
    for (var tool in Tools) {
        if (tool != name) {
            //document.getElementById(tool).setAttribute("color","secondary")
            document.getElementById(tool).setAttribute("style", ``)
        } else {
            //document.getElementById(tool).setAttribute("color","tertiary")
            document.getElementById(tool).setAttribute("style", `filter: invert()`)
        }
    }
}


function mouseConstructor() {
    clickTimeStamp = 0
    CurrentTool = DrawTool
    mouseIsDown = false
    DIVsvg.addEventListener('click', clickHandle)
    DIVsvg.addEventListener('mousedown', mouseDownHandle)
    DIVsvg.addEventListener('touchstart', touchDownHandle)
    document.addEventListener('mouseup', mouseUpHandle)
    document.addEventListener('touchend', touchUpHandle)
}

function clickHandle(E) {
    if ((E.timeStamp - clickTimeStamp) < 100) {
        CurrentTool.Click(E)
    }
}

function mouseDownHandle(E) {
    document.addEventListener('mousemove', CurrentTool.Move)
    clickTimeStamp = E.timeStamp
    DIVbox = DIVsvg.getBoundingClientRect()
}

function touchDownHandle(E) {
    document.addEventListener('touchmove', touchMoveHandle)
    clickTimeStamp = E.timeStamp
    DIVbox = DIVsvg.getBoundingClientRect()
}

function mouseUpHandle(E) {
    document.removeEventListener('mousemove', CurrentTool.Move)
    if ((E.timeStamp - clickTimeStamp) >= 100) {
        CurrentTool.End(E)
    }
    fastDraw("")
}

function touchUpHandle(E) {
    document.removeEventListener('touchmove', CurrentTool.Move)
    if ((E.timeStamp - clickTimeStamp) >= 100) {
        CurrentTool.End(E)
    }
    fastDraw("")
}

function touchMoveHandle(E) {
    E.clientX = E.touches[0].clientX
    E.clientY = E.touches[0].clientY
    CurrentTool.Move(E)
}

function sliderConstructor() {
    redValue = 0
    greenValue = 0
    blueValue = 0
    thickValue = 9
        //red
    redSlider = document.getElementById("redSlider")
    redSlider.addEventListener("change", setStrokeStyle)
        //green
    greenSlider = document.getElementById("greenSlider")
    greenSlider.addEventListener("change", setStrokeStyle)
        //blue
    blueSlider = document.getElementById("blueSlider")
    blueSlider.addEventListener("change", setStrokeStyle)
        //thickness
    thicknessSlider = document.getElementById("thicknessSlider")
    thicknessSlider.addEventListener("change", setStrokeStyle)

    thicknessSlider.value = 3

    previewLine = document.getElementById("preview");
    setStrokeStyle()
}

function setStrokeStyle() {
    redValue = redSlider.value
    greenValue = greenSlider.value
    blueValue = blueSlider.value
    thickValue = thicknessSlider.value ** 2
    previewLine.setAttribute("stroke-width", "" + thickValue)
    previewLine.setAttribute("stroke", `rgb(${redValue},${greenValue},${blueValue})`)


}

function buttonSetWidthControlled() {
    maybeW = Number(document.getElementById("width").value)
    canvasH = Number(document.getElementById("height").value)
    canvasW = (maybeW > 350) ? maybeW : 350
    Array(HOTsvg, COLDsvg, DIVsvg).forEach(svg => {
        svg.setAttribute("width", canvasW.toString())
        svg.setAttribute("height", canvasH.toString())
    })
    document.getElementById("width").setAttribute("value", canvasW.toString())
    document.getElementById("height").setAttribute("value", canvasH.toString())
}

function buttonSetWidthAutomatic() {
    canvasH = window.innerHeight - 100;
    maybeW = window.innerWidth - 225;
    canvasW = (maybeW > 350) ? maybeW : 350
    Array(HOTsvg, COLDsvg, DIVsvg).forEach(svg => {
        svg.setAttribute("width", canvasW.toString())
        svg.setAttribute("height", canvasH.toString())
    })
    document.getElementById("width").setAttribute("value", canvasW.toString())
    document.getElementById("height").setAttribute("value", canvasH.toString())
}

function x(E) {
    return Math.round(E.clientX - DIVbox.left)
}

function y(E) {
    return Math.round(E.clientY - DIVbox.top)
}

function fastDraw(toDraw) {
    HOTsvg.innerHTML = toDraw
}

function slowDraw() {
    var HTMLString = ""
    for (var elemNum = 0; elemNum < slowItems.length; elemNum++) {
        elem = slowItems[elemNum]
            //console.log(stringifySlow(elem))
        HTMLString += stringifySlow(elem)
    }
    COLDsvg.innerHTML = HTMLString
}

function stringifySlow(elem) {
    return `<${elem.opening
    } id="${elem.id
    }" ${elem.stylestring
    } ${(elem.datastring.length>0)?`d="${elem.datastring}"`:""
    } ${(!elem.selfclosed)?">":"/>"
    } ${elem.hasinterior?elem.interior.map(stringifySlow).join(""):""
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