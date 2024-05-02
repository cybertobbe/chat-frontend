import {usersURL} from "./url.js";
import {checkIfLoggedIn, userID} from "./auth.js";

function getUserDetails(userId) {

    const defaultProfile = {
        name: "John Doe",
        imageLink: "img/placeholder.png"
    };

    return fetch(usersURL + '/' + userId, {
        method: 'GET',
        headers: {
            'userID': userID,
            'Authorization': 'Bearer ' +  localStorage.getItem('Token')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw Error();
            }
            return response;
        })
        .then(response => response.json())
        .then(doc => doc)
        .catch(err => defaultProfile);
}

export {getUserDetails};
