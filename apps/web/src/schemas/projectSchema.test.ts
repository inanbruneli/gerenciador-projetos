import { describe, expect, it } from 'vitest'
import { projectFormSchema, type ProjectFormValues } from './projectSchema'

const validValues: ProjectFormValues = {
  name: 'Projeto Teste',
  client: 'Clicksign',
  startDate: '2026-01-10',
  endDate: '2026-02-10',
  coverImage: null,
}

const errorFor = (values: Partial<ProjectFormValues>) =>
  projectFormSchema.validate({ ...validValues, ...values }).then(() => undefined, error => error.message)

describe('projectFormSchema', () => {
  it('accepts valid values', async () => {
    expect(await errorFor({})).toBeUndefined()
  })

  it('requires at least two words in the name', async () => {
    expect(await errorFor({ name: 'Projeto' })).toBe('Por favor, digite ao menos duas palavras')
  })

  it('requires a client', async () => {
    expect(await errorFor({ client: '   ' })).toBe('Por favor, digite ao menos uma palavra')
  })

  it('rejects an end date before the start date', async () => {
    expect(await errorFor({ endDate: '2026-01-09' })).toBe('Não pode ser anterior à data de início')
  })

  it('accepts the same day as start and end', async () => {
    expect(await errorFor({ endDate: '2026-01-10' })).toBeUndefined()
  })

  it('accepts only png or jpg covers', async () => {
    const gif = new File(['gif'], 'capa.gif', { type: 'image/gif' })
    expect(await errorFor({ coverImage: gif })).toBe('Escolha uma imagem .jpg ou .png')
  })

  it('rejects covers larger than 5MB', async () => {
    const large = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'capa.png', { type: 'image/png' })
    expect(await errorFor({ coverImage: large })).toBe('A imagem deve ter no máximo 5MB')
  })
})
