import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    id: String,
    customer_name: String,
    customer_email: String,
    product: String,
    quantity: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
