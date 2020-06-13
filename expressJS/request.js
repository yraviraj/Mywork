
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
const userdetails = [

];

console.log("req js started");

app.get("/",(req, res) => {
    res.send("Hello world !!!");
});
app.get("/api/credentials", (req, res) => {
    res.send(userdetails);
});

app.post("/api/credentials/add", (req, res) => { 
    console.log(req.body);
    const details = {
        email: req.body.name,
        password: req.body.name
    };
    userdetails.push(details);
    res.send(details);
});

//const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port...  3000`));