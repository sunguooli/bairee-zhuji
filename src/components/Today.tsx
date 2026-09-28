import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  DAILY_BASELINE,
  WEEKLY_ROTATION,
  dayOfPlan,
  fmt,
  dateOfDay,
  phaseOfDay,
} from '@/lib/plan'

function storageKey(dateStr: string) {
  return `bairee-checklist-${dateStr}`
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function TaskList({ tasks, storage }: { tasks: { id: string; label: string; minutes: number; detail?: string }[]; storage: string }) {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(storage, {})
  const totalMin = tasks.reduce((s, t) => s + t.minutes, 0)
  const doneCount = tasks.filter((t) => done[t.id]).length
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {doneCount} / {tasks.length} 项 · 约 {totalMin} 分钟
        </span>
        <Badge variant={doneCount === tasks.length && tasks.length > 0 ? 'default' : 'secondary'}>
          {doneCount === tasks.length && tasks.length > 0 ? '当日清零' : '进行中'}
        </Badge>
      </div>
      <ul className="space-y-3">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-start gap-3">
            <Checkbox
              id={t.id}
              checked={!!done[t.id]}
              onCheckedChange={(v) => setDone({ ...done, [t.id]: !!v })}
              className="mt-0.5"
            />
            <label htmlFor={t.id} className={`cursor-pointer text-sm leading-relaxed ${done[t.id] ? 'text-muted-foreground line-through' : ''}`}>
              <span className="font-medium">{t.label}</span>
              <span className="ml-2 text-xs text-muted-foreground">{t.minutes} min</span>
              {t.detail && <span className="block text-xs text-muted-foreground">{t.detail}</span>}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Today() {
  const today = dayOfPlan()
  const phase = phaseOfDay(today)
  const dstr = todayStr()
  const [tab, setTab] = useState<'today' | 'weekly'>('today')

  // 冲刺期逐日安排（第 66–75 天）
  const sprintPlan: Record<number, string> = {
    66: '全真模考 1 套（15:00–17:25，用答题卡）',
    67: '全真模考 1 套（同上）',
    68: '分析模考错题 + 重听所有听力错题',
    69: '三类作文框架各默写一遍 + 各写 1 篇验证',
    70: '准备 2 套顺手模板 + 翻译高频词过 1 遍',
    71: '翻译高频词表过 1 遍 + 模考 1 套',
    72: '模考 1 套',
    73: '词汇收尾：只复习错题本和高频词，不学新词',
    74: '考前一天：不学习，早睡。检查准考证、耳机、电池、2B 铅笔',
    75: '考试日 12 月 12 日：15:00–17:25 上场，上午只轻听 1 段听力保持耳感',
  }

  const isSprint = phase.id === 4 && today >= 66
  const sprintTasks = isSprint
    ? [{ id: `sprint-${today}`, label: sprintPlan[today] ?? '复习错题本', minutes: 120 }]
    : []

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">今日任务</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {today < 1
              ? `计划尚未开始 · ${fmt(dateOfDay(1))} 启程（先预览第 1 天任务）`
              : today > 75
                ? '计划已结束'
                : `今天是第 ${today} 天 · 当前阶段：${phase.name}（${phase.subtitle}）`}
          </p>
        </div>
        <div className="flex rounded-lg border border-border p-1 text-sm">
          <button
            onClick={() => setTab('today')}
            className={`rounded-md px-3 py-1 ${tab === 'today' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            每日任务
          </button>
          <button
            onClick={() => setTab('weekly')}
            className={`rounded-md px-3 py-1 ${tab === 'weekly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            专项期周日历
          </button>
        </div>
      </div>

      {tab === 'weekly' ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {WEEKLY_ROTATION.map((w) => (
            <Card key={w.day} className={w.focus === '听力' ? 'border-amber-500/40' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  {w.day}
                  <Badge variant="secondary">{w.focus}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="leading-relaxed">{w.tasks}</p>
                <p className="mt-2 text-xs text-muted-foreground">{w.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">每日底线（任何阶段不可断）</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList tasks={DAILY_BASELINE} storage={storageKey(`${dstr}-base`)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">阶段任务</CardTitle>
            </CardHeader>
            <CardContent>
              {isSprint ? (
                <TaskList tasks={sprintTasks} storage={storageKey(`${dstr}-phase`)} />
              ) : phase.daily.length > 0 ? (
                <TaskList tasks={phase.daily} storage={storageKey(`${dstr}-phase`)} />
              ) : (
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {phase.id === 2
                      ? '专项期按"周日历轮换"执行——今天该练什么，去右侧周日历查看对应星期。'
                      : '本阶段为冲刺/弹性安排，见下方说明。'}
                  </p>
                  {phase.id === 4 && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {Object.entries(sprintPlan).map(([d, t]) => (
                        <li key={d} className="flex gap-2">
                          <span className="shrink-0 font-medium text-foreground">第 {d} 天</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {phase.notes.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {phase.notes.map((n) => (
                      <li key={n}>· {n}</li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}
