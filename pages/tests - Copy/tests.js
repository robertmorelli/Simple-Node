function makeCategories(id) {
    header = `<select onchange="selectCategory(this)" id="${id}">`
    options = `<option value="random">Random</option>`
    for (const [key, value] of Object.entries(problems)) {
        options += `<option value="${key}">${key}</option>`
    }
    footer = `</select>`
    return header + options + footer
}

function makeSubCategories(Category) {
    options = `<option value="random">Random</option>`
    for (const [key, value] of Object.entries(problems[Category])) {
        options += `<option value="${key}">${key}</option>`
    }
    return options
}

function selectCategory(self) {
    console.log("hi")
    sub = document.getElementById(self.id).value
    ele = document.getElementById(self.id + "sub")
    ele.innerHTML = makeSubCategories(sub)
}


function load() {
    console.log("hi")
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
    console.log(problems)


}

function makeTestArea() {
    questionsbox = document.getElementById("questions").value
    firstName = document.getElementById("firstName").value
    lastName = document.getElementById("lastName").value
    testarea = document.getElementById("testarea")
    internal = `<p>Professor: ${firstName} ${lastName}</P>
    <p>total points: ${questionsbox*10}</P>
    `;
    for (x = 1; x <= questionsbox; x++) {
        internal += `<p>question ${x}: ${makeCategories(x)}<select id="${x}sub"><option>--</option></select></p>`;
    }
    testarea.innerHTML = internal;
}