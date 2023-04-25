import crypto from "crypto";

// We use the nodejs crypto module to create a random salt and a cryptographic hash function to transform
// the password into a new series of characters with a fixed length. 
// The output hash value will always have the same length.
/**
 * Creates a new salt and hash with the given password
 * @param password 
 * @returns hash and salt object
 */
export const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    // We create the hash with the received password and the generated salt.
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    
    return { hash, salt};
};

// Here we verify the password provided by the user, so we receive 3 arguments, the password provided by the user (candidatePassword), the salt and the hash.
export const verifyPassword = ({ candidatePassword, salt, hash } : { candidatePassword: string, salt: string, hash: string}) => {
    // We generate a hash (candidateHash) with the password and the received salt to compare it later with the received hash.
    const candidateHash = crypto.pbkdf2Sync(
        candidatePassword,
        salt, 
        1000,
        64,
        "sha512"
    ).toString("hex");

    return candidateHash === hash;
};