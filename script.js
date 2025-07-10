// JSONP PWA frontend
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzhUcJoJnwmQTBXhO_00ylxCO0pMkY4gNBQJhx-rXN6t7x-4N7hYV9Q1xOQsWNZI0GBuQ/exec';

function loadDiagnoses() {
  window.handleDiag = diagnoses => {
    const sel = document.getElementById('diagnosis');
    diagnoses.forEach(d => sel.add(new Option(d, d)));
  };
  const s = document.createElement('script');
  s.src = `${GAS_URL}?action=getDiagnosisList&callback=handleDiag`;
  document.body.appendChild(s);
}

function calculate() {
  window.handleCalc = results => {
    document.getElementById('result').innerHTML = results.join('<br><br>');
  };

  const params = {
    action:    'calculateAntibiotic',
    ageUnit:   document.getElementById('ageUnit').value,
    age:       document.getElementById('age').value,
    weight:    document.getElementById('weight').value,
    diagnosis: document.getElementById('diagnosis').value,
    callback:  'handleCalc'
  };

  const qs = Object.entries(params)
    .map(([k,v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  const s = document.createElement('script');
  s.src = `${GAS_URL}?${qs}`;
  document.body.appendChild(s);
}

document.getElementById('calcBtn').addEventListener('click', calculate);
loadDiagnoses();
