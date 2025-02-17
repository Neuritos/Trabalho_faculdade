
export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticacao === true){
        next();
    } else{
        resposta.redirect('/login');
    }

}