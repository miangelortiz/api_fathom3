import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// We create an object with the user's common properties in order to reuse them.
const userCommonObj = {
    name: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
};

// User schema
const createUserSchema = z.object({
    ...userCommonObj,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});

// Response user schema
const createResponseSchema = z.object({
    id: z.number(),
    ...userCommonObj,
});

// Login schema
const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});

// Response login schema
const loginResponseSchema = z.object({
    accesToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createResponseSchema,
    loginSchema,
    loginResponseSchema
});