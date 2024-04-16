import './styles.css';

// group maker func

let groups = []

const addGroup = () => {
  const createGroupBtn = document.querySelector("#createGroup");
  const groupName = document.querySelector("#groupName");
  const inputs = document.querySelectorAll("input");
  const groupContainer = document.querySelector(".div1");

  let groupCount = 0

  class CreateGroupObj {
    constructor (groupNum) {
      this.groupNum = groupNum
    }

  }

  const createGroupDiv = (groupName) => {

    if (groupName.length <= 1 || groupName.length > 12) {
      alert("Name must be more than 1 but less than 13 characters")
      return
    }
  
    let newDiv = document.createElement("div")
    newDiv.classList.add("group")
    newDiv.id = groupCount

    let listBtn = document.createElement("button")
    listBtn.classList.add("createListBtn")
    listBtn.textContent = "add list"

    listBtn.addEventListener("click", () => {
      newDiv.appendChild(addList())
    })

    newDiv.appendChild(listBtn)

    let groupHeader = document.createElement("h3")
    groupHeader.textContent = groupName

    newDiv.appendChild(groupHeader)

    return newDiv
  }

  const clearInputs = () => {

    let arr = Array.from(inputs)

    arr.forEach(element => {
      element.value = ""
    });
  }

  createGroupBtn.addEventListener("click", () => {

    groupContainer.appendChild(createGroupDiv(groupName.value))

    groups.push(new CreateGroupObj(groupCount))
    console.log(groups)
    clearInputs()
    groupCount++
  })
}

// list maker func

const addList = () => {

  class CreateList {
    constructor(title, dueDate, description, priority) {
      this.title = title
      this.dueDate = dueDate
      this.description = description
      this.priority = priority
    }
  
  }

  const createListDiv = () => {

    const newDiv = document.createElement("div")
    newDiv.classList.add("list")

    let par = document.createElement("p")
    par.textContent = "ppp"
    newDiv.appendChild(par)

    console.log(listNum)

    return newDiv
  }

  return createListDiv()
}

addGroup()