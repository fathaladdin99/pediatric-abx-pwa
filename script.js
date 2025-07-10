// script.js

// ← your JSONP-enabled Web App endpoint
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzhUcJoJnwmQTBXhO_00ylxCO0pMkY4gNBQJhx-rXN6t7x-4N7hYV9Q1xOQsWNZI0GBuQ/exec';

/**
 * Load the diagnosis list via JSONP
 */
function loadDiagnoses() {
  // JSONP callback
  window.handleDiag = function(diagnoses) {
    const sel = document.getElementById('diagnosis');
    diagnoses.forEach(d => {
      const opt = new Option(d, d);
      sel.appendChild(opt);
    });
  };
  
  // Inject <script> tag to fetch JSONP
  const tag = document.createElement('script');
  tag.src = `${GAS_URL}?action=getDiagnosisList&callback=handleDiag`;
  document.body.appendChild(tag);
}

/**
 * Request calculation via JSONP
 */
function calculate() {
  // JSONP callback
  window.handleCalc = function(results) {
    const container = document.getElementById('result');
    container.innerHTML = results.join('<br><br>');
  };
  
  // Build query params
  const params = {
    action:    'calculateAntibiotic',
    ageUnit:   document.getElementById('ageUnit').value,
    age:       document.getElementById('age').value,
    weight:    document.getElementById('weight').value,
    diagnosis: document.getElementById('diagnosis').value,
    callback:  'handleCalc'
  };
  
  const qs = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  
  // Inject <script> tag to fetch JSONP
  const tag = document.createElement('script');
  tag.src = `${GAS_URL}?${qs}`;
  document.body.appendChild(tag);
}

// Wire up the button and initialize
document.getElementById('calcBtn').addEventListener('click', calculate);
window.addEventListener('load', loadDiagnoses);
