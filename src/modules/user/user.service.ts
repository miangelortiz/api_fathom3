import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

/**
 * Create new user in database
 * @param input 
 * @returns new user
 */
export async function createUser(input: CreateUserInput ) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash },
    }); 

    return user;
}

/**
 * Find user by email
 * @param email 
 * @returns user data by email
 */
export async function findUserByEmail(email:string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}