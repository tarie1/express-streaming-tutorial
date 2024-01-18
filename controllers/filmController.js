const Film = require("../models/film");
const Director = require("../models/director");
const Genre = require("../models/genre");
const Review = require("../models/review");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numFilms,
    numReviews,
    numDirectors,
    numGenres,
  ] = await Promise.all([
    Film.countDocuments({}).exec(),
    Review.countDocuments({}).exec(),
    Director.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local IMDb",
    film_count: numFilms,
    review_count: numReviews,
    director_count: numDirectors,
    genre_count: numGenres,
  });
});


exports.film_list = asyncHandler(async (req, res, next) => {
  const allFilms = await Film.find({}, "title director")
    .sort({ title: 1 })
    .populate("director")
    .exec();

  res.render("film_list", { title: "Film List", film_list: allFilms });
});


exports.film_detail = asyncHandler(async (req, res, next) => {
  const [film, reviews] = await Promise.all([
    Film.findById(req.params.id).populate("director").populate("genre").exec(),
    Review.find({ film: req.params.id }).exec(),
  ]);

  if (film === null) {
    const err = new Error("Film not found");
    err.status = 404;
    return next(err);
  }

  res.render("film_detail", {
    title: film.title,
    film: film,
    film_reviews: reviews,
  });
});