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
        interior : [] ,
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
        interior : [] ,
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
AnimateMoveTool.string = ""
AnimateMoveTool.count = 0
AnimateMoveTool.points = []
AnimateMoveTool.pointsComputed = []
AnimateMoveTool.threshhold = 3
AnimateMoveTool.Click = E => {}
AnimateMoveTool.Move = E => {
    X = x(E)
    Y = y(E)
    if(((Math.abs(AnimateMoveTool.points[AnimateMoveTool.points.length-1]-Y)**2+
    Math.abs(AnimateMoveTool.points[AnimateMoveTool.points.length-2]-X)**2)<AnimateMoveTool.threshhold**2)&&AnimateMoveTool.count>1
    ){return}

    if(AnimateMoveTool.count>1){
        AnimateMoveTool.string+=
        `Q ${
            AnimateMoveTool.points[AnimateMoveTool.points.length-2]
        } ${
            AnimateMoveTool.points[AnimateMoveTool.points.length-1]
        } ${
            ((((X | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length-2] | 0)) / 2) 
            + (AnimateMoveTool.points[AnimateMoveTool.points.length-2] | 0))
          } ${
            ((((Y | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length-1] | 0)) / 2) 
            + (AnimateMoveTool.points[AnimateMoveTool.points.length-1] | 0))
          } `
    }
    else if(AnimateMoveTool.count==0){
        AnimateMoveTool.string+=`M ${X} ${Y} `
    }
    fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:black" stroke-width="5" d="${AnimateMoveTool.string}"/>
              <path stroke-linecap="round" fill="none" style="stroke:white" stroke-width="3" d="${AnimateMoveTool.string}"/>`)
    
    if(AnimateMoveTool.count>1){
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length-2])
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length-1])
        AnimateMoveTool.pointsComputed.push( ((((X | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length-2] | 0)) / 2) 
        + (AnimateMoveTool.points[AnimateMoveTool.points.length-2] | 0)))
        AnimateMoveTool.pointsComputed.push(((((Y | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length-1] | 0)) / 2) 
        + (AnimateMoveTool.points[AnimateMoveTool.points.length-1] | 0)))
    }
    AnimateMoveTool.points.push(X)
    AnimateMoveTool.points.push(Y)
    AnimateMoveTool.count++
}
AnimateMoveTool.End = E => {
    AnimateMoveTool.string = ""
    AnimateMoveTool.count = 0
    AnimateMoveTool.points = []
    AnimateMoveTool.pointsComputed = []
}
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
        interior : [] ,
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
        interior : [] ,
        hasinterior : true ,
        }
//<animate id="0,item"  attributeName="stroke-dashoffset" values="0;-675.715087890625" dur="2s" repeatCount="indefinite"  />
    var testPath=document.createElementNS("http://www.w3.org/2000/svg", "path");
    testPath.setAttribute("d", `${AnimateSnakeTool.string}L${X} ${Y}`)
    var lennn=testPath.getTotalLength()
    console.log(testPath)
    console.log(testPath)
    coldobject.interior = [{
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
        interior : [] ,
        hasinterior : false ,


    }]
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