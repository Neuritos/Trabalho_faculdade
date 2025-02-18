export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticado) {
        next();
    } else {
        resposta.redirect('/login.html'); 
    }
}