const express = require('express');
const app = express();
const {accessControl} = require('./middleware');
const PORT = 5000;
const users = [
    {id: 1, userName: 'mehmet', name: 'Mehmet', surName: 'Demirel'},
    {id: 2, userName: 'faba', name: 'faba', surName: 'faba'}
];
const products = [
    {id: 1, productName: 'Cola', category: 'Beverage', price: 10},
    {id: 2, productName: 'Phone', category: 'Technology', price: 2000}
];
/*
    Middleware
app.use(accessControl);

app.get('/users', accessControl, (req, res, next) => {
    res.json({
        success: true,
        data: users
    });
});
*/
app.use(express.json());
app.get('/users', (req, res, next) => {
    res.json({
        success: true,
        data: users
    });
});

app.post('/users', (req, res, next) => {
    users.push(req.body);
    res.json({
        success: true,
        data: users
    });
});

app.put('/users/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users[i] = {
                ...users[i],
                ...req.body
            }
        }
    }
    res.json({
        success: true,
        data: users
    });
});

app.delete('/users/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users.splice(i, 1)
        }
    }
    res.json({
        success: true,
        data: users
    });
});

app.get('/products', (req, res, next) => {
    res.json({
        success: true,
        data: products
    });
});

app.listen(PORT, () => console.log('This port listen: ' + PORT));
