const fs = require('fs');
const path = require('path');
const root = process.argv[2] || 'public';

function patchFile(name, replacements) {
  const file = path.join(root, name);
  let source = fs.readFileSync(file, 'utf8');
  for (const [before, after] of replacements) {
    if (!source.includes(before)) {
      throw new Error(`Expected text was not found in ${name}: ${before.slice(0, 90)}`);
    }
    source = source.replaceAll(before, after);
  }
  fs.writeFileSync(file, source);
}

patchFile('app.js', [
  ['A gentler beginning', 'The first light of a gentler tomorrow'],
  ['A safe space to be heard.', 'Understanding, compassion, acceptance, and hope.'],
  ['Hope begins here.', 'Your Journey Matters.'],
  ['A little about us', 'About Liwayway'],
  ['Room for hope to begin.', 'The first light of a gentler tomorrow.'],
  ['Every step, at your pace.', 'Liwayway Services'],
  ['Connection makes room for light.', 'Shared Liwayway'],
  ['A first step', 'Liwayway Services'],
  ['A little light, a place to begin.', 'The first light of a gentler tomorrow.'],
  ['The values that shape the way Liwayway hopes to support every individual.', 'Love and Compassion · Inclusivity · Well-being · Acceptance · Yearning for Growth · Warmth · Awareness · Your Journey Matters'],
  ['The people and institution.', 'Behind Liwayway'],
  ['A journey in three moments.', 'Liwayway Services'],
  ['A community built on connection.', 'Shared Liwayway'],
  ['Ways to take part.', 'Community Initiatives'],
  ['Get in touch.', 'Liwayway Contacts'],
  ['Liwanag is the main counseling session', 'Liwayway is the main counseling session'],
  ['In progress', 'Progress'],
  ['We are here to help you navigate.', 'Still have questions? Contact us, and Liwayway will be happy to assist you.'],
  ['connect individuals with proper guidance and support.</p></article>', "connect individuals with proper guidance and support. Through understanding, compassion, and accessible mental health resources, we strive to remind everyone that they are never alone in facing life's challenges.</p></article>"],
  ['empowered to prioritize their mental well-being.</p></article>', 'empowered to prioritize their mental well-being. Liwayway hopes to become a source of hope and encouragement, helping individuals find strength, healing, and light even during their darkest moments.</p></article>'],
  ['card green', 'card feature'],
  ['<p>Names and selected details remain as placeholders where the supplied content has not provided them.</p>', ''],
  ['<h2>Support for accessible care.</h2>', '<h2>Sponsors and Partners</h2>'],
  ['A community where mental health is valued.', 'A community where mental health is valued, understood, and accepted.']
]);

patchFile('styles.css', [
  ["https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=DM+Sans:wght@400;500;600;700&display=swap", "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap"],
  ["--green:#596d52;--serif:'Bodoni Moda',Georgia,serif;--sans:'DM Sans',Arial,sans-serif", "--serif:'Fraunces',Georgia,serif;--sans:'Karla',Arial,sans-serif"],
  ['.art-note.two{right:0;bottom:17%;background:var(--green);color:#fff6e7}', '.art-note.two{right:0;bottom:17%;background:var(--coral);color:var(--ink)}'],
  ['.card.green{background:#e2e8d9;border-color:#cdd9c1}', '.card.feature{background:#fae8a7;border-color:#f2dc8e}'],
  ['.status{display:inline-block;padding:5px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#e3e8da;color:#4e6348}', '.status{display:inline-block;padding:5px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#fff6e7;color:#59412d;border:1px solid #e9d9c7}'],
  ['.value{padding:17px 18px;border-radius:14px;background:#f9edda;border:1px solid #f0dfc6}', '.value{padding:17px 18px;border-radius:14px;background:#fff6e7;border:1px solid #e9d9c7}']
]);

const fsCheck = require('child_process');
fsCheck.execFileSync(process.execPath, ['--check', path.join(root, 'app.js')]);
console.log('Liwayway copy, palette, typography, and JavaScript syntax checks passed.');


// Liwayway forms and status cleanup
const appPath = path.join(root, 'app.js');
let appSource = fs.readFileSync(appPath, 'utf8');
appSource = appSource.replaceAll('/services.html#forms', '/forms.html');
appSource = appSource.replace("['Services','/services.html','services'],['Community'", "['Services','/services.html','services'],['Forms','/forms.html','forms'],['Community'");
appSource = appSource.replace(/<span class="status(?: [^"]*)?">[^<]*<\/span>/g, '');
fs.writeFileSync(appPath, appSource);

fs.appendFileSync(path.join(root, 'styles.css'), "\n.forms-page{min-height:70vh;background:var(--cream)}\n.forms-hero{padding:64px 0 48px;background:linear-gradient(120deg,#fae8a7,#f6c18d 58%,#f7d0c8)}\n.forms-shell{max-width:900px;margin:0 auto;padding:0 28px}\n.forms-hero h1{font-size:clamp(44px,6vw,70px);margin:10px 0 18px}\n.forms-hero p{max-width:720px;color:#624c3d;font-size:16px}\n.forms-content{padding-top:48px;padding-bottom:80px}\n.forms-intro{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:30px}\n.forms-intro h2{font-size:clamp(34px,4vw,48px);margin:8px 0 0}\n.forms-intro p{max-width:320px;margin:0}\n.form-progress{background:#fffaf2;border:1px solid var(--line);border-radius:18px;padding:22px 24px;margin-bottom:22px}\n.progress-top{display:flex;justify-content:space-between;gap:15px;font-weight:700;font-size:12px;color:#59412d}\n.progress-bars{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0 9px}\n.progress-bars span{height:7px;border-radius:99px;background:#eee3d6}\n.progress-bars span.is-active{background:var(--orange)}\n.progress-labels{display:flex;justify-content:space-between;gap:8px;color:#8a7a6d;font-size:10px}\n.form-step{display:none}\n.form-step.is-active{display:block}\n.form-card{background:#fffaf2;border:1px solid var(--line);border-radius:22px;padding:32px;box-shadow:var(--shadow)}\n.form-card-head{padding-bottom:22px;border-bottom:1px solid var(--line);margin-bottom:24px}\n.form-card-head h2{font-size:clamp(30px,4vw,42px);margin:7px 0 8px}\n.form-card-head p{margin:0}\n.form-section-title{font:600 21px var(--serif);padding:16px 0 10px;border-bottom:1px solid var(--line);margin:14px 0 18px}\n.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}\n.form-field{display:flex;flex-direction:column;gap:7px;margin:0 0 18px;font-size:13px;font-weight:700;color:var(--ink)}\n.form-field i{color:#bd6843;font-style:normal}\n.form-field input,.form-field select,.form-field textarea,.form-question select{width:100%;border:1px solid #dfd3c5;border-radius:10px;background:#fff;color:var(--ink);padding:13px 14px;font:500 14px var(--sans);outline:none;transition:border .2s,box-shadow .2s}\n.form-field input:focus,.form-field select:focus,.form-field textarea:focus,.form-question select:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(238,139,61,.16)}\n.form-field input::placeholder,.form-field textarea::placeholder{color:#a99c90}\n.form-field small,.field-hint{font-size:12px;font-weight:400;color:#8b7c70;margin:0}\n.form-wide{margin-top:12px}\n.form-question{border:0;border-bottom:1px solid var(--line);padding:20px 0 22px;margin:0;min-width:0}\n.form-question legend{display:flex;align-items:flex-start;gap:12px;padding:0 0 14px;font:600 19px/1.35 var(--serif);color:var(--ink);max-width:100%}\n.question-number{display:grid;place-items:center;flex:0 0 32px;height:32px;border-radius:50%;background:#fae8a7;color:#79542e;font:700 11px var(--sans)}\n.form-choices{display:grid;grid-template-columns:1fr 1fr;gap:9px}\n.form-choice{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border:1px solid #e8ded2;border-radius:11px;background:#fff;cursor:pointer;font-size:13px;line-height:1.45;color:#574a41}\n.form-choice:has(input:checked){border-color:var(--orange);background:#fff4e7}\n.form-choice input{accent-color:#d87d3d;margin:3px 0 0;flex:0 0 auto}\n.form-consent{margin:12px 0;background:#fff}\n.form-copy{font-size:13px}\n.form-copy a,.form-back-link a{color:#ad5c36;text-decoration:underline;text-underline-offset:3px;font-weight:700}\n.form-note{font:500 18px var(--serif);color:#9b603e;margin:18px 0 0}\n.form-actions{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:20px 0 0}\n.form-actions .btn{min-height:46px}\n.form-preview-note{display:none;margin:20px 0 0;padding:16px 18px;border:1px solid #e8c68d;border-radius:12px;background:#fff4df;color:#735334;font-size:13px}\n.form-preview-note.is-visible{display:block}\n.form-back-link{margin:22px 0 0;font-size:13px}\n@media(max-width:700px){.forms-shell{padding:0 18px}.forms-hero{padding:48px 0 36px}.forms-content{padding-top:32px}.forms-intro{display:block}.forms-intro p{margin-top:12px}.form-card{padding:22px 17px}.form-grid,.form-choices{grid-template-columns:1fr}.progress-labels{font-size:9px}.form-actions{align-items:stretch}.form-actions .btn{padding:12px 15px;font-size:10px}}\n");
fs.writeFileSync(path.join(root, 'forms-page.js'), "(function () {\n  if (!/forms\\.html$/.test(location.pathname)) return;\n\n  var root = document.getElementById('site');\n  if (!root || typeof header === 'undefined' || typeof footer === 'undefined') return;\n\n  var radio = function (name, values, required) {\n    return '<div class=\"form-choices\">' + values.map(function (value, index) {\n      return '<label class=\"form-choice\"><input type=\"radio\" name=\"' + name + '\" value=\"' + value + '\"' + (required && index === 0 ? ' required' : '') + '><span>' + value + '</span></label>';\n    }).join('') + '</div>';\n  };\n  var checks = function (name, values) {\n    return '<div class=\"form-choices\">' + values.map(function (value) {\n      return '<label class=\"form-choice\"><input type=\"checkbox\" name=\"' + name + '\" value=\"' + value + '\"><span>' + value + '</span></label>';\n    }).join('') + '</div>';\n  };\n  var question = function (number, title, content, hint) {\n    return '<fieldset class=\"form-question\"><legend><span class=\"question-number\">' + number + '</span>' + title + '</legend>' + (hint ? '<p class=\"field-hint\">' + hint + '</p>' : '') + content + '</fieldset>';\n  };\n  var field = function (label, name, type, required, placeholder, hint) {\n    return '<label class=\"form-field\"><span>' + label + (required ? ' <i>*</i>' : '') + '</span><input type=\"' + type + '\" name=\"' + name + '\" ' + (required ? 'required ' : '') + 'placeholder=\"' + (placeholder || '') + '\">' + (hint ? '<small>' + hint + '</small>' : '') + '</label>';\n  };\n\n  var page = '<main class=\"forms-page\">' +\n    '<section class=\"forms-hero\"><div class=\"forms-shell\"><div class=\"eyebrow\">Bukang Liwayway · Before the light session</div><h1 class=\"serif\">Begin My Light Session</h1><p>Bukang Liwayway is your first step before counseling. Complete an initial assessment and emotional check-in to help your Therapist understand your current feelings, personal concerns, and the kind of support you need.</p></div></section>' +\n    '<section class=\"forms-shell forms-content\"><div class=\"forms-intro\"><div><div class=\"eyebrow\">Your first steps</div><h2>One step at a time.</h2></div><p>Complete the registration, initial assessment, and appointment form in order.</p></div>' +\n    '<div class=\"form-progress\"><div class=\"progress-top\"><span id=\"step-count\">Step 1 of 3</span><span id=\"step-name\">Registration</span></div><div class=\"progress-bars\"><span class=\"is-active\"></span><span></span><span></span></div><div class=\"progress-labels\"><span>Registration</span><span>Initial assessment</span><span>Appointment</span></div></div>' +\n    '<form id=\"bukang-form\" novalidate>' +\n    '<section class=\"form-step is-active\" data-step=\"0\"><div class=\"form-card\"><div class=\"form-card-head\"><span class=\"eyebrow\">Step 1</span><h2>Registration Form</h2><p>Fill in your basic information to create an account.</p></div><div class=\"form-section-title\">Your information</div><div class=\"form-grid\">' +\n    field('Full name','fullName','text',true,'Enter your full name','') +\n    field('School email address','schoolEmail','email',true,'name@school.edu','') +\n    field('Password','password','password',true,'Create a password','') +\n    field('Confirm password','confirmPassword','password',true,'Re-enter your password','') +\n    '</div><div class=\"form-section-title\">Privacy Notice &amp; Informed Consent</div><p class=\"form-copy\">Please review the <a href=\"/resources.html\">Privacy Notice &amp; Informed Consent</a> before proceeding.</p><label class=\"form-choice form-consent\"><input type=\"checkbox\" name=\"acknowledgment\" required><span>By proceeding, you acknowledge that you have read and understood this Privacy Notice and that you voluntarily agree to provide the information necessary for the intended service.</span></label><p class=\"form-note\">Your privacy matters. Your journey begins with understanding.</p></div><div class=\"form-actions\"><span></span><button class=\"btn orange\" type=\"button\" data-next>Continue to assessment <b>→</b></button></div></section>' +\n\n    '<section class=\"form-step\" data-step=\"1\"><div class=\"form-card\"><div class=\"form-card-head\"><span class=\"eyebrow\">Step 2</span><h2>Initial Assessment &amp; Emotional Check-in</h2><p>Answer a few questions about your feelings, personal concerns, and needs.</p></div>' +\n    question('01','How have you been feeling lately?',radio('feeling',['Mostly happy or content','Calm and emotionally stable','Sometimes stressed or overwhelmed','Frequently sad or anxious','Emotionally exhausted',\\\"Unsure how I’m feeling\\\"],true)) +\n    question('02','How often have you experienced emotional distress recently?',radio('distress',['Never','Rarely','Sometimes','Often','Almost every day'],true)) +\n    question('03','Have you noticed any changes in your daily habits or emotional state?',radio('changes',['Yes, significant changes','Yes, slight changes','No noticeable changes',\\\"I’m not sure\\\"],true)) +\n    question('04','What areas of your life are currently causing you concern?',checks('concerns',['Academic or work-related concerns','Family concerns','Relationship or social concerns','Financial difficulties','Personal expectations or self-esteem','Emotional or mental well-being','Other','Prefer not to say']),'Multiple selections allowed.') +\n    '<label class=\"form-field form-wide\"><span>Would you like to share what has been bothering you recently?</span><textarea name=\"shareConcerns\" rows=\"4\" placeholder=\"Your response is optional.\"></textarea></label>' +\n    question('06','How long have you been experiencing these concerns?',radio('duration',['Less than a week','A few weeks','1–3 months','3–6 months','More than six months','Unsure / Prefer not to say'],true)) +\n    question('07','How have your current concerns affected your daily life?',radio('dailyImpact',['They have not affected my daily activities.','They occasionally affect my concentration or productivity.','They make it difficult to complete some daily responsibilities.','They significantly affect my relationships or daily routine.','They make it difficult for me to manage everyday activities.'],true)) +\n    question('08','How would you rate your ability to manage your emotions lately?',radio('emotionManagement',['Very good','Good','Moderate','Difficult','Very difficult','Unsure'],true)) +\n    question('09','Have you previously consulted a mental health professional?',radio('previousConsultation',['Yes, currently receiving support.','Yes, in the past.','No, this would be my first consultation.','Prefer not to say.'],true)) +\n    question('10','What do you usually do when you’re feeling emotionally overwhelmed?',checks('coping',['Talk to friends or family.','Spend time alone.','Engage in hobbies or recreational activities.','Exercise or participate in physical activities.','Practice relaxation or mindfulness.','Seek professional support.','I usually don’t know how to cope.','Other'])) +\n    '<p class=\"notice\">The initial assessment is not a professional diagnosis.</p></div><div class=\"form-actions\"><button class=\"btn outline\" type=\"button\" data-back>← Back</button><button class=\"btn orange\" type=\"button\" data-next>Continue to appointment <b>→</b></button></div></section>' +\n\n    '<section class=\"form-step\" data-step=\"2\"><div class=\"form-card\"><div class=\"form-card-head\"><span class=\"eyebrow\">Step 3</span><h2>Appointment Form</h2><p>After completing your assessment, select your preferred therapist and session schedule.</p></div><div class=\"form-section-title\">Your details</div><div class=\"form-grid\">' +\n    field('Full name','appointmentName','text',true,'Enter your full name','') +\n    field('School email address (optional)','appointmentEmail','email',false,'Enter your school email address','') +\n    '</div>' +\n    question('01','Preferred Mental Health Professional','<select name=\"professional\" required><option value=\"\">Select your preferred professional</option><option>[Professional Name 1]</option><option>[Professional Name 2]</option><option>[Professional Name 3]</option><option>No preference</option></select>','Select your preferred professional from the available list.') +\n    question('02','Type of Consultation',radio('consultationType',['Initial Consultation','Individual Counseling','Follow-up Consultation','Psychological Assessment'],true)) +\n    '<div class=\"form-grid\">' +\n    field('Preferred appointment date','appointmentDate','date',true,'','') +\n    '</div>' +\n    question('03','Preferred Appointment Time',radio('appointmentTime',['8:00 AM – 10:00 AM','10:00 AM – 12:00 PM','1:00 PM – 3:00 PM','3:00 PM – 5:00 PM'],true),'Select your preferred time slot.') +\n    question('04','Consultation Format',radio('consultationFormat',['Online Consultation','Face-to-Face Consultation'],true)) +\n    question('05','What is the primary reason for your appointment?',radio('appointmentReason',['Stress Management','Anxiety-Related Concerns','Emotional Well-being','Relationship Concerns','Academic or Work-Related Concerns','Personal Development','Other / Not Sure Yet'],true)) +\n    '<label class=\"form-field form-wide\"><span>Additional Notes (Optional)</span><small>Is there anything else you would like us to know before your appointment?</small><textarea name=\"appointmentNotes\" rows=\"4\" placeholder=\"Write any additional notes here.\"></textarea></label>' +\n    '<div class=\"form-section-title\">Agreement and Confirmation</div>' +\n    '<label class=\"form-choice form-consent\"><input type=\"checkbox\" name=\"appointmentPolicy\" required><span>I have read and agree to Liwayway’s appointment policies, including its scheduling, cancellation, and rescheduling guidelines.</span></label>' +\n    '<label class=\"form-choice form-consent\"><input type=\"checkbox\" name=\"appointmentRequest\" required><span>I understand that submitting this form is a request for an appointment and does not automatically confirm my booking.</span></label>' +\n    '</div><div class=\"form-actions\"><button class=\"btn outline\" type=\"button\" data-back>← Back</button><button class=\"btn orange\" type=\"button\" id=\"preview-submit\">Submit Appointment Request <b>→</b></button></div></section>' +\n    '</form><div class=\"form-preview-note\" id=\"form-feedback\" role=\"status\">Preview only: form responses are not sent or saved yet. The secure submission system will be connected in the backend phase.</div>' +\n    '<p class=\"form-back-link\"><a href=\"/services.html\">← Back to Services</a></p></section></main>';\n\n  root.innerHTML = header + page + footer;\n  var menu = document.querySelector('.menu');\n  var navLinks = document.querySelector('.navlinks');\n  if (menu && navLinks) menu.addEventListener('click', function () {\n    var open = navLinks.classList.toggle('open');\n    menu.setAttribute('aria-expanded', String(open));\n    menu.textContent = open ? '×' : '☰';\n  });\n\n  var form = document.getElementById('bukang-form');\n  var panels = Array.prototype.slice.call(form.querySelectorAll('.form-step'));\n  var bars = Array.prototype.slice.call(document.querySelectorAll('.progress-bars span'));\n  var count = document.getElementById('step-count');\n  var name = document.getElementById('step-name');\n  var labels = ['Registration','Initial assessment','Appointment'];\n  var active = 0;\n\n  function showStep(index) {\n    active = index;\n    panels.forEach(function (panel, i) { panel.classList.toggle('is-active', i === active); });\n    bars.forEach(function (bar, i) { bar.classList.toggle('is-active', i <= active); });\n    count.textContent = 'Step ' + (active + 1) + ' of 3';\n    name.textContent = labels[active];\n    window.scrollTo({ top: document.querySelector('.forms-content').offsetTop - 80, behavior: 'smooth' });\n  }\n  function validatePanel() {\n    var panel = panels[active];\n    var inputs = Array.prototype.slice.call(panel.querySelectorAll('input, select, textarea'));\n    for (var i = 0; i < inputs.length; i++) {\n      if (!inputs[i].checkValidity()) {\n        inputs[i].reportValidity();\n        return false;\n      }\n    }\n    if (active === 0) {\n      var pass = panel.querySelector('[name=\"password\"]').value;\n      var confirm = panel.querySelector('[name=\"confirmPassword\"]').value;\n      if (pass !== confirm) {\n        panel.querySelector('[name=\"confirmPassword\"]').setCustomValidity('Passwords do not match.');\n        panel.querySelector('[name=\"confirmPassword\"]').reportValidity();\n        panel.querySelector('[name=\"confirmPassword\"]').setCustomValidity('');\n        return false;\n      }\n    }\n    return true;\n  }\n  form.addEventListener('click', function (event) {\n    var next = event.target.closest('[data-next]');\n    var back = event.target.closest('[data-back]');\n    if (next) {\n      if (validatePanel()) showStep(Math.min(active + 1, 2));\n    }\n    if (back) showStep(Math.max(active - 1, 0));\n  });\n  document.getElementById('preview-submit').addEventListener('click', function () {\n    if (!validatePanel()) return;\n    var feedback = document.getElementById('form-feedback');\n    feedback.classList.add('is-visible');\n    feedback.textContent = 'Preview complete. No information has been sent or stored. Appointment submission will be enabled after the secure backend is connected.';\n    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });\n  });\n})();");
fs.writeFileSync(path.join(root, 'forms.html'), "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<meta name=\"theme-color\" content=\"#fff6e7\">\n<title>Begin My Light Session — Liwayway</title>\n<meta name=\"description\" content=\"Registration, initial assessment, and appointment form for Bukang Liwayway.\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n<link rel=\"stylesheet\" href=\"/styles.css\">\n</head>\n<body>\n<div id=\"site\"></div>\n<script src=\"/app.js\" defer></script>\n<script src=\"/forms-page.js\" defer></script>\n</body>\n</html>");

let formsSource = fs.readFileSync(path.join(root, 'forms-page.js'), 'utf8');
formsSource = formsSource.replace(
  "'<label class=\"form-field form-wide\"><span>Would you like to share what has been bothering you recently?</span><textarea name=\"shareConcerns\" rows=\"4\" placeholder=\"Your response is optional.\"></textarea></label>' +",
  "question('05','Would you like to share what has been bothering you recently?', '<textarea name=\"shareConcerns\" rows=\"4\" placeholder=\"Your response is optional.\"></textarea>', 'Optional paragraph response.') +"
);
fs.writeFileSync(path.join(root, 'forms-page.js'), formsSource);
fsCheck.execFileSync(process.execPath, ['--check', appPath]);
console.log('Liwayway forms, page scripts, and status cleanup checks passed.');

formsSource = formsSource.replace(/\\\"/g, '"');
fs.writeFileSync(path.join(root, 'forms-page.js'), formsSource);
fsCheck.execFileSync(process.execPath, ['--check', path.join(root, 'forms-page.js')]);


// Use the supplied standalone Liwayway illustrations at the correct scale and in context.
const drive = 'https://drive.google.com/uc?export=view&id=';
appSource = appSource.replace(
  "const house='https://drive.google.com/u/0/drive-usercontent/1oascfW1YhA0mT7t8FqAyP_bdxfltZxEs=w400-h400-p-k-rw-v1-nu-iv1';",
  "const house='" + drive + "1UjnZPD1FIBop7GxFCsUzpuMydcp1eaKt';"
);
appSource = appSource.replace(
  "const icons='https://drive.google.com/u/0/drive-usercontent/1eZWQ_C1z26AIdfIH0HrMBBniZgfAip62=w900-h500-p-k-rw-v1-nu-iv1';",
  "const icons='" + drive + "1qKTWNF5sWl6qjDpk0GtwMZdyyVfEHHSr';const florals='" + drive + "1oascfW1YhA0mT7t8FqAyP_bdxfltZxEs';const iconSheet='" + drive + "1eZWQ_C1z26AIdfIH0HrMBBniZgfAip62';"
);
appSource = appSource.replace(
  '<div class="hero-art">',
  '<div class="hero-art"><img class="art-florals" src="${florals}" alt="">'
);
appSource = appSource.replace(
  '<article class="card service-card yellow"><div class="step">01 · Before the session</div>',
  '<article class="card service-card yellow"><img class="service-graphic" src="' + drive + '19AQkMOKS580X8rqA4HnGFcdJyxc6auM5" alt="Checklist illustration"><div class="step">01 · Before the session</div>'
);
appSource = appSource.replace(
  '<article class="card service-card coral"><div class="step">02 · During the session</div>',
  '<article class="card service-card coral"><img class="service-graphic" src="' + drive + '1iIgUs82tZOrfLP8gSPZzBE4TWY3w9t7x" alt="Counseling support illustration"><div class="step">02 · During the session</div>'
);
appSource = appSource.replace(
  '<article class="card service-card orange"><div class="step">03 · After the session</div>',
  '<article class="card service-card orange"><img class="service-graphic" src="' + drive + '1a41EBWwKiNnbDW-ouxhtzGUhMZ9ns4K8" alt="Growth and progress illustration"><div class="step">03 · After the session</div>'
);
appSource = appSource.replace(
  '<article class="card service-card yellow"><div class="step">Before the light session</div>',
  '<article class="card service-card yellow"><img class="service-graphic" src="' + drive + '19AQkMOKS580X8rqA4HnGFcdJyxc6auM5" alt="Checklist illustration"><div class="step">Before the light session</div>'
);
appSource = appSource.replace(
  '<article class="card service-card coral"><div class="step">During the light session</div>',
  '<article class="card service-card coral"><img class="service-graphic" src="' + drive + '1iIgUs82tZOrfLP8gSPZzBE4TWY3w9t7x" alt="Counseling support illustration"><div class="step">During the light session</div>'
);
appSource = appSource.replace(
  '<article class="card service-card orange"><div class="step">After the light session</div>',
  '<article class="card service-card orange"><img class="service-graphic" src="' + drive + '1a41EBWwKiNnbDW-ouxhtzGUhMZ9ns4K8" alt="Growth and progress illustration"><div class="step">After the light session</div>'
);
appSource = appSource.replace(
  '<div class="eyebrow">01 · Before the light session</div><h2>Bukang Liwayway</h2>',
  '<img class="section-graphic" src="' + drive + '19AQkMOKS580X8rqA4HnGFcdJyxc6auM5" alt="Checklist illustration"><div class="eyebrow">01 · Before the light session</div><h2>Bukang Liwayway</h2>'
);
appSource = appSource.replace(
  '<div class="eyebrow">02 · During the light session</div><h2>Liwanag ng Araw</h2>',
  '<img class="section-graphic" src="' + drive + '1iIgUs82tZOrfLP8gSPZzBE4TWY3w9t7x" alt="Counseling support illustration"><div class="eyebrow">02 · During the light session</div><h2>Liwanag ng Araw</h2>'
);
appSource = appSource.replace(
  '<div class="eyebrow">03 · After the light session</div><h2>Takipsilim</h2>',
  '<img class="section-graphic" src="' + drive + '1a41EBWwKiNnbDW-ouxhtzGUhMZ9ns4K8" alt="Growth and progress illustration"><div class="eyebrow">03 · After the light session</div><h2>Takipsilim</h2>'
);
appSource = appSource.replace(
  '<div class="eyebrow">Online talks and webinars</div><h2>Lightalk</h2>',
  '<img class="section-graphic" src="' + drive + '1Fs1ijNgJSmS4-b1W98zjeoSExYQUQL9B" alt="Open book illustration"><div class="eyebrow">Online talks and webinars</div><h2>Lightalk</h2>'
);
appSource = appSource.replace(
  '<div class="eyebrow">Community support and outreach</div><h2>Kapwa</h2>',
  '<img class="section-graphic" src="' + drive + '1qKTWNF5sWl6qjDpk0GtwMZdyyVfEHHSr" alt="Community illustration"><div class="eyebrow">Community support and outreach</div><h2>Kapwa</h2>'
);
appSource = appSource.replace(
  '<div class="eyebrow">Help center</div><h2>Tanglaw ng Kaalaman</h2>',
  '<img class="section-graphic" src="' + drive + '1Fs1ijNgJSmS4-b1W98zjeoSExYQUQL9B" alt="Open book illustration"><div class="eyebrow">Help center</div><h2>Tanglaw ng Kaalaman</h2>'
);
appSource = appSource.replace(
  '<div class="contact-panel"><div>',
  '<div class="contact-panel"><div><img class="contact-graphic" src="' + drive + '1DYWkfYKeEN96OfRgG2Xlm7pF2rm6tCri" alt="Messaging illustration">'
);
appSource = appSource.replace(
  '<div class="values"><div class="value">',
  '<img class="icon-sheet" src="${iconSheet}" alt="Liwayway health, learning, and support icons"><div class="values"><div class="value">'
);
fs.writeFileSync(appPath, appSource);
fs.appendFileSync(path.join(root, 'styles.css'), [
'.art-florals{position:absolute;width:118px;height:118px;object-fit:contain;right:8%;top:2%;opacity:.9;z-index:1;pointer-events:none}',
'.service-graphic{width:76px;height:76px;object-fit:contain;margin:0 0 14px}',
'.section-graphic{width:82px;height:82px;object-fit:contain;margin:0 0 18px}',
'.icon-sheet{display:block;width:min(100%,520px);max-height:190px;object-fit:contain;margin:0 auto 26px;mix-blend-mode:multiply}',
'.contact-graphic{width:72px;height:72px;object-fit:contain;margin-bottom:18px;filter:brightness(0) invert(1)}',
'@media(max-width:700px){.art-florals{width:82px;height:82px;right:0;top:0}.service-graphic{width:64px;height:64px}.section-graphic{width:68px;height:68px}.icon-sheet{max-height:150px}}'
].join('\\n'));

fsCheck.execFileSync(process.execPath, ['--check', appPath]);


// Expanded Liwayway information architecture and service flows.
const extendedPages = {
  "behind-liwayway.html": ["Behind Liwayway", "The people and institutions behind Liwayway.", [
    ["Mental health professionals", ["Psychiatrist", "Registered Psychologist (RPsy)", "Registered Psychometrician (RPm)", "Guidance Counselor"]],
    ["Organization staff", ["Founder / Executive Director", "Administrative and Client Relations Manager", "Healthcare Staff", "System Manager"]],
    ["Partner institutions", ["Partner institutions"]],
    ["Sponsors and partner organizations", ["Sponsors and partner organizations"]]
  ]],
  "shared-liwayway.html": ["Shared Liwayway", "Community, learning, and shared experiences.", [
    ["Lightalk", ["Online talks and webinars", "Mental health discussions", "Upcoming events, descriptions, and schedules", "Event registration", "Related articles and educational materials"]],
    ["Kapwa", ["Community support circles", "Workshops", "Community outreach programs", "Volunteer opportunities", "Donation opportunities", "Community mental health resources"]],
    ["Liwayway Reviews", ["Client reviews", "Voluntary ratings", "Feedback submission", "Testimonials"]]
  ]],
  "steps-with-liwayway.html": ["Steps with Liwayway", "Guides, privacy information, and support.", [
    ["Tanglaw ng Kaalaman", ["Mental health articles", "Educational resources", "Liwayway guidelines", "Step-by-step guides"]],
    ["Data Privacy and Consent", ["Privacy policy", "Data collection and usage", "Confidentiality policy", "User consent", "Limitations of confidentiality"]],
    ["Frequently Asked Questions", ["About Liwayway", "Account registration", "Counseling services", "Other services", "Privacy and confidentiality", "Client support", "Reviews and feedback"]],
    ["Crisis Support", ["National Center for Mental Health Crisis Hotline: 1553", "Alternative hotline: 1800-1888-1553"]]
  ]],
  "takipsilim.html": ["Takipsilim — After the Session", "Follow-up and reflection after counseling.", [
    ["Post-counseling assessment", ["Follow-up questions about the counseling experience", "Current emotional condition", "Changes in mood and behavior", "Progress after counseling", "Effectiveness of coping strategies", "Areas that still need improvement", "Additional concerns or feedback"]],
    ["Follow-up evaluation", ["Follow-up evaluation"]],
    ["Therapeutic activities", ["Therapeutic activities"]],
    ["Coping progress monitoring", ["Coping progress monitoring"]],
    ["Reflection and feedback", ["Reflection and feedback"]]
  ]],
  "tala-at-saloobin.html": ["Tala at Saloobin — Personal Journal", "A personal space for reflection and writing.", [
    ["Journal features", ["Private journal", "Guided journal prompts", "Create and save entries", "View previous entries", "Edit and delete entries"]]
  ]],
  "help-center.html": ["Help Center", "Find information and support through Liwayway.", [
    ["Tanglaw ng Kaalaman", ["Mental health articles", "Educational resources", "Liwayway guidelines", "Step-by-step guides"]],
    ["Data Privacy and Consent", ["Privacy policy", "Data collection and usage", "Confidentiality policy", "User consent", "Limitations of confidentiality"]],
    ["Frequently Asked Questions", ["About Liwayway", "Account registration", "Counseling services", "Other services", "Privacy and confidentiality", "Client support", "Reviews and feedback"]],
    ["Contact Information", ["Contact details", "Email address", "Social media links", "Office address", "Contact form"]],
    ["Crisis Support", ["National Center for Mental Health Crisis Hotline: 1553", "Alternative hotline: 1800-1888-1553"]]
  ]]
};
const pageNav = '<header class="lx-header"><a class="lx-brand" href="/"><span class="lx-sun">✳</span> Liwayway</a><nav><a href="/">Home</a><a href="/about.html">About</a><a href="/behind-liwayway.html">Behind Liwayway</a><a href="/services.html">Services</a><a href="/shared-liwayway.html">Shared Liwayway</a><a href="/steps-with-liwayway.html">Steps with Liwayway</a><a href="/contact.html#contact-infos">Contact Us</a><a class="lx-login" href="/account.html">Login / Register</a></nav></header>';
const extendedStyle = `
:root{--lx-ink:#352b27;--lx-muted:#77665b;--lx-cream:#fff6e7;--lx-yellow:#f7d86a;--lx-orange:#ee8b3d;--lx-coral:#ef8e83;--lx-line:#eadbca}
.lx-body{margin:0;background:var(--lx-cream);color:var(--lx-ink);font-family:Karla,Arial,sans-serif}
.lx-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px max(4vw,22px);background:rgba(255,246,231,.94);border-bottom:1px solid var(--lx-line);backdrop-filter:blur(14px)}
.lx-brand{font:700 26px Fraunces,Georgia,serif;color:var(--lx-ink);text-decoration:none;white-space:nowrap}.lx-sun{color:var(--lx-orange);margin-right:7px}
.lx-header nav{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:14px}.lx-header nav a{font-size:12px;font-weight:700;color:var(--lx-ink);text-decoration:none}.lx-header nav a:hover{color:#b65f35}.lx-header nav .lx-login{background:var(--lx-orange);padding:10px 14px;border-radius:99px}
.lx-hero{padding:72px max(7vw,24px) 64px;background:linear-gradient(115deg,#fae8a7,#f5c18d 60%,#f5d0c9)}.lx-eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:10px;font-weight:700;color:#87583d}.lx-hero h1{font:600 clamp(42px,6vw,72px)/1.05 Fraunces,Georgia,serif;margin:15px 0}.lx-hero p{max-width:720px;color:#614c40;font-size:17px;line-height:1.65}
.lx-wrap{max-width:1080px;margin:0 auto;padding:54px 24px 90px}.lx-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.lx-card{padding:26px;border:1px solid var(--lx-line);border-radius:20px;background:#fffaf2}.lx-card h2{font:600 27px Fraunces,Georgia,serif;margin:0 0 12px}.lx-card ul{margin:0;padding-left:19px;color:var(--lx-muted);line-height:1.9}.lx-cta{display:inline-block;margin-top:18px;padding:13px 18px;border-radius:99px;background:var(--lx-orange);color:#30251e;text-decoration:none;font-size:13px;font-weight:700}.lx-footer{padding:25px 5vw;border-top:1px solid var(--lx-line);color:var(--lx-muted);font-size:12px}
.lx-form{max-width:820px;margin:auto;padding:28px;border-radius:20px;background:#fffaf2;border:1px solid var(--lx-line)}.lx-form h2{font:600 30px Fraunces,Georgia,serif}.lx-field{display:block;margin:17px 0;font-size:13px;font-weight:700}.lx-field input,.lx-field textarea,.lx-field select{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:13px;border:1px solid #dfd3c5;border-radius:10px;background:white;font:14px Karla,Arial}.lx-choice{display:flex;gap:10px;align-items:flex-start;padding:12px;margin:8px 0;border:1px solid var(--lx-line);border-radius:10px;background:#fff;font-size:13px}.lx-choice input{margin-top:3px;accent-color:var(--lx-orange)}.lx-note{padding:15px;background:#fff0d7;border-radius:12px;color:#72563d;font-size:13px;line-height:1.5}.lx-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.lx-btn{border:0;border-radius:99px;padding:13px 20px;background:var(--lx-orange);font-weight:700;cursor:pointer}.lx-btn.secondary{background:#f6e7d8}.lx-entry{border:1px solid var(--lx-line);border-radius:12px;padding:16px;margin:12px 0;background:white}.lx-entry button{margin-right:8px}.lx-footer a{color:inherit}
@media(max-width:800px){.lx-header{align-items:flex-start;flex-direction:column}.lx-header nav{justify-content:flex-start;gap:10px}.lx-grid{grid-template-columns:1fr}.lx-hero{padding:48px 24px}.lx-wrap{padding:32px 18px 65px}}
`;
const extendedScript = `
(function(){
const nav=${JSON.stringify(pageNav)};
const pages=${JSON.stringify(extendedPages)};
const style=${JSON.stringify(extendedStyle)};
const path=location.pathname.split('/').pop()||'index.html';
const key=path==='post-assessment.html'?'takipsilim.html':path;
const mount=document.getElementById('lx-app');
if(!mount)return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function frame(title,desc,body){document.body.className='lx-body';document.head.insertAdjacentHTML('beforeend','<style>'+style+'</style>');mount.innerHTML=nav+'<section class="lx-hero"><div class="lx-eyebrow">The First Light of a Gentler Tomorrow</div><h1>'+title+'</h1><p>'+desc+'</p></section><main class="lx-wrap">'+body+'</main><footer class="lx-footer">Liwayway · The First Light of a Gentler Tomorrow</footer>';}
function cards(data){return '<div class="lx-grid">'+data.map(([h,items])=>'<article class="lx-card"><h2>'+esc(h)+'</h2><ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></article>').join('')+'</div>';}
if(pages[key]){const p=pages[key];let body=cards(p[2]);if(key==='takipsilim.html')body+='<p><a class="lx-cta" href="/post-assessment.html">Open post-counseling assessment</a></p>';if(key==='tala-at-saloobin.html')body+='<p><a class="lx-cta" href="/journal.html">Open personal journal</a></p>';frame(p[0],p[1],body);return;}
if(key==='post-assessment.html'){
const questions=[['How would you describe your current emotional condition?',['Much better','A little better','About the same','More difficult','Unsure']],['Have you noticed changes in your mood or behavior since counseling?',['Positive changes','Some changes','No noticeable changes','Changes have been difficult','Unsure']],['How would you describe your progress after counseling?',['Significant progress','Some progress','A little progress','No progress yet','Unsure']],['How effective have your coping strategies been?',['Very effective','Somewhat effective','Not very effective','Not effective','I have not tried them yet']],['What areas do you feel still need improvement?',['Managing emotions','Stress management','Relationships','Daily activities','Building coping strategies','Other / not sure']]];
const q=questions.map((v,i)=>'<fieldset class="lx-field"><legend>'+(i+1)+'. '+v[0]+'</legend>'+v[1].map(x=>'<label class="lx-choice"><input type="radio" name="q'+i+'" value="'+esc(x)+'" required>'+esc(x)+'</label>').join('')+'</fieldset>').join('');
frame('Post-Counseling Assessment','Takipsilim · After the session. Share how you are feeling after counseling and what support may still be helpful.','<form class="lx-form" id="post-form"><h2>Follow-up assessment</h2>'+q+'<label class="lx-field">How was your counseling experience?<textarea rows="4" name="experience" placeholder="Your response"></textarea></label><label class="lx-field">Additional concerns or feedback<textarea rows="4" name="feedback" placeholder="Your response"></textarea></label><p class="lx-note">Preview only. This form does not submit or store sensitive responses. A secure, private backend must be connected before use.</p><div class="lx-actions"><button class="lx-btn" type="submit">Review responses</button></div><p id="post-result" aria-live="polite"></p></form>');
document.getElementById('post-form').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;document.getElementById('post-result').textContent='Your responses are complete in this preview. Nothing has been transmitted or saved.';});return;
}
if(key==='journal.html'){
frame('Tala at Saloobin','Your personal journal space. Draft entries in this preview and explore the journal controls.','<div class="lx-form"><h2>Write an entry</h2><label class="lx-field">Journal title<input id="j-title" required placeholder="Title of your entry"></label><label class="lx-field">Date<input id="j-date" type="date"></label><label class="lx-field">Journal entry<textarea id="j-content" rows="8" required placeholder="Write your thoughts here..."></textarea></label><div class="lx-actions"><button class="lx-btn" id="j-save">Save entry in this session</button></div><p class="lx-note">Privacy notice: entries are held only in this page session and are not sent to a server or saved to an account. Do not enter sensitive personal information until secure account storage is available.</p><h2>Previous entries</h2><div id="j-list">No entries in this session yet.</div></div>');
let entries=[],edit=-1;const list=document.getElementById('j-list');document.getElementById('j-save').onclick=()=>{const title=document.getElementById('j-title').value.trim(),content=document.getElementById('j-content').value.trim();if(!title||!content){alert('Please enter a title and journal entry.');return;}const item={title,date:document.getElementById('j-date').value,content};if(edit<0)entries.unshift(item);else entries[edit]=item;edit=-1;document.getElementById('j-title').value='';document.getElementById('j-content').value='';render();};function render(){list.innerHTML=entries.length?entries.map((x,i)=>'<article class="lx-entry"><strong>'+esc(x.title)+'</strong><p>'+esc(x.date||'')+'</p><p>'+esc(x.content).replace(/\n/g,'<br>')+'</p><button class="lx-btn secondary" data-edit="'+i+'">Edit</button><button class="lx-btn secondary" data-delete="'+i+'">Delete</button></article>').join(''):'No entries in this session yet.';list.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{edit=+b.dataset.edit;const x=entries[edit];document.getElementById('j-title').value=x.title;document.getElementById('j-date').value=x.date;document.getElementById('j-content').value=x.content;});list.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{entries.splice(+b.dataset.delete,1);render();});}return;
}
if(key==='account.html'){
frame('Your Liwayway Account','Account access and profile features. Authentication is a prototype until a secure account system is connected.','<div class="lx-grid"><form class="lx-form"><h2>Login</h2><label class="lx-field">School email address<input type="email" required></label><label class="lx-field">Password<input type="password" required></label><a href="#forgot">Forgot password?</a><div class="lx-actions"><button class="lx-btn" type="button" onclick="alert(\'Account login will be enabled after secure authentication is connected.\')">Login</button></div></form><form class="lx-form"><h2>Register</h2><label class="lx-field">Full name<input required></label><label class="lx-field">School email address<input type="email" required></label><label class="lx-field">Password<input type="password" required></label><label class="lx-field">Confirm password<input type="password" required></label><label class="lx-choice"><input type="checkbox" required>I agree to the Privacy Policy and consent notice.</label><div class="lx-actions"><button class="lx-btn" type="button" onclick="alert(\'Registration will be enabled after secure authentication and privacy handling are connected.\')">Create account</button></div></form></div><p class="lx-note">User accounts, password recovery, profiles, dashboards, and login/logout require secure authentication and a protected database. This preview does not collect credentials.</p>');return;
}
})();
`;
fs.writeFileSync(path.join(root,'extended-nav.js'),extendedScript);
fs.writeFileSync(path.join(root,'extended.css'),extendedStyle);
for(const [file] of Object.entries(extendedPages)){
 const title=extendedPages[file][0];
 fs.writeFileSync(path.join(root,file),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' — Liwayway</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet"></head><body><div id="lx-app"></div><script src="/extended-nav.js" defer></script></body></html>');
}
for(const file of ['post-assessment.html','journal.html','account.html']){
 const title=file.replace('.html','');
 fs.writeFileSync(path.join(root,file),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' — Liwayway</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet"></head><body><div id="lx-app"></div><script src="/extended-nav.js" defer></script></body></html>');
}
for(const file of ['index.html','about.html','services.html','community.html','resources.html','contact.html']){
 const p=path.join(root,file);let html=fs.readFileSync(p,'utf8');
 if(!html.includes('extended-nav.js'))html=html.replace('</body>','<script src="/extended-nav.js" defer></script></body>');
 fs.writeFileSync(p,html);
}


// Ensure the expanded navigation is available from the existing six primary pages.
let navJsPath = path.join(root, 'extended-nav.js');
let navJs = fs.readFileSync(navJsPath, 'utf8');
navJs = navJs.replace(
  "const mount=document.getElementById('lx-app');\nif(!mount)return;",
  "const mount=document.getElementById('lx-app');\nif(!mount){const existing=document.querySelector('.navlinks');if(existing&&!existing.dataset.liwaywayExpanded){existing.insertAdjacentHTML('beforeend','<a href=\"/behind-liwayway.html\">Behind Liwayway</a><a href=\"/shared-liwayway.html\">Shared Liwayway</a><a href=\"/steps-with-liwayway.html\">Steps with Liwayway</a><a href=\"/takipsilim.html\">Takipsilim</a><a href=\"/post-assessment.html\">Post-Counseling Assessment</a><a href=\"/tala-at-saloobin.html\">Tala at Saloobin</a><a href=\"/account.html\">Login / Register</a>');existing.dataset.liwaywayExpanded='true';}return;}"
);
fs.writeFileSync(navJsPath,navJs);

// Additional standalone pages for the requested help-center structure.
const extraPages = {
 "tanglaw-ng-kaalaman.html":["Tanglaw ng Kaalaman","Mental health learning and guidance.",[["Educational resources",["Mental health articles","Educational resources","Liwayway guidelines","Step-by-step guides"]]]],
 "data-privacy.html":["Data Privacy and Consent","Information about privacy, data use, confidentiality, and consent.",[["Privacy and confidentiality",["Privacy policy","Data collection and usage","Confidentiality policy","User consent","Limitations of confidentiality"]]]],
 "frequently-asked-questions.html":["Frequently Asked Questions","Common questions about Liwayway and its services.",[["About Liwayway",["About Liwayway"]],["Account registration",["Account registration"]],["Counseling services",["Counseling services"]],["Other services",["Other services"]],["Privacy and confidentiality",["Privacy and confidentiality"]],["Client support",["Client support"]],["Reviews and feedback",["Reviews and feedback"]]]],
 "crisis-support.html":["Crisis Support","If you need immediate mental health support, you may contact the hotlines listed below.",[["National Center for Mental Health",["National Center for Mental Health Crisis Hotline: 1553","Alternative hotline: 1800-1888-1553"]]]],
 "user-dashboard.html":["User Dashboard","Account, appointment, assessment, journal, and progress features.",[["Account",["User profile","Account settings"]],["Counseling",["Appointment management","Appointment status tracking","Counseling history"]],["Personal records",["Assessment history","Personal journal management","Progress tracking"]],["Community",["Event registration management","Review and feedback management"]]]],
 "professional-dashboard.html":["Mental Health Professional Dashboard","Professional-facing workflow overview.",[["Professional tools",["Appointment management","Counseling history","Assessment history","Progress tracking"]]]],
 "administrator-dashboard.html":["Administrator Dashboard","Administrative workflow overview.",[["Administration",["Appointment management","Appointment status tracking","Notifications and reminders","Event registration management","Review and feedback management"]]]]
};
for(const [file,p] of Object.entries(extraPages)){
 const body='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+p[0]+' — Liwayway</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet"></head><body><div id="lx-app"></div><script src="/extended-nav.js" defer></script></body></html>';
 fs.writeFileSync(path.join(root,file),body);
}

navJs = navJs.replace(
 "const pages="+JSON.stringify(extendedPages)+";",
 "const pages="+JSON.stringify(Object.assign({},extendedPages,extraPages))+";"
);
navJs = navJs.replace(
 "'<a href=\"/account.html\">Login / Register</a>'",
 "'<a href=\"/account.html\">Login / Register</a><a href=\"/tanglaw-ng-kaalaman.html\">Tanglaw ng Kaalaman</a><a href=\"/data-privacy.html\">Data Privacy</a><a href=\"/frequently-asked-questions.html\">FAQs</a><a href=\"/crisis-support.html\">Crisis Support</a><a href=\"/user-dashboard.html\">User Dashboard</a>'"
);
fs.writeFileSync(navJsPath,navJs);
