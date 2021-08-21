function load() {
    problems = {
        "Division": {
            "6/16": "039482903", //   <img src="/problem::039482903">
            "5/14": "033453453",
            "3/15": "039345345",
            "8/17": "345345345",
        },
        "Subtraction": {
            "60-16": "039482903",
            "5/14": "033453453",
            "3/15": "039345345",
            "8/17": "345345345",
        },
        "Fractions": {
            "3+6/16": "039482903",
            "5/14": "033453453",
            "3/15": "039345345",
            "8/17": "345345345",
        },
        "Mixed Numbers": {
            "3+6/16": "039482903",
            "5/14": "033453453",
            "3/15": "039345345",
            "8/17": "345345345",
        }
    }
    currentNotCategories = Object.keys(problems)
    currentCategories = []
    ShuffleQuestions = []
    addCat = document.getElementById("newCatselect")
    newParameterBox = document.getElementById("newParameterBox")
    updateParamOPtions()

}

function addNewCategory() {
    cat = addCat.value
    if (!(cat in problems)) {
        return
    }
    currentNotCategories = remove(currentNotCategories, cat)
    currentCategories.push([cat, null])
    updateParamOPtions()
    index = 0
    stringy = ""
    for (const entry of currentCategories) {
        stringy += categorymaker(index++, entry[0], entry[1])
    }
    newParameterBox.innerHTML = stringy
}

function categorymaker(number, name, value) {
    return `<div id="${name}div" >${number+1}<a class="thingy" style="background-color: #622;">${name}</a>&emsp;
            <input id="${name}input" class="thingy" type="number" onchange="update('${name}', this)" ${value>0?`value="${value}"`:``} placeholder="number of questions">
            <button id="${name}button" class="thingy" onclick="removeParam('${name}', this)" >remove</button></div>`
}

function remove(arr, thing) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === thing) {
            arr.splice(i, 1);
        }
    }
    return arr
}

function updateParamOPtions() {
    stringy = ""
    for (const entry of currentNotCategories) {
        stringy += `<option>${entry}</option>`
    }
    addCat.innerHTML = stringy
}


function update(thing, self) {
    for (var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i][0] == thing) {
            currentCategories[i][1] = (self.value=="")?null:self.value
        }
    }
}

function removeParam(thing,self){
    currentNotCategories.push(thing)
    for (var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i][0] == thing) {
            currentCategories.splice(i, 1);
        }
    }
    updateParamOPtions()
    index = 0
    stringy = ""
    for (const entry of currentCategories) {
        stringy += categorymaker(index++, entry[0], entry[1])
    }
    newParameterBox.innerHTML = stringy
}





function assignQuestions(){
    ShuffleQuestions = []
    for (const entry of currentCategories) {
        if(entry[1] === null){
            paramError(1)
            return
        }
        else if(entry[1]>Object.keys(problems[entry[0]]).length){
            paramError(2)
            return
        }
        else{
            for(const [key,value] of Object.entries(problems[entry[0]])){
                ShuffleQuestions.push([entry[0],key,value])
            }
        }
    }
    paramError(0)
    shuffleArray(ShuffleQuestions)
    console.log(ShuffleQuestions)
    stringy=""
    ind=0
    for(const item of ShuffleQuestions){
        stringy += makeProblem(ind++,item)
    }
    document.getElementById("questionListBox").innerHTML = stringy
}

function paramError(num){
    if(num==0){
        document.getElementById("assignError").textContent=""
        return
    }
    if(num==1){
        document.getElementById("assignError").textContent="only the shadow knows what darkness lies in the hearts of men"
        return
    }
    if(num==2){
        document.getElementById("assignError").textContent="it sees"
        return
    }
}

function makeProblem(num,[Category, id, Description]){
    return `
        <div class="thingy">${num}
            <a class="thingy" style="background-color: #226; ">${Category}</a>
            <a class="thingy" style="background-color: #226; ">${id}</a>
            <a class="thingy" style="background-color: #226; ">${Description}</a>
            <button class="thingy" onclick="shuffle(${id})">swap</button>
        </div>`   
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}