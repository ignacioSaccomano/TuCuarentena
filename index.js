const express = require('express')
const bodyParser = require('body-parser')
const {meanWords, sussyBehaviour} = require('./evilManager.js')

const conn = require('./scripts/database-connection')

var db

const app = express()

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", "ejs");

app.get('/', inicio)
app.get('/forum', forum)
app.get('/ignacio', ignacio)
app.get('/gabriel', gabriel)
app.get('/salud', salud)
app.get('/estudios-trabajo', estudios)
app.get('/libre', libre)
app.get('/mundo', mundo)


app.get('/mean-words', (req, res)=>{
    res.json({evil: meanWords})
})


function gabriel(req,res)
{
    res.sendFile(__dirname + '/creadores/brogneri.html')
}

function forum(req,res)
{
    db = conn()
    db.query('SELECT type FROM posts;', (err, results)=> {
        if(err) throw err
        db.destroy()
        res.render("foro", {type: results})

    })
}

function inicio(req, res)
{
    res.sendFile(__dirname + '/index.html')
}

function ignacio(req,res)
{
    res.sendFile(__dirname + '/creadores/saccomano.html')
}

function salud(req, res)
{
    db = conn()
    db.query('SELECT post, id_post FROM posts WHERE type="salud";', (err , results) => {
        if(err) throw err
        db.query('SELECT respuesta, post_bond FROM respuestas;', (errata, resultados) => {
            if(errata) throw errata
            db.destroy()
            res.render('salud', {posts: results , respuestas: resultados})
        })
    })  
}

function mundo(req, res)
{
    db = conn()
    db.query('SELECT post, id_post FROM posts WHERE type="mundo";', (err , results) => {
        if(err) throw err
        db.query('SELECT respuesta, post_bond FROM respuestas;', (errata, resultados) => {
            if(errata) throw errata
            db.destroy()
            res.render('mundo', {posts: results , respuestas: resultados})
        })
    })  
}

function estudios(req, res)
{
    db = conn()
    db.query('SELECT post, id_post FROM posts WHERE type="estudios";', (err , results) => {
        if(err) throw err
        db.query('SELECT respuesta, post_bond FROM respuestas;', (errata, resultados) => {
            if(errata) throw errata
            db.destroy()
            res.render('estudios-trabajo', {posts: results , respuestas: resultados})
        })
    })    
}

function libre(req, res)
{
    db = conn()
    db.query('SELECT post, id_post FROM posts WHERE type="libre";', (err , results) => {
        if(err) throw err
        db.query('SELECT respuesta, post_bond FROM respuestas;', (errata, resultados) => {
            if(errata) throw errata
            db.destroy()
            res.render('libre', {posts: results , respuestas: resultados})
        })
    })    
}


app.post('/setSalud',(req, res) => {
    const {post} = req.body
    db = conn()
    db.query('INSERT INTO posts(post, type) VALUES("' + post.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + '", "salud");', () => {
        db.destroy()
        res.redirect('/salud')
    })
})

app.post('/setLibre',(req, res) => {
    const {post} = req.body
    db = conn()
    db.query('INSERT INTO posts(post, type) VALUES("' + post.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + '", "libre");', () => {
        db.destroy()
        res.redirect('/libre')
    })
})

app.post('/setEstudios',(req, res) => {
    const {post} = req.body
    db = conn()
    db.query('INSERT INTO posts(post, type) VALUES("' + post.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + '", "estudios");', () => {
        db.destroy()
        res.redirect('/estudios-trabajo')
    })
})

app.post('/setMundo',(req, res) => {
    const {post} = req.body
    db = conn()
    db.query('INSERT INTO posts(post, type) VALUES("' + post.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + '", "mundo");', () => {
            db.destroy()
            res.redirect('/mundo')
        })
})

app.post("/setAnswerLibre", (req,res)=>{
    const {answer} = req.body
    const {idBond} = req.body

    db = conn()
    db.query('INSERT INTO respuestas(respuesta, post_bond) VALUES("' + sussyBehaviour(answer) + '", "' + idBond + '");', () => {
        db.destroy()
        res.redirect("/libre")
    })
})

app.post("/setAnswerSalud", (req,res)=>{
    const {answer} = req.body
    const {idBond} = req.body
    const parsedText = sussyBehaviour(answer)

    db = conn()

    db.query('INSERT INTO respuestas(respuesta, post_bond) VALUES("' + parsedText + '", "' + idBond + '");', () => {
        db.destroy()
        res.redirect("/salud")
    })
})

app.post("/setAnswerEstudios", (req,res)=>{
    const {answer} = req.body
    const {idBond} = req.body

    db = conn()
    db.query('INSERT INTO respuestas(respuesta, post_bond) VALUES("' + sussyBehaviour(answer) + '", "' + idBond + '");', () => {
        db.destroy()
        res.redirect("/estudios-trabajo")
    })
})

app.post("/setAnswerMundo", (req,res)=>{
    const {answer} = req.body
    const {idBond} = req.body

    db = conn()
    db.query('INSERT INTO respuestas(respuesta, post_bond) VALUES("' + sussyBehaviour(answer) + '", "' + idBond + '");', () => {
        db.destroy()
        res.redirect("/mundo")
    })
})

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/notFound.html');
});

app.listen(3000,()=>{

    console.log('Iniciando página...')
})
