
const express = require("express") // require is a function and we pass express module to the function and this require function returns another function stored in express variable
const app = express() // we call the function express and this express function returns object of type express stored in app
/* this app object represents our application, now this app object has bunch of useful methods such as
app.get()
app.post()
app.put()
app.delete()
app.get() method takes 2 arguments first is path or url and the second argument is callback function, and
this callback function has 2 arguments req and res*/
const path = require("path"); //for setting path                           
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const credentials = [
    { email: "yraviraj@gmail.com", password: "yraviraj" }
];
app.use(express.static('public'));
console.log("employees app js started");

app.get("/", (req, res) => {
    // res.send("Hello world !!!");
    res.sendFile(path.join(__dirname + "/public/login.html"));
});
app.get("/api/credentials", (req, res) => {
    res.send(credentials);
});



app.post("/api/login", (req, res) => {
    //console.log(req.body);
    const cookie = (credentials[0].email === req.body.email) && (credentials[0].password == req.body.password) ? "Matched" : "UN Matched";

    if (cookie === "Matched") {
        res.sendFile(path.join(__dirname + "/public/employees.html"));
        //res.redirect("C:\Users\admin\Desktop\Raviraj\express-demo\public\employees.html",301);
    }
    else {
        res.status(404).send("Username or Password doesnot match");
    }
    //console.log(req.body);
    //console.log(credentials[0].email);
    //console.log(credentials[0].password);

});

let empcollection = [];

app.post("/api/add", (req, res) => {
    //console.log("adding employee >>>>>>>");
    //res.setHeader('Content-Type', 'application/json'); // what for this line and what is the function of this line.
    const emp = req.body;
    if (((emp.name.trim()).length > 0) && (parseInt(req.body.age) > 0)) {
        empcollection.push(emp);
        //console.log("adding employee 0: "+req.body);

        res.status(200).send(empcollection[empcollection.length - 1]);// since we have n elements in an array but index of nth element in an array is n-1 so we added length -1
        //console.log("adding employee 1: "+req.body);
    }
    else {
        let errors = [];
        if (!((emp.name.trim()).length > 0))
            errors.push("Invalid Name");
        if (!(parseInt(req.body.age) > 0))
            errors.push(" Invalid Age");
        res.status(500).send(errors);
        //console.log("Add route error end part req.body : " + req.body);
    }
});

app.post("/api/delete", (req, res) => {
    const iD = req.body.id;
    // console.log(iD);
    const index = empcollection.indexOf(empcollection.find(eachemp => "chk-" + eachemp.id == iD));
    // console.log("index: "+index);
    empcollection.splice(index, 1);
    // console.log("array length: "+empcollection.length);
    res.status(200).send(empcollection);
})

app.post("/api/update", (req, res) => {
    const id = req.body.id;
    const index = empcollection.findIndex(eachObj => eachObj.id == id)

    if (((req.body.name.trim()).length > 0) && (parseInt(req.body.age) > 0) && ((req.body.state.trim()).length > 0) && (parseInt(req.body.pincode) > 0)) {
        empcollection[index].name = req.body.name;
        empcollection[index].gender = req.body.gender;
        empcollection[index].age = req.body.age;
        empcollection[index].state = req.body.state;
        empcollection[index].pincode = req.body.pincode;
        empcollection[index].country = req.body.country;


        res.status(200).send(empcollection[index]);
        //console.log(empcollection[index]);
        console.log(req.body);
    }
    else {
        let errors = [];
        if (!((req.body.name.trim()).length > 0))
            errors.push("Invalid name");

        if (!(parseInt(req.body.age) > 0))
            errors.push(" Invalid age");

        if (!((req.body.state.trim()).length > 0))
            errors.push(" Invalid state name");

        if (!(parseInt(req.body.pincode) > 0))
            errors.push(" Invalid pincode");
        res.status(500).send(errors);
        console.log("update route, Error req body : " +req.body);
    }
});

app.get("/api/getEmployeeObject/:id", (req, res) => {
    const employee = empcollection.find(eachemp => eachemp.id === parseInt(req.params.id))// by default id value will be in string type we convert into int type for strict comparison
    //console.log(employee);
    res.status(200).send(employee);
});

app.get("/api/getsize", (req, res) => {
    //console.log(empcollection.length);
    res.sendStatus(200).send(empcollection.length);
})

app.get("/api/getallemployees", (req, res) => {
    const empcollectionCopy = Array.from(empcollection);
    res.send(empcollectionCopy);
})

//route to call rest api
const api_helper = require("./API_helper")
app.get("/getAPIResponse/countries", (req, res) => {
    api_helper.make_API_call("https://api.printful.com/countries")
        .then(response => res.json(response))   //what is the function of res.json()
        .then(countries => {
            console.log(countries);
            res.status(200).send(countries);
        })
        .catch(error => res.send(error))
})

// route for redirecting login page after logout

app.get("/api/employeeServices/logout", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/login.html"));
});

//const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port...  3000`));