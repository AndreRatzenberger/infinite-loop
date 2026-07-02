import React, { useEffect, useMemo, useState } from "react";

const MODULES = [
  {
    id: "generator",
    title: "Generator",
    rail: "make",
    description: "Writes the next candidate answer or patch.",
  },
  {
    id: "context",
    title: "Context Builder",
    rail: "make",
    description: "Selects the evidence and constraints the model may see.",
  },
  {
    id: "tool",
    title: "Tool Contact",
    rail: "touch",
    description: "Runs tests, reads files, checks sources, or touches reality.",
  },
  {
    id: "authority",
    title: "Authority Boundary",
    rail: "touch",
    description: "Names what the loop may read, write, spend, or publish.",
  },
  {
    id: "evaluator",
    title: "Evaluator",
    rail: "judge",
    description: "Decides whether the work survives the current pass.",
  },
  {
    id: "break",
    title: "Break Favorite Frame",
    rail: "judge",
    description: "Forces the loop to attack its most convenient story.",
  },
  {
    id: "human",
    title: "Human Checkpoint",
    rail: "judge",
    description: "Escalates taste, risk, or publishing decisions.",
  },
  {
    id: "budget",
    title: "Budget",
    rail: "govern",
    description: "Caps attempts, time, money, or blast radius.",
  },
  {
    id: "stop",
    title: "Stop Condition",
    rail: "govern",
    description: "Turns endless trying into a named stop reason.",
  },
  {
    id: "trace",
    title: "Memory / Trace",
    rail: "govern",
    description: "Keeps the receipt: attempts, checks, changes, and risk.",
  },
  {
    id: "contract",
    title: "Change Contract",
    rail: "govern",
    description: "Documents how loop edits change future behavior.",
  },
];

const RAILS = [
  { id: "make", title: "Make", cue: "language enters the machine" },
  { id: "touch", title: "Touch", cue: "the loop meets the world" },
  { id: "judge", title: "Judge", cue: "evidence pushes back" },
  { id: "govern", title: "Govern", cue: "done earns a name" },
];

const SCENARIOS = {
  parser: {
    id: "parser",
    label: "Repair a parser",
    short: "CSV import failure",
    brief:
      "A customer export crashes whenever a quoted company name contains a comma. The answer only counts if the bad row becomes a fixture and the parser survives it.",
    prompt:
      "Fix the CSV parser so quoted commas stop breaking customer imports. Keep the change small and explain what you changed.",
    oneShot:
      "I updated the parser to handle quoted values more carefully and added a note about edge cases. This should prevent the import from failing on customer exports.",
    artifact: "parser patch",
    target: "quoted comma fixture",
    source: "production sample row",
    external: "fixture and regression test",
    riskyAction: "edited importer behavior without a rollback note",
    alternate:
      "The export may be RFC 4180-compliant already; the bug might be our custom splitter, not the customer data.",
    success: "stop reason: success after fixture passes",
  },
  release: {
    id: "release",
    label: "Write a release note",
    short: "Workspace sharing",
    brief:
      "A sharing feature shipped with permission caveats. The release note should be crisp, but it must not promise access behavior the merged code does not provide.",
    prompt:
      "Write a short release note announcing workspace sharing. Make it exciting but keep it accurate.",
    oneShot:
      "Workspace sharing is here. Invite your team, collaborate instantly, and keep every project moving from one shared home.",
    artifact: "release note",
    target: "merged diff and feature flag note",
    source: "permission caveat in the PR",
    external: "source diff and product owner review",
    riskyAction: "published copy before permission review",
    alternate:
      "The strongest story is not collaboration speed; it is bounded sharing with visible ownership.",
    success: "stop reason: escalated for product approval",
  },
  research: {
    id: "research",
    label: "Research a claim",
    short: "Loops vs prompts",
    brief:
      "A draft claims agent loops are safer than prompts. The publish decision needs source grounding, counterexamples, and a trace of what was checked.",
    prompt:
      "Research whether loops are safer than prompts and decide if this claim can be published.",
    oneShot:
      "Loops are safer because they can check their own work repeatedly. The claim is publishable with a few examples of tests and traces.",
    artifact: "publish decision",
    target: "source triangulation table",
    source: "contradictory safety note",
    external: "source coverage and contradiction search",
    riskyAction: "approved a public claim on self-review",
    alternate:
      "The safer claim is narrower: bounded loops with independent evidence are easier to govern than one-shot prompts.",
    success: "stop reason: human checkpoint before publishing",
  },
};

const ARCHETYPES = [
  {
    id: "prompt",
    title: "Prompt Only",
    badge: "one shot",
    summary: "A smooth answer appears, but nothing outside the answer can judge it.",
    modules: ["generator"],
    stop: "no stop reason",
    tone: "weak",
    metrics: { evidence: 12, confidence: 78, risk: 48, cost: 14, trace: 8 },
    autopsy: {
      missing: "loop contract",
      symptom: "a plausible answer arrived with no evidence path",
      fix: "name the goal, evidence, authority, checks, budget, trace, and stop reason",
    },
    trace: [
      "accepted prose prompt",
      "generated plausible {artifact}",
      "reported confidence from fluent wording",
      "left no check, trace, or stop reason",
    ],
  },
  {
    id: "self",
    title: "Self Evaluator",
    badge: "style loop",
    summary: "The model reviews itself and gets smoother while evidence stays flat.",
    modules: ["generator", "evaluator", "trace"],
    stop: "stop reason: self-approved",
    tone: "warning",
    metrics: { evidence: 18, confidence: 88, risk: 52, cost: 34, trace: 36 },
    autopsy: {
      missing: "independent evaluator",
      symptom: "confidence rose while evidence stayed flat",
      fix: "compare against a fixture, source document, external example, or human review",
    },
    trace: [
      "generated first {artifact}",
      "asked the same model to review its own frame",
      "polished language and found no new evidence",
      "self-approved despite missing {external}",
    ],
  },
  {
    id: "no-budget",
    title: "No Budget",
    badge: "token fire",
    summary: "The loop keeps improving local details because nobody named enough.",
    modules: ["generator", "context", "tool", "evaluator", "trace"],
    stop: "stop reason: budget-exhausted",
    tone: "danger",
    metrics: { evidence: 34, confidence: 82, risk: 61, cost: 96, trace: 44 },
    autopsy: {
      missing: "budget and stop condition",
      symptom: "cost rose after the task had stopped learning",
      fix: "cap attempts and define success, blocked, escalated, and budget-exhausted",
    },
    trace: [
      "built context around {source}",
      "ran a partial check against {target}",
      "patched another minor wording edge",
      "kept iterating because no stop rule existed",
      "budget would have prevented the fourth pass",
    ],
  },
  {
    id: "no-evidence",
    title: "No External Evidence",
    badge: "closed frame",
    summary: "The loop has structure, but its observations never leave the conversation.",
    modules: ["generator", "context", "evaluator", "budget", "stop", "trace"],
    stop: "stop reason: weak success",
    tone: "warning",
    metrics: { evidence: 22, confidence: 91, risk: 56, cost: 50, trace: 58 },
    autopsy: {
      missing: "world contact",
      symptom: "the loop converged inside the model's preferred interpretation",
      fix: "make the loop collide with tests, logs, sources, screenshots, or review",
    },
    trace: [
      "constructed tidy context",
      "generated {artifact}",
      "evaluated against the written prompt only",
      "declared success without checking {target}",
    ],
  },
  {
    id: "tool-boundary",
    title: "Tool Without Boundary",
    badge: "too much power",
    summary: "Reality enters the loop, but authority expands past the task.",
    modules: ["generator", "context", "tool", "evaluator", "budget", "stop", "trace"],
    stop: "stop reason: risky success",
    tone: "danger",
    metrics: { evidence: 70, confidence: 74, risk: 88, cost: 60, trace: 66 },
    autopsy: {
      missing: "authority boundary",
      symptom: "evidence improved while blast radius widened",
      fix: "separate allowed reads, allowed writes, denied paths, and human gates",
    },
    trace: [
      "checked {source}",
      "used tool contact to improve {artifact}",
      "{riskyAction}",
      "could not prove the loop stayed inside delegated authority",
    ],
  },
  {
    id: "evidence",
    title: "Evidence Loop",
    badge: "bounded",
    summary: "The loop checks reality, patches from feedback, traces the work, and stops.",
    modules: [
      "generator",
      "context",
      "tool",
      "authority",
      "evaluator",
      "human",
      "budget",
      "stop",
      "trace",
    ],
    stop: "{success}",
    tone: "good",
    metrics: { evidence: 86, confidence: 71, risk: 28, cost: 48, trace: 88 },
    autopsy: {
      missing: "nothing critical",
      symptom: "confidence was allowed to fall until evidence caught up",
      fix: "keep the evidence bundle with scope, assumptions, and residual risk",
    },
    trace: [
      "compiled goal, evidence, authority, and budget",
      "ran {external}",
      "patched {artifact} from observed failure",
      "recorded what passed and what remains unproven",
      "{success}",
    ],
  },
  {
    id: "break-frame",
    title: "Break Favorite Frame",
    badge: "adversarial",
    summary: "The loop attacks its own premise before it is allowed to count.",
    modules: [
      "generator",
      "context",
      "tool",
      "authority",
      "evaluator",
      "break",
      "budget",
      "stop",
      "trace",
      "contract",
    ],
    stop: "stop reason: reframed success",
    tone: "good",
    metrics: { evidence: 80, confidence: 54, risk: 34, cost: 62, trace: 91 },
    autopsy: {
      missing: "favorite-frame pressure",
      symptom: "the first loop wanted to refine a convenient but narrow premise",
      fix: "add an explicit pass that searches for a rival framing before acceptance",
    },
    trace: [
      "generated favored interpretation",
      "forced contradiction search against {source}",
      "found alternate frame: {alternate}",
      "updated contract so future runs test the rival frame first",
      "accepted lower confidence with stronger evidence",
    ],
  },
];

const METRICS = [
  { id: "evidence", label: "Evidence" },
  { id: "confidence", label: "Confidence" },
  { id: "risk", label: "Risk" },
  { id: "cost", label: "Cost" },
  { id: "trace", label: "Trace Quality" },
];

const toneLabels = {
  weak: "Ungrounded",
  warning: "Closed Loop",
  danger: "Risk Rising",
  good: "Evidence Bearing",
};

function interpolate(template, scenario) {
  return template.replace(/\{(\w+)\}/g, (_, key) => scenario[key] || "");
}

function scenarioList() {
  return Object.values(SCENARIOS);
}

function moduleRail(railId) {
  return MODULES.filter((module) => module.rail === railId);
}

function MetricStrip({ metrics, progress }) {
  return (
    <section className="lw-panel lw-metrics" aria-label="Loop metrics">
      <div className="lw-panel-kicker">Signal strip</div>
      {METRICS.map((metric) => {
        const rawValue = metrics[metric.id];
        const value = Math.round(rawValue * progress);
        const danger = metric.id === "risk" || metric.id === "cost";
        return (
          <div className="lw-meter" key={metric.id}>
            <div className="lw-meter-label">
              <span>{metric.label}</span>
              <span>{value}%</span>
            </div>
            <div className="lw-meter-track">
              <div
                className={`lw-meter-fill ${danger ? "is-danger" : ""}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

function ScenarioSelector({ selected, onSelect }) {
  return (
    <nav className="lw-scenarios" aria-label="Task scenarios">
      {scenarioList().map((scenario) => (
        <button
          className={`lw-scenario ${selected === scenario.id ? "is-active" : ""}`}
          key={scenario.id}
          onClick={() => onSelect(scenario.id)}
          type="button"
        >
          <span>{scenario.label}</span>
          <small>{scenario.short}</small>
        </button>
      ))}
    </nav>
  );
}

function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="lw-mode-switch" aria-label="Run mode">
      {[
        ["prompt", "Prompt Mode"],
        ["loop", "Loop Mode"],
      ].map(([id, label]) => (
        <button
          aria-pressed={mode === id}
          className={mode === id ? "is-active" : ""}
          key={id}
          onClick={() => onModeChange(id)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function PromptConsole({ scenario, archetype, mode, hasRun }) {
  const promptRun = mode === "prompt";
  return (
    <section className="lw-panel lw-console" aria-label="Prompt console">
      <div className="lw-panel-kicker">{promptRun ? "one-shot prompt" : "source task"}</div>
      <p className="lw-console-task">{scenario.brief}</p>
      <div className="lw-prompt-box">
        <span>$ prompt</span>
        <p>{scenario.prompt}</p>
      </div>
      {hasRun && (
        <div className={`lw-answer ${promptRun ? "is-prompt" : ""}`}>
          <span>{promptRun ? "smooth answer" : "loop output"}</span>
          <p>
            {promptRun
              ? scenario.oneShot
              : `${archetype.title} produced ${interpolate(archetype.stop, scenario)}.`}
          </p>
        </div>
      )}
    </section>
  );
}

function ArchetypeSelector({ selected, onSelect }) {
  return (
    <section className="lw-archetypes" aria-label="Loop archetypes">
      {ARCHETYPES.filter((archetype) => archetype.id !== "prompt").map((archetype) => (
        <button
          className={`lw-archetype ${selected === archetype.id ? "is-active" : ""}`}
          key={archetype.id}
          onClick={() => onSelect(archetype.id)}
          type="button"
        >
          <span>{archetype.title}</span>
          <small>{archetype.badge}</small>
        </button>
      ))}
    </section>
  );
}

function Patchbay({ archetype }) {
  const activeModules = new Set(archetype.modules);
  return (
    <section className={`lw-patchbay tone-${archetype.tone}`} aria-label="Loop patchbay">
      <div className="lw-cable-field" aria-hidden="true">
        <div className="lw-cable lw-cable-a" />
        <div className="lw-cable lw-cable-b" />
        <div className="lw-cable lw-cable-c" />
        <div className="lw-cable lw-cable-d" />
      </div>
      {RAILS.map((rail) => (
        <div className="lw-rail" key={rail.id}>
          <div className="lw-rail-head">
            <span>{rail.title}</span>
            <small>{rail.cue}</small>
          </div>
          <div className="lw-module-stack">
            {moduleRail(rail.id).map((module) => {
              const active = activeModules.has(module.id);
              return (
                <div
                  className={`lw-module ${active ? "is-active" : ""}`}
                  key={module.id}
                >
                  <span className="lw-jack" />
                  <div>
                    <strong>{module.title}</strong>
                    <p>{module.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function TraceTimeline({ trace, currentStep, hasRun, running }) {
  const visibleTrace = hasRun ? trace.slice(0, currentStep + 1) : [];
  return (
    <section className="lw-panel lw-trace" aria-label="Trace timeline">
      <div className="lw-panel-kicker">Trace receipt</div>
      <div className="lw-trace-list">
        {visibleTrace.length === 0 ? (
          <div className="lw-trace-empty">Waiting for the loop to touch reality.</div>
        ) : (
          visibleTrace.map((event, index) => (
            <div
              className={`lw-trace-event ${
                running && index === visibleTrace.length - 1 ? "is-live" : ""
              }`}
              key={`${event}-${index}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{event}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function AutopsyPanel({ archetype, hasRun }) {
  return (
    <section className={`lw-panel lw-autopsy tone-${archetype.tone}`} aria-label="Failure autopsy">
      <div className="lw-panel-kicker">Failure autopsy</div>
      {!hasRun ? (
        <p className="lw-autopsy-standby">
          Run the workbench. The autopsy names the primitive that made the loop
          honest or brittle.
        </p>
      ) : (
        <div className="lw-autopsy-grid">
          <div>
            <span>Missing</span>
            <strong>{archetype.autopsy.missing}</strong>
          </div>
          <div>
            <span>Symptom</span>
            <strong>{archetype.autopsy.symptom}</strong>
          </div>
          <div>
            <span>Fix</span>
            <strong>{archetype.autopsy.fix}</strong>
          </div>
        </div>
      )}
    </section>
  );
}

function RunControls({ archetype, mode, onRun, running, hasRun }) {
  return (
    <div className="lw-runbar">
      <div>
        <span className={`lw-state-pill tone-${archetype.tone}`}>
          {toneLabels[archetype.tone]}
        </span>
        <strong>{mode === "prompt" ? "One answer" : archetype.title}</strong>
        <small>{archetype.summary}</small>
      </div>
      <button className="lw-run-button" disabled={running} onClick={onRun} type="button">
        {running ? "Running..." : hasRun ? "Run again" : "Run"}
      </button>
    </div>
  );
}

export default function Loopwright() {
  const [scenarioId, setScenarioId] = useState("parser");
  const [mode, setMode] = useState("prompt");
  const [archetypeId, setArchetypeId] = useState("evidence");
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const scenario = SCENARIOS[scenarioId];
  const activeArchetype = useMemo(() => {
    const id = mode === "prompt" ? "prompt" : archetypeId;
    return ARCHETYPES.find((archetype) => archetype.id === id) || ARCHETYPES[0];
  }, [archetypeId, mode]);

  const activeTrace = useMemo(
    () => activeArchetype.trace.map((event) => interpolate(event, scenario)),
    [activeArchetype, scenario],
  );

  const progress = hasRun
    ? Math.max(0.18, (currentStep + 1) / activeTrace.length)
    : 0.08;

  useEffect(() => {
    setHasRun(false);
    setRunning(false);
    setCurrentStep(0);
  }, [scenarioId, mode, archetypeId]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setInterval(() => {
      setCurrentStep((step) => {
        if (step >= activeTrace.length - 1) {
          window.clearInterval(timer);
          setRunning(false);
          return step;
        }
        return step + 1;
      });
    }, 620);

    return () => window.clearInterval(timer);
  }, [activeTrace.length, running]);

  function runLoop() {
    setCurrentStep(0);
    setHasRun(true);
    setRunning(true);
  }

  return (
    <main className="loopwright-shell">
      <LoopwrightStyles />
      <section className="lw-hero">
        <div className="lw-hero-copy">
          <p className="lw-kicker">New Software Primitives</p>
          <h1>The Loopwright</h1>
          <p>
            Stop writing heroic prompts. Start wiring the feedback system that
            decides when model work earns another try, a repair, acceptance, or
            a stop.
          </p>
        </div>
        <div className="lw-hero-instrument" aria-hidden="true">
          <span className="lw-scope-line" />
          <span className="lw-scope-line delay-a" />
          <span className="lw-scope-line delay-b" />
          <div className="lw-hero-label">state - model - action - evidence - stop</div>
        </div>
      </section>

      <section className="lw-workbench" aria-label="Loopwright workbench">
        <div className="lw-workbench-head">
          <ScenarioSelector selected={scenarioId} onSelect={setScenarioId} />
          <ModeSwitch mode={mode} onModeChange={setMode} />
        </div>

        {mode === "loop" && (
          <ArchetypeSelector selected={archetypeId} onSelect={setArchetypeId} />
        )}

        <div className="lw-board">
          <aside className="lw-side">
            <PromptConsole
              archetype={activeArchetype}
              hasRun={hasRun}
              mode={mode}
              scenario={scenario}
            />
          </aside>

          <div className="lw-main">
            <RunControls
              archetype={activeArchetype}
              hasRun={hasRun}
              mode={mode}
              onRun={runLoop}
              running={running}
            />
            <Patchbay archetype={activeArchetype} />
          </div>

          <aside className="lw-side">
            <MetricStrip metrics={activeArchetype.metrics} progress={progress} />
            <TraceTimeline
              currentStep={currentStep}
              hasRun={hasRun}
              running={running}
              trace={activeTrace}
            />
            <AutopsyPanel archetype={activeArchetype} hasRun={hasRun} />
          </aside>
        </div>
      </section>

      <section className="lw-coda">
        <div>
          <p className="lw-kicker">The job description</p>
          <h2>A loop is only as honest as what it has to collide with.</h2>
        </div>
        <p>
          A prompt asks the model to sound right. A loop gives the model a
          workbench: state, world contact, evaluator pressure, authority
          boundaries, budgets, stop rules, and a trace. The craft is authoring
          the conditions under which output earns continuation, rejection, or
          done.
        </p>
      </section>
    </main>
  );
}

function LoopwrightStyles() {
  return (
    <style>{`
      .loopwright-shell {
        min-height: 100vh;
        background:
          radial-gradient(circle at 18% 12%, rgba(86, 255, 208, 0.14), transparent 28rem),
          radial-gradient(circle at 82% 18%, rgba(255, 184, 77, 0.1), transparent 24rem),
          linear-gradient(180deg, #050607 0%, #0b0d0f 46%, #050607 100%);
        color: #effffb;
        font-family: Inter, system-ui, sans-serif;
        overflow-x: hidden;
      }

      .loopwright-shell::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        opacity: 0.21;
        background-image:
          linear-gradient(rgba(86, 255, 208, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(86, 255, 208, 0.045) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: linear-gradient(180deg, black, transparent 82%);
      }

      .lw-hero,
      .lw-workbench,
      .lw-coda {
        position: relative;
        z-index: 1;
        width: min(1520px, calc(100vw - 40px));
        margin: 0 auto;
      }

      .lw-hero {
        min-height: 0;
        padding: 78px 0 18px;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
        align-items: center;
        gap: 34px;
      }

      .lw-kicker,
      .lw-panel-kicker {
        margin: 0;
        color: #56ffd0;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }

      .lw-hero h1 {
        margin: 14px 0 18px;
        font-family: "Space Grotesk", Inter, system-ui, sans-serif;
        font-size: clamp(48px, 6.8vw, 94px);
        line-height: 0.92;
        letter-spacing: 0;
        color: #f7fffc;
      }

      .lw-hero-copy > p:last-child {
        margin: 0;
        max-width: 760px;
        color: #a7b7b2;
        font-size: clamp(16px, 1.6vw, 21px);
        line-height: 1.45;
      }

      .lw-hero-instrument {
        min-height: 172px;
        border: 1px solid rgba(86, 255, 208, 0.22);
        background:
          linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)),
          repeating-linear-gradient(90deg, rgba(86,255,208,0.08) 0 1px, transparent 1px 42px);
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.38);
      }

      .lw-scope-line {
        position: absolute;
        left: -20%;
        right: -20%;
        top: 44%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #56ffd0, transparent);
        transform: rotate(-7deg);
        animation: lw-sweep 4.4s linear infinite;
      }

      .lw-scope-line.delay-a {
        top: 60%;
        opacity: 0.54;
        animation-delay: -1.5s;
      }

      .lw-scope-line.delay-b {
        top: 28%;
        opacity: 0.34;
        animation-delay: -2.7s;
      }

      .lw-hero-label {
        position: absolute;
        left: 18px;
        bottom: 16px;
        color: #778a84;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 12px;
      }

      .lw-workbench {
        padding: 10px 0 70px;
      }

      .lw-workbench-head {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: stretch;
        margin-bottom: 16px;
      }

      .lw-scenarios,
      .lw-mode-switch,
      .lw-archetypes {
        display: flex;
        gap: 8px;
      }

      .lw-scenario,
      .lw-mode-switch button,
      .lw-archetype,
      .lw-run-button {
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.035);
        color: #d9ebe5;
        border-radius: 8px;
        transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
      }

      .lw-scenario,
      .lw-archetype {
        min-height: 62px;
        padding: 12px 14px;
        text-align: left;
      }

      .lw-scenario span,
      .lw-archetype span {
        display: block;
        font-weight: 700;
        font-size: 14px;
      }

      .lw-scenario small,
      .lw-archetype small,
      .lw-runbar small {
        display: block;
        margin-top: 4px;
        color: #74847f;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 11px;
      }

      .lw-scenario:hover,
      .lw-mode-switch button:hover,
      .lw-archetype:hover,
      .lw-run-button:hover {
        border-color: rgba(86,255,208,0.48);
        transform: translateY(-1px);
      }

      .lw-scenario.is-active,
      .lw-mode-switch button.is-active,
      .lw-archetype.is-active {
        background: rgba(86,255,208,0.12);
        border-color: rgba(86,255,208,0.72);
        color: #f5fffc;
      }

      .lw-mode-switch {
        align-self: stretch;
        padding: 4px;
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 8px;
        background: rgba(0,0,0,0.22);
      }

      .lw-mode-switch button {
        min-width: 126px;
        padding: 0 14px;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 12px;
      }

      .lw-board {
        display: grid;
        grid-template-columns: minmax(260px, 0.72fr) minmax(560px, 1.56fr) minmax(300px, 0.78fr);
        gap: 16px;
        align-items: start;
      }

      .lw-side,
      .lw-main {
        display: grid;
        gap: 14px;
      }

      .lw-panel,
      .lw-runbar,
      .lw-patchbay {
        border: 1px solid rgba(255,255,255,0.09);
        background: rgba(9, 13, 14, 0.74);
        backdrop-filter: blur(18px);
        border-radius: 8px;
        box-shadow: 0 24px 80px rgba(0,0,0,0.24);
      }

      .lw-panel {
        padding: 16px;
      }

      .lw-console-task,
      .lw-prompt-box p,
      .lw-answer p,
      .lw-coda p,
      .lw-autopsy-standby {
        color: #a7b7b2;
        line-height: 1.55;
      }

      .lw-console-task {
        min-height: 104px;
        margin: 12px 0 16px;
        font-size: 14px;
      }

      .lw-prompt-box,
      .lw-answer {
        border: 1px solid rgba(86,255,208,0.16);
        background: rgba(0,0,0,0.28);
        border-radius: 8px;
        padding: 12px;
      }

      .lw-answer {
        margin-top: 12px;
        border-color: rgba(255,184,77,0.24);
      }

      .lw-answer.is-prompt {
        border-color: rgba(255,95,122,0.26);
      }

      .lw-prompt-box span,
      .lw-answer span {
        color: #56ffd0;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .lw-prompt-box p,
      .lw-answer p {
        margin: 8px 0 0;
        font-size: 13px;
      }

      .lw-archetypes {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 8px;
        margin-bottom: 16px;
      }

      .lw-archetype {
        min-height: 58px;
        padding: 10px;
      }

      .lw-archetype span {
        font-size: 13px;
        line-height: 1.15;
      }

      .lw-runbar {
        min-height: 88px;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        padding: 16px;
      }

      .lw-runbar strong {
        display: block;
        margin-top: 8px;
        font-size: 19px;
        color: #f5fffc;
      }

      .lw-state-pill {
        display: inline-flex;
        align-items: center;
        min-height: 22px;
        padding: 3px 8px;
        border-radius: 999px;
        border: 1px solid rgba(86,255,208,0.28);
        color: #56ffd0;
        background: rgba(86,255,208,0.08);
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 11px;
      }

      .lw-state-pill.tone-warning,
      .lw-state-pill.tone-weak {
        color: #ffcf75;
        border-color: rgba(255,207,117,0.34);
        background: rgba(255,207,117,0.08);
      }

      .lw-state-pill.tone-danger {
        color: #ff6d86;
        border-color: rgba(255,109,134,0.34);
        background: rgba(255,109,134,0.08);
      }

      .lw-run-button {
        flex: 0 0 auto;
        min-width: 130px;
        min-height: 48px;
        color: #05110e;
        background: #56ffd0;
        border-color: #56ffd0;
        font-weight: 800;
        font-family: "JetBrains Mono", ui-monospace, monospace;
      }

      .lw-run-button:disabled {
        cursor: wait;
        opacity: 0.72;
        transform: none;
      }

      .lw-patchbay {
        position: relative;
        min-height: 548px;
        padding: 18px;
        display: grid;
        grid-template-columns: repeat(4, minmax(128px, 1fr));
        gap: 12px;
        overflow: hidden;
      }

      .lw-cable-field {
        position: absolute;
        inset: 42px 72px;
        pointer-events: none;
      }

      .lw-cable {
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(86,255,208,0.78), transparent);
        box-shadow: 0 0 18px rgba(86,255,208,0.34);
        opacity: 0.44;
        animation: lw-pulse 2.7s ease-in-out infinite;
      }

      .lw-cable-a { top: 23%; }
      .lw-cable-b { top: 42%; animation-delay: -0.7s; }
      .lw-cable-c { top: 62%; animation-delay: -1.4s; }
      .lw-cable-d { top: 79%; animation-delay: -2.1s; }

      .tone-weak .lw-cable,
      .tone-warning .lw-cable {
        background: linear-gradient(90deg, transparent, rgba(255,207,117,0.72), transparent);
        box-shadow: 0 0 18px rgba(255,207,117,0.22);
      }

      .tone-danger .lw-cable {
        background: linear-gradient(90deg, transparent, rgba(255,109,134,0.76), transparent);
        box-shadow: 0 0 18px rgba(255,109,134,0.26);
      }

      .lw-rail {
        position: relative;
        z-index: 1;
        min-width: 0;
      }

      .lw-rail-head {
        min-height: 64px;
        padding: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        margin-bottom: 12px;
      }

      .lw-rail-head span {
        display: block;
        color: #f5fffc;
        font-weight: 800;
      }

      .lw-rail-head small {
        display: block;
        margin-top: 4px;
        color: #6f837d;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 10px;
        line-height: 1.3;
      }

      .lw-module-stack {
        display: grid;
        gap: 10px;
      }

      .lw-module {
        min-height: 92px;
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        gap: 10px;
        align-items: start;
        padding: 12px;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        background: rgba(0,0,0,0.32);
        opacity: 0.44;
        transition: opacity 200ms ease, border-color 200ms ease, background 200ms ease;
      }

      .lw-module.is-active {
        opacity: 1;
        border-color: rgba(86,255,208,0.52);
        background: rgba(86,255,208,0.08);
      }

      .tone-warning .lw-module.is-active,
      .tone-weak .lw-module.is-active {
        border-color: rgba(255,207,117,0.45);
        background: rgba(255,207,117,0.07);
      }

      .tone-danger .lw-module.is-active {
        border-color: rgba(255,109,134,0.48);
        background: rgba(255,109,134,0.07);
      }

      .lw-jack {
        width: 12px;
        height: 12px;
        margin-top: 4px;
        border-radius: 50%;
        border: 2px solid #51605c;
        background: #09100e;
      }

      .lw-module.is-active .lw-jack {
        border-color: #56ffd0;
        box-shadow: 0 0 18px rgba(86,255,208,0.64);
      }

      .lw-module strong {
        display: block;
        color: #f5fffc;
        font-size: 13px;
        line-height: 1.2;
      }

      .lw-module p {
        margin: 6px 0 0;
        color: #82948e;
        font-size: 12px;
        line-height: 1.35;
      }

      .lw-meter + .lw-meter {
        margin-top: 14px;
      }

      .lw-meter-label {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        color: #c7d8d2;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 11px;
        margin-bottom: 7px;
      }

      .lw-meter-track {
        height: 8px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        overflow: hidden;
      }

      .lw-meter-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #1dcfa8, #56ffd0);
        transition: width 280ms ease;
      }

      .lw-meter-fill.is-danger {
        background: linear-gradient(90deg, #ffcf75, #ff6d86);
      }

      .lw-trace-list {
        min-height: 238px;
        display: grid;
        gap: 8px;
        align-content: start;
        margin-top: 14px;
      }

      .lw-trace-empty {
        min-height: 96px;
        display: grid;
        place-items: center;
        color: #64756f;
        border: 1px dashed rgba(255,255,255,0.12);
        border-radius: 8px;
        font-size: 13px;
        text-align: center;
        padding: 18px;
      }

      .lw-trace-event {
        min-height: 48px;
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr);
        gap: 10px;
        align-items: start;
        padding: 10px;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        background: rgba(0,0,0,0.24);
        animation: lw-trace-in 220ms ease both;
      }

      .lw-trace-event.is-live {
        border-color: rgba(86,255,208,0.45);
      }

      .lw-trace-event span {
        color: #56ffd0;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 11px;
      }

      .lw-trace-event p {
        margin: 0;
        color: #b8cac4;
        font-size: 12px;
        line-height: 1.4;
      }

      .lw-autopsy {
        border-color: rgba(86,255,208,0.24);
      }

      .lw-autopsy.tone-warning,
      .lw-autopsy.tone-weak {
        border-color: rgba(255,207,117,0.26);
      }

      .lw-autopsy.tone-danger {
        border-color: rgba(255,109,134,0.3);
      }

      .lw-autopsy-grid {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }

      .lw-autopsy-grid div {
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        padding: 10px;
        background: rgba(0,0,0,0.2);
      }

      .lw-autopsy-grid span {
        display: block;
        color: #778a84;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 5px;
      }

      .lw-autopsy-grid strong {
        display: block;
        color: #f1fffb;
        font-size: 13px;
        line-height: 1.35;
      }

      .lw-coda {
        padding: 42px 0 96px;
        display: grid;
        grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1fr);
        gap: 34px;
        align-items: start;
      }

      .lw-coda h2 {
        margin: 12px 0 0;
        font-family: "Space Grotesk", Inter, system-ui, sans-serif;
        font-size: clamp(34px, 5vw, 68px);
        line-height: 0.96;
        letter-spacing: 0;
      }

      .lw-coda p {
        margin: 0;
        font-size: 18px;
      }

      .loopwright-shell button:focus-visible {
        outline: 2px solid #56ffd0;
        outline-offset: 3px;
      }

      @keyframes lw-sweep {
        0% { transform: translateX(-24%) rotate(-7deg); }
        100% { transform: translateX(24%) rotate(-7deg); }
      }

      @keyframes lw-pulse {
        0%, 100% { opacity: 0.25; }
        50% { opacity: 0.72; }
      }

      @keyframes lw-trace-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 1180px) {
        .lw-hero {
          grid-template-columns: 1fr;
          min-height: auto;
          padding-top: 92px;
        }

        .lw-board {
          grid-template-columns: 1fr;
        }

        .lw-side {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .lw-console {
          grid-column: 1 / -1;
        }

        .lw-archetypes {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width: 760px) {
        .lw-hero,
        .lw-workbench,
        .lw-coda {
          width: min(100vw - 24px, 1520px);
        }

        .lw-hero {
          padding-top: 84px;
          gap: 22px;
        }

        .lw-hero h1 {
          font-size: clamp(42px, 16vw, 62px);
        }

        .lw-hero-instrument {
          min-height: 150px;
        }

        .lw-workbench-head,
        .lw-scenarios {
          flex-direction: column;
        }

        .lw-mode-switch button {
          min-height: 42px;
          width: 100%;
        }

        .lw-side {
          grid-template-columns: 1fr;
        }

        .lw-archetypes {
          grid-template-columns: 1fr;
        }

        .lw-runbar {
          align-items: stretch;
          flex-direction: column;
        }

        .lw-run-button {
          width: 100%;
        }

        .lw-patchbay {
          min-height: 0;
          grid-template-columns: 1fr;
          padding: 12px;
        }

        .lw-cable-field {
          display: none;
        }

        .lw-rail-head {
          min-height: 0;
          padding: 10px 4px;
        }

        .lw-module {
          min-height: 78px;
        }

        .lw-coda {
          grid-template-columns: 1fr;
          padding-bottom: 72px;
        }
      }
    `}</style>
  );
}
