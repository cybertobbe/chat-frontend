import {shortURL} from "./url.js";
import {insertAtCursor} from "./emojis.js";

const showUrlShort = document.getElementById('showUrlDialog');
const confirmBtn = document.getElementById('shortenButton');

showUrlShort.addEventListener('click', () => {
    document.getElementById('shortDialog').showModal();
});

document.getElementById('cancelShortDialog').addEventListener('click', () => {
    document.getElementById('shortDialog').close();
});

document.getElementById('shortDialog').addEventListener('close', (e) => {
    confirmBtn.disabled = true;
    document.getElementById('longUrl').value = null;
});

document.getElementById('longUrl').oninput = () => confirmBtn.disabled = !document.getElementById('longUrl').value;

    confirmBtn.addEventListener('click', () => {
    const body = {
        url: document.getElementById('longUrl').value
    };

    fetch(shortURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('Token')
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(response => {
            insertAtCursor(document.getElementById('textArea_message'), response.short_url);
        })
        .catch(err => console.error(err));

        document.getElementById('shortDialog').close();
});
