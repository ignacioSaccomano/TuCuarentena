const meanWords = []    // Este array contenía varias malas palabras para sanitizar el contenido subido al foro.


const sussyBehaviour = (text) => {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")  // Sanitizo string para evitar SQL injection.
}


module.exports = {meanWords: meanWords, sussyBehaviour: sussyBehaviour}