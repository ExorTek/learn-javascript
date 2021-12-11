const apiURL = 'https://jsonplaceholder.typicode.com/albums';

class Request {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });

    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })
                .then(response => response.json())
                .then(data => resolve("Deleted User"))
                .catch(error => reject(error));
        });
    }
}

const request = new Request();

//GET
request.get(apiURL)
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error));

//POST
const data = {userId: 1, id: 1, title: 'Mehmet'}
request.post(apiURL, data).then(data => {
    console.log(data)
})
    .catch(error => console.log(error))

//PUT
const data = {userId: 2, id: 1, title: 'Mehmet'}
request.put(apiURL + '/1', data).then(data => {
    console.log(data)
})
    .catch(error => console.log(error))

//DELETE
request.delete(apiURL + '/1').then(data => {
    console.log(data)
})
    .catch(error => console.log(error))
