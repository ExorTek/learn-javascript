const apiURL = 'https://jsonplaceholder.typicode.com/';

class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }


    get(url, callback) {
        this.xhr.open("GET", url + 'posts');
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, JSON.parse(this.xhr.response));
            } else {
                callback("Error", null);
            }
        }
        this.xhr.send();
    }

    post(url, data, callback) {
        this.xhr.open("POST", url + 'posts');
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.onload = () => {
            if (this.xhr.status === 201) {
                callback(null, JSON.parse(this.xhr.responseText));
            } else {
                callback("Error", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }

    put(url, data, callback) {
        this.xhr.open("PUT", url + 'posts/1');
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, JSON.parse(this.xhr.responseText));
            } else {
                callback("Error", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }
    delete(url, data, callback) {
        this.xhr.open("DELETE", url + 'posts/1');
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, JSON.parse(this.xhr.responseText));
            } else {
                callback("Error", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }

}

const request = new Request();

// request.get(apiURL, (err, response) => {
//     if (err === null) {
//         console.log(response);
//     } else {
//         console.log(err);
//     }
// });
//
// request.post(apiURL, {userId: 1, title: "Langaç"}, (err, response) => {
//     if (err === null) {
//         console.log(response);
//     } else {
//         console.log(err);
//     }
// })
// request.put(apiURL, {id: 1, title: 'foo', body: 'bar', userId: 1,}, (err, response) => {
//     if (err === null) {
//         console.log(response);
//     } else {
//         console.log(err);
//     }
// })
request.delete(apiURL, {id: 1, title: 'foo', body: 'bar', userId: 1,}, (err, response) => {
    if (err === null) {
        console.log(response);
    } else {
        console.log(err);
    }
})
