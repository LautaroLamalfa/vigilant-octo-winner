const express = require('express');
const passport = require("../src/passport/passportConfig")

const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
    if (req.session.user) {
        res.send({user: req.session.user});
    } else {
        res.send(false);
    }
});

router.post("/", passport.authenticate("local-login", {
    successRedirect:"/index.html",
    failureRedirect:"/loginError.html"
}
))

module.exports = router;