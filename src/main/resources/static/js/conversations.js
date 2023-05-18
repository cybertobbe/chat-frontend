import {messagesURL, usersURL} from "./url.js";
import {checkIfLoggedIn, loggedIn, userID} from "./auth.js";
import {changeChatId} from "./messages.js";
import {getUserDetails} from "./users.js";

const conversationslist = document.getElementById('conversationslist');

export function updateConversations() {

    fetch(messagesURL + '/conversations', {
        method: 'GET',
        headers: {
//            'userID': userID,
            'Authorization': 'Bearer ' + localStorage.getItem('Token')
        },
        cache: "no-store"
    })
        .then(response => response.json()) // output the status and return response
        .then(body => handleConversations(body)); // you can use response body here
}

function handleConversations(conversations) {

    removeAllChildNodes(conversationslist);

    conversations.sort();

    conversations.forEach(e => {
        const uInfo = getUserDetails(e);

        let listItem = document.createElement('li');
        listItem.className = "p-2 border-bottom";
        listItem.onclick = () => {
            changeChatId(e);
        };
        let div0 = document.createElement('div');
        div0.className = "d-flex justify-content-between";
        listItem.appendChild(div0);

        let div1 = document.createElement('div');
        div1.className = "d-flex flex-row";
        div0.appendChild(div1);

        let div2 = document.createElement('div');
        let img = document.createElement('img');
        uInfo.then(u => img.src = u.imageLink);
        img.alt = "avatar";
        img.className = "d-flex align-self-center me-3";
        img.width = 60;
        div2.appendChild(img);

        let span = document.createElement('span');
        span.className = "badge bg-success badge-dot";
        div2.appendChild(span);

        let div3 = document.createElement('div');
        div3.className = "pt-1";
        let p1 = document.createElement('p');
        p1.className = "fw-bold mb-0";
        uInfo.then(u => p1.innerText = u.name);
        div3.appendChild(p1);

        let p2 = document.createElement('p');
        p2.className = "small text-muted";
        p2.innerText = "Here we can show more info";
        div3.appendChild(p2);

        div1.appendChild(div2);
        div1.appendChild(div3);

        let div4 = document.createElement('div');
        div4.className = "pt-1";

        let p3 = document.createElement('p');
        p3.className = "small text-muted mb-1";
        p3.innerText = "Someday";
        div4.appendChild(p3);

        let s1 = document.createElement('span');
        s1.className = "badge bg-danger rounded-pill float-end";
        s1.innerText = "0";
        div4.appendChild(s1);

        div0.appendChild(div4);

        conversationslist.appendChild(listItem);
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const dinput = document.getElementById('search');
let eventSource = null;

dinput.addEventListener('keydown', (e) => {
    eventSource = e.key ? 'input' : 'list';
});
dinput.addEventListener('input', (e) => {
    if (eventSource === 'input')
        findusers();
});

function findusers() {
    var select = document.getElementById("usernames");

    console.log("Call server");
    //Todo: optimize call count
    fetch(usersURL + '/all', {
        method: 'GET',
        headers: {
            'userID': userID,
            'Authorization': 'Bearer ' + localStorage.getItem('Token')
        }
    })
        .then(response => console.log(response.status) || response)
        .then(response => response.json()) // output the status and return response
        .then(body => {
            removeAllChildNodes(select);
            body.map( (user, i) => {
                //Don't display ourself
                if( user.userID === userID)
                    return;
                //i is index
                let el = document.createElement("li");
                el.className = "dropdown-item";
                let span = document.createElement('span');
                span.innerText = user.name;
                el.appendChild(span);
                let img = document.createElement('img');
                img.src = user.imageLink;
                img.className = "user-search-img";
                el.appendChild(img);
                el.setAttribute('data-id', user.userID);
                el.onclick = () => changeChatId(user.userID);
                select.appendChild(el);
            });
        });
}
