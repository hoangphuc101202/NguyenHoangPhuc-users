const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
const fs = require('fs');
const userRouter = require('./routers/user-router')

app.use('/',userRouter)
app.listen(3000, () => {
    console.log("App listen");
})