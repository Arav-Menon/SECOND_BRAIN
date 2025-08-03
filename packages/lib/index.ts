import z from 'zod';

export const authValidation = z.object({
	userName: z.string().min(3).max(10).optional(),
	email: z.string().email(),
	password: z.string().min(6).max(100),
});
