import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(50, 'Имя не должно превышать 50 символов'),
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Введите корректный email'),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать не менее 10 символов')
    .max(1000, 'Сообщение не должно превышать 1000 символов'),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
