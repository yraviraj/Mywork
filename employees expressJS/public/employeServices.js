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

    async add(emp) {   //method to add an emp object to an array
        let response = await fetch("http://localhost:3000/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emp)
        })
        let data = await response.json();
        //console.log(data);
        if (response.status == 200)
            this.empcollection.push(data);
        else {
            cosole.log(response.status + "Error Occured");
        }
    }

    async delete(id) {        // to delete an employee object based on id from an array
        //let data = await fetch(`http://localhost:3000/api/delete/${id}`);
        console.log(id);
        let obj = {};
        obj.id = id;
        let result = await fetch("http://localhost:3000/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        let data = await result.json()
        //console.log(data);
        //console.log(result.status);
        if (result.status == 200) {
            const index = this.empcollection.indexOf(this.empcollection.find(eachemp => "chk-" + eachemp.id == id));
            this.empcollection.splice(index, 1);
        }
        else {
            console.log("Error occured, Status: " + result.status);
        }
        //const index = this.empcollection.indexOf(this.empcollection.find(eachemp => "chk-"+eachemp.id == id))
        //this.empcollection.splice(index,1);
    }

    async update(id, name, age, state, pincode, country)  //updating the properties of employee object in an array.
    {
        let updateObj = {};
        updateObj.id = id;
        updateObj.name = name;
        updateObj.age = age;
        updateObj.state = state;
        updateObj.pincode = pincode;
        updateObj.country = country;
        let index = this.empcollection.findIndex(eachobj => eachobj.id == id);
        let response = await fetch("http://localhost:3000/api/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj)
        });
        let data = await response.json()
        console.log(data);
        if (response.status == 200) {
            this.empcollection[index].name = data.name;
            this.empcollection[index].age = data.age;
            this.empcollection[index].state = data.state;
            this.empcollection[index].pincode = data.pincode;
            this.empcollection[index].country = data.country;
        }
        else {
            console.log("Error Occured, Error Status: " + response.status);
        }
    }

    async getEmpObject(empid) // fn for returning emp object wrt emp id 
    {
        let response = await fetch(`http://localhost:3000/api/getEmployeeObject/${empid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        //let data = await response.json();
        console.log(response);
        if (response.status == 200)
            return this.empcollection.find(empobj => empobj.id == empid);
        else {
            console.log(`Error Occured, Error Status: ${response.status}`);
        }
    }

    async getsize()  // method to return the size of an array containing employee objects
    {
        /*let response = await fetch("http://localhost:3000/api/getsize", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        console.log(data);
        if (response.status == 200) {
            console.log(this.empcollection.length);
            //return this.empcollection.length;
        }
        else
            console.log(`Error Occured, Error Status: ${response.status}`);
            */
           return this.empcollection.length;
    }
    

    getAllEmployees() {      // method to return an array containing all the employee objects
        this.employeeArray = Array.from(this.empcollection); //copies all the content from empcollection array to employeeArray
        return this.employeeArray
    }

    static empProperties() {     // static method to return all the properties of an employee object containing in an array
        return ["id", "name", "age", "state", "pincode", "country"]
    }
}
const employeeServices = new EmployeeServices();

async function generateEmployees() {
    for (let i = 1; i <= 100; i++) {
        await employeeServices.add(new Employee((100 + i), ('smith' + i), (10 + i)));
    }
    await delayedfunctions();
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



/*

   async getsize()  // method to return the size of an array containing employee objects
    {
        let response = await fetch("http://localhost:3000/api/getsize");
        let data = await response.json();

        //return this.empcollection.length;
    }

    async getAllEmployees(){      // method to return an array containing all the employee objects
        let response = await fetch("http://localhost:3000/api/getallemployees");
        let data = await response.json();
        
        /*this.employeeArray = Array.from(this.empcollection); //copies all the content from empcollection array to employeeArray
        return this.employeeArray */
