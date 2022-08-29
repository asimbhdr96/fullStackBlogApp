import { ApiError } from "next/dist/server/api-utils/index.js";
import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id : _id} = req.params
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const createPost = async (req, res) => {
  const post = req.body
  const { id : _id} = req.params
  const newPost = new Post(post)
  try {
    await newPost.save()

  } catch (err) {
    res.status(409).json({
      message: error.message,
    });
  }
};


export const deletePost = async (req, res) => {
  const { id : _id} = req.params;
  try {
    const deletedPost = await Post.findByIdAndRemove(_id)
    res.json(deletedPost)

  } catch (err) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const updatePost = async (req, res) => {
  const { id : _id} = req.params;
  const post =req.body
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id,post,{new:true})
    res.json(updatedPost)

  } catch (err) {
    res.status(404).json({
      message: error.message,
    });
  }
};
