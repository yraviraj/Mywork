function myload() {
    generateEmployees(delayedfunctions);
}

window.onload = myload();

function delayedfunctions() {
    completeTable();
    addEmpBox();
    addEmployee();
    deleteEmployee();
    updateName();
    updateEmployeeDetails();
    getCountriesList();
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
    let errormessage = document.getElementById("errormessage-addemp")
    let addemp = document.getElementById('submit');
    addemp.addEventListener('click', async function () {
        addemp.disabled = true;
        errormessage.style.visibility = "hidden";
        let ename = document.getElementById('ename').value;
        let eage = document.getElementById('eage').value;
        let i = 1;
        let size = await employeeServices.getsize();
        //console.log(size);
        let newEmp = new Employee(size + 100 + i, ename, eage);
        try {
            await employeeServices.add(newEmp);

            let row = table.insertRow();
            let ccell = row.insertCell();               //  inserting cell for checkbox
            let x = document.createElement("INPUT");    //  below statements are for inserting checkbox into the cell
            x.setAttribute("type", "checkbox");
            x.setAttribute("name", "check-box");
            await x.setAttribute("id", "chk-" + employeeServices.getsize() + 100 + i - 1);   // adding id attribute and value as chk-id to every checkbox
            ccell.appendChild(x);                       //  until this statement is meant for inserting checkbox into cell
            for (let item in newEmp) {
                let cell = row.insertCell();
                let text = document.createTextNode(newEmp[item]);
                cell.appendChild(text);
            };
            addemp.disabled = false;
            document.getElementById("abc").style.visibility = 'hidden';
        }
        catch(err){
            errormessage.style.visibility = "visible";
            errormessage.style.color = "red";
            errormessage.innerHTML = err +"Invalid Credentials";
            addemp.disabled = false;

        }
    })
};
