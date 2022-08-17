const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 333;
require('dotenv').config();


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'layouts/layout')

app.set('views', './views')

const dbConnectionString = process.env.DB_STRING;

MongoClient.connect(dbConnectionString)
    .then(client => {
    const db = client.db("marcosag-languages");
    const languagesCollection = db.collection("languages");

            console.log("Conected to DB!");
            app.get("/", (request, response) => {
                languagesCollection.find().toArray()
                .then(result => {
                    response.render('layouts/layout', { content: result[0].content.eng });
                })
                .catch(err => console.error(err));
            })
        
            app.get("/pt", (req, res) => {
                languagesCollection.find().toArray()
                    .then(result => {
                        console.log("Pt-br rendered")
                        res.render('layouts/layout', { content: result[0].content.pt })
                    })
                    .catch(err => console.error(err));
            })
            app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on ${PORT}!`)
    })
        })
    .catch(err => console.error(err));




