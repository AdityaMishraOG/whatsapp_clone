import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        // 15 days in ms
        maxAge: 15 * 24 * 60 * 60 * 1000,
        // prevents XSS attacks
        httpOnly: true,
        // prevents CSRF attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
};

export default generateTokenAndSetCookie;