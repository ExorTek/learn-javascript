const fs = require('fs');
const path = require("path");
//Checking the public folder, otherwise creating it
try {
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public')
        if (!fs.existsSync('public/uploads')) {
            fs.mkdirSync('public/uploads')
        }
    }
} catch (err) {
    console.error(err)
}