import { safeParsePositive } from "../utils/Conversion.ts";

export class NumeroSecuriteSociale {
    private _numero: string;
    private _sexe!: number;
    private _anneeNaissance!: number;
    private _moisNaissance!: number;
    private _departement!: string;
    private _commune!: number;
    private _ordreNaissance!: number;
    private _cleSecurite!: number;

    constructor(numero: string) {
        this._numero = numero.toUpperCase();
        this.decrypteNumero();
    }

    protected decrypteNumero(): boolean {
        if (this._numero.length < 13 || this._numero.length > 15) {
            throw new Error("Longueur du numéro de sécurité sociale invalide.");
        }

        this._sexe = safeParsePositive(this._numero.substring(0, 1));
        if (this._sexe !== 1 && this._sexe !== 2) { // changement de valeur de this._sexe qui doit etre soit 1 ou 2 et non 0 ou 1
            throw new Error("Valeur du sexe invalide (1 pour homme, 2 pour femme).");
        }

        this._anneeNaissance = safeParsePositive(this._numero.substring(1, 3));
        if (this._anneeNaissance < 0 || this._anneeNaissance > 99) {
            throw new Error("Année de naissance invalide.");
        }

        this._moisNaissance = safeParsePositive(this._numero.substring(3, 5));
        if (this._moisNaissance < 1 || this._moisNaissance > 12) {
            throw new Error("Mois de naissance invalide.");
        }

        this._departement = this._numero.substring(5, 7);
        if (!this.isValidDepartement(this._departement)) {
            throw new Error("Département invalide.");
        }

        this._commune = safeParsePositive(this._numero.substring(7, 10));
        if (this._commune < 1 || this._commune > 999) {
            throw new Error("Commune invalide.");
        }

        this._ordreNaissance = safeParsePositive(this._numero.substring(10, 13));
        if (this._ordreNaissance < 1 || this._ordreNaissance > 999) {
            throw new Error("Ordre de naissance invalide.");
        }

        if (this._numero.length == 15) {
            this._cleSecurite = safeParsePositive(this._numero.substring(13));
            if (this._cleSecurite < 0 || this._cleSecurite > 99) {
                throw new Error("Clé de sécurité invalide.");
            }
        }

        return true;
    }

    private isValidDepartement(dept: string): boolean {
        
        // traitement de la Corse
        if (dept.length == 2 && dept.startsWith("2") && (dept == "2A" || dept == "2B")) { // modification pour la corse le code 2F par exemple n'est pas valide mais l'était mtn il ne l'est plus
            return true;
        }
        const intDept = safeParsePositive(dept);
        if ((intDept >= 1 && intDept <= 95) || (intDept >= 97 && intDept <= 99)) {
            return true;
        }
       return false;
    }

    public get numero(): string {
        return this._numero;
    }
    public get sexe(): number {
        return this._sexe;
    }
    public get anneeNaissance(): number {    
        return this._anneeNaissance;
    }
    public get moisNaissance(): number {
        return this._moisNaissance;
    }
    public get departement(): string {
        return this._departement;
    }
    public get commune(): number {
        return this._commune;
    }
    public get ordreNaissance(): number {
        return this._ordreNaissance;
    }
    public get cleSecurite(): number {
        return this._cleSecurite;
    }
    public toString(): string { 
        let ch = `Sexe : ${this._sexe}, Annee de naissance : ${this._anneeNaissance}, Mois de naissance : ${this._moisNaissance}`;
        if (this._departement==="99") {
            ch += `, Né à l'étranger, Pays : ${this._commune}`;
        } else {
            ch += `, Departement : ${this._departement}, Commune : ${this._commune}`;
        }
        ch += `, Ordre de naissance : ${this._ordreNaissance}`;

        if (this._cleSecurite) {
            ch += `, Clé de securité : ${this._cleSecurite}`;
        }
        return ch;  
    }
}
