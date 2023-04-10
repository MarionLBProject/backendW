function checkBody(body, keys) {
    let validKeys = true; // par def. tt est à true, infos existent

// boucle forof pour récup keys (tablo avec prop. que l'on veut verif: name, email, pw)
 for (const field of keys) {
    if ( !body[field] || body[field] === '') {
    // ici body récupéré = req.body // [field]: prop a chq tour de boucle
    // if body numm or empty
        validKeys = false;
 }
}
    return validKeys
}

module.exports = { checkBody };