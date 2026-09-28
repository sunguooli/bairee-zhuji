import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'
import { PHASES, dayOfPlan, fmt, dateOfDay } from '@/lib/plan'

const colorMap: Record<string, { border: string; text: string; badge: string }> = {
  amber: { border: 'border-t-amber-500', text: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  emerald: { border: 'border-t-emerald-500', text: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  sky: { border: 'border-t-sky-500', text: 'text-sky-500', badge: 'bg-sky-500/10 text-sky-500 border-sky-500/30' },
  rose: { border: 'border-t-rose-500', text: 'text-rose-500', badge: 'bg-rose-500/10 text-rose-500 border-rose-500/30' },
}

export default function Phases() {
  const today = dayOfPlan()
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">四阶段路线</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {fmt(dateOfDay(1))} — {fmt(dateOfDay(75))} · 阶段一旦开始不顺，先找回当前阶段的节奏，不要跳阶段。
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PHASES.map((p) => {
          const c = colorMap[p.color]
          const done = today > p.endDay
          const active = today >= p.startDay && today <= p.endDay
          const upcoming = today < p.startDay
          return (
            <Card key={p.id} className={`border-t-4 ${c.border} ${active ? 'ring-1 ring-amber-500/40' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {p.id} · {p.name}
                  </CardTitle>
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : upcoming ? (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Badge className={`${c.badge} border`}>进行中</Badge>
                  )}
                </div>
                <p className={`text-xs font-medium ${c.text}`}>
                  第 {p.startDay}–{p.endDay} 天 · {fmt(dateOfDay(p.startDay))} ~ {fmt(dateOfDay(p.endDay))}
                </p>
                <p className="text-xs text-muted-foreground">{p.subtitle}</p>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {p.goal}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
