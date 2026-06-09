# The Honest Loop - Companion Notes

## Concept Summary

The Honest Loop is a minimal interactive essay about the simplest useful
distinction in AI workflow design:

```text
A prompt asks once.
A loop tries, checks, changes, and knows when to stop.
```

This entry intentionally avoids the patchbay/workbench complexity from the
Loopwright concept. It is meant to be understandable at first glance by a
non-technical reader. The page teaches the primitive through a single familiar
artifact: a release note being revised until it stops over-promising.

## Visual Language Notes

The current design is the **Revision Sheet**:

- dark editorial page with a gridded technical base
- one large proof-sheet artifact in the first viewport
- the release-note sentence is the visualization
- amber marks expose the risky phrase in Prompt Mode and Check
- cyan marks show the repaired wording and the final receipt
- no clock, no detached diagram, no patch cables, no dashboard

The important design move is proximity. The loop stages, the content being
worked on, the source caveat, and the stopping receipt all live in the same
artifact. The reader should not have to connect a symbolic diagram to a distant
content panel.

## Interaction Model

The interaction is deliberately small:

- `Prompt / Loop` toggle
- `Replay` button for the loop
- five plain stage buttons: Ask, Try, Check, Change, Stop
- the proof sheet changes directly when the mode or stage changes

Prompt Mode shows the polished but unchecked one-shot release note. Loop Mode
walks the same release note through Ask, Try, Check, Change, Stop:

1. Ask: task is visible, no draft yet
2. Try: first fluent answer appears
3. Check: `collaborate instantly` is marked as risky against the source caveat
4. Change: the sentence is rewritten to mention permissions before rollout
5. Stop: a receipt appears: `checked against source - stopped with evidence`

## Implementation Architecture

Post path:

```text
src/posts/2026-06-10-honest-loop/index.jsx
```

Registry entry:

```text
src/posts/registry.js
```

The post is self-contained in one file. Main pieces:

- `HonestLoop` - top-level mode, active stage, and autoplay state
- `PromptLoopToggle` - Prompt / Loop switch plus Replay
- `StageRail` - five stage buttons
- `RevisionSheet` - the central proof-sheet artifact
- `ReleaseNoteText` - the sentence with risk/repair marks
- `SheetNotes` - local notes for each stage
- `PrincipleBlocks` - the prompt/loop/stop distinction
- `EverydayLoops` - ordinary feedback-loop analogies
- `ClosingStatement` - the AI connection and final line
- `LoopifyFooter` - quiet project bridge to the Loopify repository
- `styles.css` - post-local CSS

State remains intentionally small:

- `mode`: `prompt` or `loop`
- `activeStage`: index into the five loop stages
- `playRun` and `isPlaying`: replay/autoplay control for the first pass

There is no `IntersectionObserver` and no detached loop glyph. The code follows
the concept: the sentence changes because the loop touches it.

## Copy Decisions

The page starts with plain language and delays agent terminology:

- Opening: "Prompts ask. Loops learn."
- Primitive: "A prompt asks once. A loop tries, checks, changes, and knows when
  to stop."
- Main example: workspace sharing release note
- Problem: fluency feels like proof, but the first answer over-promises
- Final line: "The future is not better prompts. It is better stopping
  conditions."

The AI section appears only near the end and uses plain terms: source, test,
review, evidence, stopping condition.

The page now ends with a restrained Loopify bridge. It frames Loopify as the
tool-shaped continuation of the essay, not an advertisement: contracts, loop
folders, checks, traces, stop reasons, and receipts.

## Verification Performed

Run fresh verification after edits:

```bash
npm run build
git diff --check
```

Browser verification should be performed with the `agent-browser` skill:

- route loads at `/honest-loop`
- first viewport shows headline, controls, stage rail, and Revision Sheet
- Prompt Mode shows unchecked release note and warning notes
- Loop Mode advances through Ask, Try, Check, Change, Stop
- stage buttons directly change the sheet
- final receipt appears with `checked against source - stopped with evidence`
- desktop screenshot inspected for layout/readability
- mobile screenshot inspected for title, controls, stage labels, and sheet
- mobile overflow check passes with
  `document.documentElement.scrollWidth <= window.innerWidth`

## Known Tradeoffs

- The example is deliberately mundane. It avoids spectacle so the feedback
  primitive stays legible.
- The post is one large self-contained file because Infinite Loop posts are
  allowed to be bespoke React applications. Split only if the entry grows again.
- Autoplay is a teaching affordance, not the core interaction. The stage buttons
  remain the clearest way to inspect the loop.

## Future Expansion Ideas

- Add a tiny source excerpt beside the permission caveat if readers need more
  concrete evidence.
- Add a second plain-language example only if the single release-note example
  feels too abstract after visual review.
- If this replaces Loopwright as the public direction, remove or archive the
  Loopwright post from the registry before publishing.
