const express = require("express");
const router = express.Router();



router.get("/", (req, res)=>{
    res.render("pages/index", {perfil:null});
})

router.get("/login", (req, res)=>{
    res.render("pages/login", {perfil:null});
})

router.post("/login", (req, res)=>{
    //recuperar os dados do form
    // objeto req
    //propriedade body
    //elemento de formulário - atributo name 

    let nomeUser = req.body.nome;
    let senhaUser = req.body.senha;

    if(nomeUser == "joca" && senhaUser == "1234"){
        res.render("pages/perfil", {perfil:true});
    }else{
        res.send("Nome de usuário e/ou senha inválidos!");
    }


})


// rota post /cadastro -> exibir os dados enviados em uma página
router.post("/cadastro", (req, res)=>{

    //recuperar dados do formuário (req.body.NOME_DO_ELEMENTO)
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let cSenha = req.body.cSenha


    //enviar para o cliente

    res.send(`Nome: ${nome}, e-mail: ${email} senha: ${senha} confirmação de senha ${cSenha}`)


})



router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro", {perfil:null});
})

router.get("/perfil", (req, res)=>{
    res.render("pages/perfil", {perfil:true});
})





module.exports = router;