const jwt = require('jwt-simple');
const moment = require('moment');

const Users = require('../mongo/models/user.js');

function createToken (user){
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(30, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.SECRETKEY);
}

const decodeToken = async(token) =>{
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, process.env.SECRETKEY);
            const username = payload.sub
            const user = Users.findOne({username});
            if (payload.exp <= moment.unix()){
                resolve({
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