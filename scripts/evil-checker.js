/*
    Hacemos un chequeo previo a los posts para ver si están aptos para ser enviados.    
*/
let words = fetch('https://tucuarentena.com/mean-words').then(el => el.json(el)).then(data => { words = data.evil })    // Conseguimos las malas palabras. En un mundo ideal esto no sería necesario...


function validateForm(texto, meanWords)
{
    let textParsed = texto.toLowerCase().split(" ")
        
    if(texto.replace(/ /g, "").length < 11)
    {
        alert("Por favor, escribí más de 10 caracteres")
        return false
    }
    else if (texto[0] == " " || texto[texto.length - 1] == " " || texto[0] == "\n" || texto[texto.length - 1] == "\n")
    {
        alert("Evitá dejar espacios en blanco al principio o final del post.")
        return false
    }
    
    for (let i = 0; i < textParsed.length; i++) {
        if(meanWords.includes(textParsed[i]) || meanWords.includes(removeDuplicates(textParsed[i])))
        {
                alert("Lo que escribiste contiene una mala palabra, por favor removela :)")
                return false
        }
    }
}

function removeDuplicates(string) {
    return string
        .split('')
        .filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        .join('');
}

function validatePosts()
{
    let texto = document.postForm.post.value
    return validateForm(texto, words)
}


function validateAns(i)
{
    let answerId = document.querySelectorAll(".answer-form")
    let answer = answerId[i].answer.value
    return validateForm(answer, words)
}