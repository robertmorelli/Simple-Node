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

function pythagorean([x1, y1], [x2, y2]) {
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
}
function load() {
    progress=document.getElementById('progress')
    //var cleantest=[{id: 0, left: 1, right: 2, points: Array(2)},{id: 1, left: 0, right: 7, points: Array(2)},{id: 2, left: 0, right: 4, points: Array(2)},{id: 3, left: 7, right: 4, points: Array(2)},{id: 4, left: 2, right: 3, points: Array(2)},{id: 7, left: 1, right: 3, points: Array(2)}]
    //console.log(clean(cleantest))

    var amount=document.getElementById("amount").value || 10

    elements = ''
    svg = document.getElementById("svg")
    points = []
    for (var i = 0; i < amount; i++) {
        points.push([Math.round(Math.random() * 1000)+Math.random(), Math.round(Math.random() * 1000)+Math.random()])
    }
    
    
    drawlines(points)
}




async function drawlines(points) {
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
        var boundery = lines2[0].getBoundaryIntercept(1000, 1000)
        inters = [{ id: 0, left: 'b', right: 'b', points: boundery }]


        //console.log(`the polarities according to the new line ${[p0,p1]}`)
        //console.log(`polarities of origin ${p}`)
        //console.log(lines.length)
        //var doonce=true
        for (var j = 1; j < accuracy; j++) {//lines2.length
            var bon = lines2[j].getBoundaryIntercept(1000, 1000)
            var toOut = {
                id: j,
                left: 'b',
                right: 'b',
                points: bon
            }
            var possibleLeft = [bon[0]]
            var possibleRight = [bon[1]]
            var use = false
            for (var i = 0; i < inters.length; i++) {
                //the polarity of the old line segment according to the new line
                var [p0, p1] = [lines2[j].getPolarity(inters[i].points[0]), lines2[j].getPolarity(inters[i].points[1])]
                //console.log(`----------------------------------------------`)
                //console.log(` id of new line is ${j}`)
                //console.log(`the polarities according to this line are ${[p0, p1]} `)
                var p = lines2[j].getPolarity(points[point])
                //console.log()

                var int = lines2[j].intersection(lines2[inters[i].id])

                //polarity of new line boundery intercepts according to the line from the id for the current line segment
                var [pt1, pt2] = [lines2[inters[i].id].getPolarity(bon[0]), lines2[inters[i].id].getPolarity(bon[1])]
                //console.log(` id of line is ${inters[i].id}`)
                //console.log(`the polarities according to this line are ${[pt1, pt2]} `)


                var pp = lines2[inters[i].id].getPolarity(points[point])
                //console.log(`the origin according to this line is ${pp}`)

                
                if (p0 != p1 && pt1!=pt2) {

                    


                    if (p == p0 ) {
                        //inters[i].left = j
                        //inters[i].points[1] = int
                        //console.log("left")
                        inters[i].right = j
                        //console.log(`the polarity on bounding point 0 is ${pt2}`)
                        //console.log(`the polarity of the cell point is ${pp}`)
                        
                        inters[i].points[1] = int
                        //elements +=
                        //makeline(inters[i].points[0], int, "#0072")
                        //possibleLeft.push(int)
                        
                    }
                    if (p == p1) {
                        //inters[i].right = j
                        //inters[i].points[0] = int
                        //console.log("right")
                        inters[i].left = j
                        //console.log(`the polarity on bounding point 0 is ${pt2}`)
                        //console.log(`the polarity of the cell point is ${pp}`)
                        inters[i].points[0]=int
                        //elements +=
                        //makeline(inters[i].points[1], int, "#0072")
                        
                        //possibleRight.push(int)
                        
                    }
                    if (pt1 == pp) {

                        ///console.log(`therefore we use ${bon[0]} because it will curve twards the cell point`)
                        // elements +=
                        //makeline(toOut.points[0], int, "#7002") //+ 
                        //makeline(bon[1], int,"red")+
                        //makecircle(points[0],"green")
                        toOut.right=inters[i].id
                        toOut.points[1] = int
                    
                    }
                    if(pt2 == pp){
                        //console.log(`therefore we use ${bon[1]} because it will curve twards the cell point`)
                        //elements +=
                        //makeline(toOut.points[1], int, "#7002") //+ 
                        //makeline(bon[0], int,"red")+
                        //makecircle(points[0],"green")
                        toOut.left=inters[i].id
                        toOut.points[0] = int
                    
                    }
                    //svg.innerHTML = elements + makecircle(points[0], "green")+inters.map(e => makeline(e.points[0], e.points[1]))
                    //await delay(500)
                use = true
                }

            }
            if (use){
                inters.push(toOut) 
            } 
            else{
                if(inters[0].right=='b'|| inters[0].left=='b'){
                    inters.push(toOut) 
                }
            }   

            
      
        }
        
        //elements 
        //console.log(point)
        inters=clean(inters).list
        finals.push(inters)
        elements+=inters.map(e => makeline(e.points[0], e.points[1],"bisque",40-12*Math.log10(points.length)))
        setprogress((point+1)/points.length)
        await delay(0)
        //await delay(500)
    }
    
     //+ makecircle(points[0], "green")
    
    svg.innerHTML = elements
    console.log(finals)
}
async function setprogress(inp){
    //console.log(inp)
    progress.setAttribute("width",`${1000*inp}`)
}

function betweenZeroAnd(X, test) {
    var signX = Math.sign(X)
    var signTest = Math.sign(test)
    if (signX == signTest && Math.abs(X) > Math.abs(test)) {
        return true
    }
    return false
}

function getSortFunction(point) {
    var sortBylength = (a, b) => {
        var [len1, len2] = [pythagorean(a, point), pythagorean(b, point)]
        if (len1 === len2) {
            return 0;
        }
        else {
            return (len1 < len2) ? -1 : 1;
        }

    }

    return sortBylength
}
function sortFunction(a, b) {
    if (a.dist === b.dist) {
        return 0;
    }
    else {
        return (a.dist < b.dist) ? -1 : 1;
    }
}

function maketext([x, y], name){
    //console.log(`<text x="${x}" y="${y}" >${name}</text>`)
    return `<text color="red" x="${x}" y="${y}" >${name}</text>`
}

function makecircle([x, y], color) {
    if (!color) {
        color = 'red'
    }
    return `<circle cx="${x}" cy="${y}" r="10" fill="${color}"/>`
}
function makeline([x1, y1], [x2, y2], color,thickness) {
    if (!color) {
        color = 'black'
    }
    
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${thickness||5}" stroke-linecap="round"  stroke="${color}"/>`
}

function makemid([x1, y1], [x2, y2]) {
    return [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2]
}


function makeBoundery(score, boundery, int, line) {
    out = [[line.getTbyXY(boundery[0]), line.getTbyXY(boundery[1])], boundery]

    if (Math.sign(out[0][0]) == Math.sign(score)) {
        //console.log(`score was ${score} so it chose ${out[0][1]} over ${out[0][0]}`)
        //console.log(`score ${out[0][1]} is assosiated with ${out[1][1]}`)
        //console.log(`therefore it chooses ${out[1][1]}`)
        //console.log(`the line [${out[1][1]}===>>>${int}]`)
        //elements += makeline(out[1][1], int, "orange")
        //elements += makeline(out[1][0], int, "green")
        out[0] = [out[0][1], score]
        out[1] = [out[1][1], int]
    }
    else {
        out[0] = [out[0][0], score]
        out[1] = [out[1][0], int]
    }

    return out

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
    }while(curr!=0&&curr!='b')
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
        }
    }



    outObj.list=outlis
    
    return outObj



}
function F(lis,key){
    return lis.filter(E=>E.id==key)[0]
}

