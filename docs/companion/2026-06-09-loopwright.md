# The Loopwright - Companion Notes

## Concept Summary

The Loopwright is an interactive essay about the shift from prompt engineering
to loop engineering. It teaches that prompts still matter, but they are no
longer the unit of done. The useful unit is the feedback controller around the
model: state, context, tools, evidence, checks, authority, budgets, traces,
stop reasons, and human gates.

The post makes the idea tactile by turning it into a patchbay simulator. The
reader chooses a task, runs a one-shot prompt or loop topology, and watches
metrics, trace events, active modules, and a failure autopsy change.

## Implementation Architecture

Post path:

```text
src/posts/2026-06-09-loopwright/index.jsx
```

Registry entry:

```text
src/posts/registry.js
```

The implementation is intentionally self-contained. The post owns its scenario
data, archetype data, UI components, state model, and CSS in one file. This
matches Infinite Loop's "each post is its own app" principle and avoids
normalizing the site around one post's visual language.

Main components:

- `Loopwright` - top-level state and layout
- `ScenarioSelector` - three task scenarios
- `ModeSwitch` - Prompt Mode vs Loop Mode
- `PromptConsole` - scenario brief, prompt, and output
- `ArchetypeSelector` - loop topology choices
- `Patchbay` - visible modules grouped into Make, Touch, Judge, Govern rails
- `MetricStrip` - Evidence, Confidence, Risk, Cost, Trace Quality
- `TraceTimeline` - deterministic trace playback
- `AutopsyPanel` - missing primitive, symptom, and fix
- `RunControls` - run state and active topology summary

## Scenario And Archetype Model

Scenarios are stored in `SCENARIOS`:

- `parser` - quoted-comma CSV parser failure
- `release` - workspace sharing release note with permission caveats
- `research` - publishability of a loops-vs-prompts claim

Each scenario provides task copy plus scenario-specific substitution fields:
`artifact`, `target`, `source`, `external`, `riskyAction`, `alternate`, and
`success`.

Archetypes are stored in `ARCHETYPES`:

- `prompt` - smooth one-shot answer with no trace or stop reason
- `self` - self-evaluation improves style while evidence stays flat
- `no-budget` - cost rises because no one named enough
- `no-evidence` - structured loop remains trapped inside the model frame
- `tool-boundary` - tool contact improves evidence while risk rises
- `evidence` - bounded loop checks reality and stops with receipts
- `break-frame` - adversarial pass attacks the favorite interpretation

Each archetype owns active module IDs, final metrics, stop wording, autopsy
copy, and trace templates. Trace templates interpolate scenario fields at
runtime, so scenario switching changes the visible behavior without any live
model call.

## Interaction Notes

The run button starts a timed deterministic trace. During playback:

- metric bars interpolate toward the archetype's final values
- trace rows appear one by one
- the active archetype's module set remains highlighted in the patchbay
- the autopsy appears once a run has started

Changing scenario, mode, or archetype resets the run state. Prompt Mode always
uses the `prompt` archetype. Loop Mode defaults to `evidence`.

The simulator is not claiming to predict arbitrary agent behavior. It stages
structural failure modes so readers can recognize them in real systems.

## Visual Language Notes

The intended feel is synth patchbay meets lab bench:

- graphite/black full-bleed base
- cyan primary signal color `#56ffd0`
- amber for warning/closed-frame states
- red-pink for danger/risk states
- stable, sharp modules with visible jacks and signal cables
- dark translucent panels, but only where they frame real controls or telemetry
- compact mono labels for the instrument surface

The page should not drift into generic SaaS orchestration. It should feel like
using a small instrument for thinking about agent loops.

## Known Tradeoffs

- The patchbay is not a fully general graph editor. Archetype presets plus
  visible module activation were chosen for clarity and implementation
  reliability.
- Metrics are teaching signals, not measured values. Labels and autopsies do
  the semantic work; percentages are there to make topology differences visible.
- The post uses one large self-contained file. That keeps post-local behavior
  easy to move and avoids shared abstractions, but future expansion may justify
  splitting data or components beside `index.jsx`.
- The home page still has the known mobile card-width sharp edge from the
  existing project notes; this post did not address shared home layout.

## Verification Performed

- `npm run build` passed after adding the post and registry entry.
- Build still emits the known stale `baseline-browser-mapping` and Browserslist
  warnings.

Browser verification should still be performed with the available
`agent-browser` skill before calling the full goal complete:

- home card links to `/loopwright`
- Prompt Mode run works
- Loop Mode run works
- scenario switching changes trace/copy
- archetype switching changes metrics/autopsy/modules
- desktop layout has no overlaps
- mobile layout has no horizontal overflow

## Future Expansion Ideas

- Let users toggle individual modules inside an archetype and preview why a
  topology is invalid or risky.
- Add a small "evidence bundle" drawer that explains what each check proves and
  does not prove.
- Add a mini-game around Break Favorite Frame where the reader chooses the
  rival hypothesis.
- Make the final trace exportable as a small Loop Contract receipt.
- Build a sibling post about active artifacts hosting resident loops.
