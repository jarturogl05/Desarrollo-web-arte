const jwt = require('jwt-simple');
const moment = require('moment');

function createToken (user){
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, process.env.SECRETKEY);
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, process.env.SECRETKEY);
            if (payload.exp <= moment.unix()){
                reject({
                    status: 401,
                    message: 'Expired Token'
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