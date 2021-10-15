export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees");
        this.updateBtn = document.getElementById("update");
        this.empForm = document.getElementById("employee-form");
        this.nameInput = document.getElementById("name");
        this.departInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }

    addAllEmployeesToUI(employees) {
        let result = "";
        employees.forEach(employee => {
            result += `
             <tr>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                    <td><a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
             </tr>
            `;
        });
        this.employeesList.innerHTML = result;
    };

    addEmployeeToUI(employee) {
        this.employeesList.innerHTML += `
             <tr>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                    <td><a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
             </tr>
            `;
    };

    clearInputs() {
        this.nameInput.value = "";
        this.departInput.value = "";
        this.salaryInput.value = "";
    };

    displayMessages = (message, type) => {
        const div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = message;
        div.style.marginTop = "10px";
        this.empForm.append(div);
        setTimeout(() => {
            div.remove();
        }, 1000);
    };
}
