const express = require('express');
const router = express.Router();
const { findAllUsers, findUserByID, updateUser, deleteUser, addUser} = require('../model/user')

router.get('/add', async (req,res) => {
    res.render('add-user');
})
router.post('/add' , async (req,res) => {
    const {fullname, username, password} = req.body;
    if(!fullname || !username || !password) {
       return res.redirect('/add')
    } 
    const result = await addUser( fullname, username, password ); 
    if(!result) 
    {
        res.redirect('/add')
    }
    res.redirect('/user');

})
router.get('/users',  async (req,res) =>{
    const users = await findAllUsers()
    res.render('list-user', {users})
})

router.get('/users/:id',  async (req,res) =>{
    const user = await findUserByID(+req.params.id)
    res.render('detail-user', {user})
})

router.get('/update/:id', async(req,res) => {
    const user = await findUserByID(+req.params.id) 
    if (!user) return res.redirect('/users');
    res.render('update',{user})
})

router.post('/update', async(req,res) => {
    const {idUser,fullname,username, password}= req.body;
    const result = await updateUser(idUser, fullname, username, password );
    if(!result) 
    return res.redirect('/users'+idUser);
    res.redirect('/users');
})

router.get('/delete/:id', async(req,res) => {
    const deleteUserID = await deleteUser(+req.params.id);
    res.redirect('/users')
})

module.exports = router;