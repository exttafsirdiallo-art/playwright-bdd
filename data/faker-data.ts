// data/faker-data.ts
import { fakerEN_US as faker } from "@faker-js/faker";

// 🧩 Données dynamiques Faker (EN_US)
export const email = faker.internet.email();
export const motDePasse = faker.internet.password({
  length: 10,
  memorable: true,
});
export const prenom = faker.person.firstName();
export const nom = faker.person.lastName();
export const address = faker.location.streetAddress();
export const city = faker.location.city();
export const state = faker.location.state();
export const zipCode = faker.location.zipCode();
export const phone = faker.phone.number({ style: "international" });

// Pour debug (optionnel)
console.log(`
🧪 FAKER DATA GENERATED:
-------------------------
Nom complet : ${prenom} ${nom}
Email       : ${email}
Adresse     : ${address}, ${city}, ${state} ${zipCode}
Téléphone   : ${phone}
`);
