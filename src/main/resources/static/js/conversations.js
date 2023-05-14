import {messagesURL} from "./url.js";
import {checkIfLoggedIn, loggedIn, userID} from "./auth.js";
import {changeChatId} from "./messages.js";
import {getUserDetails} from "./users.js";

const conversationslist = document.getElementById('conversationslist');

export function updateConversations() {

    fetch(messagesURL + '/conversations', {
        method: 'GET',
        headers: {
            'userID': userID
        },
        cache: "no-store"
    })
        .then(response => response.json()) // output the status and return response
        .then(body => handleConversations(body)); // you can use response body here
}

function handleConversations(conversations) {

    removeAllChildNodes(conversationslist);

    conversations.forEach(async e =>  {
        const uInfo = getUserDetails(e);

        let listItem = document.createElement('li');
        listItem.className = "p-2 border-bottom";
        listItem.onclick = () => {
            console.log("Changing chat to: " + e);
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
        uInfo.then(u => img.src = u.avatar);
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
        p2.innerText = "Hello, Are you there?";
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
