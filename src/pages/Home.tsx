import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import Phases from '@/components/Phases'
import Today from '@/components/Today'
import Milestones from '@/components/Milestones'
import Methods from '@/components/Methods'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Profile />
      <Phases />
      <Today />
      <Milestones />
      <Methods />
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-muted-foreground">
          百日筑基 · 75 天冲刺版 — 2026-09-28 启程 · 2026-12-12 上考场 · 数据保存在本机浏览器
          <br />
          这个计划的瓶颈不是设计，是每天那 2–2.5 小时是否真的投入。
        </div>
      </footer>
    </main>
  )
}
