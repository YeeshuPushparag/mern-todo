const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "Pushparag$07";

router.post('/createuser', [
  body('name','Enter a valid name').isLength({ min: 3 }),
  body('email','Enter a valid email').isEmail(),
  body('password','Password must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try{
    let user = await Users.findOne({email: req.body.email});
    if (user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
  })
  const data ={
    user:{
      id : user.id
    }
  }
  const auth_token = jwt.sign(data,JWT_SECRET)
  res.json({auth_token});
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some error Ocuured");
  }


})
router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password','Password must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;
  try{
    let user = await Users.findOne({email: req.body.email});
    if (!user){
      return res.status(400).json({error:"Please login with correct credentials"})
    }
  const paaswordCompare = await bcrypt.compare(password,user.password);
  if (!paaswordCompare) {
    return res.status(400).json({error:"Please login with correct credentials"})    
  }
  const data ={
    user:{
      id : user.id
    }
  }
  const auth_token = jwt.sign(data,JWT_SECRET)
  res.json({auth_token});
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some error Ocuured");
  }


})

router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Ocuured");
  }
})
module.exports = router

