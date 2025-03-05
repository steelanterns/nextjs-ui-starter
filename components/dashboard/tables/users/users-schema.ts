import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  enabled: z.boolean(),
  emailVerified: z.boolean(),
  createdTimestamp: z.string(),
})

export type User = z.infer<typeof userSchema>

// Schema for creating a new user
export const createUserSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    password: z.string().min(8),
  })

export type CreateUser = z.infer<typeof createUserSchema>

// Schema for updating an existing user
export const updateUserSchema = userSchema.partial().omit({
  id: true,
})

export type UpdateUser = z.infer<typeof updateUserSchema>

