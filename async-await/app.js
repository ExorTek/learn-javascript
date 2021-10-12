function test(data) {
    return data;
}

console.log(test("Hello World!"));
//
//
async function test2(data) {
    return data;
}

console.log(test2("Hello World!"));


async function test3(data) {
    return data;
}

test3("Hello World!").then(response => console.log(response));
//
//
async function test4(data) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 5000);
    });
    let response = await promise;
    console.log(response);
    console.log("Waiting for await :(");
}

test4("Hello World!");
//
//
async function test5(data) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 5000);
    });
    return await promise;
}

test5("Hello World!").then(response => console.log(response));
//
//
async function test6(data) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (data) === "string") {
                resolve(data);
            } else {
                reject("Please enter a string expression!")
            }
        }, 5000);
    });
    return await promise;
}

test6("Hello World!").then(response => console.log(response)).catch(error => console.error(error));
test6(123).then(response => console.log(response)).catch(error => console.error(error));

async function getCurrency(url) {
    const response = await fetch(url);
    return await response.json();
}

getCurrency("https://api.exchangerate.host/latest")
    .then(response => console.log(response))
    .catch(error => console.error(error));
