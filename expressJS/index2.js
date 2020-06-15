const express = require("express")
const app = express();
app.use (express.json());
const credentials = [ ];

console.log("express js started");
app.get("/api/credentials",(req, res) =>{
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

app.listen(3000, () => console.log("Listening on port... 3000"));