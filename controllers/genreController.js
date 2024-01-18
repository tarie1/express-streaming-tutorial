const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

var Film = require("../models/film");


exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();
  res.render("genre_list", {
    title: "Genre List",
    list_genres: allGenres,
  });
});


exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, filmsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Film.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_films: filmsInGenre,
  });
});