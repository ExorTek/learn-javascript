const express = require('express');
const app = express();
const PORT = 5000;
const users = [
    {id: 1, username: 'mehmet', name: 'Mehmet', surname: 'Demirel'},
    {id: 2, username: 'faba', name: 'faba', surname: 'faba'}
]
app.get('/users', (req, res, next) => {
    res.json(users);
})
app.listen(PORT, () => console.log('This port listen: ' + PORT));
