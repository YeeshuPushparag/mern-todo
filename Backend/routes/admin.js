const express = require('express');
const Admin = require('../models/Admin');
const Users = require('../models/Users');
const Notes = require("../models/Notes");
const mongoose = require("mongoose");
const router = express.Router();

router.post('/createadmin', async (req, res)=>{
    try {
       const user = await Admin.create({
            name: req.body.name,
            password: req.body.password,
        })
      res.json({user});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error Ocuured");
    }
  })
router.post('/loginadmin', async (req, res)=>{
    try {
       const user = await Admin.findOne({password: req.body.password});
       if (!user){
       res.send({error:"Please login with correct credentials"})
       console.log("Wrong Password")
      }
      else{
      res.json({success:true})
      }
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error Ocuured");
    }
  })
router.post('/showcoll', async (req, res)=>{
  const arr = []
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      names.forEach(function (e) {
        arr.push(e.name)
      });
    }
    res.json(arr);
  });
  })
router.post('/showadmin', async (req, res)=>{
  const notes = await Admin.find({}).select("-password -_id");
  res.json(notes);
  })
router.post('/showusers', async (req, res)=>{
  const notes = await Users.find({}).select("-password -_id");
  res.json(notes);
  })
router.post('/shownotes', async (req, res)=>{
  const notes = await Notes.find({});
  res.json(notes);
  })



module.exports = router;
