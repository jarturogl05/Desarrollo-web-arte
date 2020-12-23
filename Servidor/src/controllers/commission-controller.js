const mongoose = require('mongoose');

const Commissions = require('./../mongo/models/commission')
const CommissionTypes = require('../mongo/models/commissionType')
const Users = require('./../mongo/models/user')
const Profiles = require('../mongo/models/profileInfo')

const tokenService = require('./token-service');

const createCommission = async(req, res) => {
    const { title, description, price, picture } = req.body
    const session = await mongoose.startSession()
    session.startTransaction();
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const options = {session, new: true}
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        profile = await Profiles.findOne({_id: user._id})

        let createCommissionType = await CommissionTypes.create({
            title,
            description,
            price,
            picture
        }, options)

        let updateProfile = await Profiles.update(
            { user: user._id},
            { $push: {commission: createCommission._id}}
        , options)

        if (createCommissionType && updateProfile){
            await session.commitTransaction()
            session.endSession()
            send.status(200).send({message: 'Registered Commission!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            send.status(500).send({message: 'Error at registering the commission'})
        }

    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const editCommissionType = async(req, res) => {
    const { commissionTypeId, title, description, price, picture } = req.body
    const session = await mongoose.startSession()
    session.startTransaction();
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const options = {session, new: true}
        username = await tokenService.decodeToken(token)
        // user = await Users.findOne({username})
        // profile = await Profiles.findOne({_id: user._id})
        commissionType = await CommissionTypes.findOne({_id: commissionTypeId})
        let pictureURL = picture === undefined ? commissionType.picture : picture
        let updateCommissionType = await Commissions.update({
            title: title,
            description: description, 
            price: price,
            picture: pictureURL
        }, options)



        if (updateCommissionType){
            await session.commitTransaction()
            session.endSession()
            send.status(200).send({message: 'Commission Updated!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            send.status(500).send({message: 'Error at updating the commission'})
        }

    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const deleteCommissionType = async(req, res) => {
    const { commissionTypeId } = req.body 
    const session = await mongoose.startSession()
    session.startTransaction();
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const options = {session, new: true}
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        profile = await Profiles.findOne({_id: user._id})

        let deleteCommissionType = await CommissionTypes.deleteOne({
            _id: commissionTypeId
        }, options)

        let updateProfile = await Profiles.update(
            { user: user._id},
            { $pop: {commission: commissionTypeId}}
        , options)

        if (deleteCommission && updateProfile){
            await session.commitTransaction()
            session.endSession()
            send.status(200).send({message: 'Deleted Commission!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            send.status(500).send({message: 'Error at deleting the commission'})
        }

    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const askCommission = async(req, res) => {
    try {        
        const { contracted, commissiontype } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractorUsername = await tokenService.decodeToken(token)

        contractorUser = await Users.findOne(contractorUsername)
        contractedUser = await Users.findOne(contracted)

        await Commissions.create({
            contractorUser,
            contractedUser,
            commissiontype
        })
        
        send.status(200).send({message: 'Registered Commission!'})
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
} 

const ResponseCommission = async(req, res) => {
    try {        
        const { response, commissionid } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractedUsername = await tokenService.decodeToken(token)

        contractedUser = await Users.findOne(contractedUsername)
        commission = await Commissions.findById(commissionid)

        if (contractedUser == commission.contractedUser){
            commission.accepted = response
            commission.save()
            if (response){
                send.status(200).message('Accepted Commission!')
            }else{
                send.status(200).message('Rejected Commission :(')
            }
        }else{
            send.status(403).message('You cannot modify other users commissions')
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
} 

const PayCommission = async(req, res) => {      

}


const getMyAvailableCommission = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)

        commissions = await Commissions.find({contractedUser: username, accepted: false})
        
        if (commissions.length){
            console.log(commissions.length)
            res.status(200).send({message: 'Sucessfully retracted', data: commissions})
        }else{
            res.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getAllMyCommission = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)

        commissions = await Commissions.find({contractedUser: username})
        
        if (commissions.any()){
            send.status(200).send({message: 'Sucessfully retracted', data: commissions})
        }else{
            send.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getAllMyCommissionTypes = async(req, res) => {
    try {        
        console.log(req.headers)
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        profile = await Profiles.findOne({user: user._id})
        var CommissionTypesArray = [];
        array.forEach({

        })

        await profile.CommissionTypes.forEach((value) => {
            CommissionTypesArray.push(commissionTypes.findById(value))
        })

        if (CommissionTypesArray.any()){
            send.status(200).send({message: 'Sucessfully retracted', data: CommissionTypesArray})
        }else{
            send.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
module.exports = {createCommission, editCommissionType, deleteCommissionType, getAllMyCommissionTypes, askCommission, ResponseCommission, PayCommission, getMyAvailableCommission}