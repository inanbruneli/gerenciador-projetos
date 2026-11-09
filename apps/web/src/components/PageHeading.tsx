import BackLink from './BackLink'

type PageHeadingProps = {
  title: string
}

export default function PageHeading({ title }: PageHeadingProps) {
  return <div className="px-[6px]">
    <BackLink />
    <h1 className="mt-[10px] text-2xl font-semibold text-title">{title}</h1>
  </div>
}
