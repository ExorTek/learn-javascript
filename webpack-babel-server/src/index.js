import {Request} from "./requests";
import {UI} from "./ui";

const apiURL = "http://localhost:3000/employees";
const forms = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");
const updateEmployeeBtns = document.getElementById("update");
const request = new Request(apiURL);
const ui = new UI();
let updateState = null;

eventListeners();


function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    forms.addEventListener("submit", addToEmployee);
    employeeList.addEventListener("click", updateOrDeleteEmployee);
    updateEmployeeBtns.addEventListener('click', updateEmployee);
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

function updateOrDeleteEmployee(e) {
    if (e.target.id === "delete-employee") {
        deleteEmployee(e.target);
    } else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement);
    }
    e.preventDefault();

}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id).then(message => {
        ui.displayMessages(message, "success");
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    }).catch(err => ui.displayMessages(err, "danger"));
}

function updateEmployeeController(targetEmployee) {
    ui.toggleUpdateButton(targetEmployee);
    if (updateState === null) {
        updateState = {
            updateId: targetEmployee.children[3].textContent,
            updateParent: targetEmployee
        }
    } else {
        updateState = null;
    }
}

function updateEmployee() {
    if (updateState) {
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())
        };
        request.put(updateState.updateId, data).then(message => {
            ui.displayMessages(`Employee update successfully ${message}`, "success")
            ui.updateEmployeeOnUI(updateEmployee, updateState.updateParent);
        }).catch(err => ui.displayMessages(`Employee update unsuccessful! ${err}`, "danger"));
    }
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
