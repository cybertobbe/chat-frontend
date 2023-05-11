import {userID} from "./auth.js";
import {likesURL} from "./url.js";

//document.getElementById('message').onclick = () => toogleLike('1');

export function toogleLike(message_id) {
    //Todo: Update to only using message_id when likes service has been updated.
    fetch(likesURL + message_id + '/' + userID + '/false', {
        method: 'PUT',
        headers: {
            'userID': userID
        }
    }).then(response => {
        console.log("Liked");
    }).catch(err => console.error(err));
}

export function checkIfLiked(visual_element, message_id) {
    fetch(likesURL + 'amount/' + message_id, {
        method: 'GET',
        headers: {
            'userID': userID
        }
    }).then(response =>
        response.text()
    ).then(text => {
        if( text > 0)
            visual_element.setAttribute('style','visibility: visible;' );
        else
            visual_element.setAttribute('style','visibility: hidden;' );
    }).catch(err => console.error(err));
}
