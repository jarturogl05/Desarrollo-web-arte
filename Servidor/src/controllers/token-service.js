const jwt = require('jwt-simple');
const moment = require('moment');

function createToken (user){
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(30, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.SECRETKEY);
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, process.env.SECRETKEY);
            const username = payload.sub
            const user = await Users.findOne({username});
            if (payload.exp <= moment.unix()){
                reject({
                    status: 200,
                    message: 'Expired Token',
                    newToken: createToken(user)
                });
            }else{
                resolve(payload.sub);
            }
        }catch (err){
            reject({
                status: 403,
                message: 'Invalid Token'
            })
        }
    })
    return decoded;
}

module.exports = {createToken, decodeToken}