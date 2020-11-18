const jwt = require('jwt-simple');
const moment = require('moment');

const Users = require('../mongo/models/user.js');
const { use } = require('../routes/routes.js');

function createToken (user){
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(1, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.SECRETKEY);
}
function createRefreshToken(user){
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.REFRESHSECRETKEY);
}

const decodeToken = async(token) =>{
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
            if (err.message == 'Token expired'){
                resolve({
                    status: 401,
                    message: err.message
                })
            }else{
                reject({
                    status: 403,
                    message: 'Invalid Token'
                })
            }
        }
    })
    return decoded;
}

const reissueToken = async(token, refreshToken) =>{
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(refreshToken, process.env.REFRESHSECRETKEY);
            const username = payload.sub
            const user = Users.findOne({username})
            if (user.refreshToken == refreshToken){
                resolve({
                    status: 200,
                    message: 'Refreshing Token',
                    newToken: createToken(user)
                })
            }else{
                reject({
                    status: 403,
                    message: 'Invalid Token'
                })
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

module.exports = {createToken, createRefreshToken, decodeToken, reissueToken}