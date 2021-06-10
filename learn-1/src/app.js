let student = {id: 1, name: "Memet"}

function save(ogr, score = 10) {
    console.log(ogr.name + " : " + score)
}

save(student)

//--------------------------------------//
function save1(score = 10, ogr) {
    console.log(ogr.name + " : " + score)
}

save1(undefined, student)


//--------------------------------------//
let students = ["Mehmet", "Ahmet", "Yagmur", "Leyla"]
console.log(students)
let students1 = [student, {id: 2, name: "Kerim"}]
console.log(students1)
let students2 = [student, {id: 2, name: "Kerim"}, "Ankara", {city: "Adana"}]
console.log(students2)


//--------------------------------------//
//Rest
console.log("** Rest **")

let showProducts = function (id, ...products) {
    console.log(id)
    console.log(products)
}
showProducts(1, "Apple", "Banana", "Strawberry")


//--------------------------------------//
//Spread
console.log("** Spread **")

let points = [1, 5, 20, 8, 10, 6, 25, 30, 11, 35]
console.log(...points)
console.log(Math.max(...points))
console.log(..."ABC", "D", ..."EFG", "H")


//--------------------------------------//
//Destructuring
console.log("** Destructuring **")
let populations = [100, 200, 300]
let [small, medium, high] = populations
console.log(small)
console.log(medium)
console.log(high)
//----------------------------//
console.log("** Destructuring Array in array **")
let pop = [100, 200, 300, [400, 500]]
let [smallPop, mediumPop, highPop, [veryHigh, maximum]] = pop
console.log(smallPop)
console.log(mediumPop)
console.log(highPop)
console.log(veryHigh)
console.log(maximum)
//---------------------------//
console.log("** Array destructuring **")

function someFunction([smalls], number) {
    console.log(smalls);
}

someFunction(populations)
//--------------------------//
console.log("** Object destructuring **")
let category = {id: 1, name: "Beverage"}
//console.log(category.id)
//console.log(category["id"])
let {id, name} = category
console.log("ID: " + id)
console.log("NAME: " + name)
