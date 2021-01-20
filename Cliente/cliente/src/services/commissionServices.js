//const address = 'https://webartuv.herokuapp.com/';
const address = 'http://localhost:4000/';

async function getMyCommissionTypes(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
        })
    }

    try {
        const response = await fetch( address + 'getAllMyCommissionTypes', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function getCommissionTypes(contractedUser, page){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch(address + 'getCommissionTypes/' + contractedUser + '/' + page, settings);
        const json = await response.json();
        
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function addCommissionType(token, title, price, description){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "title": title,
            "price": price,
            "description": description
        })
    }
    try {
        console.log(token, title, price, description)
        const response = await fetch(address + 'createCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function deleteCommissionType(token, id){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "commissionTypeId": id
        })
    }
    try {
        const response = await fetch(address + 'deleteCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function editCommissionType(token, id, title, price, description){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "commissionTypeId": id,
            "title": title,
            "price": price,
            "description": description
        })
    }
    try {
        const response = await fetch(address + 'editCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function askCommission(token, contractedUser, commissionId, comments){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "contractedUsername": contractedUser,
            "commissionTypeId": commissionId,
            "comments": comments
        })
    }
    try {
        const response = await fetch(address + 'askCommission', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function getMyAskedCommissions(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch( address + 'getMyAskedCommissions', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function getMyAsignedCommissions(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }

    try {
        const response = await fetch( address + 'getMyAsignedCommissions', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function ResponseCommission(commissionId, response){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "commissionId": commissionId,
            "response": response
        })
    }

    try {
        const response = await fetch( address + 'responseCommission', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export { getMyCommissionTypes, getCommissionTypes, getMyAskedCommissions, getMyAsignedCommissions, addCommissionType, deleteCommissionType, editCommissionType, askCommission, ResponseCommission }