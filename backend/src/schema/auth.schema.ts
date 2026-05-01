import { z } from "zod";

export const signupSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
})

export const loginSchema = z.object({
    email : z.string().email(),
    password  : z.string().max(15).min(8)
})