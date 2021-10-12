const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUser = document.getElementById("clear-last-user");
const lastUsers = document.getElementById("last-user");
const github = new GitHub();
const ui = new UI();
eventListener();

function getData(e) {
    const userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter the user name");
    } else {
        github.getGithubData(userName)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.displayMessages(`${userName} Kullanıcısı mevcut değil veya yanlış. `,"danger")
                } else {
                    ui.displayMessages(`${userName} Kullanıcısının bilgilerini getime başarılı. `,"success")
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(error => ui.displayMessages(error,"danger"));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {

}

function getAllSearched() {

}

function eventListener() {
    githubForm.addEventListener("submit", getData);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}
