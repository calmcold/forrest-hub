import Link from 'next/link'

export default function ClassicPage() {

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <Link
          href="/recipes"
          className="bg-zinc-900 border border-zinc-800 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
        >
          ←
        </Link>

        <div>

          <h1 className="text-3xl font-black">
            ☕ Классика
          </h1>

          <p className="text-zinc-400 mt-1">
            Эспрессо напитки и шоколад
          </p>

        </div>

      </div>

      {/* CLASSIC */}

      <div className="space-y-5">

        {/* FLAT WHITE */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Флэт Уайт 150
          </h2>

          <div className="space-y-2 text-zinc-300">

            <p>• 1 эспрессо</p>
            <p>• 120 мл сливки 10%</p>
            <p className="text-zinc-500 text-sm">
              Не пеним
            </p>

          </div>

        </div>

        {/* CAPPUCCINO */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Капучино
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-black/40 rounded-2xl p-4">

              <p className="text-zinc-500 mb-3">
                150 мл
              </p>

              <div className="space-y-2 text-zinc-300">

                <p>• 1 эспрессо</p>
                <p>• 130 мл молока</p>

              </div>

            </div>

            <div className="bg-black/40 rounded-2xl p-4">

              <p className="text-zinc-500 mb-3">
                300 мл
              </p>

              <div className="space-y-2 text-zinc-300">

                <p>• 2 эспрессо</p>
                <p>• 220 мл молока</p>

              </div>

            </div>

          </div>

        </div>

        {/* LATTE */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Латте 300
          </h2>

          <div className="space-y-2 text-zinc-300">

            <p>• 2 эспрессо</p>
            <p>• 220 мл молока</p>

          </div>

        </div>

        {/* BREVE */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Бреве
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-black/40 rounded-2xl p-4">

              <p className="text-zinc-500 mb-3">
                150 мл
              </p>

              <div className="space-y-2 text-zinc-300">

                <p>• 1 эспрессо</p>
                <p>• 65 мл сливок 10%</p>
                <p>• 65 мл молока</p>

              </div>

            </div>

            <div className="bg-black/40 rounded-2xl p-4">

              <p className="text-zinc-500 mb-3">
                300 мл
              </p>

              <div className="space-y-2 text-zinc-300">

                <p>• 2 эспрессо</p>
                <p>• 110 мл сливок 10%</p>
                <p>• 110 мл молока</p>

              </div>

            </div>

          </div>

        </div>

        {/* MOCHA */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Мокко 300
          </h2>

          <div className="space-y-2 text-zinc-300">

            <p>• 35 мл шоколадной заготовки</p>
            <p>• 1 эспрессо</p>
            <p>• 200 мл молока</p>

          </div>

        </div>

        {/* AFFOGATO */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Аффогато с шоколадом 180
          </h2>

          <div className="space-y-2 text-zinc-300">

            <p>• 100 г мороженого (2 шара)</p>
            <p>• 1 эспрессо</p>
            <p>• 30 мл шоколадной заготовки</p>

            <p className="text-zinc-500 text-sm mt-3">
              Не варим эспрессо на мороженое
            </p>

          </div>

        </div>

        {/* SHOTS */}

        <div className="pt-6">

          <h2 className="text-3xl font-black mb-5">
            ⚡ Шоты
          </h2>

          <div className="space-y-5">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Кортадо
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 1 эспрессо база</p>
                <p>• 40 мл топленого молока</p>

                <p className="text-zinc-500 text-sm">
                  Не пенить
                </p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Романо
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 1/2 дольки лимона</p>
                <p>• Цедра лимона</p>
                <p>• 1 эспрессо база</p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Макиато
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 1 эспрессо топ</p>
                <p>• 110 мл молока</p>
                <p>• 20 мл сиропа фруктозы</p>

                <p className="text-zinc-500 text-sm">
                  Выложить пену сверху
                </p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Кон лече
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 1 эспрессо топ</p>
                <p>• 120 мл вспененного молока</p>
                <p>• 60 мл молока</p>

                <p className="text-zinc-500 text-sm">
                  Вливать как капучино
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CHOCOLATE */}

        <div className="pt-6">

          <h2 className="text-3xl font-black mb-5">
            🍫 Шоколад
          </h2>

          <div className="space-y-5">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Белый 230
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 27 г белого шоколада</p>
                <p>• 3 г паприки</p>
                <p>• 180 мл топленого молока</p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Молочный
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 40/60 мл шоколадной заготовки</p>
                <p>• 170/250 мл молока</p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Темный 230
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 30 мл молока 100°</p>
                <p>• 27 г темного шоколада</p>
                <p>• 150 мл молока</p>

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <h3 className="text-2xl font-bold mb-4">
                Amazing Cacao 230
              </h3>

              <div className="space-y-2 text-zinc-300">

                <p>• 30 мл молока 100°</p>
                <p>• 35 г шоколада</p>
                <p>• 150 мл молока</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}