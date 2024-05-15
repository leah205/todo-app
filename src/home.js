
import createTodoList from "./todoList.js";
import {addProject} from "./projects.js";


function createDefaultProject(){
    const baseProject = createTodoList("Home");
    let isDefault = true;
    baseProject.selected = true;
    return {
        ...baseProject,
        isDefault,
    }
};

let defaultProject = createDefaultProject("Home");
addProject(defaultProject);


function addTaskToHome(...args){
    defaultProject.addTask(...args);
}
function completeTaskFromHome(todo){
    defaultProject.completeTask(todo);
}
function replaceTaskFromHome(newTask, oldTask){
    defaultProject.replaceTask(newTask, oldTask);
}

export {addTaskToHome, completeTaskFromHome, replaceTaskFromHome};