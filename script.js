// script.js
const GAS_URL = 'https://script.google.com/macros/s/AKfycby8fvmzbfpwWZqsFsoY1YX6c7ZcYIDdGJNTtANRCWrAMd6ZcKIVBF6PRhNsF5_EYWeUmg/exec';

async function loadDiagnoses() {
  try {
    const res = await fetch(`${GAS_URL}?action=getDiagnosisList`);
    const list = await res.json();
    const sel = document.getElementById('diagnosis');
    list.forEach(d => {
      const o = document.createElement('option');
      o.value = d; o.textContent = d;
      sel.appendChild(o);
    });
  } catch (e) {
    console.error('Failed to load diagnoses', e);
  }
}

async function calculate() {
  const payload = {
    action: 'calculateAntibiotic',
    ageUnit: document.getElementById('ageUnit').value,
    age: parseFloat(document.getElementById('age').value),
    weight: parseFloat(document.getElementById('weight').value),
    diagnosis: document.getElementById('diagnosis').value
  };
  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const out = await res.json();
    document.getElementById('result').innerHTML = out.join('<br><br>');
  } catch (e) {
    console.error('Calculation error', e);
  }
}

document.getElementById('calcBtn').addEventListener('click', calculate);
loadDiagnoses();
