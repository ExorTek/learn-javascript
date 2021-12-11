class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        // this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.cardBody = document.querySelector(".card-body");
    }

    clearInput() {
        this.inputField.value = "";
    }

    displayMessages = (message, type) => {
        const div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = message;
        this.cardBody.append(div);
        setTimeout(() => {
            div.remove();
        }, 2000);
    };

    showUserInfo(user) {
        this.profileDiv.innerHTML = `
         <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}" alt="pp"> </a>
                         <hr>
                         <div id="fullName"><strong>${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Takipçi  <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen  <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="img/company.png" width="30px" alt="bos"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="img/location.png" width="30px" alt="bos"> <span>${user.location}</a>
                                    
                                </li>
                                <li>
                                    <img src="img/location.png" width="30px" alt="bos"><span id="company">${user.blog}</span>
                                </li>
                            </div>
                      </div>
                </div>
        `;

    }

    showRepoInfo(repos) {
        this.repoDiv.innerHTML = '';
        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
             <div class="mb-2 card-body">
            <div class="row">
                <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary">
                        Starlar <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                    </button>
                    <button class="btn btn-info">
                        Forklar <span class="badge badge-light" id="repoFork">${repo.forks_count}</span>
                    </button>
                </div>
            </div>
        </div>
            `;
        })
    }
}
