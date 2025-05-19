// Fonction qui renvoie -1 si la chaîne "valeur" n'est pas un entier positif valide
// et qui renvoie cette chaîne convertie en nombre sinon
export function safeParsePositive(valeur:string): number {
    const ok = valeur.split("").every((c) => c >= "0" && c <= "9");
    if (!ok) {
        return -1;
    }
    return Number(valeur);
}