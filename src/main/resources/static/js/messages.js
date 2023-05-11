import {getUserDetails} from "./users.js";
import {userID} from "./auth.js";
import {messagesURL} from "./url.js";
import {checkIfLiked, toogleLike} from "./like.js";

let chatID = '321';

const textArea = document.getElementById('textArea_message');
const chatArea = document.getElementById('chatArea');
const profilePic = document.getElementById('profilePic');

document.getElementById('send_message').onclick = send_message_onclick;
update_posts();
let updateTimerIntervalId = setInterval(update_posts, 5000);

//Stop updates when site tab isn't visible
document.onvisibilitychange = (event) => {
    if (document.visibilityState === "visible" && updateTimerIntervalId === 0) {
        update_posts();
        updateTimerIntervalId = setInterval(update_posts, 5000);
    } else {
        clearInterval(updateTimerIntervalId);
        updateTimerIntervalId = 0;
    }
}

function send_message_onclick() {
    let message = textArea.value;
    if (message !== "")
        post_message(message);
}

function post_message(message) {
    const body = {
        to: chatID,
        message: message
    };
    fetch(messagesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'userID': userID
        },
        body: JSON.stringify(body),
        cache: "no-store"
    })
        .then(response => {
            console.log("Sent message");
            textArea.value = "";
        })
        .catch(err => console.error(err));
}

function update_posts() {
    fetch(messagesURL + '?'+new URLSearchParams({
        to: chatID
    }), {
        method: 'GET',
        headers: {
            'userID': userID
        },
        cache: "no-store"
    })
        .then(response => console.log(response.status) || response) // output the status and return response
        .then(response => response.json()) // send response body to next then chain
        .then(body => addPosts(body)) // you can use response body here
}

function addPosts(posts) {

    const mySelf = getUserDetails(userID);
    const otherUser = getUserDetails(chatID);

    //Build array of new items.
    const htmlPosts = [];

    posts.forEach((post) => {
        if (post.from === userID) {  //We posted this
            let myMessage = document.createElement('div');
            myMessage.className = "d-flex flex-row justify-content-start";

            let myMessageImage = document.createElement('img');
            myMessageImage.src = getUserDetails(userID).avatar;
            myMessageImage.style = "width: 45px; height: 100%;";
            myMessage.appendChild(myMessageImage);

            let myMessageDiv = document.createElement('div');
            myMessage.appendChild(myMessageDiv);
            myMessage.onclick = () => toogleLike(post._id.$oid);

            let myMessageP = document.createElement('p');
            myMessageP.className = "small p-2 ms-3 mb-1 rounded-3";
            myMessageP.style = "background-color: #f5f6f7;";
            // myMessageP.textContent = post.message;
            myMessageP.innerHTML = convert(post.message);
            myMessageDiv.appendChild(myMessageP);
            let myMessageTime = document.createElement('p');
            myMessageTime.className = "small ms-3 mb-3 rounded-3 text-muted float-end";
            myMessageTime.textContent = time_ago(new Date(post.date));

            let like = document.createElement('span');
            like.setAttribute('style','visibility: hidden;' );
            like.textContent = '👍';
            checkIfLiked(like, post._id.$oid);

            myMessageDiv.appendChild(like);
            myMessageDiv.appendChild(myMessageTime);
            htmlPosts.push(myMessage);
        } else {  //Other part posted this
            let myMessage = document.createElement('div');
            myMessage.className = "d-flex flex-row justify-content-end";

            let myMessageDiv = document.createElement('div');
            myMessage.onclick = () => toogleLike(post._id.$oid);

            myMessage.appendChild(myMessageDiv);
            let myMessageP = document.createElement('p');
            myMessageP.className = "small p-2 me-3 mb-1 text-white rounded-3 bg-primary";
            myMessageP.style = "background-color: #f5f6f7;";

            myMessageP.innerHTML = convert(post.message);
            myMessageDiv.appendChild(myMessageP);
            let myMessageTime = document.createElement('p');
            myMessageTime.className = "small me-3 mb-3 rounded-3 text-muted";
            myMessageTime.textContent = time_ago(new Date(post.date));

            let like = document.createElement('span');
            like.setAttribute('style','visibility: hidden;' );
            like.textContent = '👍';
            checkIfLiked(like, post._id.$oid);

            myMessageDiv.appendChild(like);
            myMessageDiv.appendChild(myMessageTime);
            let myMessageImage = document.createElement('img');
            myMessageImage.src = getUserDetails(chatID).avatar;
            myMessageImage.style = "width: 45px; height: 100%;";
            myMessage.appendChild(myMessageImage);
            htmlPosts.push(myMessage);
        }
    });
    //Update chatArea with the new post view
    chatArea.replaceChildren(...htmlPosts.reverse());
    //Scroll last message into view?
    //htmlPosts.slice(-1)[0].scrollIntoView();
}

function time_ago(time) {

    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds === 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}

function linkify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
        if (isImage(url))
            return '<a target="_blank" rel="noopener noreferrer" href="' + url + '"><img src="' + url + '" style="max-width:180px;"></a>';
        return '<a target="_blank" rel="noopener noreferrer" href="' + url + '">' + url + '</a>';
    });
}

function convert(text) {
    text = htmlEscape(text);  //Replace characters that makes html tags to prevent injection of formatting.
    text = text.replace(/\n/g, "<br>");  //Replace linebreak with <br> tag.
    var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
    text =  text.replace(exp2, '$1http://$2');  //Make text starting with www into a http link?
    return linkify(text);
}

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp')
        .replace(/'/g, '&#39')
        .replace(/"/g, '&quot')
        .replace(/>/g, '&gt')
        .replace(/</g, '&lt')
    // .replace(/\//g, '/');  //To escape forward-slash / for anti-XSS safety purposes use the following:
}

// The opposite function:
function htmlUnescape(str) {
    return str
        .replace(/&amp/g, '&')
        .replace(/&apos/g, "'")
        .replace(/&quot/g, '"')
        .replace(/&gt/g, '>')
        .replace(/&lt/g, '<');
}

//https://www.zhenghao.io/posts/verify-image-url
function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function isImgUrl(url) {
    return fetch(url, {method: 'HEAD',cache: "force-cache"})
        .then(res => {
            return  res.headers.get('Content-Type').startsWith('image');
        })
        .catch(reason => {
            return false;
        });
}
