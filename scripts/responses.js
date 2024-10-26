const answerContainer = document.querySelectorAll('.answer-wrapper-hidden')
const answerForm = document.querySelectorAll('.answer-form')
const answerButton = document.querySelectorAll('.thread-button')
const respondButton = document.querySelectorAll('.respond-button')

function showResponses(index)
{
    answerContainer[index].classList.toggle('answer-wrapper')
}

function showAnswerInput(index)
{
    let state = answerForm[index].style.display
    state == "flex" ? answerForm[index].style.display = "none" : answerForm[index].style.display = "flex"
}

answerButton.forEach((el, i) => {
    el.addEventListener("click", () => {
        el.textContent == "VER RESPUESTAS" ? el.textContent = "OCULTAR RESPUESTAS" : el.textContent = "VER RESPUESTAS"
        showResponses(i)
    })
})

respondButton.forEach((el, i) => {
    el.addEventListener("click", () => showAnswerInput(i))
})