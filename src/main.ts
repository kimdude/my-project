
//Variabler för HTML-element
const addBtn = (<HTMLButtonElement>document.getElementById("add"));
const name = document.getElementById("courseName") as HTMLInputElement;
const code = document.getElementById("courseCode") as HTMLInputElement;
const link = document.getElementById("link") as HTMLInputElement;
const progression = document.getElementById("progression") as HTMLInputElement;
const list = document.getElementById("courseList") as HTMLInputElement;

addBtn.addEventListener("click", newObj);

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


//Lägg till i tabllen
function addCourses(allCourses: typeof courseArr): void {

  allCourses.forEach((coursObj: course) => {
    let tr: HTMLElement = document.createElement("tr");
    let nameTd: HTMLElement = document.createElement("td");
    let nameNode: Text = document.createTextNode(coursObj.courseName);
    let codeTd: HTMLElement = document.createElement("td");
    let codeNode: Text = document.createTextNode(coursObj.courseCode);
    let progressTd: HTMLElement = document.createElement("td");
    let progressNode: Text = document.createTextNode(coursObj.courseProgress);

    list.appendChild(tr);
    tr.appendChild(nameTd);
    nameTd.appendChild(nameNode);
    tr.appendChild(codeTd);
    codeTd.appendChild(codeNode);
    tr.appendChild(progressTd);
    progressTd.appendChild(progressNode);
  });

}
