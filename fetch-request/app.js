class Request {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => resolve(data))
                .catch(error => reject(error));
        })

    }

    post(url) {
        fetch(url)
            .then()
            .catch();
    }

    put(url) {
        fetch(url)
            .then()
            .catch();
    }

    delete(url) {
        fetch(url)
            .then()
            .catch();
    }
}

const request = new Request();
request.get("https://jsonplaceholder.typicode.com/albums")
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error));
