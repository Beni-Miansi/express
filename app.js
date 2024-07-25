const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Middleware pour vérifier les heures ouvrables
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  // Vérifie si le jour est entre lundi (1) et vendredi (5) et l'heure entre 9h et 17h
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, the web app is available only during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
  }
};

// Utiliser le middleware globalement
app.use(checkWorkingHours);

// Servir des fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// Itinéraires
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const app = express();




// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
// });
