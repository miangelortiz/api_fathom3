import prisma from "../../utils/prisma";
import { CreateReviewInput, UpdateReviewInput } from "./review.schema";

/**
 *
 * @param data
 * @returns new user review
 */
export async function createReview(
  data: CreateReviewInput & { ownerId: number }
) {
  return await prisma.review.create({
    data,
  });
}

/**
 *
 * @param data
 * @returns user reviews
 */
export async function getReviews(data: { ownerId: number }) {
  return await prisma.review.findMany({
    where: {
      ownerId: data.ownerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      rating: true,
      createdAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

/**
 *
 * @param id
 * @returns review by id
 */
export async function getReviewById(id: string) {
  const reviewID = parseInt(id);
  return await prisma.review.findUnique({
    where: {
      id: reviewID,
    },
    select: {
      id: true,
      ownerId: true,
    },
  });
}

/**
 *
 * @param id
 * @returns delete user review
 */
export async function deleteReview(id: string) {
  const reviewID = parseInt(id);
  return await prisma.review.delete({
    where: {
      id: reviewID,
    },
  });
}

export async function updateReview(id: string, data: UpdateReviewInput) {
  const reviewID = parseInt(id);
  return await prisma.review.update({
    where: {
      id: reviewID,
    },
    data,
  });
}
