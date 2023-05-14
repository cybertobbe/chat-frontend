import {authURL} from "./url.js";
import {reloadUserProfile} from "./profile.js";

export let loggedIn = false;
export let userID = '';
const authDialog = document.getElementById('authDialog');
let username = "";
let password = "";


window.onload = () => checkIfLoggedIn();

document.getElementById('authDialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('logout_button').onclick = () => logout();

document.getElementById('submitLogin').onclick = () => {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    const bodyData = {username, password};

    var formValid = document.forms["login-form"].checkValidity();
    if (!formValid) {
        document.getElementById('invalid_credentials').hidden = false;
        return;
    } else
        document.getElementById('invalid_credentials').hidden = true;

    retrieveNewToken(bodyData);
}

function retrieveNewToken(bodyData) {
    fetch(authURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then((response) => {
            if (response.status !== 200) {
                document.getElementById('invalid_credentials').hidden = false;
                loggedIn = false;
                throw new Error(response.status);
            }
            return response;
        })
        .then(res => res.json())
        .then((data) => {
            localStorage.setItem('Token', data.token);
            userID = subjectFromToken(data.token);
            loggedIn = true;
            authDialog.close();
        })
        .catch(function (err) {
            const invalidElement = document.getElementById("invalid_credentials");
            document.getElementById('invalid_credentials').hidden = false;
            console.log(err);
        });
}


function logout() {
    localStorage.removeItem('Token');
    loggedIn = false;
    userID = '';
    location.reload();
}

export function checkIfLoggedIn() {
    let token = localStorage.getItem('Token');
    if (authDialog.open)
        return false;

    if (token === null) {
        console.log("No token found");
        loggedIn = false;
        userID = '';
        authDialog.showModal();
    } else if (!isTokenExpired(token)) {
        console.log("Valid token found");
        userID = subjectFromToken(token);
        loggedIn = true;
    } else {
        console.log("Expired token");
        //Token has expired go get a new one
        if (username !== "" && password !== "") {
            const bodyData = {username, password};
            retrieveNewToken(bodyData);
            //Todo: Implement refresh token instead of reusing username/password.
            // If reloading site these values are lost.
        } else {
            loggedIn = false;
            userID = '';
            authDialog.showModal();
        }
    }
    return loggedIn;
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
