import { useParams } from 'react-router'
import { toast } from 'sonner'
import ProjectForm from '../components/projects/ProjectForm'
import NotFound from './NotFound'
import type { ProjectFormValues } from '../schemas/projectSchema'
import { useProjects } from '../hooks/useProjects'
import { useUpdateProject } from '../hooks/useUpdateProject'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'

export default function ProjectEdit() {
  const { id = '' } = useParams()
  const navigate = useTransitionNavigate()
  const { data: projects, isPending } = useProjects()
  const updateProject = useUpdateProject(id)

  if (isPending) return null

  const project = projects?.find(item => item.id === id)
  if (!project) return <NotFound />

  const defaultValues: ProjectFormValues = {
    name: project.name,
    client: project.client,
    startDate: project.startDate.slice(0, 10),
    endDate: project.endDate.slice(0, 10),
    coverImage: project.coverImageUrl,
  }

  const onSubmit = (values: ProjectFormValues) => {
    updateProject.mutate(values, {
      onSuccess: updated => {
        toast.success('Projeto atualizado', { description: updated.name })
        navigate('/', 'back')
      },
      onError: error => toast.error('Não foi possível salvar o projeto', { description: error.message }),
    })
  }

  return <ProjectForm title="Editar projeto" defaultValues={defaultValues} isPending={updateProject.isPending} onSubmit={onSubmit} />
}
