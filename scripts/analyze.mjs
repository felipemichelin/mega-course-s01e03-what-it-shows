import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { uniqueById, groupByCause } from '../src/lib/kb/causes.ts';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const rows = read('../src/lib/data/reports-4471.json');
const tenants = new Map(readdirSync(new URL('../src/lib/data/tenants/', import.meta.url))
  .map(file => read('../src/lib/data/tenants/' + file)).map(tenant => [tenant.handle, tenant]));
const unique = uniqueById(rows);
const merged = unique.filter(report => report.mergedInto === 4471);
const notes = read('../src/lib/data/desk-notes.json');
const groups = groupByCause(merged, report => tenants.get(report.tenant));
const result = {
  source: 'Archived course KB export, exported 2026-10-04; not a live queue snapshot',
  rawRows: rows.length, uniqueReports: unique.length, duplicateRowsRemoved: rows.length - unique.length,
  mergedReports: merged.length,
  groups: groups.map(group => ({
    cause: group.cause, count: group.reports.length, tenants: group.tenants,
    firstSeen: group.firstSeen, lastSeen: group.lastSeen, intakeTags: group.taggedAs,
    reports: group.reports.map(report => report.id),
    oneDayMove: group.reports.filter(report => notes.oneDayMove.includes(report.id)).map(report => report.id)
  }))
};
if (result.groups.reduce((sum, group) => sum + group.count, 0) !== merged.length) throw Error('Counts do not reconcile');
if (new Set(result.groups.flatMap(group => group.reports)).size !== merged.length) throw Error('Groups overlap');
mkdirSync(new URL('../evidence/', import.meta.url), { recursive: true });
writeFileSync(new URL('../evidence/analysis.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, groups: result.groups.map(({ reports, ...group }) => group) }, null, 2));
