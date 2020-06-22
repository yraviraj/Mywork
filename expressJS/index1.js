const Joi = require("joi");
const express = require("express") // require is a function and we pass express module to the function and this require function returns another function stored in express variable
const app = express() // we call the function express and this express function returns object of type express stored in app
                            /* this app object represents our application, now this app object has bunch of useful methods such as
                            app.get()
                            app.post()
                            app.put()
                            app.delete()
                            app.get() method takes 2 arguments first is path or url and the second argument is callback function, and
                            this callback function has 2 arguments req and res*/
app.use(express.json());
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"},
    {id: 5, name: "course5"}
];
app.get("/",(req, res) => {
    res.send("Hello world !!!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

/*app.get("/api/courses/:id", (req, res) => {      //here id single parameter
    res.send(req.params.id);
});*/

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(each => each.id === parseInt(req.params.id));
    if(!course) res.status(404).send("the course with the given id is not found");
    res.send(course);
});

app.get("/api/:year/:month", (req, res) => {        //here 2 parameters are passed namely year and month and we can pass any no of parameters
    res.send(req.params);
});

app.get("/api/posts/:year/:month",(req, res) => {
    res.send(req.query);
});

app.post("/api/courses/add", (req, res) => { 
    const schema = { //schema is here a object
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema); //joi validates the req.body object with schema object and this joi returns object stored in result variable
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port...  3000`));