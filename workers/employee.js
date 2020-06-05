class Employee {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
/*
const e101 = new Employee(101, 'smith', 23);
const e102 = new Employee(102, 'joe', 25);
const e103 = new Employee(103, 'root', 24);
const e104 = new Employee(104, 'mark', 45);
const e105 = new Employee(105, 'steve', 43);
const e106 = new Employee(106, 'jane', 39);
const e107 = new Employee(107, 'mic', 41);
const e108 = new Employee(108, 'john', 50);

let employees = {};

employees[e101.id] = e101;
employees[e102.id] = e102;
employees[e103.id] = e103;
employees[e104.id] = e104;
employees[e105.id] = e105;
employees[e106.id] = e106;
employees[e107.id] = e107;
employees[e108.id] = e108;

console.log(employees);
const values = Object.values(employees)
const keys = Object.keys(employees);
console.log(values);
values.forEach(e => {console.log(`${e.id} :: ${e.name}`)});

keys.forEach(e => {
    if ((e%2) == 0){
        delete employees[e];
    }
});
console.log(employees);
*/

class EmployeeServices{
    constructor()
    {
        this.empcollection = [];
    }
    add(emp)
    {
        this.empcollection.push(emp);
    }
}

const employeeServices = new EmployeeServices();
for (let i = 1; i <= 100; i++) {

   employeeServices.add(new Employee((100 + i), ('smith' + i), (10 + i)));

   // employees[i] = new Employee((100 + i), ('smith' + i), (10 + i)); // saving 100 Employee objects into employees object with 101 to 200 as key or properties
}
// adding new properties such as pincode, state etc..
let c=0;
employeeServices.empcollection.forEach(obj=> {
    obj["state"] = "state"+c;
    obj.pincode = 50000 + c;
    c++;
});

console.log(employeeServices.empcollection);

const empKey = Object.keys(employeeServices.empcollection[1]);
const empVal = Object.values(employeeServices.empcollection);

console.log("empKey:"+empKey);
console.log("emp values: " +empVal);

function generateTableHead(table, empKey) {             // function for generating table head
    let thead = table.createTHead();
    /* createTHead(). createTHead() returns 
    the table head element associated with a given table, 
    but better, if no header exists in the table, 
    createTHead creates one for us.*/
    let row = thead.insertRow();
    let th = document.createElement('th');
    let select = document.createTextNode("select");
    th.appendChild(select);
    row.appendChild(th);
  
    for (const key of empKey) {
        if((key == "id") || (key == "name") || (key == "age")) // to display 3 prop. id name and age
        {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
        }
        else
        continue;
    }
}
let table = document.querySelector('table'); // getting table object form html table tag

function empDetails(eid){
empVal.forEach(emp => {
    if(emp.id == eid)
    {
        document.getElementById("emp-details").style.visibility="visible";
        document.getElementById("update-name").innerHTML= "Hi "+emp.name;
        document.getElementById("emp-id").value= emp.id;
        document.getElementById("emp-name").value = emp.name;
        document.getElementById("emp-age").value = emp.age;        
        document.getElementById("emp-state").value = emp.state;        
        document.getElementById("emp-pincode").value = emp.pincode;        
    } 
});
};
let updateName = document.getElementById("emp-name");  //dynamically updating.
updateName.onkeydown = updateNameDisplay;    //https://stackoverflow.com/questions/4790946/dynamically-displaying-input-values-using-javascript
updateName.onkeyup = updateNameDisplay;

function updateNameDisplay(){
    document.getElementById("update-name").innerHTML = "Hi "+ this.value;
}



function generateTable(table, emplVal) {                 //function for generating table body
    for (let list of emplVal) {
        let row = table.insertRow();

        let ccell = row.insertCell();
        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "check-box");
        ccell.appendChild(x);
        let count = 1;
        for (let sublist in list) { 
            if((sublist == "id") || (sublist == "name") || (sublist == "age"))    // to display 3 prop. id name and age
            {
            if(count == 1){
                let cell = row.insertCell();
                let x = document.createElement("a");                // Create anchor element.
                let text = document.createTextNode(list[sublist]);  // Create the text node for anchor element.
                x.appendChild(text);                                // Append the text node to anchor element.
                x.title = list[sublist];                            // Set the title.  which is optional
                x.setAttribute("href", "#");                        // Set the href property.
                x.setAttribute("onclick", "empDetails("+list[sublist]+")");
                cell.appendChild(x);                                //appending the anchor element to the cell.    https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
            }                                                       // https://www.kirupa.com/html5/handling_events_for_many_elements.htm
            else{
                let cell = row.insertCell();
                let text = document.createTextNode(list[sublist]);
                cell.appendChild(text);
            }
            count++;
        }
        else
        continue;       
        }
    }
}
generateTable(table, empVal);
generateTableHead(table, empKey);

let add = document.getElementById("add-btn");
add.addEventListener("click",  () => {
    document.getElementById("abc").style.visibility = 'visible';
});

let addemp = document.getElementById('submit');
addemp.addEventListener('click', () => {
    let ename = document.getElementById('ename').value;
    let eage = document.getElementById('eage').value;
    let i = 1;
    let newEmp = new Employee(empVal.length + 100 + i, ename, eage);
    empVal.push(newEmp);
    let row = table.insertRow();
    let ccell = row.insertCell();
    let x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.setAttribute("name", "check-box");
    ccell.appendChild(x);
    for (let key in newEmp) {
        let cell = row.insertCell();
        let text = document.createTextNode(newEmp[key]);
        cell.appendChild(text);
    };
    document.getElementById("abc").style.visibility = 'hidden';
});

function isChecked(checkBoxes) {
   /* checkBoxes.forEach(element => {
        if(element.checked)
        {
            return true;
        }   
    });  */
    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            return true;
        }
    }
}

let delemp = document.getElementById("del-btn");
delemp.addEventListener("click", () => {
    let checkboxes = document.getElementsByName("check-box");
    while (isChecked(checkboxes)) {
        /*checkboxes.forEach((element, index) => {
            if(element.checked)
            {
                table.deleteRow(index + 1);
                break;
            }          
        });*/
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                table.deleteRow(i + 1);
                break;
            }
        }
    }
});





