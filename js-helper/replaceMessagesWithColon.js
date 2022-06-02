let sentence = 'Hello *name_surname your age is *age and you are from *country';
const users = [{name_surname: 'Mehmet', age: 23, country: 'Turkey'}, {name_surname: 'Ali', age: 32, country: null}];
let newSentence;
users.map(user => {
    newSentence = sentence.split(' ').map(a => a.includes('*') ? user[a.replace('*', '')] : a).join(' ')
    console.log(newSentence)
    // Hello Mehmet your age is 23and you are from Turkey
    // Hello Ali your age is 32and you are from
})
