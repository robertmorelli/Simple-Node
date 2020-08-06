function PushOffset(V,I){
    k.push(  offset(  dotpoints[I],V,1))
    k.push(  offset(V,  dotpoints[I],-1))
}

function offset(a,b,d){
    return [parseInt(a[0])+(  delta(b[1],a[1])*d/   pyth(a,b))*10  ,  parseInt(a[1])   - (  delta(b[0],a[0])*d/   pyth(b,a))*10]
}

function dotpoint(E){
    dotpoints.push([  x(E),  y(E)])
    if(  dotpoints.length>2){
        k=[];
        console.log(dotpoints)
        console.log(dotpoints.slice(1).concat( dotpoints.slice(0,1)))
        dotpoints.slice(1).concat( dotpoints.slice(0,1)).forEach((V,I)=>  PushOffset(V,I))
    
    var c =   k.map(([x,y],I)=> {
        if(I==0){
        return `M ${x} ${y}` 
        }
        else{
        if(I%2==0){
        return ` A 10 10 0 0 1 ${x} ${y} `
        }
        if(I%2==1){
        return ` L ${x} ${y} `
        }

    
    }
    
    }).concat([` A 10 10 0 0 1 ${  k[0][0]} ${  k[0][1]}`])
        COLDelements[1].string =`<path style="fill:none;stroke:black;stroke-width:1" d="M ${  dotpoints.map(E=>  stringify(E)).join(" L ")} z" />`
        COLDelements[0].string = `<path style="fill:none;stroke:black;stroke-width:1" d="${c.join(" ")}" />`
        COLDelements[1].string +=  makeabucketofpoints(  k)+  makeabucketofpoints(Array([100,100],[200,300],  offset([100,100],[200,300],1)))
    }

}

function makeabucketofpoints(L){
    return L.map(([x,y])=>`<circle cx="${x}" cy="${y}" style="fill:blue;stroke:blue;stroke-width:1" r="1" />`)

}

function getrandomhex(length){
    var possibilities=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
    var out=`#`;
    var i;
    for (i = 0; i < length; i++) {
        out += possibilities[Math.floor(Math.random()*possibilities.length+1)]
    }  
    return out
}


var index=0
var currlength=0
var currentline=[]
while (index<lineP.length) {
  while(currlength<length&&index+1<lineP.length){
      currentline.push(lineP[index])
      console.log(pyth(lineP[index],lineP[index+1]))
      currlength+=pyth(lineP[index],lineP[index+1])
      index+=1
  }
  var toout=smoothline(currentline)
  console.log(toout)
  endlist.push(toout)
  currentline=[]
  currlength=0
  index+=1
}







var angles=[]
        var correction=0
        for(var i=1;i<lengthofpath/10;i++){
            var p1=svgtemp.getPointAtLength(10*i-1)
            var p2=svgtemp.getPointAtLength(10*i+1)   
            var angy=calcAngleDegrees([p1.x,p2.x],[p1.y,p2.y])
            
            angles.push(angy)
           
        }





if(angles[angles.length-1]-angy+correction>110){
    correction+=-360
}  
if(angy-angles[angles.length-1]+correction>110){
    correction+=360
}



/*for(var i=1;i<angles.length-1;i++){
            var dif=angles[i]-angles[i-1]
            if(dif>150){
                ang+=360-(dif)
            }
            else{
                ang+=dif
            }
ngles2.push(ang)
            a
        }*/

        toElements.string += `<line stroke="black" stroke-width="4" transformm="" x1="0" x2="10" y1="0" y2="0" >
        
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          values="${angles.slice(1).join(" 110 40;")}" 
                          repeatCount="indefinite" 
                          dur="10s"
                          />`




/*


 <!--<ion-chip  id="printB" style="--background: #772020;color:#ffffff" >
                    <ion-icon name="md-print">
              
                    </ion-icon>
                    <ion-label>
                      download
                    </ion-label>
                  </ion-chip>-->

<!--<ion-chip id="imageB" color="tertiary" onclick="image()">
                  <ion-label>
                    <ion-icon name="md-images">
                    </ion-icon>
                  </ion-label>
                </ion-chip>

                <ion-chip id="menuB" color="primary"
                  (click)="makeAfunc('idabe',[[13,15],[17,37],[36,37],[47,48],[36,37],[48,59],[59,59],[48,48]],6,[[20,0],[70,0]])">
                  <ion-label>
                    <ion-icon name="ios-apps">
                    </ion-icon>
                  </ion-label>
                </ion-chip>-->










                <!----overflow: hidden;            class="ion-padding-top"

<ion-content style="--background:#222222"  >



<ion-grid>
  <ion-row>
    <ion-col size="6" style="height: 100%;">

    <ion-chip>
    hi
  </ion-chip>
</ion-col>


<ion-col>
  
-->

<!--
  <div *ngIf="OptionsV" class="ion-padding-top ion-text-center">

    <ion-chip style="--background: #772020;color:#ffffff" (click)="return()">
      <ion-icon name="ios-arrow-dropleft-circle"></ion-icon>
      <ion-label>
        return
      </ion-label>
    </ion-chip>
    
    <ion-chip style="--background: #772020;color:#ffffff">
      <ion-icon name="md-cloud-upload">

      </ion-icon>
      <ion-label>
        upload
      </ion-label>
    </ion-chip>



  </div>
  -->

  <!--[innerHTML]="sanitizer.bypassSecurityTrustHtml(getSVG())"
  <div *ngIf="!OptionsV && !routingmode">

    <ion-chip class="ion-padding-top ion-text-center" style="color:transparent;--background:transparent">

    </ion-chip>


  </div>
  -->





      <!--
    </ion-col>
    </ion-row>
    </ion-grid>
</ion-content>
-->






<style>
          .borb {
            transform: translate(100, 100);
          }
        </style>






        <!--<ion-range id="wiggle" *ngIf="mode=='wiggly'" (ionChange)="setThicc()" min="1" max="20" step="1" pin="true" snap="true" color="secondary">
              </ion-range>-->




<!--mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-->











   //points.push([10,10])
    //points.push([10,20])
    //points.push([20,10])
    //points.push([10,40])
    //points.push([20,10])

    /*
    dists = []
    sortdists = []
    for (var k = 0; k < amount; k++) {
        dists.push([])
    }
    lines = []
    for (var m = 0; m < amount; m++) {
        for (var n = m + 1; n < amount; n++) {
            var dist = pythagorean(points[m], points[n])
            dists[m].push({ m: m, n: n, dist: dist })
            dists[n].push({ m: n, n: m, dist: dist })
            //sortdists.push({ m: m, n: n, dist: dist })
        }
        dists[m].sort(sortFunction)
        lines[m]=[]
    dists[m].forEach(element => {
        lines[m].push(new perpline(points[element.m], points[element.n]))
    })
    //console.log(dists[m].length)
    //console.log(dists[m])

    }
    */









/*
addafter.push(
                        {
                            id:j,
                            left:0,
                            right:'b',
                            scores:[0,0],
                            points:[(pp==pt ? bon[0] : bon[1]),int]
                        }
                    )



addafter.push(
                        {
                            id:j,
                            left:'b',
                            right:0,
                            scores:[0,0],
                            points:[(pp==pt ? bon[0] : bon[1]),int]
                        }
                    )








var currentline=usedlines[point]
        if(!currentline){
            continue
        }
        var inter = newline.intersection(currentline.line)
        if(inter[0]>1000||inter[1]>1000){
            continue
        }
        if(inter[0]<-1000||inter[1]<-1000){
            continue
        }
        if(!currentline.intercepts.negative.use&&!currentline.intercepts.positive.use){
            continue
        }
        //var tscore=newline.getTbyXY(inter)
        var tscore=newline.getTscore(inter)
        var currtscores={negative:currentline.intercepts.negative.score,positive:currentline.intercepts.positive.score}
        console.log(tscore,currtscores.negative,currtscores.positive)
        if(tscore>currtscores.negative&&tscore<0){
            console.log(tscore)
            console.log("negative")
            if(currentline.intercepts.negative.id!='noid'){
            usedlines[currentline.intercepts.negative.id].intercepts.negative.use=false
            }
            usedlines[point].intercepts.negative={point:inter,id:i,score:tscore,dist:pythagorean(inter,points[0]),use:true}
            tolines.intercepts.negative={point:inter,id:p,score:tscore,dist:pythagorean(inter,points[0]),use:true}
        }

        if(tscore<currtscores.positive&&tscore>0){
            console.log(tscore)
            console.log("positive")
            if(currentline.intercepts.positive.id!='noid'){
            usedlines[currentline.intercepts.positive.id].intercepts.positive.use=false
            }
            usedlines[point].intercepts.positive={point:inter,id:i,score:tscore,dist:pythagorean(inter,points[0]),use:true}
            tolines.intercepts.positive={point:inter,id:p,score:tscore,dist:pythagorean(inter,points[0]),use:true}
        }





*/




 //console.log(`score was ${score} so it chose ${out[0][1]} over ${out[0][0]}`)
        //console.log(`score ${out[0][1]} is assosiated with ${out[1][1]}`)
        //console.log(`therefore it chooses ${out[1][1]}`)
        //console.log(`the line [${out[1][1]}===>>>${int}]`)
/console.log(`og curr = ${curr}`)
    //console.log(`possibilities ${F(lis,curr).left} and ${F(lis,curr).right}`)
    //console.log(`defualt left`)

        /*if(!rightb){
        var curr=lis[0].right
        while(curr!='b'&&curr!=lis[0].left){
            
            outlis.push(lis[curr])
            if(lis[curr].left==curr){
                console.log(`so the left is ${lis[curr].left} and curr is ${curr}`)
                console.log(`so the new curr is ${lis[curr].right}`)
                curr=lis[curr].right
            }
            else{
                console.log(`so the left is ${lis[curr].left} and curr is ${curr}`)
                console.log(`so the new curr is ${lis[curr].left}`)
                curr=lis[curr].left
            }
        }
    }
    if(!leftb){
        var curr=lis[0].left
        while(curr!='b'&&curr!=lis[0].right){
            
            outlis.push(lis[curr])
            if(lis[curr].left==curr){
                console.log(`so the left is ${lis[curr].left} and curr is ${curr}`)
                console.log(`so the new curr is ${lis[curr].right}`)
                curr=lis[curr].right
            }
            else{
                console.log(`so the left is ${lis[curr].left} and curr is ${curr}`)
                console.log(`so the new curr is ${lis[curr].left}`)
                curr=lis[curr].left
            }
        }
    }
    */


              




            
            //toOut.points=[possibleLeft[0],possibleRight[0]]
            
            //inters.map(e=>makeline(e.points[0],e.points[1]))+
           // if(inters.length>6){
           //     inters=clean(inters).list
            //}
            /*if(inters[0].left!='b'&&inters[0].right!='b'){
                //console.log("in check mode")
                doonce=false
                var possiblefordist=[]
                inters.forEach(E=>{
                    possiblefordist.push(E.points[1])
                    possiblefordist.push(E.points[0])
                })
                //console.log(possiblefordist)
                var possibledists=possiblefordist.map(E=>{return pythagorean(E,points[point])})
                var max=Math.max(...possibledists)
                //console.log(max)
                //console.log(dists[point])
                //var tobreak=false
                if(max*2<dists2[j]){

                    j =lines2.length;
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
                  //console.log(`calc points ${calc1} ${calc2}`)
                  var dy = calc1[1] - calc2[1]
                  var dx = calc1[0] - calc2[0]
                  //console.log(`dx dy ${dx} ${dy}`)
                  this.m = dy / dx
                  //console.log(`m ${this.m}`)
                  this.b = calc1[1] - this.m * calc1[0]
                  //console.log(`b ${this.b} `)
                  
              
              this.getTscore=function([x, y]) {
                  var t = this.getTbyXY([x, y])
                  return Math.sign(t) * pythagorean(this.pointByT(t), this.pointByT(0))
              }
              
              this.pointByY=function(y) {
                  return [(y - this.b) / this.m, y]
              }
              this.mid=function() {
                  return this.pointByT(0)
              }
              this.intersection=function(line) {
                  var x = (line.b - this.b) / (this.m - line.m)
                  return this.pointByX(x)
              }
              this.getBoundaryIntercept=function(xbound, ybound) {
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
              
              if(x1==x2){
                  this.pointByX=function(x) {
                      return [x, this.m * x + this.b]
                  }
                  console.log(`this one x`)
                  this.getPolarity=function([x, y]) {
                      if(x>x1){
                          return 1
                      }
                      else{
                          return 0
                      }
                  }
          
              }
              else{
              if(y1==y2){
                  console.log(`this one y`)
                  this.getPolarity=function([x, y]) {
                      if(y>y1){
                          return 1
                      }
                      else{
                          return 0
                      }
                  }
          
          
          
              }
              else{
                  this.pointByX=function(x) {
                      return [x, this.m * x + this.b]
                  }
                  this.getPolarity=function([x, y]) {
                      //console.log([x,y])
                      
                      var [cx, cy] = this.pointByX(x)
                      
                      
                          console.log('hi')
                      
                      if (cy > y) {
                          return 0
                      }
                      else {
                          return 1
                      }
                  }
              }
          }
          
          
          
              }
          }


































































var maker=smoothline(  lineP).split("Q")[1].split(",")
    var endlist=[]
    var length=2
    for (i = 1; i < maker.length/length; i++) {
        
        var work = maker.slice(i*length-length,i*length)
        var toout=`M ${work.slice(0,2)} Q ${work.slice(2,length-2)} L ${work.slice(length-2,length)}`
        console.log(toout)

        endlist.push(toout)
      }
      for (i = 1; i < lineP.length/length; i++) {
        
        var work = lineP.slice(i*length-length,i*length)
        var toout=smoothline(work)
        console.log(toout)

        endlist.push(toout)
      }



    
      toElements.string =`<path fill="none" stroke-linecap="round"  stroke-width="${lineT}" style="stroke:rgb(${  red},${  green},${  blue})" stroke="black">
      <animate attributeName="d" values="${endlist.join(";")}" dur="1s" repeatCount="indefinite" /></path>`      
      */