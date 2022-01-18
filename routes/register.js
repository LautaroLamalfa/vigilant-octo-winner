const express = require('express');

const { Router } = express;
const router = new Router();

const passportConfig = require("../src/passport/passportConfig")

router.post("/", passportConfig.authenticate("local-signup", {
    successRedirect:"/login.html",
    failureRedirect:"/registerError.html"
}))

module.exports = router