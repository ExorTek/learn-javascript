document.getElementById(`change`).addEventListener("click", change);
const requestURL = 'https://api.exchangerate.host/latest';
const xhr = new XMLHttpRequest();

function change() {
    xhr.open('GET', requestURL);
    xhr.onload = function () {
        if (this.status) {
            const response = JSON.parse(this.responseText);
            const rate = response.rates.TRY;
            const amount = Number(document.getElementById("amount").value);
            document.getElementById("tl").value = amount * rate;
        }
    }
    xhr.send();
}
