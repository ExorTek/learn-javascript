const apiURL = 'https://jsonplaceholder.typicode.com/albums';

class Request {
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        });
        return await response.json();
    }

    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        });
        return await response.json();
    }

    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        });
        return "Deleted successfully.";
    }
}

const request = new Request();
const data = {userId: 1, title: 'Memet'};

request.get(apiURL).then((response) => {
    console.log(response)
}).catch(error => {
    console.error(error)
});

request.post(apiURL, data).then((response) => {
    console.log(response)
}).catch(error => {
    console.error(error)
});

request.put(apiURL + '/1', data).then((response) => {
    console.log(response)
}).catch(error => {
    console.error(error)
});

request.delete(apiURL + '/1').then((response) => {
    console.log(response)
}).catch(error => {
    console.error(error)
});
