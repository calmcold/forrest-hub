export function getTelegramUser() {

  if (typeof window === 'undefined') {
    return null
  }

  // @ts-ignore
  const tg = window.Telegram?.WebApp

  if (!tg) {
    return null
  }

  tg.ready()

  return tg.initDataUnsafe?.user || null
}