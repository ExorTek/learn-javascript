function getTextFile() {
    fetch("example.txt")
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

getTextFile();

function getJsonFile() {
    fetch("example.json")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

getJsonFile();

function getExternalAPI() {
    fetch("https://api.exchangerate.host/latest")
        .then(response => response.json())
        .then(data => {
            console.log("1 Euro : " + data.rates.TRY + ' TRY ₺');
        })
        .catch(error => console.log(error));
}

getExternalAPI();

