import './styles.css';

// group maker func

let groups = []

const addGroup = () => {
  const groupName = document.querySelector("#groupName");

  let groupCount = 0

  class CreateGroupObj {
    constructor (groupNum) {
      this.groupNum = groupNum
    }

  }

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
    listBtn.textContent = "add list"

    listBtn.addEventListener("click", () => {
      let infoArr = []
      const title = prompt("title?")
      const dueDate = prompt("due date?")
      const priority = prompt("priority?")
      const descriptionLength = prompt("How many bullet points do you want in your list?")
      let description = []
      for (let i = 0; i < descriptionLength; i++) {
        description.push(prompt("Add a bullet to your list"))
      }

      infoArr.push(title, dueDate, priority, description)

      divBody.appendChild(addList(newDiv, infoArr))
    })

    divHeader.appendChild(listBtn)

    return newDiv
  }

  const clearInputs = () => {
    const inputs = document.querySelectorAll("input");

    let arr = Array.from(inputs)

    arr.forEach(element => {
      element.value = ""
    });
  }

  const createGroupBtn = document.querySelector("#createGroup");

  createGroupBtn.addEventListener("click", () => {
    const groupContainer = document.querySelector(".div1");

    groupContainer.appendChild(createGroupHtml(groupName.value))

    groups.push(new CreateGroupObj(groupCount))
    console.log(groups)
    clearInputs()
    groupCount++
  })
}

// list maker func

const addList = (group, listInfo) => {

  class CreateList {
    constructor(title, dueDate, priority, description) {
      this.title = title
      this.dueDate = dueDate
      this.priority = priority
      this.description = description
    }
  }

  groups[group.id] = new CreateList(listInfo[0], listInfo[1], listInfo[2], listInfo[3])

  const createListHtml = (group) => {

    const newDiv = document.createElement("div")
    newDiv.classList.add("list")

    const divHeader = document.createElement("div")
    divHeader.classList.add("listHeader")
    newDiv.appendChild(divHeader)

    const divBody = document.createElement("div")
    divBody.classList.add("listBody")
    newDiv.appendChild(divBody)

    let title = document.createElement("h3")
    title.textContent = groups[group.id]['title']
    let dueDate = document.createElement("p")
    dueDate.textContent = `Due-date: ${groups[group.id]['dueDate']}`
    let priority = document.createElement("p")
    priority.textContent = `Priority: ${groups[group.id]['priority']}`

    const descriptionArr = groups[group.id]['description']

    let description = document.createElement("p")
    description.textContent = ""

    for (let i = 0; i < descriptionArr.length; i++) {
      description.textContent += `. ${descriptionArr[i]}\r\n`
    }
    
    divHeader.appendChild(title)
      .insertAdjacentElement('afterend', dueDate)
      .insertAdjacentElement('afterend', priority)

    divBody.appendChild(description)

    console.log(group.id)

    return newDiv
  }

  return createListHtml(group)
}

addGroup()