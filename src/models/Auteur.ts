export default interface Auteur {
    id: number;
    nom: string;
    dateNaissance: Date;
}

export const auteurSchema = {
    nom: String,
    dateNaissance: Date
}
