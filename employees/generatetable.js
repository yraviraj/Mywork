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