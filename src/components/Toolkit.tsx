import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TOOLKIT } from '@/lib/plan'

export default function Toolkit() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">装备库</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        GitHub 高 star 开源工具 × 四阶段计划。原则：工具服务计划——进入真题期（第 44 天）后所有工具让位给真题，第 66 天起只保留 Echo-Loop 轻听。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {TOOLKIT.map((t) => (
          <Card key={t.name} className={t.name === 'QwertyLearner' || t.name === 'Echo-Loop' ? 'border-amber-500/40' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">
                  {t.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">★ {t.stars}</span>
                </CardTitle>
                <Badge variant="secondary">{t.role}</Badge>
              </div>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-500">{t.phases}</p>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="leading-relaxed text-muted-foreground">{t.usage}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">状态：</span>
                {t.status}
                {' · '}
                <a href={t.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                  GitHub
                </a>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
