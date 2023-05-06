const authUrl = "https://fungover.org/auth";

    window.onload = function () {
        let token = localStorage.getItem('Token');

        if (token !== null && !isTokenExpired(token)) {
            console.log("Valid token found");
        } else {
            console.log("Expired or no token");
            localStorage.removeItem('Token');
        }
    }


    // const logIn = async e => {
    //     e.preventDefault();
    //
    //     let bodyData = {username, password};
    //     let data = {};
    //
    //     fetch(`https://h-178-174-162-51.a536.priv.bahnhof.se/auth/`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(bodyData)
    //         })
    //         .then((response) => {
    //             if (response.status !== 200) {
    //                 throw new Error(response.status)
    //             }
    //             return response;
    //         })
    //         .then(res => res.json())
    //         .then((result) => {
    //             data = result;
    //             /** @namespace data.access_token **/
    //             console.log(data.access_token);
    //             localStorage.setItem('Token', data.access_token);
    //             history.push("/home");
    //         })
    //         .catch(function (err) {
    //             const invalidElement = document.getElementById("invalid_credentials");
    //             invalidElement.hidden = false;
    //             console.log(err);
    //         });
    // };

//     return (
//         <div>
//             <div className="con">
//                 <header className="App-header">
//                     <h1 className="h1">
//                         ITHSC
//                     </h1>
//                     <img src={logo} className="App-logo" alt="logo"/>
//                 </header>
//                 <div className="login-con">
//                     <div id={"invalid_credentials"} hidden={true}>Invalid credentials</div>
//                     <form onSubmit={logIn}>
//                         <div className="username-div">
//                             <label>
//                                 <input type="text" placeholder="Username:" value={username} id="username"
//                                        onChange={({target}) => setUsername(target.value)} required/>
//                             </label>
//                         </div>
//                         <div className="Password-div">
//                             <label>
//                                 <input type="password" placeholder="Password:" id="password" value={password}
//                                        onChange={({target}) => setPassword(target.value)} required/>
//                             </label>
//                         </div>
//                         <div>
//                             <button type="submit" id={"submit"} className="login-button">Login</button>
//                         </div>
//                     </form>
//                 </div>
//                 <p><Link to="/register" className="alink"> Register Here </Link></p>
//
//             </div>
//         </div>
//     )
// };

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    return Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
}

function subjectFromToken(token){
    return JSON.parse(atob(token.split('.')[1])).sub;
}
