const addProjectSection = document.querySelector(".add-project-section");
const projectsList = document.querySelector(".projects-list");
const projectInput = addProjectSection.querySelector("input")

function displayAddProject(){
    if(addProjectSection.classList.contains("hidden")){
        addProjectSection.classList.remove("hidden");
    }
}

function removeAddProjectDisplay(){
    addProjectSection.classList.add("hidden");
    projectInput.value = "";
};

function getNewProjectName(){
    return projectInput.value;
};

function getProjectName(node){
    if(node.contains(node.querySelector("h2"))){
        return node.querySelector("h2").textContent;
    }

    return node.textContent;
}

function displayNewProject(name){
    const project = document.createElement("li");
    const projectTitle = document.createElement("h2");
    const deleteProjectButton = document.createElement("button");
    projectTitle.textContent = name;
    deleteProjectButton.textContent = "x";
    deleteProjectButton.classList.add("hidden");
    project.appendChild(projectTitle);
    project.appendChild(deleteProjectButton);
    projectsList.appendChild(project);
};
function displayDeleteProjectButton(project){
    const deleteProjectButton = project.querySelector("button");
    deleteProjectButton.classList.remove("hidden");
}
function hideDeleteProjectButton(project){
    const deleteProjectButton = project.querySelector("button");
    deleteProjectButton.classList.add("hidden");
}

function deleteProjectDisplay(node){
    if(projectsList.contains(node)){
        projectsList.removeChild(node);
    }
};

function removeClass(nodes, className){
    for(let node of nodes){
        if(node.classList.contains(className)){
            node.classList.remove(className);
        }
    }
}

function displaySelectedProject(project, nodes){

    removeClass(nodes, "selected-project");

    const projectHeaderText = document.querySelector(".project-header h2");
    project.classList.add("selected-project");
    projectHeaderText.textContent = getProjectName(project);
}

export {displayAddProject, removeAddProjectDisplay, getNewProjectName, displayNewProject,
displayDeleteProjectButton, hideDeleteProjectButton, getProjectName, deleteProjectDisplay,
displaySelectedProject}