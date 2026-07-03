import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Jméno musí mít alespoň 2 znaky')
    .max(100, 'Jméno je příliš dlouhé'),
  phone: z
    .string()
    .min(9, 'Zadejte platné telefonní číslo')
    .max(20, 'Telefonní číslo je příliš dlouhé')
    .regex(/^[+\d\s\-()]+$/, 'Neplatný formát telefonního čísla'),
  email: z
    .string()
    .email('Zadejte platnou emailovou adresu')
    .max(255, 'Email je příliš dlouhý'),
  message: z
    .string()
    .min(10, 'Zpráva musí mít alespoň 10 znaků')
    .max(2000, 'Zpráva je příliš dlouhá'),
  service: z.string().optional(),
})

export type ContactSchema = z.infer<typeof contactSchema>
