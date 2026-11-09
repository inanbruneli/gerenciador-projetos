import { Controller, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PageHeading from '../PageHeading'
import FormField from '../form/FormField'
import TextInput from '../form/TextInput'
import DatePicker from '../form/DatePicker'
import CoverUpload from '../form/CoverUpload'
import CalendarStartIcon from '../icons/CalendarStartIcon'
import CalendarEndIcon from '../icons/CalendarEndIcon'
import { projectFormSchema, type ProjectFormValues } from '../../schemas/projectSchema'

type ProjectFormProps = {
  title: string
  animated?: boolean
  defaultValues?: ProjectFormValues
  isPending: boolean
  onSubmit: (values: ProjectFormValues) => void
}

export default function ProjectForm({ title, animated = false, defaultValues = projectFormSchema.getDefault(), isPending, onSubmit }: ProjectFormProps) {
  const { register, control, handleSubmit, getValues, trigger, formState: { errors, isValid } } = useForm<ProjectFormValues>({
    resolver: yupResolver(projectFormSchema),
    mode: 'onTouched',
    defaultValues,
  })

  const startDate = useWatch({ control, name: 'startDate' })

  return <main className="px-10 pt-[69px] pb-[60px]">
    <PageHeading title={title} animated={animated} />

    <section className="mt-8 rounded-lg border border-line px-6 pt-[47px] pb-[51px]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto flex max-w-[704px] flex-col gap-7">
        <FormField label="Nome do projeto" htmlFor="name" required error={errors.name?.message}>
          <TextInput id="name" hasError={!!errors.name} {...register('name')} />
        </FormField>

        <FormField label="Cliente" htmlFor="client" required error={errors.client?.message}>
          <TextInput id="client" hasError={!!errors.client} {...register('client')} />
        </FormField>

        <div className="grid grid-cols-2 gap-10">
          <FormField label="Data de Início" htmlFor="startDate" required error={errors.startDate?.message}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <DatePicker
                id="startDate"
                value={field.value}
                onChange={value => {
                  field.onChange(value)
                  if (getValues('endDate')) trigger('endDate')
                }}
                onBlur={field.onBlur}
                icon={<CalendarStartIcon />}
                hasError={!!errors.startDate}
              />}
            />
          </FormField>

          <FormField label="Data Final" htmlFor="endDate" required error={errors.endDate?.message}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => <DatePicker
                id="endDate"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                icon={<CalendarEndIcon />}
                minDate={startDate}
                hasError={!!errors.endDate}
              />}
            />
          </FormField>
        </div>

        <FormField label="Capa do projeto" htmlFor="coverImage" error={errors.coverImage?.message}>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => <CoverUpload id="coverImage" value={field.value ?? null} onChange={field.onChange} />}
          />
        </FormField>

        <button
          type="submit"
          disabled={!isValid || isPending}
          className="mt-[5px] h-[52px] w-full rounded-full bg-primary text-xl text-white disabled:bg-primary-disabled"
        >
          {isPending ? 'Salvando...' : 'Salvar projeto'}
        </button>
      </form>
    </section>
  </main>
}
