import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

/**
 * Create new user
 * @param request 
 * @param reply 
 * @returns response
 */
export async function registerUser(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const body = request.body;
    try {
        // find user by email
        const isUser = await findUserByEmail(body.email);
        if (isUser) {
            return reply.code(409).send({ message: "The email address is already registered" });
        }
        const user = await createUser(body);
        return reply.code(201).send(user);
    } catch (err) {
        console.log(err)
        return reply.code(500).send(err);
    }
}

/**
 * Login user
 * @param request 
 * @param reply 
 * @returns response
 */
export async function loginUser(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const body = request.body;
    try {
        // find user by email
        const user = await findUserByEmail(body.email);
        if (!user) {
            return reply.code(401).send({ message: "Invalid email or password" });
        }
        // verify password
        const validPassword = verifyPassword(
            {
                candidatePassword: body.password,
                salt: user.salt,
                hash: user.password
            }
        )
        if (validPassword) {
            const { password, salt, ...rest } = user;
            // generate access token
            return { accesToken: server.jwt.sign(rest) }
        }
        return reply.code(401).send({ message: "Invalid email or password" });
    } catch (err) {
        console.log(err)
        return reply.code(500).send(err);
    }
}