const fs = require('fs');
const https = require('https');
const path = require('path');

const partners = [
  { name: "Neoliane", domain: "neoliane.fr" },
  { name: "Zenioo", domain: "zenioo.com" },
  { name: "SwissLife", domain: "swisslife.fr" },
  { name: "Cegema", domain: "cegema.com" },
  { name: "Malakoff", domain: "malakoffhumanis.com" },
  { name: "Apivia", domain: "apivia.fr" },
  { name: "April", domain: "april.fr" },
  { name: "Harmonie Mutuelle", domain: "harmonie-mutuelle.fr" },
  { name: "Groupe Aesio", domain: "aesio.fr" },
  { name: "Abeille", domain: "abeille-assurances.fr" },
  { name: "GMF", domain: "gmf.fr" },
  { name: "FMA Assurances", domain: "fma.fr" },
  { name: "iAssure", domain: "iassure.fr" },
  { name: "Pop Santé", domain: "popsante.fr" },
  { name: "Praeconis", domain: "praeconis.fr" },
  { name: "SPVie", domain: "spvie.com" },
  { name: "Wazari", domain: "wazari.fr" },
  { name: "2MA", domain: "2ma.fr" },
  { name: "Lequite", domain: "equite.com" }
];

const outDir = path.join(__dirname, 'public', 'images', 'partners');

async function downloadLogo(partner) {
  const safeName = partner.name.toLowerCase().replace(/ /g, '-').replace(/é/g, 'e');
  const outFile = path.join(outDir, `${safeName}.png`);
  const url = `https://logo.clearbit.com/${partner.domain}?size=200`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
        // handle redirects manually or assume https.get follows (it doesn't by default but clearbit doesn't redirect often)
        // actually clearbit logo redirects to clearbit's cdn.
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https.get(res.headers.location, (res2) => {
             if (res2.statusCode === 200) {
                 const file = fs.createWriteStream(outFile);
                 res2.pipe(file);
                 file.on('finish', () => { file.close(); resolve(true); });
             } else { resolve(false); }
          });
        } else if (res.statusCode === 200) {
           const file = fs.createWriteStream(outFile);
           res.pipe(file);
           file.on('finish', () => { file.close(); resolve(true); });
        } else {
           resolve(false);
        }
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const partner of partners) {
    const success = await downloadLogo(partner);
    console.log(`${partner.name}: ${success ? 'Downloaded' : 'Failed'}`);
  }
}

run();
