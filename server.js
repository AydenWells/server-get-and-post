const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
 

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/index.html")
});


let movies = [
    {
        id: 1,
        title: 'The Godfather',
        genre: 'Crime and Drama',
        director: 'Ford Coppola',
        releaseYear: 1972,
        writers:  ['Mario Puzo Francis', 'Ford Coppola'],
        imageUrl: 'godfather.png',
    },
    {
        id: 2,
        title: 'Forrest Gump',
        genre: 'Drama and Romance',
        director: 'Robert Zemeckis',
        releaseYear: 1994,
        writers:  ['Winston Groom', 'Eric Roth'],
        imageUrl: 'forrestgump.png',
    },
    {
        id: 3,
        title: 'Fight Club',
        genre: 'Drama',
        director: 'David Fincher',
        releaseYear: 1999,
        writers:  ['Chuck Palahniuk', 'Jim Uhls'],
        imageUrl: 'fightclub.png',
    },
    {
        id: 4,
        title: 'Inception',
        genre: 'Action-Adventure and Sci-Fi',
        director: 'Christopher Nolan',
        releaseYear: 2010,
        writers:  ['Christopher Nolan', 'Christopher Nolan'],
        imageUrl: 'inception.png',


    },
    {
        id: 5,
        title: 'The Matrix',
        genre: 'Action and Sci-Fi',
        director: 'Lana Wachowski',
        releaseYear: 1999,
        writers:  ['Lana Wachowski', 'Lilly Wachowski'],
        imageUrl: 'matrix.png', 
    },
    {
        id: 6,
        title: 'Saving Private Ryan',
        genre: 'Drama and War',
        director: 'Steven Spielberg',
        releaseYear: 1998,
        writers:  ['Robert Rodat', 'Steven Spielberg'],
        imageUrl: 'savingprivateryan.png',
    }


];


app.get("/api/movies",(req, res) =>{
    res.send(movies);
});




app.post("/api/movies", upload.single("img"), (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const movie = {
        _id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        writers: req.body.writers.split(",")
    }

    movies.push(movie);
    res.send(movies);
});

const validateMovie = (movie) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        writers: Joi.allow(""),
        title: Joi.string().min(3).required(),
        directors: Joi.string().min(3).required()
    });

    return schema.validate(movie);
};






app.listen(3000, () => {
    console.log("I'm listening");
});