import {messagesURL} from "./url.js";
import {userID} from "./auth.js";
import {changeChatId} from "./messages.js";

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

    const htmlConversations = [];

    conversations.forEach(e => {

        let listItem = document.createElement('li');
        listItem.className = "p-2 border-bottom";
        listItem.onclick = () => {
            console.log("Changing chat to: " + e);
            changeChatId(e);
        };

        //Todo: Replace innerhtml with createElement
        listItem.innerHTML =
            `<a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                    <div>
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar" className="d-flex align-self-center me-3"
                            width="60">
                            <span className="badge bg-success badge-dot"></span>
                    </div>
                    <div className="pt-1">
                        <p className="fw-bold mb-0">Marie Horwitz</p>
                        <p className="small text-muted">Hello, Are you there?</p>
                    </div>
                </div>
                <div className="pt-1">
                    <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger rounded-pill float-end">3</span>
                </div>
            </a>`;

        htmlConversations.push(listItem);
    });
    conversationslist.replaceChildren(...htmlConversations);
}
