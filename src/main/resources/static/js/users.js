
function getUserDetails(userId) {

    //Todo: Ask UserProfile service for information
    if (userId === '123')
        return {
            name: "Ben Smith",
            avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        };
    if (userId === '321')
        return {
            name: "Marie Horwitz",
            avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        };
}

export {getUserDetails};
