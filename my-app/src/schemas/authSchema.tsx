import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('Insira um e-mail válido.').min(1, 'O campo precisa ser preenchido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

export type LoginData = z.infer<typeof loginSchema>

export const signUpSchema = loginSchema.extend({
    name: z.string().min(1, 'O nome não pode ficar em branco.'),
    confirmPassword: z.string().min(1, 'O campo precisa ser preenchido.')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não batem.',
    path: ['confirmPassword']
})

export type SignUpData = z.infer<typeof signUpSchema>