const Director = require("../models/director");
const asyncHandler = require("express-async-handler");
const Film = require("../models/film");


exports.director_list = asyncHandler(async (req, res, next) => {
  const allDirectors = await Director.find().sort({ last_name: 1 }).exec();
  res.render("director_list", {
    title: "Director List",
    director_list: allDirectors,
  });
});

exports.director_detail = asyncHandler(async (req, res, next) => {
  const [director, allFilmsByDirector] = await Promise.all([
    Director.findById(req.params.id).exec(),
    Film.find({ director: req.params.id }, "title summary").exec(),
  ]);

  if (director === null) {
    const err = new Error("Director not found");
    err.status = 404;
    return next(err);
  }

  res.render("director_detail", {
    title: "Director Detail",
    director: director,
    director_films: allFilmsByDirector,
  });
});