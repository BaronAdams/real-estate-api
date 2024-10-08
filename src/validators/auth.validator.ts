import { body } from 'express-validator';

export const registerValidator = [
    body('firstName').notEmpty().withMessage("Le nom de l'utilisateur est obligatoire"),
    body('lastName').notEmpty().withMessage("Le prénom de l'utilisateur est obligatoire"),
    body('email').notEmpty().withMessage("L'adresse email est réquise").isEmail().withMessage("L'adresse email est invalide"),
    body('password').notEmpty().withMessage('Le mot de passe est réquis').isStrongPassword({minLength: 6,minUppercase: 2,minNumbers:1}).withMessage("Le mot de passe doit avoir au moins 6 caractères, avec au moins 1 chiffre et 2 lettre majuscules")
];

export const loginValidator = [
    body('email').notEmpty().withMessage("L'adresse email est réquise").isEmail().withMessage("L'adresse email est invalide"),
    body('password').notEmpty().withMessage('Le mot de passe est réquis').isStrongPassword({minLength: 6,minUppercase: 2,minNumbers:1}).withMessage("Le mot de passe doit avoir au moins 6 caractères, avec au moins 1 chiffre et 2 lettre majuscules")
];
