import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import { METHODS, RESOURCES } from '@/lib/plan'

export default function Methods() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">方法论（有出处）</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        以下方法整理自 GitHub 备考工具与高分成经验贴，每条都附来源，可点开核实。
      </p>
      <Accordion type="multiple" className="w-full">
        {METHODS.map((m, i) => (
          <AccordionItem key={m.title} value={`item-${i}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{m.tag}</Badge>
                <span className="font-medium">{m.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              <p>{m.body}</p>
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-amber-500 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {m.source}
              </a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mb-4 mt-12 text-xl font-bold tracking-tight">工具与资源</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {RESOURCES.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-lg border border-border p-4 transition-colors hover:border-amber-500/40 hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.name}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-amber-500" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
