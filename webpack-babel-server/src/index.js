import {Request} from "./requests";
import {UI} from "./ui";

const apiURL = "http://localhost:3000/employees";
const forms = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");
const updateEmployeeBtn = document.getElementById("update-employee");
const request = new Request(apiURL);
const ui = new UI();


eventListeners();


function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    forms.addEventListener("submit", addToEmployee);
    updateEmployeeBtn.addEventListener("click",updateEmployee);
}

function getAllEmployees() {
    request.get()
        .then(employees => {
            ui.addAllEmployeesToUI(employees);
        })
        .catch(err => console.error(err));

}

function addToEmployee(e) {
    const employeeName = nameInput.value.trim();
    const department = departmentInput.value.trim();
    const salary = salaryInput.value.trim();
    if (employeeName === "" || department === "" || salary === "") {
        ui.displayMessages("Alanları boş geçmeyin...", "danger");
    } else {
        request.post({name: employeeName, department: department, salary: Number(salary)}).then(employee => {
            ui.addEmployeeToUI(employee);
        }).catch(err => ui.displayMessages(`Hata:  ${err}`, "danger"));
    }
    ui.clearInputs();
    e.preventDefault();
}
function updateEmployee(e) {


}

// request.get()
//     .then(employees => console.log(employees))
//     .catch(err => console.log(err));
//
// const data = {
//     name: "John Doe",
//     department: "Fa",
//     salary: "8000",
// }
// request.post(data)
//     .then(employees => console.log(employees))
//     .catch(err => console.log(err));
//
// const data={
//     name:"John Doe",
//     department:"Fa Ba",
//     salary:"2000",
// }
// request.put(3,data)
//     .then(employees => console.log(employees))
//     .catch(err => console.log(err));

// request.delete(3)
//     .then(employees => console.log(employees))
//     .catch(err => console.log(err));
