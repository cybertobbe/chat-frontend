import {imagesURL} from "./url.js";
import {userID} from "./auth.js";
import {insertAtCursor} from "./emojis.js";

const showFileUpload = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const confirmBtn = favDialog.querySelector('#confirmBtn');

// "Show the dialog" button opens the <dialog> modally
showFileUpload.addEventListener('click', () => {
    favDialog.showModal();
});


// "Confirm" button triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', (e) => {
    //Clean up file dialog for reuse
    confirmBtn.disabled = true;
    document.getElementById('preview')
        .setAttribute('src',"img/placeholder.png");
    document.getElementById('fileInput').value = null;
});

confirmBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // We don't want to submit this fake form

     var imageUrl = await upload(document.getElementById('fileInput').files[0]);
     console.log(imageUrl);
     if( imageUrl !== "")
         insertAtCursor(document.getElementById('textArea_message'), imageUrl);
    favDialog.close();
});

document.getElementById('fileInput').addEventListener('change', event => readURL(event.target));

//Select image and preview for upload
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview')
                .setAttribute('src', e.target.result);
            confirmBtn.disabled = false;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

const upload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(imagesURL, { // Your POST endpoint
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' +  localStorage.getItem('Token')
        },
        body: formData
    }).then(
        response => response.text() // if the response is a JSON object
    ).then(
        success => {
            console.log("Image uploaded, available at: " + success)
            return success;
        }// Handle the success response object
    ).catch(
        error => console.log(error) // Handle the error response object
    );
};
