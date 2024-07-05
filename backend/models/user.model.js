import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilepicture: {
        type: String,
        default: "",
    }
    // timestamps adds createdAt and updatedAt fields
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;