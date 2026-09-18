import { scenario } from './data.js';

const app = document.querySelector('#app');
const routes = ['mission','living','rooms','ambient'];
let route = location.hash.replace('#/','') || 'mission';
if(!routes.includes(route)) route='mission';

const nav = [
  ['mission','Mission Control'],
  ['living','Living Organization'],
  ['rooms','AI Company / Rooms'],
  ['ambient','Ambient']
];

function shell(content){
  app.innerHTML = `
  <div class="shell">
    <header class="topbar">
      <div class="brand"><span class="brand-dot"></span> Self-Driving Organization</div>
      <div class="nav">
        ${nav.map(([id,label])=>`<button data-route="${id}" class="${route===id?'active':''}">${label}</button>`).join('')}
      </div>
    </header>
    <main>${content}</main>
  </div>`;
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{location.hash='#/'+b.dataset.route});
}

function metric(label,value,target,status='good'){
  return `<div class="card metric"><div class="eyebrow">${label}</div><strong class="${status}">${value}</strong><div class="muted small">Target: ${target}</div></div>`;
}

function mission(){
  shell(`
    <section class="hero">
      <div><div class="eyebrow">Variant A · Mission Control</div><h1>${scenario.mission}</h1><p class="lede">The mission is the primary object. The user sees the gap between current and desired reality, what changed, and where judgment is required. Agents stay below the surface unless inspected.</p></div>
      <div class="badge">Northstar Games · Autonomous mission</div>
    </section>
    <section class="grid">
      ${metric('D7 retention',scenario.state.retention7d+'%',scenario.state.targetRetention7d+'%','warn')}
      ${metric('CPI','€'+scenario.state.cpi,'≤ €'+scenario.state.targetCpi,'good')}
      ${metric('Player sentiment',scenario.state.sentiment+'/5',scenario.state.targetSentiment+'/5','warn')}
      ${metric('Launch cadence',scenario.state.launchCadence,'1 / quarter','good')}
      <div class="card wide"><h3>What n8n is changing</h3>
        ${scenario.interventions.map(i=>`<div class="item"><div class="item-title"><strong>${i.title}</strong><span class="chip">${i.status}</span></div><div class="muted">${i.impact} · confidence ${i.confidence.toLowerCase()}</div></div>`).join('')}
      </div>
      <div class="card side"><h3>Needs you</h3><p><strong>Approve pricing experiment</strong></p><p class="muted">Expected payer conversion +6–9%. Reversible. Exposure capped at 5% of returning players.</p><button class="action">Review decision</button></div>
      <div class="card full"><h3>Outcome evidence</h3><p class="muted">The system reports changes in metrics after interventions, not just completed tasks.</p><div class="flow"><div class="node">Before<br><strong>26.3% D7</strong></div><div class="arrow">→</div><div class="node">Onboarding changed</div><div class="arrow">→</div><div class="node">After<br><strong class="good">28.4% D7</strong></div></div></div>
    </section>
  `);
}

function living(){
  shell(`
    <section class="hero"><div><div class="eyebrow">Variant B · Living Organization</div><h1>The company as a causal system</h1><p class="lede">The interface shows how signals, constraints, and consequences move through the business. Generated agents or workflows appear only when the user asks how the system is intervening.</p></div><div class="badge">View: health + causal movement</div></section>
    <section class="grid">
      <div class="card full">
        <div class="flow">
          ${scenario.causal.map((n,i)=>`<div class="node"><div class="eyebrow">Signal ${i+1}</div><strong>${n}</strong></div>${i<scenario.causal.length-1?'<div class="arrow">→</div>':''}`).join('')}
        </div>
      </div>
      <div class="card half"><h3>System hypothesis</h3><p class="transcript">Tutorial drop-off is the strongest current predictor of 48h churn. n8n is testing a shorter first-session path before changing acquisition strategy.</p><div class="progress"><i style="width:68%"></i></div><div class="muted small">68% confidence · based on 18,402 sessions</div></div>
      <div class="card half"><h3>Intervention in motion</h3><div class="item"><strong>Shortened tutorial</strong><div class="muted">Testing on 20% of new players</div></div><div class="item"><strong>Execution underneath</strong><div class="muted">Analytics workflow + experiment service + QA agent + release automation</div></div></div>
      <div class="card full"><h3>What the organization learned</h3>${scenario.learnings.map(x=>`<div class="item">${x}</div>`).join('')}</div>
    </section>
  `);
}

function rooms(){
  shell(`
    <section class="hero"><div><div class="eyebrow">Variant C · AI Company / Rooms</div><h1>Walk into the organization</h1><p class="lede">Responsibilities become spaces. Virtual specialists report back with compressed updates by voice or text, then reveal evidence and execution only when interrupted.</p></div><div class="badge">Mode: morning leadership briefing</div></section>
    <div class="room-grid">
      <div class="room" data-room="growth"><div><div class="avatar">G</div><h3>Growth</h3><p class="muted">Acquisition + monetization</p></div><span class="chip">1 decision</span></div>
      <div class="room" data-room="product"><div><div class="avatar">P</div><h3>Product</h3><p class="muted">Retention + player experience</p></div><span class="chip">Experiment running</span></div>
      <div class="room" data-room="market"><div><div class="avatar">M</div><h3>Market</h3><p class="muted">Competitors + opportunity sensing</p></div><span class="chip">No action needed</span></div>
    </div>
    <div class="card" id="briefing" style="margin-top:16px">
      <div class="eyebrow">Virtual report</div>
      <p class="transcript">“Since yesterday, we tested two onboarding changes. One improved completion but reduced store visits, so we rolled it back. The shorter tutorial is still running and D7 retention is up 2.1 points in the exposed cohort. One pricing experiment needs your approval.”</p>
      <button class="action" id="why">Ask: Why did you roll it back?</button>
      <div id="answer"></div>
    </div>
  `);
  document.querySelector('#why').onclick=()=>document.querySelector('#answer').innerHTML=`<div class="item"><strong>Evidence</strong><div class="muted">Store visits fell 11% with no retention gain. The system reverted after crossing the experiment's stop-loss rule.</div></div>`;
}

function ambient(){
  shell(`
    <section class="ambient">
      <div class="ambient-panel">
        <div class="eyebrow">Variant D · Ambient / zero-interface</div>
        <h1>No dashboard unless something matters</h1>
        <p class="lede">n8n stays out of the way until reality diverges from the desired state, authority is missing, or a consequential trade-off appears.</p>
        <div class="bubble">Player retention is improving, but payer conversion dropped after the onboarding change. I can keep the experiment running for 24 hours to gather stronger evidence, or revert now. Expected revenue difference: €21k this quarter. Which trade-off do you prefer?</div>
        <div class="flow" style="justify-content:center"><button class="action">Keep running</button><button class="action">Revert now</button><button class="action">Show me the evidence</button></div>
        <div class="footer-note">The interface is generated around the decision, then disappears again.</div>
      </div>
    </section>
  `);
}

function render(){ route = location.hash.replace('#/','') || 'mission'; ({mission,living,rooms,ambient}[route]||mission)(); }
window.addEventListener('hashchange',render);
render();
