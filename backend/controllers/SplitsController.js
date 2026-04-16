import GroupModel from "../models/SplitsModels/GroupModel.js"
import MemberModel from "../models/SplitsModels/MemberModel.js";

export const createGroup = async (req, res)=>{
    const {groupName, members} = req.body;
    const createdMembers = await Promise.all(members.map(async (member)=>{
        const createdMember = await MemberModel.create({
            name: member,
        })
        return createdMember._id;
    }));
    const group = await GroupModel.create({
        user : req.user.id,
        name : groupName,
        members : createdMembers
    })
    return res.status(201).json({response : {
        message : "Group Created Successfully",
        group
    }});
}

export const fetchGroups = async (req, res)=>{
    const groups = await GroupModel.find({user : req.user.id});
    return res.status(200).json({response : {
        message : 'Fetched Successfully',
        groups
    }})
}

export const createMember = async (req, res)=>{
    const {name, amount} = req.body;
    const member = await MemberModel.create({
        name,
        amount
    })
    return res.status(201).json({response : {
        message : 'Member Created Successfully',
        member
    }})
}

export const fetchMemberDetail = async (req, res)=>{
    const id = req.params.id;
    const member = await MemberModel.findOne({_id : id});
    return res.status(200).json({response : {
        message : 'Fetched member details successfully',
        member
    }})
}

export const fetchMembers = async (req, res)=>{
    const groupId = req.params.groupId;
    const group = await GroupModel.findOne({_id : groupId});
    const membersId = group.members;
    const members = await Promise.all(membersId.map(async (memberId)=>{
       return await MemberModel.findOne({_id : memberId});
    }));
    res.status(200).json({response : {
        message: "Fetched Members successfully",
        members
    }});
}