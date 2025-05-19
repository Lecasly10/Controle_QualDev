import { assertEquals } from "jsr:@std/assert/equals";
import { assertThrows } from "jsr:@std/assert";
import { NumeroSecuriteSociale } from '../src/modele/NumeroSecuriteSociale.ts';
import { safeParsePositive } from '../src/utils/Conversion.ts';

//    ---   safeParsePositive    ---

Deno.test("Nombre positif", () => {
  assertEquals(safeParsePositive("22"), 22);
})

Deno.test("Nombre négatif", () => {
  assertEquals(safeParsePositive("-22"), -1);
})

//    ---   Numéro de secu    ---

Deno.test("Numéro de secu  pas que avec des chiffres", () => {
  assertEquals(safeParsePositive("2a2"), -1);
})

Deno.test("Numéro de secu trop court", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("123456789"),
    Error,
    "Longueur du numéro de sécurité sociale invalide."
  );
});

Deno.test("Numéro de secu trop long", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("123456789123456789"),
    Error,
    "Longueur du numéro de sécurité sociale invalide."
  );
});

//    ---   SEXE    ---

Deno.test("Sexe valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.sexe, 1);
  const nssF = new NumeroSecuriteSociale("2230267891234");
  assertEquals(nssF.sexe, 2);
});

Deno.test("Sexe invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("3230267891234"),
    Error,
    "Valeur du sexe invalide (1 pour homme, 2 pour femme)."
  );
});

//    ---   AnneeNaissance    ---

Deno.test("AnneeNaissance valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.anneeNaissance, 23);
});

Deno.test("AnneeNaissance invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1-30267891234"),
    Error,
    "Année de naissance invalide."
  );
});

//    ---   MoisNaissance    ---

Deno.test("MoisNaissance valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.moisNaissance, 2);
});

Deno.test("MoisNaissance invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1234567891234"),
    Error,
    "Mois de naissance invalide."
  );
});

//    ---   Departement    ---

Deno.test("Departement valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.departement, "67");
});

Deno.test("Departement Corse valide", () => {
  const nssH = new NumeroSecuriteSociale("123022A891234");
  assertEquals(nssH.departement, "2A");
});

Deno.test("Departement Corse invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("123022F891234"),
    Error,
    "Département invalide."
  );
});

Deno.test("Departement invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1230296891234"),
    Error,
    "Département invalide."
  );
});

//    ---   Commune    ---

Deno.test("Commune valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.commune, 891);
});

Deno.test("Commune invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1230267000234"),
    Error,
    "Commune invalide."
  );
});

//    ---   OrdreNaissance    ---

Deno.test("OrdreNaissance valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.ordreNaissance, 234);
});

Deno.test("OrdreNaissance invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1230267891000"),
    Error,
    "Ordre de naissance invalide."
  );
});

//    ---   CleSecurite    ---

Deno.test("CleSecurite valide", () => {
  const nssH = new NumeroSecuriteSociale("123026789123458");
  assertEquals(nssH.cleSecurite, 58);
});

Deno.test("CleSecurite invalide", () => {
  let _nss :NumeroSecuriteSociale;
  assertThrows(
    () => _nss = new NumeroSecuriteSociale("1230267891234-1"),
    Error,
    "Clé de sécurité invalide."
  );
});

Deno.test("Pas de CleSecurite, valide", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.cleSecurite, undefined);
});

//    ---   toString    ---

Deno.test("toString valide avec CléSecu", () => {
  const nssH = new NumeroSecuriteSociale("123026789123458");
  assertEquals(nssH.toString(), "Sexe : 1, Annee de naissance : 23, Mois de naissance : 2, Departement : 67, Commune : 891, Ordre de naissance : 234, Clé de securité : 58");
});

Deno.test("toString DOM TOM valide avec CléSecu", () => {
  const nssH = new NumeroSecuriteSociale("123029989123458");
  assertEquals(nssH.toString(), "Sexe : 1, Annee de naissance : 23, Mois de naissance : 2, Né à l'étranger, Pays : 891, Ordre de naissance : 234, Clé de securité : 58");
});

Deno.test("toString valide sans CléSecu", () => {
  const nssH = new NumeroSecuriteSociale("1230267891234");
  assertEquals(nssH.toString(), "Sexe : 1, Annee de naissance : 23, Mois de naissance : 2, Departement : 67, Commune : 891, Ordre de naissance : 234");
});

Deno.test("toString DOM TOM valide sans CléSecu", () => {
  const nssH = new NumeroSecuriteSociale("1230299891234");
  assertEquals(nssH.toString(), "Sexe : 1, Annee de naissance : 23, Mois de naissance : 2, Né à l'étranger, Pays : 891, Ordre de naissance : 234");
});
