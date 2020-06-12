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
addingProp();