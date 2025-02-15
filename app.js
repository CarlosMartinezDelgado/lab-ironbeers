const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


const randomBeer = punkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
//BEERS RUTA
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi)
    res.render("beers.hbs", {
      beersFromApi: beersFromApi
    })
 
  })
  .catch(error => console.log(error));
});

//RANDOM RUTA
   app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()    
    .then(responseFromApi => {
   //   console.log(responseFromApi)
      res.render("random-beer.hbs", {
        responseFromApi: responseFromApi
      })
  
    })
    .catch(error => console.log(error));
  });

  //RUTA DINAMICA

  // No hemos podido asociar el LINK de cada cerveza a su DESCRIPCION

  app.get("/beers/:id", (req, res) => {
    punkAPI.getBeer(req.params.id)   
    .then(beersFromApi => {

      res.render("random-beer.hbs", {
        beersFromApi: beersFromApi
      })
  
    })
    .catch(error => console.log(error));
  });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
