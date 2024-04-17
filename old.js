import './styles.css';

// group maker func

let groups = []

const addGroup = () => {
  const groupName = document.querySelector("#groupName");

  const createGroupHtml = (groupName) => {

    if (groupName.length <= 1 || groupName.length > 12) {
      alert("Name must be more than 1 but less than 13 characters")
      return
    }
  
    const newDiv = document.createElement("div")
    newDiv.classList.add("group")
    newDiv.id = groups.length

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

      console.log(groups[newDiv.id].length)
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

    return groups.length
  }

  const createGroupBtn = document.querySelector("#createGroup");

  createGroupBtn.addEventListener("click", () => {
    const groupContainer = document.querySelector(".div1");

    groupContainer.appendChild(createGroupHtml(groupName.value))

    groups.push([])
    console.log(groups)
    clearInputs()
  })
  console.log(groups.length)
}



// list maker func

const addList = (group, listInfo) => {

  let listCount = groups[group.id].length

  class CreateList {
    constructor(title, dueDate, priority, description) {
      this.title = title
      this.dueDate = dueDate
      this.priority = priority
      this.description = description
    }
  }
  
  groups[group.id].push(new CreateList(listInfo[0], listInfo[1], listInfo[2], listInfo[3]))

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

    let title = document.createElement("h3")
    title.textContent = listInfo[0]
    let dueDate = document.createElement("p")
    dueDate.textContent = `Due-date: ${listInfo[1]}`
    let priority = document.createElement("p")
    priority.textContent = `Priority: ${listInfo[2]}`

    const descriptionArr = listInfo[3]

    let description = document.createElement("p")
    description.textContent = ""

    for (let i = 0; i < descriptionArr.length; i++) {
      description.textContent += `. ${descriptionArr[i]}\r\n`
    }

    const deleteBtn = document.createElement("span")
    deleteBtn.textContent = "X"

    deleteBtn.addEventListener("click", () => {

      const groupBody = group.querySelector(".groupBody")

      groupBody.removeChild(newDiv)

      groups[group.id].splice(deleteBtn.id, 1)

      // if (listCount == 1) {
      //   console.log("less")
      //   groups[group.id].splice(0, 1)
      // } else {
      //   console.log("more")
      //   groups[group.id].splice(listCount, 1)
      // }
      console.log(listCount, "hi")
      console.log(groups)
    })
    
    divHeader.appendChild(title)
      .insertAdjacentElement('afterend', dueDate)
      .insertAdjacentElement('afterend', priority)
      .insertAdjacentElement('afterend', deleteBtn)

    divBody.appendChild(description)

    console.log(groups)

    return newDiv
  }

  return createListHtml(group)
}

addGroup()