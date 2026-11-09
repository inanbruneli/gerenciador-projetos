import { Controller, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import BackLink from '../components/BackLink'
import FormField from '../components/form/FormField'
import TextInput from '../components/form/TextInput'
import DatePicker from '../components/form/DatePicker'
import CoverUpload from '../components/form/CoverUpload'
import CalendarStartIcon from '../components/icons/CalendarStartIcon'
import CalendarEndIcon from '../components/icons/CalendarEndIcon'
import { projectFormSchema, type ProjectFormValues } from '../schemas/projectSchema'
import { useCreateProject } from '../hooks/useCreateProject'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'

export default function ProjectCreate() {
  const navigate = useTransitionNavigate()
  const createProject = useCreateProject()

  const { register, control, handleSubmit, getValues, trigger, formState: { errors, isValid } } = useForm<ProjectFormValues>({
    resolver: yupResolver(projectFormSchema),
    mode: 'onTouched',
    defaultValues: projectFormSchema.getDefault(),
  })

  const startDate = useWatch({ control, name: 'startDate' })

  const onSubmit = (values: ProjectFormValues) => {
    createProject.mutate(values, {
      onSuccess: project => {
        toast.success('Projeto criado com sucesso', { description: project.name })
        navigate('/', 'back')
      },
      onError: error => toast.error('Não foi possível salvar o projeto', { description: error.message }),
    })
  }

  return <main className="px-10 pt-[69px] pb-[60px]">
    <div className="px-[6px]">
      <BackLink />
      <h1 className="mt-[10px] text-2xl font-semibold text-title">Novo projeto</h1>
    </div>

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
          disabled={!isValid || createProject.isPending}
          className="mt-[5px] h-[52px] w-full rounded-full bg-primary text-xl text-white disabled:bg-primary-disabled"
        >
          {createProject.isPending ? 'Salvando...' : 'Salvar projeto'}
        </button>
      </form>
    </section>
  </main>
}
