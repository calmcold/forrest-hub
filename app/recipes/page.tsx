import Link from 'next/link'

export default function RecipesPage() {

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <Link
          href="/"
          className="bg-zinc-900 border border-zinc-800 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
        >
          ←
        </Link>

        <div>

          <h1 className="text-3xl font-black">
            ☕ Склерозники
          </h1>

          <p className="text-zinc-400 mt-1">
            Классика, чай, рафы и заготовки
          </p>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="grid gap-4">

        <Link
          href="/recipes/classic"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
        >

          <h2 className="text-2xl font-bold">
            ☕ Классика
          </h2>

          <p className="text-zinc-400 mt-2">
            Эспрессо напитки и шоколад
          </p>

        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 opacity-60">

          <h2 className="text-2xl font-bold">
            🥛 Рафы
          </h2>

          <p className="text-zinc-400 mt-2">
            Скоро
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 opacity-60">

          <h2 className="text-2xl font-bold">
            🍵 Чай
          </h2>

          <p className="text-zinc-400 mt-2">
            Скоро
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 opacity-60">

          <h2 className="text-2xl font-bold">
            ☀️ Напитки Лето
          </h2>

          <p className="text-zinc-400 mt-2">
            Скоро
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 opacity-60">

          <h2 className="text-2xl font-bold">
            🧪 Заготовки
          </h2>

          <p className="text-zinc-400 mt-2">
            Скоро
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 opacity-60">

          <h2 className="text-2xl font-bold">
            ❄️ Заготовки Лето
          </h2>

          <p className="text-zinc-400 mt-2">
            Скоро
          </p>

        </div>

      </div>

    </main>
  )
}