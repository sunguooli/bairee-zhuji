import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { MILESTONES, dayOfPlan, fmt, dateOfDay } from '@/lib/plan'

export default function Milestones() {
  const today = dayOfPlan()
  const [scores, setScores] = useLocalStorage<Record<number, string>>('bairee-milestones', {})

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">量化检查点</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        达不到参考线时，先找出没做到位的是词汇还是精听，不要用战术勤奋掩盖方向错误。分数存在本机浏览器里。
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((m, i) => {
          const reached = today >= m.day
          return (
            <Card key={m.day} className={reached ? 'border-amber-500/40' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  第 {m.day} 天
                  <span className={`text-xs font-normal ${reached ? 'text-amber-500' : 'text-muted-foreground'}`}>
                    {fmt(dateOfDay(m.day))}
                  </span>
                </CardTitle>
                <p className="text-sm font-medium">{m.title}</p>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-xs text-muted-foreground">{m.metric}</p>
                <p className="mt-1 font-medium text-amber-500">{m.target}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Input
                    placeholder="记录实际成绩"
                    value={scores[i] ?? ''}
                    onChange={(e) => setScores({ ...scores, [i]: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
