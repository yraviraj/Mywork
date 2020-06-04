class Employee{
    constructor(id, name, age){
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

const employee = {}

for(let i = 1; i <= 100; i++)
{
    employee[i] = new Employee((100+i), ('smith'+i), (10+i)); // saving 100 Employee objects into employee object with 101 to 200 as key or properties
}
console.log(employee);


const empKey = Object.keys(employee[1]);
const empVal = Object.values(employee);



function generateTableHead(table, empKey) {
    let thead = table.createTHead();
    /* createTHead(). createTHead() returns 
    the table head element associated with a given table, 
    but better, if no header exists in the table, 
    createTHead creates one for us.*/
    let row = thead.insertRow();
    let th= document.createElement('th');
    let select= document.createTextNode("select");
    th.appendChild(select);
    row.appendChild(th);
    
    for (const key of empKey) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
let table = document.querySelector('table');


function generateTable(table, data) {
for (let element of data) {    
    let row = table.insertRow();

    
    let ccell = row.insertCell();
   let x = document.createElement("INPUT");
   x.setAttribute("type","checkbox");
   x.setAttribute("id","check-box");
    ccell.appendChild(x);
    for (let key in element) {
        
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);         
        }
    }
}
generateTable(table, empVal);
generateTableHead(table, empKey);



let add = document.getElementById("add-btn");
add.addEventListener("click",function(){
    document.getElementById("abc").style.visibility = 'visible';
    });

let addemp = document.getElementById('submit');
addemp.addEventListener('click', function(){
let ename = document.getElementById('ename').value;
let eage = document.getElementById('eage').value;
let i = 1;
let newEmp = new Employee(empVal.length+100+i, ename, eage);
empVal.push(newEmp);


let row = table.insertRow();
let ccell = row.insertCell();
   let x = document.createElement("INPUT");
   x.setAttribute("type","checkbox");
   x.setAttribute("id","check-box");
    ccell.appendChild(x);

for (let key in newEmp) {
    let cell = row.insertCell();
    let text = document.createTextNode(newEmp[key]);
    cell.appendChild(text);         
    };
document.getElementById("abc").style.visibility = 'hidden';

});

let

