let countries = [];
let countries_list = [];

async function getCountriesList() {
    async function getCountries() {         // async function to get countries list using fetch api
        let countries = await fetch("https://api.printful.com/countries");
        return countries;
    }
    getCountries().then((result) => {
        //console.log(result);
        return result.json();
    })
        .then(element => {
            //console.log(element.result);
            element.result.forEach(item => {
                countries_list.push(item.name);
                let x = document.createElement("option");
                let y = document.createTextNode(item.name);
                x.appendChild(y);
                document.getElementById("country").appendChild(x);
            });
        });
}


/*
async function getCountriesList(){
    let response = await fetch("http://localhost:3000/getAPIResponse/countries", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response); //returns readable stream i.e non json format convert response into json format
    let countryRes = await response.json()
    countryRes.result.forEach(item => {
        countries_list.push(item.name);
        let x = document.createElement("option");
        let y = document.createTextNode(item.name);
        x.appendChild(y);
        document.getElementById("country").appendChild(x);
    });
}
*/
