import Auteur, {auteurSchema} from "./Auteur";

export default interface Livre {
    id: number;
    titre: string;
    auteur: Auteur;
}

export const livreSchema = {
    titre: String,
    auteur: auteurSchema
}
