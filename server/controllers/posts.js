import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { Id } = req.params;

    try {
        const post = await PostMessage.findById(Id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { id, customer_name, customer_email, product, quantity} = req.body;
    const newPostMessage = new PostMessage({ id, customer_name, customer_email, product, quantity })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { Id } = req.params;
    const { id, customer_name, customer_email, product, quantity } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(Id)) return res.status(404).send(`No post with id: ${Id}`);

    const updatedPost = { id, customer_name, customer_email, product, quantity, _id: Id };

    await PostMessage.findByIdAndUpdate(Id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { Id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(Id)) return res.status(404).send(`No post with id: ${Id}`);

    await PostMessage.findByIdAndRemove(Id);

    res.json({ message: "Post deleted successfully." });
}


export default router;