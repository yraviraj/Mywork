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
    }
    add(emp) {
        this.empcollection.push(emp);
    }
}

const employeeServices = new EmployeeServices();
for (let i = 1; i <= 100; i++) {

    employeeServices.add(new Employee((100 + i), ('smith' + i), (10 + i)));
}
// adding new properties such as pincode, state etc..
let c = 0;
employeeServices.empcollection.forEach(obj => {
    obj["state"] = "state" + c;
    obj.pincode = 50000 + c;
    c++;
});

const empKey = Object.keys(employeeServices.empcollection[1]);
const empVal = Object.values(employeeServices.empcollection);

//===============================================================function for generating table head

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
    empVal.forEach(emp => {
        if (emp.id == eid) {
            document.getElementById("emp-details").style.visibility = "visible";
            document.getElementById("update-name").innerHTML = "Hi " + emp.name;
            document.getElementById("emp-id").value = emp.id;
            document.getElementById("emp-name").value = emp.name;
            document.getElementById("emp-age").value = emp.age;
            document.getElementById("emp-state").value = emp.state;
            document.getElementById("emp-pincode").value = emp.pincode;
        }
    });
};

//dynamic updating name in emp details box
let updateName = document.getElementById("emp-name");  //dynamically updating.
updateName.onkeydown = updateNameDisplay;    //https://stackoverflow.com/questions/4790946/dynamically-displaying-input-values-using-javascript
updateName.onkeyup = updateNameDisplay;
function updateNameDisplay() {
    document.getElementById("update-name").innerHTML = "Hi " + this.value;
}

function generateTable(table, emplVal) {   //function for generating table body
    for (let list of emplVal) {
        let row = table.insertRow();
        row.id = list.id;               //adding id attribute to every tr

        let ccell = row.insertCell();
        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "check-box");
        ccell.appendChild(x);

        for (let sublist in list) {
            if ((sublist == "id") || (sublist == "name") || (sublist == "age"))    // to display 3 prop. id name and age
            {
                if (sublist === "id") {
                    let cell = row.insertCell();
                    let x = document.createElement("a");                // Create anchor element.
                    let text = document.createTextNode(list[sublist]);  // Create the text node for anchor element.
                    x.appendChild(text);                                // Append the text node to anchor element.
                    x.title = list[sublist];                            // Set the title.  which is optional
                    x.setAttribute("href", "#");                        // Set the href property.
                    x.setAttribute("onclick", "empDetails(" + list[sublist] + ")");
                    cell.appendChild(x);                                //appending the anchor element to the cell.    https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
                }                                                       // https://www.kirupa.com/html5/handling_events_for_many_elements.htm
                else {
                    let cell = row.insertCell();
                    let text = document.createTextNode(list[sublist]);
                    cell.appendChild(text);
                }
            }
            else
            continue;
        }
    }
}
generateTable(table, empVal);
generateTableHead(table, empKey);

// to display add employee box on click add btn
let add = document.getElementById("add-btn");
add.addEventListener("click", () => {
document.getElementById("abc").style.visibility = 'visible';
});

//======================================================= adding new employee to the table
let addemp = document.getElementById('submit');
addemp.addEventListener('click', () => {
    let ename = document.getElementById('ename').value;
    let eage = document.getElementById('eage').value;
    let i = 1;
    let newEmp = new Employee(empVal.length + 100 + i, ename, eage);
    empVal.push(newEmp);
    console.log(Object.keys(newEmp));
    let row = table.insertRow();
    let ccell = row.insertCell();               //  inserting cell for checkbox
    let x = document.createElement("INPUT");    //  below statements are for inserting checkbox into the cell
    x.setAttribute("type", "checkbox");
    x.setAttribute("name", "check-box");
    ccell.appendChild(x);                       //  until this statement is meant for inserting checkbox into cell
    for (let item in newEmp) {
        let cell = row.insertCell();
        let text = document.createTextNode(newEmp[item]);
        cell.appendChild(text);
    };
    document.getElementById("abc").style.visibility = 'hidden';
});

//====================================Deleting employee

let delemp = document.getElementById("del-btn");
delemp.addEventListener("click", () => {
    let checkboxes = document.getElementsByName("check-box");
    function isChecked(checkBoxes) {
        for (i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                return true;
            }
        }
    }
    while (isChecked(checkboxes)) {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                table.deleteRow(i + 1);
                empVal.splice(i,1);
                console.log(empVal);
                break;
            }
        }
    }
});

//================================== updating the edited employee details
let saveemp = document.getElementById("save-emp");
saveemp.addEventListener("click", () => {
    document.getElementById("emp-details").style.visibility= "visible";

    let emp_id = document.getElementById("emp-id").value;
    let emp_name = document.getElementById("emp-name").value;
    let emp_age = document.getElementById("emp-age").value;
    let emp_state = document.getElementById("emp-state").value;
    let emp_pincode = document.getElementById("emp-pincode").value;
    let emp_country = document.getElementById("country").value;


     // updating the array object
     employeeServices.empcollection[emp_id - 101].name = emp_name;
     employeeServices.empcollection[emp_id - 101].age = emp_age;
     employeeServices.empcollection[emp_id - 101].state = emp_state;
     employeeServices.empcollection[emp_id - 101].pincode = emp_pincode;
     employeeServices.empcollection[emp_id - 101].country = emp_country;

     //updating the table with the edited data by clicking on the id
    employeeServices.empcollection.forEach(employee => {   
        if (employee.id == emp_id) {
            document.getElementById(emp_id).deleteCell(2);
            document.getElementById(emp_id).insertCell(2).innerHTML = emp_name;
            document.getElementById(emp_id).deleteCell(3);
            document.getElementById(emp_id).insertCell(3).innerHTML = emp_age;
        }
    });
    document.getElementById("emp-details").style.visibility= "hidden";
});

let countries = [];
let countries_list = [];
/*
function getCountries(){

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
/*
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
    */
