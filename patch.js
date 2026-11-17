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
