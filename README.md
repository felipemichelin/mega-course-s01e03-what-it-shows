# kb — the support knowledge base

## MEGA S01E03 course implementation

This dedicated course repository contains the supplied fictional support-KB export, a signed
reassessment of #4471, and a proposed replacement triage decision. It contains no production
service implementation or real customer queue.

- Reassessment source: `src/routes/kb/incidents/4471-reassessment/+page.svx`
- Self-contained rendered page: `rendered-page.html` (download and open locally)
- Proposed decision: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`
- Issue drafts and report IDs: `issues/`
- Reproducible export analysis: `evidence/analysis.json`

GitHub tickets:

- [Shared parser: 379 reports](https://github.com/felipemichelin/mega-course-s01e03-what-it-shows/issues/1)
- [Booking-v3 hint: 33 reports](https://github.com/felipemichelin/mega-course-s01e03-what-it-shows/issues/2)

The live course desk subsequently reported the parser fixed and booking-v3 retired. The parser
issue is closed as completed; the hint issue is closed as not planned. The KB page records
that distinction and attributes the dispositions to engineering rather than claiming a local fix.

Use Node 24 or later: `npm ci`, `npm run analyze`, then `npm run build`.
The local preview is `npm run preview`. Builds execute the original Svelte KB components;
the static rendered page includes its CSS and needs no external requests.

The export has 427 rows and 412 unique report IDs: 379 parser reports and 33 booking-v3
hint reports. Five uncertain symptom reports remain visible for follow-up. These are export
counts, not asserted live totals. The accepted decision 0001 remains unchanged.

The course-issued frontmatter signature is provenance required by this exercise. It is not
a model-provider API key. No other course tickets, receipts, private logs or HQ files belong
in this repository. The course has not yet accepted this submission.

---

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
