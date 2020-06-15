
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

const credentials = [];
app.use(express.static('public'));
console.log("employees app js started");

app.get("/", (req, res) => {
    // res.send("Hello world !!!");
    res.sendFile(path.join(__dirname + "/public/views/login.html"));
});
app.get("/api/credentials", (req, res) => {
    res.send(credentials);
});

app.post("/api/credentials/add", (req, res) => {
    const details = {
        email: req.body.email,
        password: req.body.password
    };
    credentials.push(details);
    res.send(details);
    console.log(details);
});

app.post("/api/login", (req, res) => {
  
    const cookie = (credentials[0].email === req.body.email) && (credentials[0].password == req.body.password) ? "Matched" : "UN Matched";
    
    if(cookie === "Matched"){
        res.sendFile(path.join(__dirname + "/public/employees.html"));
        //res.redirect("C:\Users\admin\Desktop\Raviraj\express-demo\public\employees.html",301);
    }
    else{
        res.status(404).send("Username or Password doesnot match");
    }
    console.log(req.body);
    console.log(credentials[0].email);
    console.log(credentials[0].password);
    
});

let empcollection = [];

app.post("/api/add", (req, res) => {
    const emp = req.body.emp;
    empcollection.push(emp);
});

app.post("/api/delete/:id", (req, res) => {
    const iD = parseInt(req.params.id); 
    const index = empcollection.indexOf(empcollection.find(eachemp => "chk-"+eachemp.id == iD));
    empcollection.splice(index);
})

app.post("api/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const state = req.body.state;
    const pincode = req.body.pincode;
    const country = req.body.country;
    empcollection[id].name = name;
    empcollection[id].age = age;
    empcollection[id].state = state;
    empcollection[id].pincode = pincode;
    empcollection[id].country = country;
})

app.get("api/employeeobject/:id", (req, res) => {
    const employee = empcollection.find(emp => emp.id === parseInt(req.params.id))
    if(!employee) res.status(404).send(`the employee with the ${req.params.id} was not found`);
    res.send(employee);
});

app.get("/api/getsize", (req, res) => {
    res.send(empcollection.length);
})

app.get("/api/getallemployees",(req, res) => {
    const empcollectionCopy = Array.from(empcollection);
    res.send(empcollectionCopy);
})


//const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port...  3000`));