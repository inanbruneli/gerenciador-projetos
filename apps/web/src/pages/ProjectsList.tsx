import EmptyProjects from '../components/EmptyProjects'

export default function ProjectsList() {
  return <main className="flex min-h-full px-[42px] py-[60px]">
    <section className="flex flex-1 items-center justify-center bg-white pb-1">
      <EmptyProjects />
    </section>
  </main>
}
