const express = require('express');
const { urlToHttpOptions } = require('url');
const path = require('path');
const { read } = require('fs');
const { v4: uuid } = require('uuid');
var methodOverride = require('method-override')


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))

app.listen(3000, () => {

    console.log('Listen on port 3000');
})


let comments = [
    {
        id: uuid(),
        username: 'TOTO',
        comment: "THIS IS THE FIRST COMMENT"
    },
    {
        id: uuid(),
        username: 'TOTO',
        comment: "THIS IS THE HAHAHA COMMENT"
    },
    {
        id: uuid(),
        username: 'adaada',
        comment: "LOL"
    },
    {
        id: uuid(),
        username: 'sdsdsf',
        comment: "TLets get it "
    },
]

app.get('/comments', (req, res) => {

    res.render('index', { comments })

})

app.get('/comments/new', (req, res) => {

    res.render('new')
})

app.post('/comments', (req, res) => {

    console.log(req.body)
    let { username, comment } = req.body;
    comments.push({ id: uuid(), username, comment });
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {


    let comment = comments.find(c => c.id === req.params.id);
    //console.log(comment.id, " ", req.params.id);
    res.render('show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {

    let { id } = req.params;
    let comment = comments.find(c => c.id === id)
    res.render('edit', { comment });
})

app.patch('/comments/:id/', (req, res) => {

    let { id } = req.params;
    let newCommentText = req.body.comment;
    let comment = comments.find(c => c.id === id);
    comment.comment = newCommentText;
    res.redirect('/comments');

})

app.delete('/comments/:id', (req, res) => {

    let { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/', (req, res) => {

    res.send('HOME PAGE HELLOOOO');

})



// index    /comments     GET retrieve all comments
// new   /comments/new  GET form to create a nwcmmt
//show    /comments/:id  GET retrieve details of cmt
// create /comments/     post create new comment
// edit   /comments/:id/edit form to edit
// update /comments/:id patch update specific cmmt
// destroy/comments/:id DELETE remove comment  


