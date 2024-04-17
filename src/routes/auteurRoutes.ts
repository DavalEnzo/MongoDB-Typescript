import {Router, Request, Response} from "express";
import Auteur from "../models/Auteur";

const router = Router();

let auteurs: Auteur[] = [];

router.get('/', (_req: Request, res: Response) => {
    res.status(200).send(auteurs)
});

router.get('/:id', (req: Request, res: Response) => {
    const selectedAuteur = auteurs.find((auteur) => auteur.id === parseInt(req.params.id))

    if (selectedAuteur) {
        res.status(200).send(`Vous avez sélectionné l'auteur ${selectedAuteur.nom}`)
    } else {
        res.status(404).send(`Auteur inconnu`)
    }

});

router.post('', (req: Request, res: Response) => {
    let auteur = req.body;

    auteur.forEach((auteur: any) => {
        auteurs.push(auteur);
    })

    res.status(201).send("Ressource ajoutée");
});

router.put('/:id', (req: Request, res: Response) => {
    let auteurSelected = req.body

    const auteurIndex = auteurs.findIndex(auteur => auteur.id === parseInt(req.params.id))

    auteurs[auteurIndex] = auteurSelected

    console.log(auteurSelected)
    res.status(200).send("Ressource modifiée");
});

export default router;
