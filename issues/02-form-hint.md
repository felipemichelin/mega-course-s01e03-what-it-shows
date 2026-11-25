# Booking-v3 date hint contradicts day-first tenant parsing — 33 reports

## Engineering disposition — not planned

The live course desk update, read on 25 November 2026, reports `#4471 · closed 05 oct` and `hint WON'T FIX booking-v3 form retired`. This issue is closed as not planned because its form was retired. This is not a claim that the hint was fixed.

Source: https://hq.mega.dev/challenges/what-it-shows#engineering-update.

## Scope and count

Reports: **33 unique form-channel reports**, across **3 tenants**, first seen **2026-04-17**, last seen **2026-09-22** in the supplied export. They were merged into #4471 but need a separate issue from the shared parser. The live desk can have changed since export.

`scripts/analyze.mjs` deduplicates report IDs and uses the supplied tenant-aware classifier. `evidence/analysis.json` lists every source report ID. Browser intake tagged 15 of these reports `parser` and 18 `hint`; the tags do not define the cause.

## Problem and evidence

`DATE_HINT` in `src/lib/kb/causes.ts` gives booking-v3 the hint `MM/DD/YYYY`. A day-first tenant's users type what the hint instructs, while the form reads the date in the tenant's order. Following the displayed instruction can therefore produce a wrong date. This requires fixing the hint and the form's input contract together; changing only the shared parser does not address the contradictory instruction.

## Reproduce and verify

1. Select a tenant whose locale is day first and whose form is booking-v3.
2. Open its form and confirm the displayed month-first hint.
3. Enter an ambiguous month-first date according to that hint.
4. Check whether the form reads it day first and swaps the intended day and month.

This is a proposed reproduction from the exported KB logic, not a production test. No fix is claimed shipped.

## Acceptance criteria

- Booking-v3's date hint agrees with the accepted input contract for each supported tenant locale.
- Regression checks cover a day-first booking-v3 tenant and an unaffected comparison path.
- Each affected report remains traceable to this issue by its ID, without double-counting export overlaps.
- Counts are refreshed from a current desk export before closing the issue.

Source: `src/lib/kb/causes.ts`, `src/lib/kb/locales.ts`, `src/lib/data/reports-4471.json`, `src/lib/data/tenants/`.

## Source report IDs

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584
