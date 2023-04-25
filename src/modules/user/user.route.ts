import { FastifyInstance } from "fastify";
import { registerUser, loginUser } from "./user.controler";
import { $ref } from "./user.schema";

/**
 * User routes
 * @param server Fastify
 */
async function userRoutes(server: FastifyInstance) {
    // Create user route
    server.post("/", {
        schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref("createResponseSchema")
            }
        },
    }, registerUser);

    // Login user route
    server.post("/login", {
        schema: {
            body: $ref("loginSchema"),
            response: {
                200: $ref("loginResponseSchema")
            }
        }
    }, loginUser)
}

export default userRoutes;