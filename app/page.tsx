'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { getTelegramUser } from './lib/telegram'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type UserData = {
  role: string
  location: string
}

export default function HomePage() {

  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  const [userData, setUserData] = useState<UserData | null>(null)

  const [telegramName, setTelegramName] = useState('')

  useEffect(() => {

    async function checkAccess() {

      try {

        const telegramUser = getTelegramUser()

        console.log(telegramUser)

        if (!telegramUser) {
          setLoading(false)
          return
        }

        setTelegramName(
          telegramUser.first_name || telegramUser.username || 'User'
        )

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('telegram_id', telegramUser.id)
          .eq('active', true)
          .single()

        if (!data || error) {

          setAllowed(false)
          setLoading(false)

          return
        }

        setAllowed(true)

        setUserData({
          role: data.role,
          location: data.location
        })

        setLoading(false)

      } catch (error) {

        console.log(error)

        setLoading(false)
      }
    }

    checkAccess()

  }, [])

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl mb-4">
            🪑
          </div>

          <p className="text-zinc-400">
            Загрузка FORREST HUB...
          </p>

        </div>

      </main>
    )
  }

  if (!allowed) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center max-w-sm">

          <div className="text-5xl mb-4">
            ⛔
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Нет доступа
          </h1>

          <p className="text-zinc-400">
            Ваш аккаунт не зарегистрирован
          </p>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black tracking-tight">
              FORREST HUB
            </h1>

            <p className="text-zinc-400 mt-2">
              Добро пожаловать, {telegramName}
            </p>

          </div>

          <div className="text-5xl">
            🪑
          </div>

        </div>

      </div>

      {/* HERO */}

      <div className="bg-zinc-900 rounded-3xl p-6 mb-6 border border-zinc-800">

        <div className="flex items-center justify-between mb-4">

          <div>

            <p className="text-zinc-400 text-sm">
              Сегодня
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Добро пожаловать ☕
            </h2>

          </div>

          <div className="text-4xl">
            🪑
          </div>

        </div>

        <p className="text-zinc-300 text-sm leading-relaxed">
          Твой карманный помощник
        </p>

      </div>

      {/* INFO */}

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">

          <p className="text-zinc-500 text-sm mb-2">
            Роль
          </p>

          <h2 className="text-2xl font-bold">
            {userData?.role}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">

          <p className="text-zinc-500 text-sm mb-2">
            Точка
          </p>

          <h2 className="text-2xl font-bold">
            {userData?.location}
          </h2>

        </div>

      </div>

      {/* MENU */}

      <div className="grid gap-4">

        <Link
          href="/recipes"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
        >

          <h2 className="text-2xl font-bold">
            ☕ Склерозники
          </h2>

          <p className="text-zinc-400 mt-2 text-sm">
            Рецептуры и заготовки
          </p>

        </Link>

        <Link
          href="/education"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
        >

          <h2 className="text-2xl font-bold">
            📚 Обучение
          </h2>

          <p className="text-zinc-400 mt-2 text-sm">
            Материалы и стандарты
          </p>

        </Link>

        <Link
          href="/shots"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
        >

          <h2 className="text-2xl font-bold">
            📊 Коф Жур
          </h2>

          <p className="text-zinc-400 mt-2 text-sm">
            Шоты, экстракция и контроль
          </p>

        </Link>

      </div>

    </main>
  )
}