function myload() {
    generateEmployees(delayedfunctions);
    console.log("after add function");
}

window.onload = myload();

function delayedfunctions(){
    completeTable();
    addEmpBox();
    addEmployee();
    deleteEmployee();
    updateName();
    updateEmployeeDetails();
    getCountries();
    addingProp();
}


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
