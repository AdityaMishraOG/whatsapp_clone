import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        console.log("l5");
        // obtain current user and all users other than the same
        const loggedInUserId = req.user?._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // exclude the password from the objects

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar in user.controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};