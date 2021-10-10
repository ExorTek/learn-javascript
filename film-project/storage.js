//Old
// function Storages() {
//
// }
//
// Storages.prototype.addFilm = function (newFilm) {
//     let films = this.getFilmsFromStorage();
//     films.push(newFilm);
//     localStorage.setItem('films', JSON.stringify(films));
// }
// Storages.prototype.getFilmsFromStorage = function () {
//     let films;
//     if (localStorage.getItem("films") === null) {
//         films = [];
//     } else {
//         films = JSON.parse(localStorage.getItem("films"));
//     }
//     return films;
// }
//
// Storages.prototype.deleteFilmFromStorage = function (filmTitle) {
//     let films = this.getFilmsFromStorage();
//     films.forEach(function (film, index) {
//         if (film.title === filmTitle) {
//             films.splice(index, 1);
//         }
//     });
//     localStorage.setItem('films', JSON.stringify(films));
// }
// Storages.prototype.clearAllFilmsFromStorage = function () {
//     localStorage.removeItem('films');
// }

//ES6

class Storages {
    static addFilm = (newFilm) => {
        let films = this.getFilmsFromStorage();
        films.push(newFilm);
        localStorage.setItem('films', JSON.stringify(films));
    }
    static getFilmsFromStorage = () => {
        let films;
        if (localStorage.getItem("films") === null) {
            films = [];
        } else {
            films = JSON.parse(localStorage.getItem("films"));
        }
        return films;
    }

    static deleteFilmFromStorage = (filmTitle) => {
        let films = this.getFilmsFromStorage();
        films.forEach(function (film, index) {
            if (film.title === filmTitle) {
                films.splice(index, 1);
            }
        });
        localStorage.setItem('films', JSON.stringify(films));
    }
    static clearAllFilmsFromStorage = () => {
        localStorage.removeItem('films');
    }
}
