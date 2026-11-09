import TransitionLink from '../components/TransitionLink'

export default function NotFound() {
  return <main className="flex min-h-full px-[42px] py-[60px]">
    <section className="flex flex-1 flex-col items-center justify-center bg-white pb-1 text-center">
      <p className="text-6xl font-semibold text-primary">404</p>

      <h1 className="mt-4 text-2xl font-semibold text-title">Página não encontrada</h1>

      <p className="mt-[22px] text-base text-text">
        O endereço que você acessou não existe ou foi removido.
      </p>

      <TransitionLink
        to="/"
        direction="back"
        className="mt-[33px] flex h-[52px] w-[230px] items-center justify-center rounded-full bg-primary text-xl text-white"
      >
        Voltar ao início
      </TransitionLink>
    </section>
  </main>
}
