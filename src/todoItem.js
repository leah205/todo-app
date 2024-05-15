import {parseISO, format, isThisWeek, getDay, startOfToday, isToday, isTomorrow,
isPast} from "date-fns";

export default function createTodoItem(title, rawDate, description, priority){
    //let updatePriority = (newPriority) => priority = newPriority;
    let dueDate = formatDate(rawDate);
    function updatePriority(newPriority){
        this.priority = newPriority;
    };
    let dateStatus = getDateFilter(rawDate);

    return{title,description,dueDate,priority,updatePriority, rawDate, dateStatus}; 
};

function getDateFilter(date){
    let dateStatusArr = [];
    if(isToday(parseISO(date))){
        dateStatusArr.push("Today");
    }
    if(isTomorrow(parseISO(date))){
        dateStatusArr.push("Tomorrow");
    }
    if(isThisWeek(date, {weekStartsOn: getDay(startOfToday())}) || isToday(parseISO(date))){
        dateStatusArr.push("This Week");
    }
    if(isPast(parseISO(date)) && !isToday(parseISO(date))){
        dateStatusArr.push("Overdue");
    }
    return dateStatusArr;
}


function formatDate(date){
    //let dateObj = format(parseISO(date), "MMMM do");
    //let formattedDate = formatDate(date);
    if(isToday(parseISO(date))){
        return "Today";
    }
    else if(isTomorrow(parseISO(date))){
        return "Tomorrow";
    }
    else if(isThisWeek(date, {weekStartsOn: getDay(startOfToday())})){
        return format(date, "EEEE")
    }
    else return format(parseISO(date), "MMMM do");
};






