const Comment = require('../models/comment_model')
const { validationResult, Result } = require('express-validator');


module.exports ={
      post: (req, res) =>{
        const result = validationResult(req);
          Comment.create({
            comment:req.body.comment,
            userId: req.session.userId
          })
          res.redirect('back')
      },
      
      postcommentUpdate: async (req, res) => {
        // console.log(req.body);
        await Comment.update({
          name: req.body.name,
          comment: req.body.comment
        },{
          where: {
            id: req.params.id
          }
        })
        res.redirect('back')
      },
      delete: (req, res)=>{
        Comment.destroy({
          where: {
            id: req.params.commentId
          }
        })
        res.redirect('back')
      }
}