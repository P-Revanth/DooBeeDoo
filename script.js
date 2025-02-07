//Pop up Code

let popup = document.getElementById("popup");
function add_New_List() {
    popup.style.visibility = "visible";
    popup.style.top = "40%";
    popup.style.left = "40%";
    popup.style.transform = "scale(1)";
}

//Calendar Code
let display = document.querySelector(".display");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let days = document.querySelector(".days");
let selected = document.querySelector(".selected");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function displayCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const numberOfDays = lastDay.getDate();

    let formattedDate = date.toLocaleString("en-US", { month: "long", year: "numeric" });
    display.innerHTML = `${formattedDate}`;

    for (let x = 1; x <= firstDayIndex; x++) {
        const div = document.createElement("div");
        div.innerHTML += "";

        days.appendChild(div);
    }
    for (let i = 1; i <= numberOfDays; i++) {
        let div = document.createElement("div");
        let presentDate = new Date(year, month, i);

        div.dataset.date = presentDate.toDateString();
        div.innerHTML += i;

        days.appendChild(div);
        if (presentDate.getFullYear() === new Date().getFullYear && presentDate.getMonth() === new Date().getMonth() && presentDate.getDate() === new Date().getDate()) {
            div.classList.add("current-date");
        }
    }
}

displayCalendar();

previous.addEventListener("click", () => {
    days.innerHTML = "";
    selected.innerHTML = "";

    if (month < 0) {
        month = 11;
        year = year - 1;
    }
    month = month - 1;
    date.setMonth(month);

    displayCalendar();
    displaySelected();
});

next.addEventListener("click", () => {
    days.innerHTML = "";
    selected.innerHTML = "";

    if (month > 11) {
        month = 0;
        year = year + 1;
    }
    month = month + 1;
    date.setMonth(month);

    displayCalendar();
    displaySelected();
});

function displaySelected() {
    const dayElements = document.querySelectorAll(".days div");
    dayElements.forEach((day) => {
        day.addEventListener("click", (e) => {
            const selectedDate = e.target.dataset.date;
            selected.innerHTML = `Selected Date : ${selectedDate}`;
        });
    });
}
displaySelected();

//New List Code
let todoList = document.getElementById("add-list");

let inputArray = [];

function addlist() {
    let inputList = document.getElementById("input-list").value;

    if (inputList == "") {
        alert("Please input something.!");
    }

    if (inputList.trim() !== "") {
        inputArray.push(inputList);
        updateTodoList();
        localStorage.setItem("todo", JSON.stringify(inputArray));
        document.getElementById("input-list").value = "";
    }
}

function updateTodoList() {
    todoList.textContent = "";

    for (let i = 0; i < inputArray.length; i++) {
        let task = document.createElement("li");
        let newtaskdiv = document.createElement("div");
        newtaskdiv.textContent = inputArray[i];
        newtaskdiv.dataset.index = i;

        let crossbtn = document.createElement("img");
        crossbtn.src = 'Crossbtn.svg';
        crossbtn.classList.add("cross-button");
        newtaskdiv.appendChild(crossbtn);

        crossbtn.addEventListener('click', function (e) {
            todoList.removeChild(task);
            let deleteIndex = parseInt(e.target.parentNode.dataset.index, 10);
            inputArray.splice(deleteIndex, 1);
            localStorage.setItem("todo", JSON.stringify(inputArray));
        });

        task.appendChild(newtaskdiv);
        newtaskdiv.classList.add("newelementdiv");
        todoList.appendChild(task);
    }
}

let storedTask = JSON.parse(localStorage.getItem("todo"));

if (storedTask) {
    inputArray = storedTask;
    updateTodoList();
}

//Close Popup Code
function closePopUp() {
    let endPopUp = document.getElementById("popup");
    endPopUp.style.visibility = "hidden";
    endPopUp.style.top = "20%";
    endPopUp.style.left = "5%";
    endPopUp.style.transform = "scale(0.1)";
}

document.getElementById("addbtn").addEventListener("click", closePopUp);

//Wish Code

document.addEventListener("DOMContentLoaded", function () {

    let dateMonth = document.getElementById("date-content");
    let wish = document.getElementById("wish");
    wish.textContent = "Good ";
    let time = date.getHours();
    let greetDate = date.getDate();
    let greetMonth = date.toLocaleString("default", { month: "long" }).slice(0, 3);
    // console.log(greetDate, greetMonth);
    dateMonth.innerHTML = `${greetDate}<br>${greetMonth}`;

    if ((time > 0) && (time < 12)) {
        wish.textContent = wish.textContent + "Morning";
    }
    else if ((time >= 12) && (time < 16)) {
        wish.textContent = wish.textContent + "Afternoon";
    }
    else if ((time >= 16) && (time < 19)) {
        wish.textContent = wish.textContent + "Evening";
    }
    else {
        wish.textContent = wish.textContent + "Night";
    }
});

// Add Task Code
let todoElement = document.getElementById("task-added");

let todoArray = [];

function addNewTask() {
    let inputElement = document.getElementById("task-input").value;

    if (inputElement == "") {
        alert("Please enter a task.!");
    }

    if (inputElement.trim() !== "") {
        todoArray.push(inputElement);
        addTodoElement();
        localStorage.setItem("todoelement", JSON.stringify(todoArray));
        document.getElementById("task-input").value = "";
    }
}

function addTodoElement() {
    todoElement.textContent = "";

    for (let i = 0; i < todoArray.length; i++) {
        let taskelement = document.createElement("li");
        let elementdiv = document.createElement("div");
        taskelement.appendChild(elementdiv);
        elementdiv.dataset.index = i;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        elementdiv.appendChild(checkbox);

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                spanText.style.textDecoration = "line-through";
            }
            else {
                spanText.style.textDecoration = "none";
            }
        });

        let spanText = document.createElement("span");
        spanText.textContent = todoArray[i];
        elementdiv.appendChild(spanText);

        let deletebtn = document.createElement("img");
        deletebtn.src = 'deletebtn.svg'
        deletebtn.classList.add("delete-btn");
        elementdiv.appendChild(deletebtn);

        deletebtn.addEventListener('click', function (event) {
            todoElement.removeChild(taskelement);
            let indextoRemove = parseInt(event.target.parentNode.dataset.index, 10);
            todoArray.splice(indextoRemove, 1);
            localStorage.setItem("todoelement", JSON.stringify(todoArray));
        });

        elementdiv.classList.add("newtaskelemendiv");
        todoElement.appendChild(taskelement);
    }
}

let storedElement = JSON.parse(localStorage.getItem("todoelement"));

if (storedElement) {
    todoArray = storedElement;
    addTodoElement();
}