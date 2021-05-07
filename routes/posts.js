const express=require('express');
const Posts=require('../models/posts');

const router=express.Router();

//save post
router.post('/post/save',(req,res)=>{

    let newPost=new Posts(req.body);
    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Post saved successfully"
        });
    });
});

//get post

router.get('/posts',(req,res)=>{
    Posts.find().exec((err,posts)=>{
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get specific post
router.get("/post/:id",(req,res)=>{
    let postId=req.params.id;

    Posts.findById(postId,(err,post)=>{
        if(err) {
            return res.status(400).json({
                success: false
            });
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update post
router.put('/post/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success:"update successfully",post
            });
        }
    );
});

//delete post

router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(
        req.params.id
    ).exec((err,deletePost)=>{
        if(err){
            return res.status(400).json({
                message:"Delete unsuccessfully",err
            });
        }
        return res.status(200).json({
            success:"Delete successfully",deletePost
        });
    });
});

module.exports = router;