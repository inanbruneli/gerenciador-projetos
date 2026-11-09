import * as yup from 'yup'

const ALLOWED_COVER_TYPES = ['image/jpeg', 'image/png']
const MAX_COVER_SIZE = 5 * 1024 * 1024
const INVALID_DATE = 'Selecione uma data válida'

const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length
const isValidDate = (value = '') => !Number.isNaN(Date.parse(value))

export const projectFormSchema = yup.object({
  name: yup
    .string()
    .default('')
    .test('two-words', 'Por favor, digite ao menos duas palavras', value => countWords(value) >= 2),
  client: yup
    .string()
    .default('')
    .test('one-word', 'Por favor, digite ao menos uma palavra', value => countWords(value) >= 1),
  startDate: yup
    .string()
    .default('')
    .test('valid-date', INVALID_DATE, isValidDate),
  endDate: yup
    .string()
    .default('')
    .test('valid-date', INVALID_DATE, isValidDate)
    .test('after-start', 'Não pode ser anterior à data de início', (value, context) =>
      !isValidDate(context.parent.startDate) || value >= context.parent.startDate),
  coverImage: yup
    .mixed<File>()
    .nullable()
    .default(null)
    .test('cover-type', 'Escolha uma imagem .jpg ou .png', file => !file || ALLOWED_COVER_TYPES.includes(file.type))
    .test('cover-size', 'A imagem deve ter no máximo 5MB', file => !file || file.size <= MAX_COVER_SIZE),
})

export type ProjectFormValues = yup.InferType<typeof projectFormSchema>
