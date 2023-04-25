import { FastifyReply, FastifyRequest } from "fastify";
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  updateReview,
} from "./review.service";
import { CreateReviewInput, UpdateReviewInput } from "./review.schema";

/**
 * Register new user review controller
 * @param request
 * @param __reply
 * @returns new user review
 */
export async function registerReview(
  request: FastifyRequest<{ Body: CreateReviewInput }>,
  reply: FastifyReply
) {
  try {
    const review = await createReview({
      ...request.body,
      ownerId: request.user.id,
    });
    return review;
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
}

/**
 * Get all user reviews
 * @param request
 * @param reply
 * @returns user reviews
 */
export async function getUserReviews(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const reviews = await getReviews({ ownerId: request.user.id });
    if (reviews.length === 0) {
      return reply.code(404).send({ message: "No reviews found" });
    }
    return reviews;
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
}

/**
 * Delete user review controller
 * @param request
 * @param reply
 * @returns message
 */
export async function deleteUserReview(
  request: FastifyRequest<{ Params: { $id: string } }>,
  reply: FastifyReply
) {
  try {
    const ownerId = request.user.id;
    const checkReview = await getReviewById(request.params.$id);
    if (!checkReview) {
      return reply.code(404).send({ message: "Review not found" });
    }
    if (ownerId !== checkReview.ownerId) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
    const review = await deleteReview(request.params.$id);
    return reply
      .code(200)
      .send({ message: `Review with id:${review.id} deleted` });
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
}

/**
 * Update user review controller
 * @param request
 * @param reply
 * @returns updated user review
 */
export async function updateUserReview(
  request: FastifyRequest<{ Body: UpdateReviewInput, Params: { $id: string } }>,
  reply: FastifyReply
) {
  try {
    const ownerId = request.user.id;
    const checkReview = await getReviewById(request.params.$id);
    if (!checkReview) {
      return reply.code(404).send({ message: "Review not found" });
    }
    if (ownerId !== checkReview.ownerId) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
    const review = await updateReview(request.params.$id, request.body);
    return review;
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }

}
