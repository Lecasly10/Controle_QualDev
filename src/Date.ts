export function convertNbToTab(date:string):number[] {
    let tab = date.split("/");

    if (tab.length != 3) {
        tab = date.split("-");
        if (tab.length != 3) {
            throw new Error("Date pas au bon format");
        }
    }

    const j = parseInt(tab[0]);
    const m = parseInt(tab[1]);
    const a = parseInt(tab[2]);

    if (j < 1 || j > 31)
        throw new Error("Jour pas bon format");
    if (m > 12 && m < 31 && j >= 1 && j <= 12)
        throw new Error("Date au format américain");
    if (m < 1 || m > 12)
        throw new Error("Mois pas bon format");
    return [j, m, a];

}

/*
recu1();

function recu1() {
    try {
        let date = prompt("Insérez la date") || "";
        let tab = convertNbToTab(date);
        for (let i = 0; i < tab.length; i++)
            console.log(tab[i]);
    } catch(e) {
        console.log(e.message);
        recu1();
    } finally {
        console.log("Fin du programme");
    }
}
*/