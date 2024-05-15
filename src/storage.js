import {getProjectsArr, addProject, getProject, findSelectedProject, changeSelectedProject} from "./projects.js";
import createTodoList, {addTask, getTask, updateListDisplay, filterProject, restoreTask} from "./todoList.js";
import {displaySelectedProject} from "./display/project-display.js";
import { resetTodoContainer } from "./display/task-display.js";
import { addTodoEventListeners } from "./index.js";


function updateStorage(){
    const projectsArr = getProjectsArr();

    const projectsObjArr = [];
    for(let proj of projectsArr){
        const todoArr = [];
        for(let todo of proj.todoList){
         
            let todoObj = {
                description: todo.description,
                priority: todo.priority,
                rawDate: todo.rawDate,
                title: todo.title,
            }
            todoArr.push(todoObj);
        }
        projectsObjArr.push(
            {
                name: proj.project,
                list: todoArr,
            }
        ) 
    }

    console.log(projectsObjArr);
    localStorage.setItem("project list", JSON.stringify(projectsObjArr));
    console.log(JSON.parse(localStorage.getItem("project list")));

}


function loadPage(){
    /*let defaultArray = projectsArr.filter((proj) => {
        proj.project === "Home"
    })
    if(defaultArray.length > 1)  removeProject("Home")
    if(getProject("Home")) removeProject("Home");*/
    const allProjectNodes = document.querySelectorAll(".projects-list li, .home");
    const homeNode = document.querySelector(".home");
    displaySelectedProject(homeNode, allProjectNodes);
    changeSelectedProject("Home");
    retrieveStorage();
}

function retrieveStorage(){
   
    let projectListArr = JSON.parse(localStorage.getItem("project list"));
    if(!projectListArr) return;

    if(projectListArr.length === 0) return;

    for(let obj of projectListArr){
        
        if(obj.name === "Home"){
            for(let todo of obj.list){
                console.log(getProject("Home"));
                getProject(obj.name).restoreTask(todo.title, todo.rawDate, todo.description, todo.priority);
            };
        }

        else{
            addProject(createTodoList(obj.name));
            for(let todo of obj.list){
            getProject(obj.name).restoreTask(todo.title, todo.rawDate, todo.description, todo.priority);
        };
        }
        console.log(getProject("Home"));
        resetTodoContainer();
        findSelectedProject().updateListDisplay();
        addTodoEventListeners();
    
    //console.log(getProjectsArr());
};
}


export {updateStorage, loadPage}