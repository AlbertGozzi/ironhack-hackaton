require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('hbs');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'jefflowetigerking@gmail.com',
           pass: 'jefflowetigerking'
       }
});

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    console.log("Made it home")
    res.render('index.hbs')
})

app.get('/contacted', (req, res) => {
    console.log("Made it home")
    res.render('contacted.hbs')
})


app.post('/submit-email', (req, res) => {
    const userEmail = req.body.email;
    const user = req.body.name;
    console.log(req.body);
    const mailOptions = {
        from: 'jefflowetigerking@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Jeff Lowe | Contact Form', // Subject line
        html: `<h1>Hey ${user}, thank you for contacting Jeff Lowe!</h1><p>We'll be in touch soon to see if we can help you manage your zooe.</p>`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });

    res.redirect('/contacted');
});

app.listen(process.env.PORT || 3000, () => console.log('My portfolio running on port 3000'));