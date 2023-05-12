import {authURL} from "./url.js";

let loggedIn = false;
export let userID = '123';
const authDialog = document.getElementById('authDialog');

//window.onload = checkIfLoggedIn();

document.getElementById('authDialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('submitLogin').onclick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let bodyData = {username, password};
    let data = {};

    var formValid = document.forms["login-form"].checkValidity();
    if (!formValid) {
        document.getElementById('invalid_credentials').hidden = false;
        return;
    } else
        document.getElementById('invalid_credentials').hidden = true;

    fetch(authURL + "/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then((response) => {
            if (response.status !== 200) {
                invalidElement.hidden = false;
                loggedIn = false;
                throw new Error(response.status)
            }
            return response;
        })
        .then(res => res.json())
        .then((result) => {
            data = result;
            console.log(data.token);
            localStorage.setItem('Token', data.token);
            userID = subjectFromToken(data.token);
            loggedIn = true;
        })
        .catch(function (err) {
            const invalidElement = document.getElementById("invalid_credentials");
            invalidElement.hidden = false;
            console.log(err);
        });


    console.log("Time to login");
}

function checkIfLoggedIn() {
    return function () {
        let token = localStorage.getItem('Token');

        if (token === null) {
            console.log("No token found");
            loggedIn = false;
            authDialog.showModal();
        } else if (!isTokenExpired(token)) {
            console.log("Valid token found");
            userID = subjectFromToken(token);
            loggedIn = true;
        } else {
            console.log("Expired token");
            localStorage.removeItem('Token');
            loggedIn = false;
            authDialog.showModal();
        }
    };
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    return Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
}

function subjectFromToken(token) {
    return JSON.parse(atob(token.split('.')[1])).sub;
}
