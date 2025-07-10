// JSONP-based loader
const GAS_URL = 'https://script.google.com/macros/s/AKfycby8fvmzbfpwWZqsFsoY1YX6c7ZcYIDdGJNTtANRCWrAMd6ZcKIVBF6PRhNsF5_EYWeUmg/exec';

function loadDiagnoses() {
  // global callback
  window.handleDiag = function(list) {
    const sel = document.getElementById('diagnosis');
    list.forEach(d => sel.add(new Option(d, d)));
  };
  const s = document.createElement('script');
  s.src = `${GAS_URL}?action=getDiagnosisList&callback=handleDiag`;
  document.body.appendChild(s);
}

function calculate() {
  window.handleCalc = function(results) {
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

  const query = Object.entries(params)
    .map(([k,v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  const s = document.createElement('script');
  s.src = `${GAS_URL}?${query}`;
  document.body.appendChild(s);
}

document.getElementById('calcBtn').addEventListener('click', calculate);
loadDiagnoses();
