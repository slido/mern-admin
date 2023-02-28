const express = require('express');
const db = require("../models");
const User = db.user;
const Feedback = db.feedback;

// Prepare Core Router
let app = express.Router()// User Subscribe


app.post('/refresh/profile', async  (req, res) => {
	let user = await User.findOne({ _id: req.user._id })
	let profile = {
        ...user.toObject()
    }

	delete profile.password
	res.json({
		profile: profile
	})
})

app.post('/feedback', async  (req, res) => {
	try {
		const feedback = new Feedback({
			user: req.user._id,
			feedback: req.body.feedback,
			email: req.user.email,
		});
		await feedback.save()
		res.json({ success: true, })
	} catch (err){
		console.log(err)
	}

})

app.post('/feedback/view', async  (req, res) => {
	try {
		const feedbacks = await Feedback.find({
			user: req.user._id,
		}).sort({_id: -1}).limit(5)
		res.json(feedbacks)
	} catch (err){
		console.log(err)
	}

})


module.exports = app