//const address = 'https://webartuv.herokuapp.com/';
const address = 'http://localhost:4000/';

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
        const response = await fetch(address + 'postList/' + page, settings);
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
        const response = await fetch(address + 'getPost/' + id, settings);
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
        const response = await fetch(address + 'autorPosts/' + autorId + '/' + page, settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getPostByUserName(autorName, page){
    const settings = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch(address + 'autorPostsName/' + autorName + '/' + page, settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}


export {getHomePosts, getPostById, getPostByUser, getPostByUserName}