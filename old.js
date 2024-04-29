import './styles.css';

// group maker func

let groups = {}
let groupCount = 0

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

  })

  const deleteBtn = document.createElement("div")
  deleteBtn.classList.add("deleteBtn")

  const deleteBtnInner = document.createElement("div")

  deleteBtn.appendChild(deleteBtnInner)

  divHeader.appendChild(deleteBtn)

  // event listener to delete a group
  deleteBtn.addEventListener("mousedown", () => {
    deleteBtnInner.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
  })
  deleteBtn.addEventListener("mouseup", () => {

    const groupContainer = document.querySelector(".group-container")

    groupContainer.removeChild(newDiv)

    delete groups[newDiv.id]

    console.log(newDiv.id, "group deleted")
  })

  return newDiv
}


// clears inputs from all input elements
const clearInputs = () => {
  const inputs = document.querySelectorAll("input");

  let arr = Array.from(inputs)

  arr.forEach(element => {
    element.value = ""
  });

  return groups.length
}

// vent listener to create groups
const createGroupBtn = document.querySelector(".create-btn");

createGroupBtn.addEventListener("click", () => {
  const groupContainer = document.querySelector(".group-container");
  const groupName = document.querySelector(".name-input");

  groupContainer.appendChild(createGroupHtml(groupName.value))

  groups[groupCount] = {}
  console.log(groups)
  clearInputs()
  closeForm()
  groupCount++
})
console.log(groups.length)





// list maker funcs

let listCount = 0

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
    deleteBtn.classList.add("deleteBtn")

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

      console.log(listCount, "list deleted", groups)
    })
    
    divHeader.appendChild(deleteBtn)
      .insertAdjacentElement('afterend', priority)
      .insertAdjacentElement('afterend', dueDate)

    divBody.appendChild(content)

    console.log(groups)

    listCount++
    return newDiv
  }

  return createListHtml(group)
}

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