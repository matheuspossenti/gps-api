import { config } from 'dotenv'
import * as yup from 'yup'

if (process.env.NODE_ENV === 'test') {
  config({ path: './.env.test' })
} else {
  config()
}

const envSchema = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .default('production'),
  TOKEN: yup.string().required(),
  PORT: yup.number().default(3333),
  DATABASE_URL: yup.string().required(),
})

export const env = envSchema.validateSync(process.env)
