import { hydrate, mount } from 'svelte';
import Page from './routes/kb/incidents/4471-reassessment/+page.svx';
const target = document.getElementById('app');
if (target.querySelector('.kb')) hydrate(Page, { target });
else mount(Page, { target });
