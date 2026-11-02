const KEY = 'mother-goose-passed-v1';
const rhymes = window.RHYMES;
let passed = new Set();
let storageOK = true;
try { const saved = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(saved)) passed = new Set(saved.filter(id => rhymes.some(r => r.id === id))); } catch { storageOK = false; }
let filter = 'all';
const list = document.querySelector('#rhymes');
for (const [i,rhyme] of rhymes.entries()) {
  const row = document.createElement('article'); row.className = 'rhyme-row'; row.dataset.id = rhyme.id;
  const check = document.createElement('input'); check.type = 'checkbox'; check.className = 'pass-check'; check.id = `pass-${rhyme.id}`; check.checked = passed.has(rhyme.id); check.setAttribute('aria-label', `Mark ${rhyme.title} as passed`);
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const number = document.createElement('span'); number.className = 'number'; number.textContent = String(i+1).padStart(2,'0');
  const icon = document.createElement('span'); icon.className = 'rhyme-icon'; icon.textContent = rhyme.icon; icon.setAttribute('aria-hidden','true');
  const title = document.createElement('span'); title.className = 'rhyme-title'; title.textContent = rhyme.title;
  const badge = document.createElement('span'); badge.className = 'passed-badge'; badge.textContent = 'Passed';
  const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = '+'; arrow.setAttribute('aria-hidden','true');
  summary.append(number,icon,title,badge,arrow);
  const verse = document.createElement('div'); verse.className = 'verse';
  const text = document.createElement('p'); text.textContent = rhyme.text; verse.append(text);
  if(rhyme.note) { const note = document.createElement('small'); note.className = 'verse-note'; note.textContent = rhyme.note; verse.append(note); }
  const label = document.createElement('label'); label.htmlFor = check.id; label.className = 'pass-label'; label.textContent = 'I can say this from memory — mark as passed'; verse.append(label);
  details.append(summary,verse); row.append(check,details); list.append(row);
  check.addEventListener('change',()=>{check.checked ? passed.add(rhyme.id) : passed.delete(rhyme.id); save(); update(); document.querySelector('#status').textContent = `${rhyme.title} ${check.checked?'passed':'marked still learning'}. ${passed.size} of 18 passed.`;});
  details.addEventListener('toggle',updateExpand);
}
function save(){ try{localStorage.setItem(KEY,JSON.stringify([...passed]));}catch{storageOK=false;} }
function update(){
  const query=document.querySelector('#search').value.trim().toLowerCase(); let visible=0;
  for(const row of list.children){ const done=passed.has(row.dataset.id); const rhyme=rhymes.find(r=>r.id===row.dataset.id); row.classList.toggle('passed',done); row.querySelector('input').checked=done; row.hidden=!(rhyme.title.toLowerCase().includes(query)&&(filter==='all'||(filter==='passed'?done:!done))); if(!row.hidden)visible++; }
  document.querySelector('#empty').hidden=visible>0;
  document.querySelector('#count').textContent=`${passed.size} / 18`;
  document.querySelector('#passed-count').textContent=passed.size;
  document.querySelector('#progress').value=passed.size;
  document.querySelector('#progress-label').textContent=!storageOK?'Progress cannot be saved in this browser. Keep this page open to retain it.':passed.size===18?'All rhymes learned. Your adventure awaits!':passed.size===0?'Every rhyme is a little step closer.':`${18-passed.size} more ${18-passed.size===1?'rhyme':'rhymes'} until your adventure. Keep going!`;
  document.querySelector('#celebration').hidden=passed.size!==18; updateExpand();
}
function updateExpand(){const rows=[...list.children].filter(r=>!r.hidden); document.querySelector('#expand').textContent=rows.length&&rows.every(r=>r.querySelector('details').open)?'Collapse all −':'Expand all ↗';}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false');});update();}));
document.querySelector('#search').addEventListener('input',update);
document.querySelector('#expand').addEventListener('click',()=>{const rows=[...list.children].filter(r=>!r.hidden);const open=!rows.every(r=>r.querySelector('details').open);rows.forEach(r=>r.querySelector('details').open=open);updateExpand();});
const dialog=document.querySelector('#reset-dialog');
document.querySelector('#reset').addEventListener('click',()=>dialog.showModal());
document.querySelector('#cancel-reset').addEventListener('click',()=>dialog.close());
document.querySelector('#confirm-reset').addEventListener('click',()=>{passed.clear();save();update();dialog.close();document.querySelector('#status').textContent='Progress reset. Ready for a new adventure.';});
window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null){try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');passed=new Set(Array.isArray(data)?data.filter(id=>rhymes.some(r=>r.id===id)):[]);update();}catch{}}});
update();
