const URL = "http://localhost:8080/users"
import {userID} from "./auth";

const usernameinput = document.getElementById('userprofilename');
const userimageinput = document.getElementById('userprofileimage');
const saveprofile = document.getElementById('saveprofile');

saveprofile.onclick = function(){
    if( usernameinput.value !== "" && userimageinput !== ""){
        const body = {
            userName: usernameinput.value,
            pictureLink: userimageinput.value
        };
        const url = URL;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("User profile updated");
            })
            .catch(err => console.error(err));
    }
}
