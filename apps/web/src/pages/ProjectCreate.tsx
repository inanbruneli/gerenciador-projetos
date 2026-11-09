import { toast } from 'sonner'
import ProjectForm from '../components/projects/ProjectForm'
import type { ProjectFormValues } from '../schemas/projectSchema'
import { useCreateProject } from '../hooks/useCreateProject'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'

export default function ProjectCreate() {
  const navigate = useTransitionNavigate()
  const createProject = useCreateProject()

  const onSubmit = (values: ProjectFormValues) => {
    createProject.mutate(values, {
      onSuccess: project => {
        toast.success('Projeto criado com sucesso', { description: project.name })
        navigate('/', 'back')
      },
      onError: error => toast.error('Não foi possível salvar o projeto', { description: error.message }),
    })
  }

  return <ProjectForm title="Novo projeto" isPending={createProject.isPending} onSubmit={onSubmit} />
}
