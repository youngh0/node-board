const commentModel = require('../models/comment.model');

exports.create = async (req,res, next) => {
    try{
            await commentModel.createComment(req.body)
            res.status(201).json({msg: "create comment"})
    }
    catch (e) {
        next(e)
        // res.status(500).send("message : Internal Server Error");
    }
}
