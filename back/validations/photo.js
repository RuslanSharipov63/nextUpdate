const { body } = require('express-validator')
const photoCreateValidation = [
    body('imageURL', 'Неверная ссылка на изображение').isString(),
    body('tags', 'Неверный формат тегов').isArray(),
    body('size', 'Не распознан размер фото').isNumeric(),
]
module.exports = photoCreateValidation;