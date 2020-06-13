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
    body: JSON.stringify({email: "yraviraj@gmail.com", password: "yraviraj"})
})
.then(response => response.json())
.then(data => {console.log(`succes: ${data}`)})
.catch(error => console.error("Error: ",error));
