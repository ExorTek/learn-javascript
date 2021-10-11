function getData(data) { //Promise obj döndüren fonksiyon
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (data) === 'string') {
                resolve(data);
            } else {
                reject('Please enter string expression!');
            }
        }, 5000)
    })
}

getData(12).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
