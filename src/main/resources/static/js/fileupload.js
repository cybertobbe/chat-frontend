const imageUploadURL = 'http://localhost:8080/images';

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
        .setAttribute('src',"http://placehold.it/180");
    document.getElementById('fileInput').value = null;

    //Todo: Did we upload a file and got an url we can insert into the chat text?
    // favDialog.returnValue === 'default' ? "No return value." : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    //Todo: if we have a file, upload and when done put returned url into chatwindow

    // favDialog.close(selectEl.value); // Have to send the select box value here.
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

//Todo: Fix this according to the imageservice endpoint
const upload = (file) => {
    fetch('http://www.example.net', { // Your POST endpoint
        method: 'POST',
        headers: {
            "Content-Type": "You will perhaps need to define a content-type here"
        },
        body: file // This is your file object
    }).then(
        response => response.json() // if the response is a JSON object
    ).then(
        success => console.log(success) // Handle the success response object
    ).catch(
        error => console.log(error) // Handle the error response object
    );
};
