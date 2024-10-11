import * as yup from 'yup'

const envSchema = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .default('production'),
  PORT: yup.number().default(3000),
  DATABASE_URL: yup.string().required(),
})

export const env = envSchema.validateSync(process.env)
