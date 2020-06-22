/*
(async () => {
    const response = await fetch("https://localhost:3000/api/credentials/add",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: "yraviraj@gmail.com", password: "raviraj"})
    });
    const content = await rawResponse.json();
    console.log(content);
})();  */


fetch("http://localhost:3000/api/credentials/add",{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email: "yraviraj@gmail.com", password: "yraviraj"}) //JSON.stringify converts json object to string and then sends it to server
})
.then(response => response.json())
.then(data => {console.log(`succes: ${data}`)})
.catch(error => console.error("Error: ",error));
