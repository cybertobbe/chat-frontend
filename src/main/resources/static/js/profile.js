import {usersURL} from "./url.js";
import {userID} from "./auth.js";
import {getUserDetails} from "./users.js";

const usernameinput = document.getElementById('userprofilename');
const userimageinput = document.getElementById('userprofileimage');
const saveprofile = document.getElementById('saveprofile');

saveprofile.onclick = function(){
    if( usernameinput.value !== "" && userimageinput !== ""){
        const body = {
            userName: usernameinput.value,
            pictureLink: userimageinput.value
        };

        fetch(usersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("User profile updated");
            document.getElementById('exampleModal').modal('hide');
            })
            .catch(err => console.error(err));
    }
}

const userProfile = getUserDetails(userID);
profilePic.src = userProfile.avatar;
//Todo: only update profilePic if we have one, otherwise use generic pic
