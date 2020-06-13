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
