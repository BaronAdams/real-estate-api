import { body, checkSchema } from 'express-validator';

// Middleware de validation pour la mise à jour des propriétés
export const updatePropertyValidator = [
  body('title')
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),
  
  body('type')
    .isIn(['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'])
    .withMessage("Le type de propriété doit être l'un des suivants : land, villa, banquet_hall, building, apartment, duplex."),
  
  body('status')
    .isIn(['for_sale', 'for_rent', 'leased', 'sold'])
    .withMessage("Le statut doit être l'un des suivants : for_sale, for_rent, leased, sold."),
  
  body('place')
    .optional()
    .isString()
    .withMessage('Le lieu doit être une chaîne de caractères.'),
  
  body('furnished')
    .optional()
    .isBoolean()
    .withMessage('Le champ "furnished" doit être de type booléen.'),
  
  body('price')
    .isNumeric()
    .withMessage('Le prix doit être un nombre.')
    .notEmpty()
    .withMessage('Le prix est requis.'),
  
  body('priceFrequency')
    .optional()
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
    .withMessage("La fréquence de prix doit être l'une des suivantes : hourly, daily, weekly, monthly, yearly.")
    .custom((value, { req }) => {
      if (req.body.status === 'for_rent' && !value) {
        throw new Error('La fréquence de prix est requise pour les propriétés à louer.');
      }
      return true;
    }),
  
  body('sellerId')
    .optional()
    .isString()
    .withMessage("L'identifiant du vendeur doit être une chaîne de caractères."),
  
  body('agentId')
    .isString()
    .withMessage("L'identifiant de l'agent est requis et doit être une chaîne de caractères."),
  
  body('agencyId')
    .isString()
    .withMessage("L'identifiant de l'agence est requis et doit être une chaîne de caractères."),
  
  body('area')
    .isNumeric()
    .withMessage('La superficie doit être un nombre.')
    .notEmpty()
    .withMessage('La superficie est requise.'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),
  
  body('rooms')
    .optional()
    .isObject()
    .withMessage('Les détails des pièces doivent être un objet.')
    .custom((rooms, { req }) => {
      if (req.body.type !== 'land' && !rooms) {
        throw new Error('Les détails des pièces sont requis pour les propriétés qui ne sont pas des terrains.');
      }
      return true;
    }),
  
  body('images')
    .isArray({ min: 1 })
    .withMessage('Au moins une image est requise.')
    .custom((images) => {
      if (!images.every((img: string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),
];
