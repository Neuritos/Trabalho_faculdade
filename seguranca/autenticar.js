
//export default function autenticar(requisicao, resposta, next){
 //   if (requisicao.session.autenticacao === true){
 //       next();
 //   } else{
 //       resposta.redirect('/login');
 //   }

//}

export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticado) {
        next(); // Permite o acesso se estiver logado
    } else {
        resposta.redirect('/login.html'); // Redireciona se não estiver logado
    }
}