const Profiles = require('../mongo/models/profileInfo');



const getUserInfo = async(req, res) => {
    try {      
            const {username} = req.body;
            const profile = await Profiles.findOne({username});
            if(profile){
                res.status(200).send({status:'USER_FOUND', data: profile})
            }else{
                res.status(401).send({status:'USER_NOT_FOUND', message: 'usuario no encontrado'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({status:'ERROR', message: 'error'});
        }
}
const createProfile = async(req, res) =>{

    try{
        const {username, description, profilePictureURL, commission, twitter, facebook, instagram, youtube} = req.body;
        await Profiles.create({
            username,
            description,
            profilePictureURL,
            commission,
            twitter,
            facebook,
            instagram,
            youtube
        })
        res.send({status: 'ok', message: 'usuario creado' });

    }catch(ERROR){
        console.log(ERROR);

        if(ERROR.code && ERROR.code == 11000){
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: Error.keyValue});
                return;
        }
        
        res.status(505).send({status: 'ERROR', message: 'usuario no creado' });

    }

};

module.exports = {getUserInfo, createProfile}