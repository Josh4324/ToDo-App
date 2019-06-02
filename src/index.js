import './styles/main.scss';
import './styles/normalize.scss'


//variables

let section = document.getElementById("section");
let search = document.querySelector("#input-task")
let tbl = document.getElementById("calender-body")


var today = new Date();
var currentday = today.getDate()
var currentMonth = today.getMonth();
var currentYear = today.getFullYear()


var lt = document.getElementById("lt")
var gt = document.getElementById("gt")
var month = document.getElementById("month");
var year = document.getElementById("year");
var table = document.getElementById('calender');
let user = document.querySelector(".user-icon")
let home = document.getElementById("home");
let section2 = document.getElementById("section2");
let searchbutton = document.getElementById("task-submit")


var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat","Sun"]

//Event listeners
search.addEventListener("keyup", Add)
gt.addEventListener("click", next);
lt.addEventListener("click", previous);
tbl.addEventListener("click",check)
searchbutton.addEventListener("click",Add)


start()

showCalender(currentMonth,currentYear)
month.innerHTML = months[currentMonth];
year.innerHTML = currentYear
user.addEventListener("click",() => {
    home.classList.toggle("hidden")
})


//functions



function Add(evt){
    if (evt.keyCode === 13){
        let result = search.value
        
        if (localStorage.getItem("list") === null){
            let id = Math.random()
            let items = []
            items.push({id:[result,currentday,currentMonth,currentYear]})
            localStorage.setItem('list',JSON.stringify(items))
        }else{
            let items = JSON.parse(localStorage.getItem("list"))
            let id = Math.random()
            items.push({id:[result,currentday,currentMonth,currentYear]})
            localStorage.setItem("list",JSON.stringify(items))
        }
        search.value = ""
        home.innerHTML = ""
        start()
        console.log("big")
       
        
    }
   
    
}

function showCalender(month,year) {

    let firstDay = (new Date(year, month)).getDay();
    
    //clearing all previous cells
    tbl.innerHTML = "";
    
    //filing data about month and in the page via DOM.
    //monthAndYear.innerHTML = months[month] + "" + year;
    //selectYear.value = year;
    //selectMonth.value = month;
    
    //creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++){
        //create a table row
        let row = document.createElement("tr");
    
        //creating individual cells, filing them with data.
        let rest = daysInMonth(month - 1,year);
        let restday = rest - firstDay
        
        for (let j = 0; j < 7; j++){
            restday = restday += 1
            if (i == 0 && j < firstDay){
                let rest = daysInMonth(month - 1,year);
                let cell = document.createElement("td");

                if (currentMonth === 0){
                    cell.dataset.month = 11
                    cell.dataset.year = currentYear - 1
                    let cellText = document.createTextNode(restday);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }else{
                    cell.dataset.month = currentMonth - 1
                    cell.dataset.year = currentYear
                    let cellText = document.createTextNode(restday);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                
            }
            else if (date > daysInMonth(month, year)){
                break;
            }
    
            else {
                let cell = document.createElement("td");
                cell.dataset.month = currentMonth
                cell.dataset.year = currentYear
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }   
    
    }

    function daysInMonth(iMonth, iYear){
        return 32 - new Date(iYear, iMonth, 32).getDate();
    };

    function next(){
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        month.innerHTML = months[currentMonth];
        year.innerHTML = currentYear
        showCalender(currentMonth, currentYear)
    }
    
    function previous() {
        currentYear = (currentMonth === 0) ? currentYear -1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        month.innerHTML = months[currentMonth];
        year.innerHTML = currentYear
        showCalender( currentMonth, currentYear);
    }


function start(){
    let items = JSON.parse(localStorage.getItem("list"));
    console.log("start")
    console.log(items)
    let Overduelist = document.createElement("div");
    let Overdue = document.createElement("p");
    Overdue.innerHTML = "Overdue"
    Overduelist.appendChild(Overdue);
    let todaylist = document.createElement("div");
    let todl = document.createElement("p");
    todl.innerHTML = "Today"
    todaylist.appendChild(todl);
    for ( let i = 0; i < items.length; i++){
        if (items[i].id[1] !== currentday && items[i].id[2] !== currentMonth){
            let dueelem = document.createElement("div");
            let dueelem2 = document.createElement("div")   
            let due = document.createElement("div")
            let duetask = document.createElement("span");
            let dueday = document.createElement("span");
            let duemonth = document.createElement("span");
            dueday.innerHTML = items[i].id[1]
            duemonth.innerHTML = months[items[i].id[2]]
            duetask.innerHTML = items[i].id[0]
            dueelem.appendChild(duetask)
            dueelem2.appendChild(dueday)
            dueelem2.appendChild(duemonth)
            dueelem.appendChild(dueelem2)
            dueelem.className = "elem"
            dueelem2.className = "elem2"
            due.appendChild(dueelem)
            Overduelist.appendChild(due)
        }

        home.appendChild(Overduelist)
    }

    for ( let i = 0; i < items.length; i++){
        if (items[i].id[1] === currentday && items[i].id[2] === currentMonth){
            let dueelem = document.createElement("div");
            let dueelem2 = document.createElement("div") 
            let tod = document.createElement("div")
            let todtask = document.createElement("span");
            let todday = document.createElement("span");
            let todmonth = document.createElement("span");
            todday.innerHTML = items[i].id[1]
            todmonth.innerHTML = months[items[i].id[2]]
            todtask.innerHTML = items[i].id[0]
            dueelem.appendChild(todtask)
            dueelem2.appendChild(todmonth)
            dueelem2.appendChild(todday)
            dueelem.appendChild(dueelem2)
            dueelem.className = "elem"
            dueelem2.className = "elem2"
            tod.appendChild(dueelem)
            todaylist.appendChild(tod)
        }

        home.appendChild(todaylist);

    }

    
        
    
}














function check (evt){
    console.log(evt.target.innerHTML, months[evt.target.dataset.month],evt.target.dataset.year)
};











