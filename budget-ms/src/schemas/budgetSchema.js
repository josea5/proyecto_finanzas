import z from 'zod'

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const budgetSchema = z.object({
    LimitAmount: z.number().int().positive(),
    StartDate: z.string().refine((date) => dateFormatRegex.test(date), {
        message: 'StartDate must be in the format YYYY-MM-DD',
    }),
    EndDate: z.string().refine((date) => dateFormatRegex.test(date), {
        message: 'EndDate must be in the format YYYY-MM-DD',
    }),
})

export function validateBudget(object) {
    return budgetSchema.safeParse(object)
}

export function validatePartialBudget(object) {
    const partialSchema = budgetSchema.partial();
    return partialSchema.safeParse(object);
}



