import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { generateAccessToken, generateRefreshToken } from "../utils/token.utils";


// Register a new user

export const registerUser = async (name, email, password) =>{

    // Check if user already exists
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error ("User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Generate refresh token
    const refreshTolken = generateRefreshToken();

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        refreshToken: refreshTolken
    });

    return {
        userId : newUser._id
    };

};

// Login user

export const LoginUser = async (email, password) => {

    // find user by email
    const user = await User.findOne({email});
    
    if(!user){
        throw new Error ("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid){
        throw new Error ("Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    // Update user's refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    return {
        accessToken,
        refreshToken
    };
};

// Logout user

export const LogoutUser = async (userId) => {
    const user = await User.findById(userId);

    if(!user){
        throw new Error ("User not found");
    }
    user.refreshToken = null;
    await user.save();

    return {
        message: "User logged out successfully"
    };
};