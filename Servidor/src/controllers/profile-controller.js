const mongoose = require('mongoose');
const Profiles = require('../mongo/models/profileInfo');
const Users = require('../mongo/models/user');
const tokenService = require('../controllers/token-service');
const { options } = require('../routes/routes');


const getUserInfo = async(req, res) => {
    try {      
            const {username} = req.body;
            const user = await Users.findOne({username});
            const profile = await Profiles.findOne({user: user._id})
            if(profile){            
                const tokenCode = req.headers.authorization;
                const token = tokenCode.split(' ')[1];
                var isOwned = false
                if (token && token != 'undefined'){
                    senderUsername = await tokenService.decodeToken(token)
                    if (senderUsername === username){
                        isOwned = true
                    }
                }
                res.status(200).send({status:'USER_FOUND', username: user.username, isOwn: isOwned, data: profile})
            }else{
                res.status(404).send({status:'USER_NOT_FOUND', message: 'usuario no encontrado'});
            }
        } catch (error) {
            res.status(500).send({status:'ERROR', message: 'error'});
        }
}


const getUserInfoById = async(req, res) => {
    try {      
            const autorId = req.params.autorId;
            const user = await Users.findOne({_id: autorId});
            const profile = await Profiles.findOne({user: user._id})
            if(profile){
                res.status(200).send({status:'USER_FOUND', username: user.username, image: profile.profilePictureURL})
            }else{
                res.status(404).send({status:'USER_NOT_FOUND', message: 'usuario no encontrado'});
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({status:'ERROR', message: 'error'});
        }
}


const updateProfile = async(req, res) =>{
    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const {username, description, profilePictureURL, twitter, facebook, instagram, youtube} = req.body;
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const options = {session, new: true}
        tokenUsername = await tokenService.decodeToken(token)

        let user = await Users.findOne({username: tokenUsername})
        let profile = await Profiles.findOne({user: user._id})
        let profileImage = profilePictureURL === undefined ? profile.profilePictureURL: profilePictureURL

        let profileUpdate = await profile.update({
            description,
            profileImage,
            twitter,
            facebook,
            instagram,
            youtube
        }, options)

        let userUpdate = await user.update({
            username: username
        }, options)

        if (profileUpdate.ok && userUpdate.ok && username != undefined){
            await session.commitTransaction()
            session.endSession()

            res.status(200).send({status:'ok', message: 'Perfil Actualizado!'});
        }else{
            await session.abortTransaction()
            session.endSession()
            res.status(500).send({status:'Error', message: 'Error en el servidor'});
        }
    }catch(ERROR){
        console.log(ERROR)
        if(ERROR.code && ERROR.code == 11000){
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: ERROR.keyValue});
        }else{
            res.status(505).send({status: 'ERROR', message: 'Problema al actualizar' });
        }
    }

};

module.exports = {getUserInfo, updateProfile, getUserInfoById}