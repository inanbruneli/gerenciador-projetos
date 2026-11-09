import { splitByMatch } from '../../utils/search'

type HighlightProps = {
  text: string
  query?: string
}

export default function Highlight({ text, query = '' }: HighlightProps) {
  return <>
    {splitByMatch(text, query).map((part, index) => part.match ?
      <mark key={index} className="bg-favorite text-white">{part.text}</mark>
    :
      part.text
    )}
  </>
}
