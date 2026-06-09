import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

const stages = [
  {
    id: "ask",
    label: "Ask",
    title: "Name the job.",
    copy: "Write one short release note for workspace sharing. The task is small enough to check.",
  },
  {
    id: "try",
    label: "Try",
    title: "Let the first answer exist.",
    copy: "The model writes a fluent version. Fluent is useful. Fluent is not finished.",
  },
  {
    id: "check",
    label: "Check",
    title: "Put the answer next to the source.",
    copy: "A permission caveat appears. The phrase \"collaborate instantly\" promises more than the product shipped.",
  },
  {
    id: "change",
    label: "Change",
    title: "Repair the sentence.",
    copy: "The note keeps the useful announcement and makes the constraint visible.",
  },
  {
    id: "stop",
    label: "Stop",
    title: "End with evidence.",
    copy: "The answer now matches the shipped behavior. The loop can stop because it has a reason.",
  },
];

const everydayLoops = [
  {
    title: "Cooking",
    steps: "cook, taste, adjust, serve",
    copy: "You do not prompt soup into correctness. You taste it.",
  },
  {
    title: "Writing",
    steps: "draft, read, revise, publish",
    copy: "A sentence becomes honest after it survives being read.",
  },
  {
    title: "Coding",
    steps: "change, test, fix, commit",
    copy: "A test is the work meeting the world, not decoration after the work.",
  },
];

function PromptLoopToggle({ mode, onModeChange, onReplay }) {
  return (
    <div className="hl-controls" aria-label="Choose prompt or loop mode">
      <div className="hl-toggle">
        <button
          aria-pressed={mode === "prompt"}
          className={mode === "prompt" ? "is-active" : ""}
          onClick={() => onModeChange("prompt")}
          type="button"
        >
          Prompt
        </button>
        <button
          aria-pressed={mode === "loop"}
          className={mode === "loop" ? "is-active" : ""}
          onClick={() => onModeChange("loop")}
          type="button"
        >
          Loop
        </button>
      </div>
      <button className="hl-replay" onClick={onReplay} type="button">
        Replay
      </button>
    </div>
  );
}

function StageRail({ activeStage, mode, onSelectStage }) {
  return (
    <nav className="hl-stage-rail" aria-label="Loop stages">
      {stages.map((stage, index) => {
        const isActive = mode === "loop" && index === activeStage;
        const isPast = mode === "loop" && index < activeStage;

        return (
          <button
            aria-pressed={isActive}
            className={`${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
            key={stage.id}
            onClick={() => onSelectStage(index)}
            type="button"
          >
            <span>{stage.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function ReleaseNoteText({ activeStage, mode }) {
  const showPromptAnswer = mode === "prompt" || activeStage <= 2;
  const showRiskMark = mode === "prompt" || activeStage === 2;
  const showRepairMark = mode === "loop" && activeStage >= 3;

  if (showPromptAnswer) {
    return (
      <p className="hl-release-note">
        Workspace sharing is here. Invite your team,{" "}
        <mark className={showRiskMark ? "is-risk" : ""}>collaborate instantly</mark>,
        and keep every project moving from one shared home.
      </p>
    );
  }

  return (
    <p className="hl-release-note">
      Workspace sharing is now available for team projects. Invite collaborators,
      keep ownership visible, and{" "}
      <mark className={showRepairMark ? "is-repair" : ""}>
        review permission details before rollout
      </mark>
      .
    </p>
  );
}

function SheetNotes({ activeStage, mode }) {
  if (mode === "prompt") {
    return (
      <>
        <div className="hl-sheet-note is-warning">
          <span>Problem</span>
          <p>Sounds finished. Not checked.</p>
        </div>
        <div className="hl-sheet-note">
          <span>Missing</span>
          <p>No source, no test, no stopping condition.</p>
        </div>
      </>
    );
  }

  if (activeStage === 0) {
    return (
      <div className="hl-sheet-note">
        <span>Brief</span>
        <p>The loop starts with a checkable job, not a wish for perfection.</p>
      </div>
    );
  }

  if (activeStage === 1) {
    return (
      <div className="hl-sheet-note">
        <span>Draft</span>
        <p>The first answer is material. It is not yet evidence.</p>
      </div>
    );
  }

  if (activeStage === 2) {
    return (
      <>
        <div className="hl-sheet-note is-warning">
          <span>Source check</span>
          <p>Permission setup can block immediate collaboration.</p>
        </div>
        <div className="hl-sheet-note">
          <span>Mark</span>
          <p>The promise is too broad, so the sentence must change.</p>
        </div>
      </>
    );
  }

  if (activeStage === 3) {
    return (
      <div className="hl-sheet-note is-good">
        <span>Revision</span>
        <p>The caveat moved from hidden reality into public wording.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hl-sheet-note is-good">
        <span>Receipt</span>
        <p>Checked against source. Stopped with evidence.</p>
      </div>
      <div className="hl-sheet-note">
        <span>Enough</span>
        <p>The sentence no longer outruns the product.</p>
      </div>
    </>
  );
}

function RevisionSheet({ activeStage, mode }) {
  const stage = mode === "prompt" ? null : stages[activeStage];
  const headline = mode === "prompt" ? "One-shot answer" : stage.title;
  const body =
    mode === "prompt"
      ? "A prompt can produce a beautiful sentence and still leave the truth untouched."
      : stage.copy;
  const showDraft = mode === "prompt" || activeStage > 0;

  return (
    <article className={`hl-sheet ${mode === "prompt" ? "is-prompt" : ""}`}>
      <header className="hl-sheet-header">
        <div>
          <span className="hl-sheet-kicker">
            {mode === "prompt" ? "Prompt mode" : `${stage.label} mode`}
          </span>
          <h2>{headline}</h2>
        </div>
        <span className="hl-sheet-status">
          {mode === "prompt" ? "unchecked" : `${activeStage + 1}/5`}
        </span>
      </header>

      <div className="hl-task-strip">
        <span>Task</span>
        <p>Write a short release note for workspace sharing.</p>
      </div>

      <div className="hl-sheet-body">
        <div className="hl-draft-area">
          <span className="hl-draft-label">
            {showDraft ? "Release note" : "Draft"}
          </span>
          {showDraft ? (
            <ReleaseNoteText activeStage={activeStage} mode={mode} />
          ) : (
            <p className="hl-empty-draft">Waiting for the first attempt.</p>
          )}
        </div>

        <aside className="hl-note-stack" aria-label="Revision notes">
          <SheetNotes activeStage={activeStage} mode={mode} />
        </aside>
      </div>

      <footer className="hl-sheet-footer">
        <p>{body}</p>
        {mode === "loop" && activeStage === 4 && (
          <strong>checked against source - stopped with evidence</strong>
        )}
      </footer>
    </article>
  );
}

function PrincipleBlocks() {
  return (
    <section className="hl-principles" aria-label="Prompt and loop distinction">
      <div className="hl-principle-intro">
        <p className="hl-kicker">The primitive</p>
        <h2>A loop is not a longer prompt.</h2>
      </div>
      <div className="hl-principle-grid">
        <article>
          <span>Prompt</span>
          <p>
            One instruction goes in. One answer comes out. The interface can
            stop while the work is still pretending.
          </p>
        </article>
        <article>
          <span>Loop</span>
          <p>
            An attempt meets a source, a test, a reader, or a constraint. The
            next attempt is different because reality pushed back.
          </p>
        </article>
        <article>
          <span>Stop</span>
          <p>
            The finish line is not vibes. It is a condition: the evidence is
            enough, the risk is named, the work can ship.
          </p>
        </article>
      </div>
    </section>
  );
}

function EverydayLoops() {
  return (
    <section className="hl-everyday" aria-label="Everyday loop examples">
      <p className="hl-kicker">You already know this shape</p>
      <h2>Feedback is ordinary. AI just made it visible.</h2>
      <div className="hl-everyday-grid">
        {everydayLoops.map((example) => (
          <article key={example.title}>
            <span>{example.steps}</span>
            <h3>{example.title}</h3>
            <p>{example.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingStatement() {
  return (
    <section className="hl-closing">
      <p className="hl-kicker">The AI turn</p>
      <h2>The model is not the loop.</h2>
      <p>
        The loop is the workbench around it: the source you check, the test you
        run, the review you ask for, the evidence you keep, and the condition
        that says enough.
      </p>
      <strong>The future is not better prompts. It is better stopping conditions.</strong>
    </section>
  );
}

function LoopifyFooter() {
  return (
    <section className="hl-loopify" aria-label="Loopify project">
      <div className="hl-loopify-copy">
        <p className="hl-kicker">If you want the tool</p>
        <h2>Loopify turns this essay into working agent practice.</h2>
        <p>
          It is a Claude plugin-format skill bundle for turning specs into
          checked feedback loops: contracts, evidence, quality gates, traces,
          stop reasons, and the small paper trail that makes done less theatrical.
        </p>
      </div>

      <div className="hl-loopify-panel">
        <div className="hl-loopify-list" aria-label="Loopify capabilities">
          <article>
            <span>Contract</span>
            <p>Name the goal, evidence, authority, checks, budget, and stop rules.</p>
          </article>
          <article>
            <span>Folder</span>
            <p>Bootstrap one numbered loop with source, checklist, trace, report, and retro.</p>
          </article>
          <article>
            <span>Run</span>
            <p>Check reality, patch the work, rerun the gate, and stop with a receipt.</p>
          </article>
        </div>

        <a
          className="hl-loopify-link"
          href="https://github.com/AndreRatzenberger/loopify"
          rel="noreferrer"
          target="_blank"
        >
          Open Loopify on GitHub
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </section>
  );
}

export default function HonestLoop() {
  const [mode, setMode] = useState("loop");
  const [activeStage, setActiveStage] = useState(0);
  const [playRun, setPlayRun] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (mode === "prompt") {
      setActiveStage(1);
      setIsPlaying(false);
      return undefined;
    }

    if (!isPlaying) return undefined;

    const timers = stages.map((_, index) =>
      window.setTimeout(() => setActiveStage(index), 420 + index * 820),
    );
    const stopTimer = window.setTimeout(
      () => setIsPlaying(false),
      420 + stages.length * 820,
    );

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(stopTimer);
    };
  }, [isPlaying, mode, playRun]);

  const activeCopy = useMemo(() => {
    if (mode === "prompt") return "One fluent answer can feel like proof.";
    return stages[activeStage].copy;
  }, [activeStage, mode]);

  function chooseMode(nextMode) {
    setMode(nextMode);
    if (nextMode === "loop") {
      setIsPlaying(true);
      setPlayRun((run) => run + 1);
    }
  }

  function replay() {
    setMode("loop");
    setIsPlaying(true);
    setPlayRun((run) => run + 1);
  }

  function selectStage(index) {
    setMode("loop");
    setIsPlaying(false);
    setActiveStage(index);
  }

  return (
    <main className="honest-loop-shell">
      <section className="hl-hero">
        <div className="hl-hero-copy">
          <p className="hl-kicker">New Software Primitives</p>
          <h1>Prompts ask. Loops learn.</h1>
          <p>
            A prompt asks once. A loop tries, checks, changes, and knows when
            to stop.
          </p>

          <PromptLoopToggle
            mode={mode}
            onModeChange={chooseMode}
            onReplay={replay}
          />

          <StageRail
            activeStage={activeStage}
            mode={mode}
            onSelectStage={selectStage}
          />

          <p className="hl-current">{activeCopy}</p>
        </div>

        <RevisionSheet activeStage={activeStage} mode={mode} />
      </section>

      <PrincipleBlocks />
      <EverydayLoops />
      <ClosingStatement />
      <LoopifyFooter />
    </main>
  );
}
