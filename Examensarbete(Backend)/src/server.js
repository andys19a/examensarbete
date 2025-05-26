require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;
const path = require('path');


app.use(cors());
app.use(express.json()); 


app.use(express.static(path.join(__dirname, "../public")));

// Hämta produkterna
app.get('/api/products', (req, res) => {
  console.log("Förfrågan mottagen på /api/products");

  fs.readFile(__dirname + '/productdatabase.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Kunde inte läsa productdatabase.json:", err);
      return res.status(500).send('Kunde inte läsa produktfilen');
    }

    try {
      const jsonData = JSON.parse(data);
      console.log("Produkter hämtade:", jsonData);
      res.send(jsonData);
    } catch (parseError) {
      console.error("Fel vid parsning av productdatabase.json:", parseError);
      res.status(500).send("Fel vid parsning av JSON");
    }
  });
});

// Hämta blogginläggen
app.get('/api/blogposts', (req, res) => {
  console.log("Förfrågan mottagen på /api/blogposts");

  fs.readFile(__dirname + '/blogposts.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Kunde inte läsa blogposts.json:", err);
      return res.status(500).send('Fel vid hämtning av blogginlägg');
    }

    try {
      const jsonData = JSON.parse(data);
      res.send(jsonData);
    } catch (parseError) {
      console.error("Fel vid parsning av blogposts.json:", parseError);
      res.status(500).send("Fel vid parsning av JSON");
    }
  });
});

// Spara prenumeranterna
app.post('/api/subscribe', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send('E-postadress saknas');
  }

  const path = __dirname + '/subscribers.json';

  fs.readFile(path, 'utf8', (err, data) => {
    let list = [];
    if (!err && data) {
      try {
        list = JSON.parse(data);
      } catch (e) {
        console.error("Fel vid parsning av subscribers.json:", e);
      }
    }

    list.push({ email, date: new Date().toISOString() });

    fs.writeFile(path, JSON.stringify(list, null, 2), (err) => {
      if (err) {
        console.error("Kunde inte spara e-post:", err);
        return res.status(500).send('Fel vid sparande');
      }
      res.status(200).send('Tack för din prenumeration!');
    });
  });
});

// Stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe använder ören
      currency: 'sek',
      automatic_payment_methods: { enabled: true }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Kontaktmeddelanden - POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Namn, e-post och meddelande krävs." });
  }

  const path = __dirname + '/contactMessages.json';

  // Läs befintliga meddelanden
  fs.readFile(path, 'utf8', (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch (e) {
        console.error("Fel vid parsning av contactMessages.json:", e);
      }
    }

    const newEntry = {
      name,
      email,
      phone,
      message,
      date: new Date().toISOString()
    };

    messages.push(newEntry);

    fs.writeFile(path, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error("Kunde inte spara meddelande:", err);
        return res.status(500).send("Fel vid sparande");
      }
      res.status(200).send("Meddelandet sparades!");
    });
  });
});

// Endpoint för att hämta hero-bild.png
app.get("/hero-image", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "hero-bild.png"));
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
