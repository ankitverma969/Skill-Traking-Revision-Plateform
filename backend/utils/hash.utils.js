import bcrypt from 'bcryptjs';

// Hash a password

export const hashPassword = async (password) => {
    const saltRounds = 10;

    return await bcrypt.hash(
        password,
        saltRounds
    );
};

// Compare a password with a hash

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(
        password,
        hash
    );
};

