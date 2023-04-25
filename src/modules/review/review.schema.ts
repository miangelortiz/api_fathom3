import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod";

export const reviewIdParam = {
    description: "User Id",
    type: "object",
    properties: {
      id: { type: "string" },
    },
};

// Add review params validation
const reviewInput = {
    title: z.string(),
    description: z.string().optional(),
    rating: z.number().int().min(1).max(5),
}

// Properties generated for a review
const reviewGenerated = {
    id: z.number(),
    createdAt: z.string(),
}

// Update review params validation
const updateReviewInput = {
    title: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
};

// Create review schema
const createReviewSchema = z.object({
    ...reviewInput,
});

// Review response schema
const reviewResponseSchema = z.object({
    ...reviewInput,
    ...reviewGenerated,
})

// Update review schema
const updateReviewSchema = z.object({
    ...updateReviewInput,
});

// Review response schema
const updateReviewResponseSchema = z.object({
    ...updateReviewInput,
})

const reviewsResponseSchema = z.array(reviewResponseSchema);

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const {schemas: reviewSchemas, $ref} = buildJsonSchemas({
    createReviewSchema,
    reviewResponseSchema,
    reviewsResponseSchema,
    updateReviewSchema,
    updateReviewResponseSchema,
}, {$id:"Review"});
