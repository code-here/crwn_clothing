const express = require('express');
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { json } = express;

const app = express();


const port = process.env.PORT || 5000;


//server settings
app.disable('x-powered-by');
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if ( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    })
}

app.post("/payment", async (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'inr',
        description: "payment from crwn clothing"
    }
    await stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr});
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })
});


//running server
app.listen(port, err => {
    if (err) throw err;
    console.log(`listening on port: ${ port }`);
});
