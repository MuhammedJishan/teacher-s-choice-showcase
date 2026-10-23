import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, Puzzle, Timer, Zap } from "lucide-react";
import { toast } from "sonner";
import { challenges, sampleQuiz } from "@/lib/data";
import { PageHeader, Panel, Bar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/challenges")({
  head: () => ({ meta: [{ title: "Challenges & Quizzes · ReadySphere" }, { name: "description", content: "Hazard spotting, decision challenges and scenario quizzes." }, { property: "og:title", content: "Challenges & Quizzes · ReadySphere" }, { property: "og:description", content: "Hazard spotting, decision challenges and scenario quizzes." }] }),
  component: Challenges,
});

function Challenges() {
  return (
    <>
      <PageHeader eyebrow="Challenge" title="Challenges & quizzes" description="Test your judgement. Every answer explains why it's safe — or not." />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Quiz />
        <Panel title="Fire Safety challenges">
          <div className="space-y-3">
            {challenges.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border p-3">
                <span className="grid size-10 place-items-center rounded-xl bg-amber-soft text-amber">{c.type === "Timed mission" ? <Timer className="size-5" /> : <Puzzle className="size-5" />}</span>
                <div className="flex-1"><p className="text-sm font-medium">{c.title}</p><p className="text-xs text-muted-foreground">{c.type} · {c.minutes} min</p></div>
                {c.done ? <span className="text-sm font-semibold text-teal">{c.score}%</span> : <span className="text-xs font-semibold text-amber">+{c.xp} XP</span>}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = sampleQuiz[i];

  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= sampleQuiz.length) {
      setFinished(true);
      toast.success(`Quiz complete! +${score * 30} XP earned`);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };
  const reset = () => { setI(0); setPicked(null); setScore(0); setFinished(false); };

  if (finished)
    return (
      <Panel className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow"><Zap className="size-8" /></span>
        <h2 className="mt-4 text-2xl font-semibold">{score}/{sampleQuiz.length} correct</h2>
        <p className="mt-1 text-muted-foreground">You earned {score * 30} XP for safe decisions.</p>
        <Button className="mt-6" onClick={reset}>Try again</Button>
      </Panel>
    );

  return (
    <Panel title="Scenario quiz · What would you do?" action={<span className="text-xs text-muted-foreground">Question {i + 1} of {sampleQuiz.length}</span>}>
      <Bar value={((i + (picked !== null ? 1 : 0)) / sampleQuiz.length) * 100} tone="brand" className="mb-6" />
      <p className="text-lg font-semibold">{q.q}</p>
      <div className="mt-5 space-y-2.5">
        {q.options.map((o, k) => {
          const correct = picked !== null && k === q.answer;
          const wrong = picked === k && k !== q.answer;
          return (
            <button key={o} onClick={() => pick(k)} className={cn("flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all", picked === null && "hover:border-teal hover:bg-accent/40", correct && "border-teal bg-teal-soft", wrong && "border-destructive bg-destructive/10")}>
              <span className="grid size-7 place-items-center rounded-lg bg-muted font-display text-xs font-semibold">{String.fromCharCode(65 + k)}</span>
              <span className="flex-1">{o}</span>
              {correct && <CheckCircle2 className="size-5 text-teal" />}
              {wrong && <XCircle className="size-5 text-destructive" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 rounded-xl bg-muted p-4 text-sm">
          <b>{picked === q.answer ? "Correct! " : "Not quite. "}</b>{q.why}
          <div className="mt-3 text-right"><Button size="sm" onClick={next}>{i + 1 >= sampleQuiz.length ? "Finish" : "Next question"}</Button></div>
        </div>
      )}
    </Panel>
  );
}
