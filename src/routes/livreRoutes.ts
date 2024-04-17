import {Router, Request, Response} from "express";
import Livre, {livreSchema} from "../models/Livre";
import mongoose, {Schema} from "mongoose";

const router = Router();

const livreschema:Schema  = new mongoose.Schema(livreSchema);
const livreModel = mongoose.model('livreModel', livreschema);

router.get('', (_req: Request, res: Response) => {
    livreModel.find().then((livres) => {
        res.status(200).send(livres)
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource")
    });
});

router.get('/:id', (req: Request, res: Response) => {
    livreModel.findById(req.params.id).then((livre) => {
        if (livre) {
            res.status(200).send(`Vous avez sélectionné le livre ${livre.titre} \n écrit par ${livre.auteur.nom}`)
        } else {
            res.status(404).send(`Livre inconnu`)
        }
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource")
    });
});

router.post('', (req: Request, res: Response) => {
    let livre = req.body;

    livre.forEach((livre: Livre) => {
        let document = new livreModel({
            titre: livre.titre,
            auteur: {
                nom: livre.auteur.nom,
                dateNaissance: new Date('1892-01-03')
            }
        });

        document.save().then(() => {
            res.status(201).send("Ressource ajoutée");
        }).catch((error: any) => {
            res.status(500).send("Erreur lors de l'ajout de la ressource")
        });
    })
});

router.put('/:id', (req: Request, res: Response) => {
    let livreSelected = req.body

    livreModel.findByIdAndUpdate(req.params.id, livreSelected).then(() => {
        res.status(200).send("Ressource modifiée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la modification de la ressource")
    });
})

router.delete('/:id', (req: Request, res: Response) => {
    livreModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send("Ressource supprimée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la suppression de la ressource")
    });
})

export default router;
