DrawTool = {}
DrawTool.name = "Draw"
DrawTool.string = ""
DrawTool.count = 0
DrawTool.points = []
DrawTool.pointsComputed = []
DrawTool.threshhold = 3
DrawTool.Click = E => {
    X = x(E)
    Y = y(E)
    coldobject = {
        id: `${idCounter++}`,
        type: "Dot",
        opening: "circle",
        openingstring: "<circle>",
        style: {
            "style": `fill:rgb(${redValue},${greenValue},${blueValue})`,
            "r": `${thickValue/2}`,
            "x": X,
            "y": Y
        },
        stylestring: ` cx="${X}" cy="${Y}" style="fill:rgb(${redValue},${greenValue},${blueValue})" r="${thickValue/2}"`,
        data: {
            x: X,
            y: Y,
        },
        datastring: "",
        closeing: "</circle>",
        selfclosed: true,
        interior: [],
        hasinterior: false,
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

    if (((Math.abs(DrawTool.points[DrawTool.points.length - 1] - Y) ** 2 +
            Math.abs(DrawTool.points[DrawTool.points.length - 2] - X) ** 2) < DrawTool.threshhold ** 2) && DrawTool.count > 1) { return }

    if (DrawTool.count > 1) {
        DrawTool.string +=
            ` ${
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
        fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${DrawTool.string}"/>
        `)

    } else if (DrawTool.count == 0) {
        DrawTool.string += `M ${X} ${Y} Q`
    }
    if (DrawTool.count > 1) {
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length - 2])
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length - 1])
        DrawTool.pointsComputed.push(((((X | 0) - (DrawTool.points[DrawTool.points.length - 2] | 0)) / 2) +
            (DrawTool.points[DrawTool.points.length - 2] | 0)))
        DrawTool.pointsComputed.push(((((Y | 0) - (DrawTool.points[DrawTool.points.length - 1] | 0)) / 2) +
            (DrawTool.points[DrawTool.points.length - 1] | 0)))
    }
    DrawTool.points.push(X)
    DrawTool.points.push(Y)
    DrawTool.count++
}
DrawTool.End = E => {
    //var X = x(E)
    //var Y = y(E)
    if (DrawTool.count < 2) { return }
    if (DrawTool.threshhold > 5) {
        //var X = x(E)
        //var Y = y(E)
        DrawTool.string +=
            ` ${
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
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length - 2])
        DrawTool.pointsComputed.push(DrawTool.points[DrawTool.points.length - 1])
        DrawTool.pointsComputed.push(((((X | 0) - (DrawTool.points[DrawTool.points.length - 2] | 0)) / 2) +
            (DrawTool.points[DrawTool.points.length - 2] | 0)))
        DrawTool.pointsComputed.push(((((Y | 0) - (DrawTool.points[DrawTool.points.length - 1] | 0)) / 2) +
            (DrawTool.points[DrawTool.points.length - 1] | 0)))

    }
    DrawTool.points.push(X)
    DrawTool.points.push(Y)
    coldobject = {
        id: `${idCounter++}`,
        type: "Drawing",
        opening: "path",
        openingstring: "<path>",
        style: {
            "stroke-linecap": "round",
            "fill": "none",
            "style": `stroke:rgb(${redValue},${greenValue},${blueValue})`,
            "stroke-width": thickValue + "",
        },
        stylestring: `stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}"`,
        data: {
            points: DrawTool.points,
            computedpoints: DrawTool.computedpoints,
        },
        datastring: `${DrawTool.string}L${X} ${Y}`,
        closing: "</path>",
        selfclosed: true,
        interior: [],
        hasinterior: false,
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
    if (((Math.abs(AnimateMoveTool.points[AnimateMoveTool.points.length - 1] - Y) ** 2 +
            Math.abs(AnimateMoveTool.points[AnimateMoveTool.points.length - 2] - X) ** 2) < AnimateMoveTool.threshhold ** 2) && AnimateMoveTool.count > 1) { return }

    if (AnimateMoveTool.count > 1) {
        AnimateMoveTool.string +=
            ` ${
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
        fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:black" stroke-width="5" d="${AnimateMoveTool.string}"/>
              <path stroke-linecap="round" fill="none" style="stroke:white" stroke-width="3" d="${AnimateMoveTool.string}"/>`)

    } else if (AnimateMoveTool.count == 0) {
        AnimateMoveTool.string += `M ${X} ${Y} Q`
    }

    if (AnimateMoveTool.count > 1) {
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length - 2])
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length - 1])
        AnimateMoveTool.pointsComputed.push(((((X | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length - 2] | 0)) / 2) +
            (AnimateMoveTool.points[AnimateMoveTool.points.length - 2] | 0)))
        AnimateMoveTool.pointsComputed.push(((((Y | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length - 1] | 0)) / 2) +
            (AnimateMoveTool.points[AnimateMoveTool.points.length - 1] | 0)))
    }
    AnimateMoveTool.points.push(X)
    AnimateMoveTool.points.push(Y)
    AnimateMoveTool.count++
}
AnimateMoveTool.End = E => {
    if (AnimateMoveTool.count < 2) { return }
    if (AnimateMoveTool.threshhold > 5) {
        AnimateMoveTool.string +=
            ` ${
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
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length - 2])
        AnimateMoveTool.pointsComputed.push(AnimateMoveTool.points[AnimateMoveTool.points.length - 1])
        AnimateMoveTool.pointsComputed.push(((((X | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length - 2] | 0)) / 2) +
            (AnimateMoveTool.points[AnimateMoveTool.points.length - 2] | 0)))
        AnimateMoveTool.pointsComputed.push(((((Y | 0) - (AnimateMoveTool.points[AnimateMoveTool.points.length - 1] | 0)) / 2) +
            (AnimateMoveTool.points[AnimateMoveTool.points.length - 1] | 0)))

    }
    AnimateMoveTool.points.push(X)
    AnimateMoveTool.points.push(Y)
    if (slowItems.length == 0) {
        AnimateMoveTool.string = ""
        AnimateMoveTool.count = 0
        AnimateMoveTool.points = []
        AnimateMoveTool.pointsComputed = []
        return
    }
    target = slowItems[slowItems.length - 1]
    var avx = 0;
    var avy = 0;
    target.data.points.forEach((E, ind) => { if (ind % 2 == 0) { avx += E } else { avy += E } })
    avx = avx * 2 / target.data.points.length
    avy = avy * 2 / target.data.points.length

    coldobject = {
        id: `${idCounter++}`,
        type: "moveGroup",
        opening: "g",
        openingstring: "<g>",
        style: {
            transform: `translate(${-avx},${-avy})`
        },
        stylestring: `transform="translate(${-avx},${-avy})"`,
        data: {
            points: AnimateMoveTool.points,
            pointsComputed: AnimateMoveTool.pointsComputed,
            center: [-avx, -avy]
        },
        datastring: ``,
        closing: "</g>",
        selfclosed: false,
        interior: [],
        hasinterior: true
    }
    coldobject.interior = [target, {
        id: `${idCounter++}`,
        type: "move",
        opening: "animateMotion",
        openingstring: "<animateMotion>",
        style: {
            dur: "6s",
            repeatCount: "indefinite",
            path: AnimateMoveTool.string,
        },
        stylestring: `dur="6s" rotate="auto"  repeatCount="indefinite" path="${AnimateMoveTool.string}z"`,
        data: {
            points: AnimateMoveTool.points,
            pointsComputed: AnimateMoveTool.pointsComputed
        },
        datastring: ``,
        closing: "/>",
        selfclosed: true,
        interior: [],
        hasinterior: false
    }]
    coldobject.pausedVersion = coldobject
    slowItems.pop()
    slowItems.push(coldobject)
    AnimateMoveTool.string = ""
    AnimateMoveTool.count = 0
    AnimateMoveTool.points = []
    AnimateMoveTool.pointsComputed = []
    slowDraw()
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
AnimateInsectTool.string = ""
AnimateInsectTool.count = 0
AnimateInsectTool.points = []
AnimateInsectTool.pointsComputed = []
AnimateInsectTool.threshhold = 3
AnimateInsectTool.Click = E => {}
AnimateInsectTool.Move = E => {
    X = x(E)
    Y = y(E)
    if (((Math.abs(AnimateInsectTool.points[AnimateInsectTool.points.length - 1] - Y) ** 2 +
            Math.abs(AnimateInsectTool.points[AnimateInsectTool.points.length - 2] - X) ** 2) < AnimateInsectTool.threshhold ** 2) && AnimateInsectTool.count > 1) { return }

    if (AnimateInsectTool.count > 1) {
        AnimateInsectTool.string +=
            ` ${
            AnimateInsectTool.points[AnimateInsectTool.points.length-2]
        } ${
            AnimateInsectTool.points[AnimateInsectTool.points.length-1]
        } ${
            ((((X | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length-2] | 0)) / 2) 
            + (AnimateInsectTool.points[AnimateInsectTool.points.length-2] | 0))
          } ${
            ((((Y | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length-1] | 0)) / 2) 
            + (AnimateInsectTool.points[AnimateInsectTool.points.length-1] | 0))
          } `
        fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${AnimateInsectTool.string}"/>`)
    } else if (AnimateInsectTool.count == 0) {
        AnimateInsectTool.string += `M ${X} ${Y} Q`
    }
    if (AnimateInsectTool.count > 1) {
        AnimateInsectTool.pointsComputed.push(AnimateInsectTool.points[AnimateInsectTool.points.length - 2])
        AnimateInsectTool.pointsComputed.push(AnimateInsectTool.points[AnimateInsectTool.points.length - 1])
        AnimateInsectTool.pointsComputed.push(((((X | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length - 2] | 0)) / 2) +
            (AnimateInsectTool.points[AnimateInsectTool.points.length - 2] | 0)))
        AnimateInsectTool.pointsComputed.push(((((Y | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length - 1] | 0)) / 2) +
            (AnimateInsectTool.points[AnimateInsectTool.points.length - 1] | 0)))
    }
    AnimateInsectTool.points.push(X)
    AnimateInsectTool.points.push(Y)
    AnimateInsectTool.count++
}
AnimateInsectTool.End = E => {
    if (AnimateInsectTool.count < 2) { return }
    if (AnimateInsectTool.threshhold > 5) {
        AnimateInsectTool.string +=
            ` ${
                AnimateInsectTool.points[AnimateInsectTool.points.length-2]
            } ${
                AnimateInsectTool.points[AnimateInsectTool.points.length-1]
            } ${
                ((((X | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length-2] | 0)) / 2) 
                + (AnimateInsectTool.points[AnimateInsectTool.points.length-2] | 0))
            } ${
                ((((Y | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length-1] | 0)) / 2) 
                + (AnimateInsectTool.points[AnimateInsectTool.points.length-1] | 0))
            } `
        AnimateInsectTool.pointsComputed.push(AnimateInsectTool.points[AnimateInsectTool.points.length - 2])
        AnimateInsectTool.pointsComputed.push(AnimateInsectTool.points[AnimateInsectTool.points.length - 1])
        AnimateInsectTool.pointsComputed.push(((((X | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length - 2] | 0)) / 2) +
            (AnimateInsectTool.points[AnimateInsectTool.points.length - 2] | 0)))
        AnimateInsectTool.pointsComputed.push(((((Y | 0) - (AnimateInsectTool.points[AnimateInsectTool.points.length - 1] | 0)) / 2) +
            (AnimateInsectTool.points[AnimateInsectTool.points.length - 1] | 0)))

    }
    AnimateInsectTool.points.push(X)
    AnimateInsectTool.points.push(Y)

    paths = ""
    for (var u = 0; u < AnimateInsectTool.points.length - 6; u += 2) {
        var thisx1 = ((AnimateInsectTool.points[u + 2] - AnimateInsectTool.points[u]) / 2) + AnimateInsectTool.points[u]
        var thisxlast = ((AnimateInsectTool.points[u + 4] - AnimateInsectTool.points[u + 2]) / 2) + AnimateInsectTool.points[u + 2]

        var thisy1 = ((AnimateInsectTool.points[u + 3] - AnimateInsectTool.points[u + 1]) / 2) + AnimateInsectTool.points[u + 1]
        var thisylast = ((AnimateInsectTool.points[u + 5] - AnimateInsectTool.points[u + 3]) / 2) + AnimateInsectTool.points[u + 3]
            //paths = `M${thisx1},${thisy1}Q${AnimateInsectTool.points[u+2]},${AnimateInsectTool.points[u+3]},${thisxlast},${thisylast};` + paths +
            //   `M${thisx1},${thisy1}Q${AnimateInsectTool.points[u+2]},${AnimateInsectTool.points[u+3]},${thisxlast},${thisylast};`
        paths += `M${thisx1},${thisy1}Q${AnimateInsectTool.points[u+2]},${AnimateInsectTool.points[u+3]},${thisxlast},${thisylast};`
    }
    console.log(paths.slice(0, -1))

    coldobject = {
            id: `${idCounter++}`,
            type: "Insect",
            opening: "path",
            openingstring: "<path>",
            style: {
                "stroke-linecap": "round",
                "fill": "none",
                "style": `stroke:rgb(${redValue},${greenValue},${blueValue})`,
                "stroke-width": thickValue + "",
            },
            stylestring: `stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}"`,
            data: {
                points: AnimateInsectTool.points,
                computedpoints: AnimateInsectTool.computedpoints,
            },
            datastring: ``,
            closing: "</path>",
            selfclosed: false,
            interior: [],
            hasinterior: true,
        }
        /*
        <animate xmlns="http://www.w3.org/2000/svg" id="0,item" attributeName="d" values="M 253,159  Q 253,159,257,158.5 ;M 286,154  Q 286,154,302,149 ;M 335,138  Q 335,138,350.5,132.5 ;M 392,120  Q 392,120,396.5,119.5 ;M 414,126  Q 414,126,416,133.5 ;M 418,154  Q 418,154,416.5,170 ;M 410,228  Q 410,228,409.5,241 ;M 409,307  Q 409,307,414.5,328 ;M 430,364  Q 430,364,444,373.5 ;M 498,389  Q 498,389,508.5,388 ;M 571,374  Q 571,374,602.5,361.5 ;M 667,335  Q 667,335,698,323 " dur="800ms" repeatCount="indefinite"/>

        */
    coldobject.interior = [{
        id: `${idCounter++}`,
        type: "animation",
        opening: "animate",
        openingstring: "<animate>",
        style: {
            "attributeName": "d",
            "values": paths,
            "dur": "1000ms",
            "repeatCount": "indefinite"
        },
        stylestring: ` attributeName="d" values="${paths}" dur="1000ms" repeatCount="indefinite"`,
        data: {
            points: AnimateInsectTool.points,
            computedpoints: AnimateInsectTool.computedpoints,
        },
        datastring: ``,
        closing: "</animate>",
        selfclosed: true,
        interior: [],
        hasinterior: false,
    }]
    coldobject.pausedVersion = coldobject
    slowItems.push(coldobject)
    AnimateInsectTool.string = ""
    AnimateInsectTool.count = 0
    AnimateInsectTool.points = []
    AnimateInsectTool.pointsComputed = []
    slowDraw()
}
AnimateInsectTool.Complete = E => {}
























AnimateSnakeTool = {}
AnimateSnakeTool.name = "AnimateSnake"
AnimateSnakeTool.string = ""
AnimateSnakeTool.count = 0
AnimateSnakeTool.points = []
AnimateSnakeTool.pointsComputed = []
AnimateSnakeTool.threshhold = 3
AnimateSnakeTool.Click = E => {
    X = x(E)
    Y = y(E)
    coldobject = {
        id: `${idCounter++}`,
        type: "Dot",
        opening: "circle",
        openingstring: "<circle>",
        style: {
            "style": `fill:rgb(${redValue},${greenValue},${blueValue})`,
            "r": `${thickValue/2}`,
            "x": X,
            "y": Y
        },
        stylestring: ` cx="${X}" cy="${Y}" style="fill:rgb(${redValue},${greenValue},${blueValue})" r="${thickValue/2}"`,
        data: {
            x: X,
            y: Y,
        },
        datastring: "",
        closeing: "</circle>",
        selfclosed: true,
        interior: [],
        hasinterior: false,
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
    if (((Math.abs(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1] - Y) ** 2 +
            Math.abs(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2] - X) ** 2) < AnimateSnakeTool.threshhold ** 2) && AnimateSnakeTool.count > 1) { return }

    if (AnimateSnakeTool.count > 1) {
        AnimateSnakeTool.string +=
            ` ${
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
        fastDraw(`<path stroke-linecap="round" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}" d="${AnimateSnakeTool.string}"/>`)
    } else if (AnimateSnakeTool.count == 0) {
        AnimateSnakeTool.string += `M ${X} ${Y} Q`
    }
    if (AnimateSnakeTool.count > 1) {
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2])
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1])
        AnimateSnakeTool.pointsComputed.push(((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2] | 0)) / 2) +
            (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2] | 0)))
        AnimateSnakeTool.pointsComputed.push(((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1] | 0)) / 2) +
            (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1] | 0)))
    }
    AnimateSnakeTool.points.push(X)
    AnimateSnakeTool.points.push(Y)
    AnimateSnakeTool.count++
}
AnimateSnakeTool.End = E => {
    if (AnimateSnakeTool.count < 2) { return }
    if (AnimateSnakeTool.threshhold > 5) {
        AnimateSnakeTool.string +=
            ` ${
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
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2])
        AnimateSnakeTool.pointsComputed.push(AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1])
        AnimateSnakeTool.pointsComputed.push(((((X | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2] | 0)) / 2) +
            (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 2] | 0)))
        AnimateSnakeTool.pointsComputed.push(((((Y | 0) - (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1] | 0)) / 2) +
            (AnimateSnakeTool.points[AnimateSnakeTool.points.length - 1] | 0)))

    }
    AnimateSnakeTool.points.push(X)
    AnimateSnakeTool.points.push(Y)
    coldobject = {
            id: `${idCounter++}`,
            type: "SnakePath",
            opening: "path",
            openingstring: "<path>",
            style: {
                "stroke-linecap": "round",
                "fill": "none",
                "style": `stroke:rgb(${redValue},${greenValue},${blueValue})`,
                "stroke-width": thickValue + "",
                "Stroke-dasharray": "100 1000000"
            },
            stylestring: `stroke-linecap="round" Stroke-dasharray="100 1000000" fill="none" style="stroke:rgb(${redValue},${greenValue},${blueValue})" stroke-width="${thickValue}"`,
            data: {
                points: AnimateSnakeTool.points,
                computedpoints: AnimateSnakeTool.computedpoints,
            },
            datastring: `${AnimateSnakeTool.string}L${X} ${Y}`,
            closing: "</path>",
            selfclosed: false,
            interior: [],
            hasinterior: true,
        }
        //<animate id="0,item"  attributeName="stroke-dashoffset" values="0;-675.715087890625" dur="2s" repeatCount="indefinite"  />
    var testPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    testPath.setAttribute("d", `${AnimateSnakeTool.string}L${X} ${Y}`)
    var lennn = testPath.getTotalLength()
    coldobject.interior = [{
        id: `${idCounter++}`,
        type: "SnakeAnimation",
        opening: "animate",
        openingstring: "<animate>",
        style: {
            "attributeName": "stroke-dashoffset",
            "values": "0;-${lennn-100}",
            "dur": "2s",
            "repeatCount": "indefinite"
        },
        stylestring: `attributeName="stroke-dashoffset" values="0;-${lennn-100}" dur="2s" repeatCount="indefinite"`,

        datastring: `${AnimateSnakeTool.string}L${X} ${Y}`,
        closing: "</animate>",
        selfclosed: true,
        interior: [],
        hasinterior: false,


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