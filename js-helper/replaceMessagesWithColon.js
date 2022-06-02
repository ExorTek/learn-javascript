let sentence = 'Hello *name_surname your age is *age';
const users = [{name_surname: 'Mehmet', age: 23}, {name_surname: 'Ali', age: 32}];
let newSentence;
users.map(user => {
    newSentence = sentence.split(' ').map(a => a.includes('*') ? user[a.replace('*', '')] : a).join(' ')
    console.log(newSentence)
    // Hello Mehmet your age is 23
    // Hello Ali your age is 32
})
