
//Variabler för HTML-element
const addBtn = (<HTMLButtonElement>document.getElementById("add"));
const removeBtn = (<HTMLButtonElement>document.getElementById("remove"));
const name = document.getElementById("courseName") as HTMLInputElement;
const code = document.getElementById("courseCode") as HTMLInputElement;
const link = document.getElementById("link") as HTMLInputElement;
const progression = document.getElementById("progression") as HTMLInputElement;
const list = document.getElementById("courseList") as HTMLInputElement;
const errorMessage = document.getElementById("errorMessage") as HTMLInputElement;

//Laddar kurser från local storage
window.onload = () => {
  loadCourses();
  displayBtn();
}



//Eventlyssnare
addBtn.addEventListener("click", function(): void {
  if(name.value !== "" && code.value !== "" && link.value !== "" && progression.value !== "notSelected") {
    newObj();
    saveCourses();

    console.log(list.children.length)
  } else {
    errorMessage.innerHTML = "Fyll i alla fält.";
  }
});

function displayBtn(): void {
  if(list.children.length > 0){
    removeBtn.style.display = "block";

    removeBtn.addEventListener("click", function(): void {

      localStorage.clear();
      list.innerHTML = "";
    
    });

  } else {
    removeBtn.style.display = "none";
  }
}


//Interface för kursobjekt
interface course {
    courseName: string;
    courseCode: string;
    courseLink: string;
    courseProgress: string;
}

const courseArr: course[] = [];


//Skapar objekt med kurs och lägger till i array
function newObj () {

  const newCourse: course = {
    courseName: name.value,
    courseCode: code.value,
    courseLink: link.value,
    courseProgress: progression.value,
  };

  courseArr.push(newCourse);

  addCourses(courseArr);
}


//Lägger till i tabellen
function addCourses(allCourses: typeof courseArr): void {

  const uniqueCourses: course[] = allCourses.filter((o, index, arr) =>
    arr.findIndex(object => object.courseName.toLowerCase() === o.courseName.toLowerCase()) === index
  );

  uniqueCourses.forEach((coursObj: course) => {
    let tr: HTMLElement = document.createElement("tr");
    let nameTd: HTMLElement = document.createElement("td");
    let nameP: HTMLElement = document.createElement("p");
    nameP.classList.add("nameTd");
    let nameNode: Text = document.createTextNode(coursObj.courseName);
    let courseLink: HTMLAnchorElement = document.createElement("a");
    courseLink.href = coursObj.courseLink;
    courseLink.classList.add("linkEl");

    list.appendChild(tr);
    tr.appendChild(nameTd);
    nameTd.appendChild(courseLink);
    courseLink.appendChild(nameP);
    nameP.appendChild(nameNode);

    let codeTd: HTMLElement = document.createElement("td");
    let codeNode: Text = document.createTextNode(coursObj.courseCode);
    let codeP: HTMLElement = document.createElement("p");
    codeP.classList.add("codeTd");

    tr.appendChild(codeTd);
    codeTd.appendChild(codeP);
    codeP.appendChild(codeNode);

    let progressTd: HTMLElement = document.createElement("td");
    let progressP: HTMLElement = document.createElement("p");
    progressP.classList.add("progressTd");
    let progressNode: Text = document.createTextNode(coursObj.courseProgress);

    tr.appendChild(progressTd);
    progressTd.appendChild(progressP);
    progressP.appendChild(progressNode);

  });

}


// Sorterar ut dubletter och sparar i local storage
function saveCourses(): void {

  const allNames = document.getElementsByClassName("nameTd") as HTMLCollection;
  const allCodes = document.getElementsByClassName("codeTd") as HTMLCollection;
  const allLinks = document.getElementsByClassName("linkEl") as HTMLCollection;
  const allProgress = document.getElementsByClassName("progressTd") as HTMLCollection;

  const namesArr: string[] = [];
  const codesArr: string[] = [];
  const linksArr: string[] = [];
  const progressArr: string[] = [];
  const storedCourses: course[] = [];

  if(allNames.length > 0) {
    //Loopar igenom kollektion med p-element
    for(let i = 0; i < allNames.length; i++) {

      const currentName = allNames.item(i)?.childNodes;
      const currentCode = allCodes.item(i)?.childNodes;
      const currentLink = allLinks.item(i)?.getAttribute("href");
      const currentProgress = allProgress.item(i)?.childNodes;

      linksArr.push(currentLink ?? "");


      //Loopar igenom kollektion med textnodes
      currentName?.forEach((node) => {
        namesArr.push(node.textContent ?? "");
      })

      currentCode?.forEach((node) => {
        codesArr.push(node.textContent ?? "");
      })

      currentProgress?.forEach((node) => {
        progressArr.push(node.textContent ?? "");
      })
      

      const newCourse: course = {
        courseName: namesArr[i],
        courseCode: codesArr[i],
        courseLink: linksArr[i],
        courseProgress: progressArr[i]
      };
    
      storedCourses.push(newCourse);
      
    }
  }

  const jsonStr = JSON.stringify(storedCourses);
  localStorage.setItem('myCourses', jsonStr);

}


//Läser ut kurser från local storage
function loadCourses(): void {

  const uniqueCourses = JSON.parse(localStorage.getItem('myCourses') ?? '{}');

  addCourses(uniqueCourses);

}
