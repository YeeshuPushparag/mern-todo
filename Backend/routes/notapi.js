const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const fs = require('fs')
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
})

const upload = multer({ storage: storage })
router.post("/upload", upload.single("myfile"),(req,res)=>{
  res.send("Uploaded")
})
router.post("/updateimg", upload.single("myefile"),(req,res)=>{
  res.json({success:true})
})
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const {title,description,tag,image} = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({title,description,tag,image,user:req.user.id});
      const savedNote = await note.save();
      
      res.json({success:true});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error Ocuured");
    }
  }
);
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

router.put("/updatenote/:id",fetchuser, [
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 Characters").isLength({
    min: 5,
  }),
], async (req, res) => {
  const errors = validationResult(req);
  const {title,description,tag,image,change} = req.body;
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  if (image) {
    newNote.image = image;
  }
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found")
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed")
  }
  if (change!==image) {
    
    const path = `./public/images/${change}`;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("file removed")
    })
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});

  res.json({success:true});
});
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let note =  await Notes.findById(req.params.id);
  const path = `./public/images/${note.image}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  console.log("file removed")
  })
  if (!note) {
    return res.status(404).send("Not Found")
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  
  res.json({"Success":"Note has been Deleted Succesfully",note:note,success:true});
});
module.exports = router;
