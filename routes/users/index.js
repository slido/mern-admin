const router = require("express").Router();
const db = require('../models');
const User = db.user;
const bcrypt = require("bcryptjs");

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


//CREATE USER
router.post("/", async (req, res) => {
  
  const newUser = new User({
	  email: req.body.email,
	  fname: req.body.fname,
	  lname: req.body.lname,
	  password: bcrypt.hashSync(req.body.password, 8)
	});
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE USER      
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
   
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

      try {
        await user.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
   
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports =  router;