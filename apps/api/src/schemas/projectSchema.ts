import * as yup from 'yup'

const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length

const COVER_PATTERN = /^data:image\/(png|jpeg);base64,/
const MAX_COVER_SIZE = 5 * 1024 * 1024
const base64Size = (dataUrl: string) => Math.floor((dataUrl.length - dataUrl.indexOf(',') - 1) * 3 / 4)

export const createProjectSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O nome do projeto é obrigatório')
    .test('two-words', 'O nome deve ter ao menos duas palavras', value => countWords(value) >= 2),
  client: yup
    .string()
    .trim()
    .required('O cliente é obrigatório'),
  startDate: yup
    .date()
    .typeError('Data de início inválida')
    .required('A data de início é obrigatória'),
  endDate: yup
    .date()
    .typeError('Data final inválida')
    .required('A data final é obrigatória')
    .min(yup.ref('startDate'), 'A data final deve ser igual ou posterior à data de início'),
  coverImage: yup
    .string()
    .nullable()
    .default(null)
    .matches(COVER_PATTERN, 'A capa deve ser uma imagem .jpg ou .png')
    .test('cover-size', 'A capa deve ter no máximo 5MB', value => !value || base64Size(value) <= MAX_COVER_SIZE),
})

export type CreateProjectInput = yup.InferType<typeof createProjectSchema>
