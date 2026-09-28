import { Progress } from '@/components/ui/progress'
import { TOTAL_DAYS, dayOfPlan, fmt, dateOfDay } from '@/lib/plan'

export default function Hero() {
  const today = dayOfPlan()
  const started = today >= 1
  const finished = today > TOTAL_DAYS
  const current = Math.min(Math.max(today, 0), TOTAL_DAYS)
  const progress = finished ? 100 : started ? ((current - 1) / TOTAL_DAYS) * 100 : 0

  let status: string
  if (finished) status = '百日筑基已完成，去考场收成果吧'
  else if (!started) status = `距计划开始还有 ${1 - today} 天 · ${fmt(dateOfDay(1))} 启程`
  else status = `第 ${current} 天 / 共 ${TOTAL_DAYS} 天 · 终点 ${fmt(dateOfDay(TOTAL_DAYS))}`

  return (
    <header className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 20%, hsl(38 90% 55% / 0.18), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, hsl(200 80% 50% / 0.10), transparent)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="mb-3 text-sm tracking-[0.3em] text-amber-500 font-medium">
          四级 430 → 六级 480 · 75 天冲刺 · 12 月 12 日上场
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          百日筑基
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          原定百日，实测距考试 75 天：前 28 天补地基，15 天专项突破，22 天真题精做，10 天模考冲刺。
          每天 2–2.5 小时，不追进度，追"当日任务清零"。
        </p>
        <div className="mt-8 max-w-xl">
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="font-medium">{status}</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </header>
  )
}
