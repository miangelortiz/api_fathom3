import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { reviewSchemas } from "./modules/review/review.schema";
import reviewRoutes from "./modules/review/review.route";
import * as dotenv from "dotenv";

dotenv.config();
export const server = Fastify({
    logger: true,
});

// Register fjwt
server.register(fjwt, {
  secret: process.env.JWT_SECRET,
});

// Customise the Fastify server instance.
server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

/**
 * Main function. Register routes, add schemas and start the server.
 */
const main = async () => {
  // Add the schemas before registering the routes
  for (const schema of [...userSchemas, ...reviewSchemas]) {
    server.addSchema(schema);
  }

  // Register the routes
  server.register(userRoutes, { prefix: "api/user" });
  server.register(reviewRoutes, { prefix: "api/review" });

  // Start the server
  try {
    await server.listen({
      port: process.env.PORT,
      host: process.env.HOST,
    });
    console.log("Server listening on port 3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Call the main function. Start!
main();
