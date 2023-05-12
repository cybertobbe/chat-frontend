import {userID} from "./auth.js";
import {likesURL} from "./url.js";

export function toogleLike(message_id) {
    //Todo: Update to only using message_id when likes service has been updated.
    fetch(likesURL + 'toggleLike/'+ message_id, {
        method: 'PUT',
        headers: {
            'userID': userID
        }
    }).then(response => {
        console.log("Liked");
    }).catch(err => console.error(err));
}

//Todo: Handle errors. https://medium.com/@mike.maslyuk/error-handling-for-network-requests-in-client-side-javascript-applications-with-fetch-axios-bd2cddb3249c#28b7
export function checkIfLiked(visual_element, message_id) {
    fetch(likesURL + 'amount/' + message_id, {
        method: 'GET',
        headers: {
            'userID': userID
        }
    }).then(response =>
        response.text()
    ).then(text => {
        if (text > 0)
            visual_element.setAttribute('style', 'visibility: visible;');
        else
            visual_element.setAttribute('style', 'visibility: hidden;');
    }).catch(err => console.log("No connection to server"));
}
