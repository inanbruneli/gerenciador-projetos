import BackLink from './BackLink'

type PageHeadingProps = {
  title: string
  animated?: boolean
}

export default function PageHeading({ title, animated = false }: PageHeadingProps) {
  return <div className="px-[6px]">
    <BackLink animated={animated} />
    <h1 className="mt-[10px] text-2xl font-semibold text-title">{title}</h1>
  </div>
}
