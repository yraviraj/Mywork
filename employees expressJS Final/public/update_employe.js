function updateName() {
    //dynamic updating name in emp details box
    let updateName = document.getElementById("emp-name");  //dynamically updating.
    updateName.onkeydown = updateNameDisplay;    //https://stackoverflow.com/questions/4790946/dynamically-displaying-input-values-using-javascript
    updateName.onkeyup = updateNameDisplay;
    function updateNameDisplay() {
        if(document.getElementById("male").checked)
        document.getElementById("update-name").innerHTML = "Hi Mr "+ this.value;
        else
        document.getElementById("update-name").innerHTML = "Hi Ms "+ this.value;
    }
}
function nameWithGender(){
let maleclick = document.getElementById("male");
let name = document.getElementById("emp-name");
maleclick.addEventListener("click", ()=>{
    document.getElementById("update-name").innerHTML = "Hi Mr " + name.value;
});
let femaleclick = document.getElementById("female");
femaleclick.addEventListener("click",()=>{
    document.getElementById("update-name").innerHTML = "Hi Ms "+ name.value;
});
}

function updateEmployeeDetails() {
    let errormessage = document.getElementById("errormessage");
    let saveemp = document.getElementById("save-emp");
    saveemp.addEventListener("click", async function(){ 
        document.getElementById("save-emp").disabled = true;    //disabling save button after clicking
        let emp_id = document.getElementById("emp-id").value;
        let emp_name = document.getElementById("emp-name").value;
        let emp_age = document.getElementById("emp-age").value;
        let emp_state = document.getElementById("emp-state").value;
        let emp_pincode = document.getElementById("emp-pincode").value;
        let emp_country = document.getElementById("country").value;
        let emp_gender;
        if(document.getElementById("male").checked){
        emp_gender = document.getElementById("male").value;
        console.log(emp_gender);
    }
        else{
        emp_gender = document.getElementById("female").value;
        console.log(emp_gender);
        }
         try{
        // updating the array object if the prop exist then gets updated if doesn't exist it gets created.
        await employeeServices.update(emp_id, emp_name, emp_gender, emp_age, emp_state, emp_pincode, emp_country);
        //updating the table with the edited data by clicking on the id
        let allEmpList = await employeeServices.getAllEmployees();
        allEmpList.forEach(employee => {
            if (employee.id == emp_id) {
                document.getElementById(emp_id).deleteCell(2);
                document.getElementById(emp_id).insertCell(2).innerHTML = emp_name;
                document.getElementById(emp_id).deleteCell(3);
                document.getElementById(emp_id).insertCell(3).innerHTML = emp_age;
            }
        });
        errormessage.style.visibility = "hidden";
        saveemp.disabled = false; //enabling again save button after successful response from serveremployeeServices.add
        document.getElementById("emp-details").style.visibility = "hidden";
        }
        catch(err)
        {
            saveemp.disabled = false;
            errormessage.style.visibility = "visible";
            errormessage.style.color = "red";
            errormessage.innerHTML = err ;
        }
    }); 
    };
