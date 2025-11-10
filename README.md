![CI](https://github.com/exttafsirdiallo-art/playwright-bdd/actions/workflows/ci.yml/badge.svg)

Playwright + Cucumber (BDD) – AutomationExercise

Projet E2E basé sur Playwright + Cucumber (TypeScript) pour automatiser les cas de test du site https://automationexercise.com
.

🚀 Prérequis

Node.js 18+

npm 9+

📦 Installation
npm install

# (optionnel) Installe les navigateurs Playwright si besoin :

npx playwright install

🧰 Scripts utiles

# Exécuter tous les scénarios (headless)

npm run bdd

# Exécuter avec navigateur visible

npm run bdd:headed

# Exécuter par tag

npm run bdd -- --tags "@login"
npm run bdd:headed -- --tags "@register or @login"

# (Playwright pur) ouvrir le codegen si nécessaire

npx playwright codegen https://automationexercise.com

🗂️ Structure du projet
playwright-bdd/
├─ data/
│ └─ users.json # Données (email, password, etc.)
├─ features/
│ ├─ login.feature # Scénario Login (OK)
│ ├─ login_negative.feature # Scénario Login KO (mdp incorrect)
│ ├─ register.feature # Scénario Register
│ ├─ steps/
│ │ ├─ register.steps.ts # Steps génériques + register
│ │ ├─ login.ts # Steps spécifiques login
│ │ ├─ common.steps.ts # Navigation + cookies
│ │ └─ teardown.steps.ts # Step partagé: I close the browser
│ └─ support/
│ ├─ world.ts # PwWorld (page/context/browser)
│ ├─ hooks.ts # Hooks Cucumber (Before/After…)
│ └─ consent.ts (optionnel) # Helper cookies (si utilisé)
├─ .gitignore
├─ package.json
└─ tsconfig.json

🔐 Données de test (data/users.json)

Exemple minimal :

{
"newUser": {
"signupName": "John",
"email": "john.doe@example.com",
"password": "Test1234!"
}
}

⚠️ Pour le scénario Login, l’email/mot de passe doivent correspondre à un compte existant.
Si le scénario Login supprime le compte, il faudra le recréer avant un nouveau run (ou commenter la suppression).

▶️ Lancer les scénarios
Tous les scénarios
npm run bdd

Mode visible (debug facile)
npm run bdd:headed

Par tags
npm run bdd -- --tags "@register"
npm run bdd -- --tags "@login"
npm run bdd -- --tags "@negative" # login incorrect
npm run bdd -- --tags "@register or @login"

🍪 Popin cookies

Le projet inclut une gestion de la popin cookies (clic automatique).
Si besoin, tu peux renforcer via un storageState (consentement mémorisé) — helper optionnel features/support/consent.ts.

🧹 Fermeture propre du navigateur

Un step partagé ferme le navigateur en fin de scénario :

And I close the browser

Définition : features/steps/teardown.steps.ts.

🧩 Dépannage rapide

Undefined steps → vérifier que tu lances avec :

cucumber-js --require-module ts-node/register --require ./features/support/**/\*.ts --require ./features/steps/**/_.ts ./features/\*\*/_.feature

Ambiguous steps → ne définir un step qu’une seule fois (ex: I close the browser).

Timeouts 5s → setDefaultTimeout(60000) est dans world.ts.

Cookies bloquants → voir common.steps.ts (sélecteurs variés + iframes).

Fenêtres qui restent ouvertes → toujours utiliser And I close the browser à la fin du scénario.

📝 Git – mise en ligne
git init
git branch -M main
echo "# Playwright + Cucumber" > README.md
git add .
git commit -m "Initial commit: Playwright + Cucumber project setup"

# Remplace par ton pseudo GitHub (sans chevrons)

git remote add origin https://github.com/exttafsirdiallo-art/playwright-bdd.git
git push -u origin main

🔧 Config (extrait package.json)
{
"scripts": {
"bdd": "cucumber-js --require-module ts-node/register --require ./features/support/**/\*.ts --require ./features/steps/**/_.ts ./features/\*\*/_.feature",
"bdd:headed": "HEADLESS=false cucumber-js --require-module ts-node/register --require ./features/support/**/\*.ts --require ./features/steps/**/_.ts ./features/\*\*/_.feature"
},
"devDependencies": {
"@cucumber/cucumber": "^12.2.0",
"@types/node": "^24.10.0",
"playwright": "^1.56.1",
"ts-node": "^10.9.2",
"typescript": "^5.9.3"
}
}
