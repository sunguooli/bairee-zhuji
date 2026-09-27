import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PROFILE } from '@/lib/plan'

function ScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
  const pct = Math.round((score / max) * 100)
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">
          {score} <span className="text-xs font-normal text-muted-foreground">/ {max}</span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function Profile() {
  const { cet4, target, passLine, schedule } = PROFILE
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">个人档案</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              起点：CET-4 成绩单
              <Badge variant="secondary">总分 {cet4.total}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScoreBar label="听力" score={cet4.listening} max={cet4.maxL} color="bg-amber-500" />
            <ScoreBar label="阅读" score={cet4.reading} max={cet4.maxR} color="bg-emerald-500" />
            <ScoreBar label="写作和翻译" score={cet4.writing} max={cet4.maxW} color="bg-sky-500" />
            <p className="rounded-md bg-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              客观诊断：三个分项全部低于及格换算线，没有长板也没有明显短板——这是“平均的弱”，
              意味着每一项都靠后续的专项训练补，不存在可以战略性放弃的部分。
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">目标与每日时间预算</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg border border-border px-4 py-2 text-center">
                <div className="text-xs text-muted-foreground">及格线</div>
                <div className="text-xl font-bold">{passLine}</div>
              </div>
              <div className="text-muted-foreground">→</div>
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-center">
                <div className="text-xs text-amber-500">目标分</div>
                <div className="text-xl font-bold text-amber-500">{target}</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                目标定在及格线上 55 分：不是炫技，是给发挥波动留安全垫。
              </p>
            </div>
            <ul className="space-y-2">
              {schedule.map((s) => (
                <li key={s.label} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0">
                  <div>
                    <span className="font-medium">{s.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{s.note}</span>
                  </div>
                  <Badge variant="outline">{s.hours}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
