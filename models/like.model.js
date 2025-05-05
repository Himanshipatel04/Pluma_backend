import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(     
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt
    );                                                                  

export const Like = mongoose.model("Like", likeSchema); // Create the Like model from the schema                   