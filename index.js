import express from "express";
import autenticar from "./seguranca/autenticar.js";
import { pacotes } from "./publico/scripts/pacotes.js";
import session from "express-session";

const porta = 3000;
const localhost = "0.0.0.0";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './privado/views'); 

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

    app.use(session({
        secret: "GojbHE8gclbP93LwkD",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 15
        }
    }));

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
});



app.get("/detalhes", autenticar, (requisicao, resposta) => {
    const pacoteId = requisicao.query.id;  
    const pacote = pacotes.find(pacote => pacote.id == pacoteId);  

    if (pacote) {
        resposta.render("detalhes", { pacote }); 
    } else {
        resposta.status(404).send("Pacote não encontrado");
    }
});





app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "cliente1" && senha === "12345") {
        requisicao.session.autenticado = true;
        resposta.redirect('/index.html');
    } else {
        resposta.redirect('/login.html');
    }
});



app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html')
})

app.use(express.static("./publico"));

app.use(autenticar, express.static("./privado"));

app.listen(porta, localhost, function () {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});