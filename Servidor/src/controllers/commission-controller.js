const mongoose = require('mongoose');

const Commissions = require('./../mongo/models/commission')
const CommissionTypes = require('../mongo/models/commissionType')
const Users = require('./../mongo/models/user')
const Profiles = require('../mongo/models/profileInfo')
const nodemailer = require('nodemailer')


const tokenService = require('./token-service');
const { options, use } = require('../routes/routes');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
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

        let createCommissionType = await CommissionTypes.create([{
            title,
            description,
            price,
            picture
        }], options)

        let updateProfile = await Profiles.update(
            { user: user._id},
            { $push: {'commission': createCommissionType[0]._id}}
        , options)
        if (createCommissionType && updateProfile){
            await session.commitTransaction()
            session.endSession()
            res.status(200).send({status: 'ok', message: 'Registered Commission!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            res.status(500).send({status: 'Error', message: 'Error at registering the commission'})
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
        
        commissionType = await CommissionTypes.findOne({_id: commissionTypeId})
        let pictureURL = picture === undefined ? commissionType.picture : picture
        let updateCommissionType = await commissionType.update({

            title: title,
            description: description, 
            price: price,
            picture: pictureURL
        }, options)

        if (updateCommissionType.ok){
            await session.commitTransaction()
            session.endSession()
            res.status(200).send({status: 'ok', message: 'Commission Updated!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            res.status(500).send({status: 'Error', message: 'Error at updating the commission'})
        }

    }catch(error){
        await session.abortTransaction()
        session.endSession()
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
        let updateProfile = await Profiles.update(
            { user: user._id},
            { $pull: {'commission': commissionTypeId }}
        , options)
        let deleteCommissionType = await CommissionTypes.deleteOne({
            '_id': commissionTypeId
        }, options)

        if (deleteCommissionType && updateProfile){
            await session.commitTransaction()
            session.endSession()
            res.status(200).send({message: 'Deleted Commission!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            res.status(500).send({message: 'Error at deleting the commission'})
        }

    }catch(error){
        await session.abortTransaction()
        session.endSession()
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const statusEnumeration = {
    asked: 'Asked',
    accepted: 'Accepted',
    paid: 'Paid',
    delivered: 'Delievered',
    rejected: 'Rejected',
    canceled: 'Canceled',
    inProgress: 'InProgress'
}
const askCommission = async(req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction();
    try {        
        const { contractedUsername, commissionTypeId, comments } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractorUsername = await tokenService.decodeToken(token)
        
        const options = {session, new: true}

        contractorUser = await Users.findOne({username: contractorUsername})
        contractedUser = await Users.findOne({username: contractedUsername})

        let askCommission = await Commissions.create([{
            contractorUserId: contractorUser._id,
            contractedUserId: contractedUser._id,
            commissionType: commissionTypeId,
            status: statusEnumeration.asked,
            comments
        }], options)
        if (askCommission){

                await transporter.sendMail({
                    to: contractedUser.email,
                    subject: 'A new commission!',
                    html: `A new commission from ${contractorUsername} has been added, log into your profile to see it`,
                });
                
                await session.commitTransaction();
                session.endSession();

                res.status(200).send({status: 'ok', message: 'Registered Commission!'})
        }else{
            await session.abortTransaction()
            session.endSession()
            res.status(500).send({status: 'Error', message:'Server error'})
        }
    }catch(error){
        await session.abortTransaction();
        session.endSession()
        console.log(error)
        res.status(500).send({status:'Error', message: 'error'});
    }
} 

const ResponseCommission = async(req, res) => {
    try {        
        const { response, commissionId } = req.body
        commission = await Commissions.findById(commissionId)
        commission.status = response
        commission.save();
        res.status(200).send({status: 'ok', message: 'Commission updated!'})
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
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


const getAllMyCommissionTypes = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        profile = await Profiles.findOne({user: user._id})
        let myCommissionArray = await CommissionTypes.find({
            '_id': { $in: profile.commission}
        })
        if (myCommissionArray.length){
            res.status(200).send({message: 'Sucessfully retracted', data: myCommissionArray})
        }else{
            res.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getCommissionTypesByUsername = async(req, res) => {
    try {        
        const contractedUsername = req.params.contractedUser
        const numberPage = req.params.page
        user = await Users.findOne({username: contractedUsername})
        profile = await Profiles.findOne({user: user._id})
        const commissionArray = await CommissionTypes.paginate({'_id': { $in: profile.commission}},{limit:10, page:numberPage})
        if (commissionArray.docs.length){
            res.status(200).send({message: 'Sucessfully retracted', data: commissionArray})
        }else{
            res.status(404).send({message: 'Commissions not found'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getMyAskedCommissions = async(req, res) => {
    try {      
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        const asignedCommissions = await Commissions.find({contractorUserId: user._id}).sort('createdAt')
        const formattedCommissions = []
        for (const commission of asignedCommissions) {
            let commissionType = await CommissionTypes.findById(commission.commissionType);
            let contractedUser = await Users.findById(commission.contractedUserId);
            let contractorUser = await Users.findById(commission.contractorUserId);
            let tempCommission = {
                id: commission._id,
                title: commissionType.title,
                comments: commission.comments,
                status: commission.status,
                contractedUser: contractedUser.username,
                contractorUser: contractorUser.username
            }
            formattedCommissions.push(tempCommission)
        }
        if (asignedCommissions.length){
            res.status(200).send({message: 'Sucessfully retracted', data: formattedCommissions})
        }else{
            res.status(404).send({message: 'Commissions not found'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const getMyAsignedCommissions = async(req, res) => {
    try {      
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)
        user = await Users.findOne({username})
        const asignedCommissions = await Commissions.find({contractedUserId: user._id}).sort('createdAt')
        const formattedCommissions = []
        for (const commission of asignedCommissions) {
            let commissionType = await CommissionTypes.findById(commission.commissionType);
            let contractedUser = await Users.findById(commission.contractedUserId);
            let contractorUser = await Users.findById(commission.contractorUserId);
            let tempCommission = {
                id: commission._id,
                title: commissionType.title,
                comments: commission.comments,
                status: commission.status,
                contractedUser: contractedUser.username,
                contractorUser: contractorUser.username
            }
            formattedCommissions.push(tempCommission)
        }
        if (asignedCommissions.length){
            res.status(200).send({message: 'Sucessfully retracted', data: formattedCommissions})
        }else{
            res.status(404).send({message: 'Commissions not found'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
module.exports = {createCommission, editCommissionType, deleteCommissionType, getAllMyCommissionTypes, getCommissionTypesByUsername, getMyAsignedCommissions, getMyAskedCommissions, askCommission, ResponseCommission,  getMyAvailableCommission}