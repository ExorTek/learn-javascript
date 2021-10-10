const cardBody = document.querySelector(".dang");
//
// //Old
// function UI() {
//
// }
//
// UI.prototype.loadAllFilms = function (films) {
//     const filmList = document.getElementById("films");
//     films.forEach(function (film) {
//         filmList.innerHTML += `
//      <tr>
//         <td><img src="${film.url}" class="img-fluid img-thumbnail" alt="${film.title}"></td>
//         <td>${film.title}</td>
//         <td>${film.director}</td>
//         <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
//      </tr>
//     `;
//     })
// };
// UI.prototype.addFilmToUI = function (newFilm) {
//     const filmList = document.getElementById("films");
//     filmList.innerHTML += `
//      <tr>
//         <td><img src="${newFilm.url}" class="img-fluid img-thumbnail" alt="${newFilm.title}"></td>
//         <td>${newFilm.title}</td>
//         <td>${newFilm.director}</td>
//         <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
//      </tr>
//     `;
// };
//
// UI.prototype.clearInput = function (element1, element2, element3) {
//     element1.value = '';
//     element2.value = '';
//     element3.value = '';
// };
//
// UI.prototype.displayMessages = function (message, type) {
//     const div = document.createElement("div");
//     div.className = `alert alert-${type}`;
//     div.textContent = message;
//     cardBody.append(div);
//     setTimeout(() => {
//         div.remove();
//     }, 1000);
// };
// UI.prototype.deleteFilmFromUI =  (element)=> {
//     element.parentElement.parentElement.remove();
// }
// UI.prototype.clearAllFilmsFromUI = function () {
//     const filmList = document.getElementById("films");
//     while (filmList.firstElementChild != null) {
//         filmList.firstElementChild.remove();
//     }
// }

//ES6
class UI {
    static loadAllFilms =  (films)=> {
        const filmList = document.getElementById("films");
        films.forEach(function (film) {
            filmList.innerHTML += `
     <tr>
        <td><img src="${film.url}" class="img-fluid img-thumbnail" alt="${film.title}"></td>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
     </tr>
    `;
        })
    };
    static addFilmToUI =  (newFilm)=> {
        const filmList = document.getElementById("films");
        filmList.innerHTML += `
     <tr>
        <td><img src="${newFilm.url}" class="img-fluid img-thumbnail" alt="${newFilm.title}"></td>
        <td>${newFilm.title}</td>
        <td>${newFilm.director}</td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
     </tr>
    `;
    };

    static clearInput =(element1, element2, element3)=> {
        element1.value = '';
        element2.value = '';
        element3.value = '';
    };

    static displayMessages = (message, type)=> {
        const div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = message;
        cardBody.append(div);
        setTimeout(() => {
            div.remove();
        }, 1000);
    };
    static deleteFilmFromUI =  (element)=> {
        element.parentElement.parentElement.remove();
    }
    static clearAllFilmsFromUI = function () {
        const filmList = document.getElementById("films");
        while (filmList.firstElementChild != null) {
            filmList.firstElementChild.remove();
        }
    }
}
