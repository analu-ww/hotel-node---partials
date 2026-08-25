const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
 
router.get("/", (req, res) => {
    res.render("pages/index", { perfil: null });
});
 
router.get("/login", (req, res) => {
    res.render("pages/login", { perfil: null });
});
 
router.post("/login", (req, res) => {
    let nomeUser = req.body.nome;
    let senhaUser = req.body.senha;
 
    if (nomeUser == "joca" && senhaUser == "1234") {
        res.render("pages/perfil", { perfil: true });
    } else {
        res.send("Nome de usuário e/ou senha inválidos!");
    }
});
 
router.get("/cadastro", (req, res) => {
    res.render("pages/cadastro", { perfil: null, erros: null });
});
 
router.post("/cadastro", [
    body("nome").trim().notEmpty().withMessage("O nome é obrigatório!"),
    body("email").isEmail().withMessage("Informe um e-mail válido!"),
    body("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres!"),
    body("cSenha").custom((value, { req }) => {
        if (value !== req.body.senha) {
            throw new Error("As senhas não conferem!");
        }
        return true;
    })
], (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.render("pages/cadastro", {
            perfil: null,
            erros: erros.array()
        });
    }
 
    let nome = req.body.nome;
    let email = req.body.email;
 
    res.send(`Cadastro efetuado com sucesso para ${nome} (${email})!`);
});
 
router.get("/perfil", (req, res) => {
    res.render("pages/perfil", { perfil: true });
});
 
module.exports = router;