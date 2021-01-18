async function getHomePosts(page){

    const settings = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch('http://localhost:4000/postList/' + page, settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getPostById(id){
    const settings = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch('http://localhost:4000/post/' + id, settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getPostByUser(autorId, page){
    const settings = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch('http://localhost:4000/autorPosts/' + autorId + '/' + page, settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export {getHomePosts, getPostById, getPostByUser}