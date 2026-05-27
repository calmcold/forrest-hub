'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabase'

export default function HomePage() {
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      const addLog = (msg: string) => setLogs(prev => [...prev, msg])
      
      try {
        // 1. Проверяем Telegram
        addLog('🔍 Шаг 1: Проверяем Telegram...')
        
        const tg = (window as any)?.Telegram?.WebApp
        addLog(`Telegram WebApp: ${tg ? '✅ есть' : '❌ нет'}`)
        
        if (!tg) {
          addLog('❌ Нет Telegram WebApp. Тестируем без него...')
          // Тестируем Supabase напрямую
        }
        
        const user = tg?.initDataUnsafe?.user
        addLog(`TG User: ${JSON.stringify(user)}`)
        
        // 2. Проверяем Supabase подключение
        addLog('🔍 Шаг 2: Проверяем Supabase...')
        
        const { data: allUsers, error: listError } = await supabase
          .from('users')
          .select('*')
          .limit(5)
        
        addLog(`Все пользователи (до 5): ${JSON.stringify(allUsers)}`)
        if (listError) addLog(`❌ Ошибка: ${listError.message}`)
        
        // 3. Если есть Telegram ID, ищем пользователя
        if (user?.id) {
          addLog(`🔍 Шаг 3: Ищем telegram_id = ${user.id}`)
          
          const { data: foundUser, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', Number(user.id))
            .maybeSingle()
          
          addLog(`Найден: ${JSON.stringify(foundUser)}`)
          if (findError) addLog(`❌ Ошибка: ${findError.message}`)
          
          if (foundUser?.active) {
            addLog('✅ Доступ разрешён!')
            setAllowed(true)
          } else {
            addLog('❌ Пользователь неактивен или не найден')
          }
        } else {
          addLog('⚠️ Нет Telegram ID, пробуем без него...')
          
          // Тестовый запрос без фильтра
          const { data: testUser } = await supabase
            .from('users')
            .select('*')
            .eq('active', true)
            .limit(1)
            .maybeSingle()
          
          if (testUser) {
            addLog('✅ Найден активный пользователь (тест)')
            setAllowed(true)
          }
        }
        
      } catch (error) {
        addLog(`💥 КРИТИЧЕСКАЯ ОШИБКА: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    
    checkAccess()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-black mb-6">🔧 ДИАГНОСТИКА</h1>
      
      <div className="bg-zinc-900 rounded-3xl p-6 mb-6 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-4">
          Статус: {loading ? '⏳ Загрузка...' : allowed ? '✅ ДОСТУП ЕСТЬ' : '❌ НЕТ ДОСТУПА'}
        </h2>
        
        <div className="bg-black rounded-xl p-4 font-mono text-sm space-y-1 max-h-96 overflow-auto">
          {logs.map((log, i) => (
            <div key={i} className="text-green-400">{log}</div>
          ))}
        </div>
      </div>
      
      {allowed && (
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
      )}
    </main>
  )
}