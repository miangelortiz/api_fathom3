import { FastifyInstance } from "fastify";
import {
  deleteUserReview,
  getUserReviews,
  registerReview,
  updateUserReview,
} from "./review.controller";
import { $ref, reviewIdParam } from "./review.schema";

/**
 * Rewiew routes
 * @param server
 */
async function RewiewRoutes(server: FastifyInstance) {
  // Add user review route
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createReviewSchema"),
        response: {
          201: $ref("reviewResponseSchema"),
        },
      },
    },
    registerReview
  );

  // Get all user reviews route
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("reviewsResponseSchema"),
        },
      },
    },
    getUserReviews
  );

  // Delete user review route
  server.delete(
    "/:$id",
    {
      preHandler: [server.authenticate],
      schema: {
        params: {
          id: reviewIdParam,
        },
      },
    },
    deleteUserReview
  );

  // Update user review route
  server.patch(
    "/:$id",
    {
      preHandler: [server.authenticate],
      schema: {
        params: {
          id: reviewIdParam,
        },
        body: $ref("updateReviewSchema"),
        response: {
          200: $ref("updateReviewResponseSchema"),
        },
      },
    },
    updateUserReview
  );
}

export default RewiewRoutes;
