import './styles.css';

const groupContainer = document.querySelector(".group-container")

groupContainer.innerHTML = localStorage.getItem("groupsHtml")

// initialise groups obj and groupsObj key value pair in localStorage
let groups

if (localStorage.getItem("groupsObj") == undefined || localStorage.getItem("groupsObj") == null) {
  groups = {}
  localStorage.setItem("groupsObj", JSON.stringify({}))
} else {
  groups = JSON.parse(localStorage.getItem("groupsObj")) //json parse here
}

console.log(groups)

//initialise groupCount variable and groupCount key value pair in localStorage

let groupCount

if (localStorage.getItem("groupCount") == undefined || localStorage.getItem("groupCount") == null) {
  groupCount = 0
  localStorage.setItem("groupCount", groupCount)
} else {
  groupCount = localStorage.getItem("groupCount")
}

console.log(groupCount)

// creates Html of a group and has listBtn eventListener and deleteBtn eventlistener
const createGroupHtml = (groupName) => {

  if (groupName.length <= 1 || groupName.length > 12) {
    alert("Name must be more than 1 but less than 13 characters")
    return
  }
  
  const newDiv = document.createElement("div")
  newDiv.classList.add("group")
  newDiv.id = groupCount

  let divHeader = document.createElement("div")
  divHeader.classList.add("groupHeader")

  newDiv.appendChild(divHeader)

  let groupTitle = document.createElement("h3")
  groupTitle.textContent = groupName

  divHeader.appendChild(groupTitle)

  let divBody = document.createElement("div")
  divBody.classList.add("groupBody")

  newDiv.appendChild(divBody)

  let listBtn = document.createElement("button")
  listBtn.classList.add("createListBtn")
  listBtn.textContent = "add item"

  divHeader.appendChild(listBtn)

  // event listener to add a list to a group
  listBtn.addEventListener("click", () => {

    let infoArr = []
    const content = `. ${prompt("title?")}`
    const dueDate = prompt("due date?")
    const priority = prompt("priority?")

    infoArr.push(content, dueDate, priority)

    divBody.appendChild(addList(newDiv, infoArr))

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    listCount++
    localStorage.setItem("listCount", listCount)
  })

  const deleteBtn = document.createElement("div")
  deleteBtn.classList.add("deleteBtn")
  deleteBtn.setAttribute("id", groupCount)

  const deleteBtnInner = document.createElement("div")

  deleteBtn.appendChild(deleteBtnInner)

  divHeader.appendChild(deleteBtn)

  // event listeners to delete a group
  deleteBtn.addEventListener("mousedown", () => {
    deleteBtnInner.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
  })

  deleteBtn.addEventListener("mouseup", () => {

    const groupContainer = document.querySelector(".group-container")

    groupContainer.removeChild(newDiv)

    delete groups[newDiv.id]

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    console.log(newDiv.id, "group deleted")
  })

  return newDiv
}

//used to delete groups that were made before a reload

const groupDeleteButtonArr = Array.from(document.querySelectorAll(".deleteBtn"))

groupDeleteButtonArr.forEach(item => {
  item.addEventListener("click", () => {
    const parent = item.parentElement.parentElement
    console.log(parent)
    groupContainer.removeChild(parent, item)

    delete groups[item.id]

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    console.log(item.id, "group deleted")
    console.log(groups)
  })
});


// clears inputs from all input elements
const clearInputs = () => {
  const inputs = document.querySelectorAll("input");

  let arr = Array.from(inputs)

  arr.forEach(elem => {
    elem.value = ""
  });
}

// event listener to create groups
const createGroupBtn = document.querySelector(".create-btn");

createGroupBtn.addEventListener("click", () => {
  const nameInput = document.querySelector(".name-input");

  groupContainer.appendChild(createGroupHtml(nameInput.value))

  console.log(groupCount, groups)
  groups[groupCount] = {}
  console.log(groups)
  clearInputs()
  closeForm()
  localStorage.setItem("groupsHtml", groupContainer.innerHTML)
  localStorage.setItem("groupsObj", JSON.stringify(groups))
  groupCount++
  localStorage.setItem("groupCount", groupCount)
})

const inputForm = document.querySelector(".form-popup")

// prevents the form being able to be submitted by just pressing enter
inputForm.addEventListener("submit", (e) => {
  e.preventDefault()
})





// creates lists/tasks
let listCount

if (localStorage.getItem("listCount") == undefined || localStorage.getItem("listCount") == null) {
  listCount = 0
  localStorage.setItem("listCount", listCount)
} else {
  listCount = localStorage.getItem("listCount")
}

const addList = (group, listInfo) => {

  class CreateList {
    constructor(content, dueDate, priority) {
      this.content = content
      this.dueDate = dueDate
      this.priority = priority
    }
  }
  
  groups[group.id][listCount] = new CreateList(listInfo[0], listInfo[1], listInfo[2])

  const createListHtml = (group) => {

    const newDiv = document.createElement("div")
    newDiv.classList.add("list")
    console.log(listCount, "listCo")
    newDiv.setAttribute("id", listCount)

    const divHeader = document.createElement("div")
    divHeader.classList.add("listHeader")
    newDiv.appendChild(divHeader)

    const divBody = document.createElement("div")
    divBody.classList.add("listBody")
    newDiv.appendChild(divBody)

    let content = document.createElement("h3")
    content.textContent = listInfo[0]
    let dueDate = document.createElement("p")
    dueDate.textContent = `Due-date: ${listInfo[1]}`
    let priority = document.createElement("p")
    priority.textContent = `Priority: ${listInfo[2]}`

    const deleteBtn = document.createElement("div")
    deleteBtn.classList.add("listDeleteBtn", "deleteBtn")

    const deleteBtnInner = document.createElement("div")

    deleteBtn.appendChild(deleteBtnInner)

    // event listeners to delete a list
    deleteBtn.addEventListener("mousedown", () => {
      deleteBtnInner.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
    })

    deleteBtn.addEventListener("mouseup", () => {

      const groupBody = group.querySelector(".groupBody")

      groupBody.removeChild(newDiv)

      delete groups[group.id][newDiv.id]

      localStorage.setItem("groupsHtml", groupContainer.innerHTML)
      localStorage.setItem("groupsObj", JSON.stringify(groups))

      console.log(listCount, "list deleted", groups)
    })
    
    divHeader.appendChild(deleteBtn)
      .insertAdjacentElement('afterend', priority)
      .insertAdjacentElement('afterend', dueDate)

    divBody.appendChild(content)

    console.log(groups)

    return newDiv
  }

  return createListHtml(group)
}

//event listener to create a list

const listButtonArr = Array.from(document.querySelectorAll(".createListBtn"))

listButtonArr.forEach(item => {
  item.addEventListener("click", () => {
    const parent = item.parentElement.parentElement
    console.log(parent)

    let infoArr = []
    const content = `. ${prompt("title?")}`
    const dueDate = prompt("due date?")
    const priority = prompt("priority?")

    infoArr.push(content, dueDate, priority)

    item.parentElement.nextSibling.appendChild(addList(parent, infoArr))

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    listCount++
    localStorage.setItem("listCount", listCount)
  })
});

// event listener to delete a list

const listDeleteButtonArr = Array.from(document.querySelectorAll(".listDeleteBtn"))

listDeleteButtonArr.forEach(item => {

  item.addEventListener("mousedown", () => {
    item.firstChild.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
  })

  item.addEventListener("click", () => {
    const groupBody = item.parentElement.parentElement.parentElement
    console.log(groupBody)
    groupBody.removeChild(item.parentElement.parentElement)

    delete groups[item.id]

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    console.log(item.id, "group deleted")
    console.log(groups)
  })
});

// open/close form functions

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const openBtn = document.querySelector(".open-button")

openBtn.addEventListener("click", () => {
  openForm()
})

const closeBtn = document.querySelector(".cancel")

closeBtn.addEventListener("click", () => {
  closeForm()
  clearInputs()
})