

async function getProfileInfo(username, token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            'username': username
        })
    }

    try {
        const response = await fetch('http://localhost:4000/getUserProfileInfoByUsername', settings);
        console.log()
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getAvailableCommissions(token, refreshToken){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'refreshtoken': 'Bearer ' + refreshToken
        }),

        body: JSON.stringify({
        })
    }

    try {
        const response = await fetch('http://localhost:4000/getAvailableCommissions', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function editProfile(token, refreshToken, username, description, twitter, facebook, instagram, youtube, profilePictureURL){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'refreshtoken': 'Bearer ' + refreshToken
        }),

        body: JSON.stringify({
            'description': description,
            'twitter': twitter,
            'facebook': facebook,
            'instagram': instagram,
            'youtube': youtube,
            'username': username,
            'profilePictureURL': profilePictureURL
        })
    }

    try {
        console.log(username)
        const response = await fetch('http://localhost:4000/updateProfile', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getProfileInfoById(id, token){

    const settings = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),
    }
    try {
        const response = await fetch('http://localhost:4000/getUserProfileInfoById/' + id, settings);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
}


export { getProfileInfo, getAvailableCommissions, editProfile, getProfileInfoById }