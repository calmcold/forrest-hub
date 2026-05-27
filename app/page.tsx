'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabase'

type UserData = {
  role: string
  location: string
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [telegramName, setTelegramName] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      setLoading(true)

      try {
        const tg =
          typeof window !== 'undefined'
            ? (window as any)?.Telegram?.WebApp
            : null

        tg?.ready?.()
        tg?.expand?.()

        const telegramUser = tg?.initDataUnsafe?.user

        if (!telegramUser?.id) {
          setAllowed(false)
          setLoading(false)
          return
        }

        setTelegramName(
          telegramUser.first_name ||
          telegramUser.username ||
          'User'
        )

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('telegram_id', Number(telegramUser.id))
          .eq('active', true)
          .maybeSingle()

        if (error || !data) {
          setAllowed(false)
          setShowRegister(true)
          setLoading(false)
          return
        }

        setUserData({
          role: data.role,
          location: data.location,
        })

        setAllowed(true)

      } catch (error) {
        setAllowed(false)
        setShowRegister(true)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [])

  const handleRegister = async () => {
    const tg = (window as any)?.Telegram?.WebApp
    const telegramUser = tg?.initDataUnsafe?.user

    if (!telegramUser?.id) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from('users')
        .insert({
          telegram_id: Number(telegramUser.id),
          role: 'user',
          location: 'Не указана',
          active: true,
          telegram_name: telegramUser.first_name || telegramUser.username || 'User'
        })

      if (!error) {
        setAllowed(true)
        setShowRegister(false)
        setUserData({
          role: 'user',
          location: 'Не указана',
        })
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🪑</div>
          <p className="text-zinc-400">Загрузка FORREST HUB...</p>
        </div>
      </main>
    )
  }

  if (!allowed && showRegister) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center max-w-sm w-full">
          <div className="text-5xl mb-4">☕</div>
          <h1 className="text-3xl font-bold mb-3">FORREST HUB</h1>
          <p className="text-zinc-400 mb-2">Привет, {telegramName}!</p>
          <p className="text-zinc-400 mb-6">Твой аккаунт ещё не зарегистрирован</p>
          <button
            onClick={handleRegister}
            className="bg-white text-black font-bold py-3 px-6 rounded-xl w-full hover:bg-zinc-200 transition-colors"
          >
            Зарегистрироваться
          </button>
        </div>
      </main>
    )
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center max-w-sm">
          <div className="text-5xl mb-4">⛔</div>
          <h1 className="text-3xl font-bold mb-3">Нет доступа</h1>
          <p className="text-zinc-400">Откройте приложение через Telegram</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">FORREST HUB</h1>
            <p className="text-zinc-400 mt-2">Добро пожаловать, {telegramName}</p>
          </div>
          <div className="text-5xl">🪑</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6 mb-6 border border-zinc-800">
        <h2 className="text-2xl font-bold">Добро пожаловать ☕</h2>
        <p className="text-zinc-300 text-sm mt-2">Твой карманный помощник</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <p className="text-zinc-500 text-sm mb-2">Роль</p>
          <h2 className="text-2xl font-bold">{userData?.role}</h2>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <p className="text-zinc-500 text-sm mb-2">Точка</p>
          <h2 className="text-2xl font-bold">{userData?.location}</h2>
        </div>
      </div>

      <div className="grid gap-4">
        <Link href="/recipes" className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
          ☕ Склерозники
        </Link>
        <Link href="/education" className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
          📚 Обучение
        </Link>
        <Link href="/shots" className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
          📊 Коф Жур
        </Link>
      </div>
    </main>
  )
}