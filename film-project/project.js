const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardsBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storages.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardsBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}


function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if (title === "" || director === "" || url === "") {
        UI.displayMessages("Hata! Alanları boş bırakmayınız.", 'danger');
    } else {
        const newFilm = new Film(title, director, url);
        Storages.addFilm(newFilm);
        UI.displayMessages("Başarılı! Film Eklendi.", 'success');
        UI.addFilmToUI(newFilm);
    }
    ui.clearInput(titleElement, directorElement, urlElement);
    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === 'delete-film') {
        UI.deleteFilmFromUI(e.target);
        Storages.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı", 'success')
    }
}

function clearAllFilms() {
   if(confirm("Emin Misin?")){
       UI.clearAllFilmsFromUI();
       Storages.clearAllFilmsFromStorage();
   }
}
