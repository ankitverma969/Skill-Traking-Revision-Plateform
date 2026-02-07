import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Function to generate access token

export const generateAccessToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
    );

};

// Function to generate refresh token

export const generateRefreshToken = (userId) => {
    return uuidv4();
}

// Function to verify access token

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    )
};