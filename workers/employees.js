class Employee {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

class EmployeeServices {
    constructor() {
        this.empcollection = [];
        this.employeeArray = [];
    }
    add(emp) {   //method to add an emp object to an array
        this.empcollection.push(emp);
    }
    delete(id){        // to delete an employee object based on id from an array
        const index = this.empcollection.indexOf(this.empcollection.find(eachemp => "chk-"+eachemp.id == id))
        this.empcollection.splice(index,1);
    }
    update(id, name, age, state, pincode, country)  //updating the properties of employee object in an array.
    {
        this.empcollection[id].name = name;
        this.empcollection[id].age = age;
        this.empcollection[id].state = state;
        this.empcollection[id].pincode = pincode;
        this.empcollection[id].country = country;
    }
    empObject(empid) // fn for returning emp object wrt emp id 
    {
       return this.empcollection.find(empobj => empobj.id == empid);
    }
    getsize()  // method to return the size of an array containing employee objects
    {
        return this.empcollection.length;
    }
    getAllEmployees(){      // method to return an array containing all the employee objects
        this.employeeArray = Array.from(this.empcollection); //copies all the content from empcollection array to employeeArray
        return this.employeeArray
    }
    static empProperties(){     // static method to return all the properties of an employee object containing in an array
        return ["id", "name", "age", "state", "pincode", "country"]
    }
}

const employeeServices = new EmployeeServices();
for (let i = 1; i <= 100; i++) {

    employeeServices.add(new Employee((100 + i), ('smith' + i), (10 + i)));
}
// adding new properties such as pincode, state etc..

function addingProp() {
    let c = 0;
    employeeServices.getAllEmployees().forEach(obj => {  //employeeServices.getAllEmployees() returns array of employee objects
        obj["state"] = "state" + c;
        obj.pincode = 50000 + c;
        c++;
    });
}

//===============================================================   function for generating table head

function generateTableHead(table) {             // function for generating table head
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

    for (const key of EmployeeServices.empProperties()) {
        if ((key == "id") || (key == "name") || (key == "age")) // to display 3 prop. id name and age
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

function empDetails(eid) {   // fn to display emp details corresponding to emp id
    let empobj = employeeServices.empObject(eid);
            document.getElementById("emp-details").style.visibility = "visible";
            document.getElementById("abc").style.visibility = 'hidden';
            document.getElementById("update-name").innerHTML = "Hi " + empobj.name;
            document.getElementById("emp-id").value = empobj.id;
            document.getElementById("emp-name").value = empobj.name;
            document.getElementById("emp-age").value = empobj.age;
            document.getElementById("emp-state").value = empobj.state;
            document.getElementById("emp-pincode").value = empobj.pincode;
};

function generateTable(table) {   //function for generating table body
    for (let list of employeeServices.getAllEmployees()) {   // employeeServices.getAllEmployees() returns array of employees.
        let row = table.insertRow();
        row.id = list.id;               //adding id attribute to every tr

        let ccell = row.insertCell();
        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "check-box");
        x.setAttribute("id", "chk-"+list.id);  // adding id attribute and value as chk-id to every checkbox
        ccell.appendChild(x);
    
        for (let sublist in list) {
            if ((sublist == "id") || (sublist == "name") || (sublist == "age"))    // to display 3 prop. id name and age
            {
                createcells(sublist, row, list);
            }
           
        }
    }

    function createcells(sublist, row, list) {
        if (sublist === "id") {
            insertCell(row, list, sublist); //appending the anchor element to the cell.    https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
        } // https://www.kirupa.com/html5/handling_events_for_many_elements.htm
        else {
            let cell = row.insertCell();
            let text = document.createTextNode(list[sublist]);
            cell.appendChild(text);
        }
    }
}

generateTable(table);
generateTableHead(table);

function insertCell(row, list, sublist) {
    let cell = row.insertCell();
    let x = document.createElement("a"); // Create anchor element.
    let text = document.createTextNode(list[sublist]); // Create the text node for anchor element.
    x.appendChild(text); // Append the text node to anchor element.
    x.title = list[sublist]; // Set the title.  which is optional
    x.setAttribute("href", "#"); // Set the href property.
    x.setAttribute("onclick", "empDetails(" + list[sublist] + ")");
    cell.appendChild(x);
}

//======================================================= adding new employee to the table
// to display add employee box on click add btn


function myload() {
    addEmpBox();
    addEmployee();
    deleteEmployee();
    updateName();
    updateEmployeeDetails();
    getCountries();
    addingProp();
}

window.onload = myload();


function addEmpBox() {
    let add = document.getElementById("add-btn");
    add.addEventListener("click", () => {
        document.getElementById("abc").style.visibility = 'visible';
        document.getElementById("emp-details").style.visibility = "hidden";
        
    });
}

function addEmployee() {
    let addemp = document.getElementById('submit');
    addemp.addEventListener('click', () => {
        
        let ename = document.getElementById('ename').value;
        let eage = document.getElementById('eage').value;
        let i = 1;
        let newEmp = new Employee( employeeServices.getsize() + 100 + i, ename, eage);
        employeeServices.add(newEmp);
        let row = table.insertRow();
        let ccell = row.insertCell();               //  inserting cell for checkbox
        let x = document.createElement("INPUT");    //  below statements are for inserting checkbox into the cell
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "check-box");
        x.setAttribute("id","chk-"+employeeServices.getsize() + 100 + i - 1);   // adding id attribute and value as chk-id to every checkbox
        ccell.appendChild(x);                       //  until this statement is meant for inserting checkbox into cell
        for (let item in newEmp) {
            let cell = row.insertCell();
            let text = document.createTextNode(newEmp[item]);
            cell.appendChild(text);
        };
        document.getElementById("abc").style.visibility = 'hidden';
    });
}

//==========================================================================   Deleting employee
function deleteEmployee() {
    let delemp = document.getElementById("del-btn");
    delemp.addEventListener("click", () => {
        let checkboxes = document.getElementsByName("check-box"); // checkboxes contains nodelist of checkboxes
        
        function isChecked(checkBoxes) {

            /* for (i = 0; i < checkBoxes.length; i++) {
                 if (checkBoxes[i].checked) {
                     return true;
                 }
             }*/
            const chkdArr = Array.from(checkBoxes);//converting nodelist(checkBoxes) to array(chkdArr)
            const checked = chkdArr.find(box => box.checked); //find method is applied only to arrays so nodelist is conv to array
            return checked;
        }
        while (isChecked(checkboxes)) {  // undefined is false and anything is true
            checkboxes.forEach((eachbox, index) => {
                if (eachbox.checked) {
                    table.deleteRow(index + 1);
                    employeeServices.delete(eachbox.id);    // passing id to the employeeServices.delete() method to delete the employee obj
                }
            });
        }
    });
}

//================================== updating the edited employee details
function updateName() {
    //dynamic updating name in emp details box
    let updateName = document.getElementById("emp-name");  //dynamically updating.
    updateName.onkeydown = updateNameDisplay;    //https://stackoverflow.com/questions/4790946/dynamically-displaying-input-values-using-javascript
    updateName.onkeyup = updateNameDisplay;
    function updateNameDisplay() {
        document.getElementById("update-name").innerHTML = "Hi " + this.value;
    }
}

function updateEmployeeDetails() {
    let saveemp = document.getElementById("save-emp");
    saveemp.addEventListener("click", () => {
        
        let emp_id = document.getElementById("emp-id").value;
        let emp_name = document.getElementById("emp-name").value;
        let emp_age = document.getElementById("emp-age").value;
        let emp_state = document.getElementById("emp-state").value;
        let emp_pincode = document.getElementById("emp-pincode").value;
        let emp_country = document.getElementById("country").value;

        // updating the array object if the prop exist then gets updated if doesn't exist it gets created.

        employeeServices.update(emp_id - 101, emp_name, emp_age, emp_state, emp_pincode, emp_country);
        
        //updating the table with the edited data by clicking on the id
        employeeServices.getAllEmployees().forEach(employee => {
            if (employee.id == emp_id) {
                document.getElementById(emp_id).deleteCell(2);
                document.getElementById(emp_id).insertCell(2).innerHTML = emp_name;
                document.getElementById(emp_id).deleteCell(3);
                document.getElementById(emp_id).insertCell(3).innerHTML = emp_age;
            }
        });
        document.getElementById("emp-details").style.visibility = "hidden";
    });
}
let countries = [];

let countries_list = [];
/*
function getCountries(){
    let countries = [];
let countries_list = [];

    fetch("https://api.printful.com/countries")
    .then(result => {
        //console.log(result);
        return result.json();
    })
    .then(data => {
        data.result.forEach(element => {
            console.log(element.name);
            countries.push(element.name);
        });
        //console.log(data.result[1].name)
        //console.log(countries);
    })
    .catch(error => console.log(error));
};
*/

//===================================== retriving countries using api
function getCountries() {
    async function getCountries() {         // async function to get countries list using fetch api
        let countries = await fetch("https://api.printful.com/countries");
        return countries;
    }
    getCountries().then((result) => {
        //console.log(result);
        return result.json();
    })
        .then(element => {
            //console.log(element.result);
            element.result.forEach(item => {
                countries_list.push(item.name);
                let x = document.createElement("option");
                let y = document.createTextNode(item.name);
                x.appendChild(y);
                document.getElementById("country").appendChild(x);
            });
        });
}
