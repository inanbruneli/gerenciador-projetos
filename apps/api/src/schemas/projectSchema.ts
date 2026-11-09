import * as yup from 'yup'

const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length

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
})

export type CreateProjectInput = yup.InferType<typeof createProjectSchema>
