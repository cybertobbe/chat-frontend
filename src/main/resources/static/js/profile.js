import {usersURL} from "./url.js";
import {userID} from "./auth.js";
import {getUserDetails} from "./users.js";

var myModal = document.getElementById('exampleModal')

myModal.addEventListener('show.bs.modal', function (event) {
    fetch(usersURL, {
        method: 'GET',
        headers: {
            'userID': userID,
            'Authorization': 'Bearer ' +  localStorage.getItem('Token')
        }
    })
        .then(response => response.json())
        .then( body => {
            usernameinput.value = body.name;
            userimageinput.value = body.imageLink;
        })
        .catch(err => console.error(err));
})

const usernameinput = document.getElementById('userprofilename');
const userimageinput = document.getElementById('userprofileimage');
const saveprofile = document.getElementById('saveprofile');

saveprofile.onclick = function () {
    if (usernameinput.value !== "" && userimageinput.value !== "") {
        const body = {
            name: usernameinput.value,
            imageLink: userimageinput.value
        };

        fetch(usersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userID': userID,
                'Authorization': 'Bearer ' +  localStorage.getItem('Token')
            },
            cache: "force-cache",
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("User profile updated");
                reloadUserProfile();
                document.getElementById('closeprofile').click();
            })
            .catch(err => console.error(err));
    }
}

export function reloadUserProfile(){
    getUserDetails(userID).then(userProfile => {
        profilePic.src = userProfile.imageLink;
        profilepic2.src = userProfile.imageLink;
    });
}
