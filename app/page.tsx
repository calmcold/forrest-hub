'use client'

import { useEffect, useState } from 'react'

type UserData = {
  role: string
  location: string
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    async function checkAccess() {
      const log = (msg: string) => setDebugInfo(prev => [...prev, msg])

      try {
        const tg = (window as any)?.Telegram?.WebApp
        log('Telegram WebApp: ' + (tg ? '✅ есть' : '❌ нет'))

        tg?.ready?.()
        tg?.expand?.()

        const user = tg?.initDataUnsafe?.user
        log('TG User: ' + JSON.stringify(user))

        if (!user?.id) {
          log('❌ Нет user.id')
          setAllowed(false)
          setLoading(false)
          return
        }

        log('telegram_id: ' + user.id + ' тип: ' + typeof user.id)

        // Динамический импорт чтобы не было ошибки с секретным ключом
        const { supabase } = await import('./lib/supabase')

        log('Ищу в базе telegram_id = ' + Number(user.id))

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('telegram_id', Number(user.id))
          .eq('active', true)
          .maybeSingle()

        log('data: ' + JSON.stringify(data))
        log('error: ' + JSON.stringify(error))

        if (error) {
          log('❌ Ошибка Supabase: ' + error.message)
          setAllowed(false)
          setLoading(false)
          return
        }

        if (!data) {
          log('❌ Пользователь не найден')
          setAllowed(false)
          setLoading(false)
          return
        }

        log('✅ Доступ разрешён!')
        setAllowed(true)

      } catch (err) {
        log('💥 Ошибка: ' + err)
        setAllowed(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Загрузка...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        {allowed ? '✅ ДОСТУП ЕСТЬ' : '❌ НЕТ ДОСТУПА'}
      </h1>

      <div className="bg-zinc-900 rounded-xl p-4 font-mono text-xs text-green-400 space-y-1">
        {debugInfo.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </main>
  )
}