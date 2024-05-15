
import { createTodoNode } from "./display/task-display.js";
import createTodoItem from "./todoItem.js";
import { addTaskToHome, completeTaskFromHome , replaceTaskFromHome} from "./home.js";
import {updateStorage} from "./storage.js";
import {getProject} from "./projects.js";


export default function createTodoList(project){
    let selected = false;
    //addProjecttoArr(project);
    let todoList = [];

    function updateListDisplay(){
        displayList(this.todoList);
    }

    function displayList(arr){
        arr.forEach((todo) => {
            createTodoNode(todo, arr.indexOf(todo));
        });
    }

    function replaceTask(arr, oldTask){
        let [title, date, description, priority] = arr;
        const newTask = createTodoItem(title, date, description, priority);
        console.log(this.todoList[this.todoList.indexOf(oldTask)]);
        if(this.todoList.includes(oldTask)){
            this.todoList[this.todoList.indexOf(oldTask)] = newTask;
        }
        else{
            console.log("fail");
            for(let task of this.todoList){
                console.log(oldTask.title === task.title );
                if(oldTask.title === task.title &&
                oldTask.rawDate ===task.rawDate &&
                oldTask.description === task.description &&
                oldTask.priority === task.priority ){
                    
                    this.todoList[this.todoList.indexOf(task)] = newTask;
                    break;
                }
            }
        }
       
        if(!("isDefault" in this)){
            console.log("hola");
            replaceTaskFromHome(arr, oldTask);
        }
        
    }

    function addTask(...args){
        //make sure no problem if add project named home(Error);
       
        let todo = createTodoItem(...args);
        this.todoList.push(todo);

        if(!("isDefault" in this)){
            addTaskToHome(...args);
        }
        updateStorage(); 
    };

    function restoreTask(...args){
        let todo = createTodoItem(...args);
        this.todoList.push(todo);
        console.log();
        updateStorage(); 
    }

    function filterProject(...args){
        
        const attributeArr = args.filter((arg) => args.indexOf(arg) % 2 === 0);
        const valueArr = args.filter((arg) => args.indexOf(arg)% 2 === 1);
        console.log(attributeArr.length);
        let filteredArr = this.todoList;

        for(let i = 0; i < attributeArr.length; i++){
            
            let attribute = attributeArr[i];
            let value = valueArr[i];
            console.log(attribute);
            console.log(value);
            let isNoFilter = (value === "All" || !value);
            if(isNoFilter){
                //displayList(this.todoList);
                console.log("hi");
            }

            else{
                console.log(value);
                filteredArr = filteredArr.filter((item) => {
                return item[attribute].includes(value) || item[attribute] === value;
            });
            };

        }
        console.log("hello");
        console.log(filteredArr);
        displayList(filteredArr);
        
    }

    function completeTask(todo){
        if(!("isDefault" in this)){
            completeTaskFromHome(todo);
        }
        this.todoList = this.todoList.filter((obj) => obj !== todo); 
       
    }
    function getTask(index){
        return this.todoList[index];
    }

    return {project, completeTask, addTask, todoList, selected, updateListDisplay, getTask, replaceTask, filterProject, restoreTask};
}
