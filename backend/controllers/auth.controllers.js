import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        // check if password is enterred correctly
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }
        // check is user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists." });
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // generate a new profile picture
        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // create new user instance
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepicture: gender === "male" ? boyProfile : girlProfile
        });
        if (newUser) {
            // generate JWT token 
            generateTokenAndSetCookie(newUser?._id, res);
            // save the user to the database
            await newUser.save();
            // return OK Created status
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepicture: newUser.profilepicture
            });
        }
        else {
            // user instance is not created successfully
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("error in signup controller");
        res.status(500).json({ error: "Internal server error" });
    }

}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isCorrectPassword = await bcrypt.compare(password, user.password || "");

        // if either one of the credentials is wrong, return bad request
        if (!user || !isCorrectPassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        // generate cookies for a new session
        generateTokenAndSetCookie(user._id, res);

        // return OK status
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepicture: user.profilepicture
        });
    } catch (error) {
        console.log("error in login controller");
        res.status(500).json({ error: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        // reset cookies
        res.cookie("jwt", "", { maxAge: 0 });
        // return OK status
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller");
        res.status(500).json({ error: "Internal server error" });
    }
}