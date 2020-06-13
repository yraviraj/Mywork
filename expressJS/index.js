/*
const express = require("express"); // loading express module and this returns function called express
const app = express(); //calling the function express() and this fn returns the object of type express and storing the object in app
// app object has bunch of useful methods such as get() post() put() and delete()
//we want to implement on couple of end points to respond on http get request

app.get("/", (req, res) => {   
    res.send("Hello world");
});

app.get("/api/courses", (req, res) => {  //link ending with /api/courses this route is executed
    res.send(["HTML", "CSS", "JavaScript", "React"]);
});

app.get("/api/posts/:year/:month", (req, res) => { // multiple parameters in route
    res.send(req.params); //this is used to print the requested params
});

let port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening Port ${port}...`));
*/
//============================================================================================================================================
/*
const express = require("express"); // loading express module and this returns function called express
const app = express(); //calling the function express() and this fn returns the object of type express and storing the object in app
// app object has bunch of useful methods such as get() post() put() and delete()
//we want to implement on couple of end points to respond on http get request

const courses = [
    {id: 1, name: "HTML 5"},
    {id: 2, name: "CSS 3"},
    {id: 3, name: "Java Script"},
    {id: 4, name: "React"}
];

app.get("/", (req, res) => {   
    res.send("Hello world");
});

app.get("/api/courses", (req, res) => {  //link ending with /api/courses this route is executed
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => { 
    let course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given id was not found");
    res.send(course);
   });

let port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening Port ${port}...`));
*/
//===================================================================================================
/*
const express = require("express"); // loading express module and this returns function called express
const app = express(); //calling the function express() and this fn returns the object of type express and storing the object in app
// app object has bunch of useful methods such as get() post() put() and delete()
//we want to implement on couple of end points to respond on http get request

app.use(express.json());

const courses = [
    {id: 1, name: "HTML 5"},
    {id: 2, name: "CSS 3"},
    {id: 3, name: "Java Script"},
    {id: 4, name: "React"}
];

app.get("/", (req, res) => {   
    res.send("Hello world");
});

app.get("/api/courses", (req, res) => {  //link ending with /api/courses this route is executed
    res.send(courses);
});

app.get("/api/courses/employee/:id", (req, res) => { 
    let course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given id was not found");
    res.send(course);
   });

app.post("/api/courses/add", (req, res) => {
    const course = {
        id : courses.length + 1, 
        name: req.body.name // we assume that in the request body we have an object and that object has a name property in order to work we enable parsing of json object in the body of the request 
    };
    courses.push(course);
    res.send(course);
})

let port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening Port ${port}...`));
*/

//=======================================using validations======================================================================

const Joi = require("joi")  // returns class stored in Joi
const express = require("express"); // loading express module and this returns function called express
const app = express(); //calling the function express() and this fn returns the object of type express and storing the object in app
// app object has bunch of useful methods such as get() post() put() and delete()
//we want to implement on couple of end points to respond on http get request

app.use(express.json());

const courses = [
    {id: 1, name: "HTML 5"},
    {id: 2, name: "CSS 3"},
    {id: 3, name: "Java Script"},
    {id: 4, name: "React"}
];

app.get("/", (req, res) => {   
    res.send("Hello world");
});

app.get("/api/courses", (req, res) => {  //link ending with /api/courses this route is executed
    res.send(courses);
});

app.get("/api/courses/employee/:id", (req, res) => { 
    let course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given id was not found");
    res.send(course);
   });

app.post("/api/courses/add", (req, res) => {
    const schema = {   //schema determines the shape of the object and it determines the type of properties
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema); // this method returns an object and stored in result
    
    if(result.error){
      //  res.status(400).send(result.error); //result.error holds lengthy description of error
      res.status(400).send(result.error.details[0].message);
      return
    }

    const course = {
        id : courses.length + 1, 
        name: req.body.name // we assume that in the request body we have an object and that object has a name property in order to work we enable parsing of json object in the body of the request 
    };
    courses.push(course);
    res.send(course);
})

let port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening Port ${port}...`));