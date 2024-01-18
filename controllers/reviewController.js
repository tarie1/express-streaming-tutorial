const Review = require("../models/review");
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

var Film = require("../models/film");

exports.review_list = asyncHandler(async (req, res, next) => {
  const allReviews = await Review.find().populate("film").exec();
  res.render("filmreview_list", {
    title: "Review List",
    review_list: allReviews,
  });
});


exports.review_detail = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate("film")
    .exec();

  if (review === null) {
    const err = new Error("Review copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("filmreview_detail", {
    title: "Review:",
    filmreview: review,
  });
});

exports.review_create_get = asyncHandler(async (req, res, next) => {
  const allFilms = await Film.find({}, "title").sort({ title: 1 }).exec();

  res.render("filmreview_form", {
    title: "Leave a review",
    film_list: allFilms,
  });
});

exports.review_create_post = [
  body("film", "Film must be specified").trim().isLength({ min: 1 }).escape(),
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("filmreview", "Share your thoughts on this film")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("rating").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const filmReview = new Review({ 
      film: req.body.film,
      username: req.body.username,
      filmreview: req.body.filmreview,
      rating: req.body.rating,
    });

    if (!errors.isEmpty()) {
      const allFilms = await Film.find({}, "title").sort({ title: 1 }).exec();

      res.render("filmreview_form", {
        title: "Leave a review",
        film_list: allFilms,
        selected_film: filmReview.film._id,
        errors: errors.array(),
        filmreview: filmReview,
      });
      return;
    } else {
      await filmReview.save();
      res.redirect(filmReview.url);
    }
  }),
];

exports.review_delete_get = asyncHandler(async (req, res, next) => {
  const filmReview = await Review.findById(req.params.id)
    .populate("film")
    .exec();

  if (filmReview === null) {
    res.redirect("/home/reviews");
  }

  res.render("filmreview_delete", {
    title: "Delete Review",
    filmreview: filmReview,
  });
});


exports.review_delete_post = asyncHandler(async (req, res, next) => {
  await Review.findByIdAndDelete(req.body.id);
  res.redirect("/home/reviews");
});


exports.review_update_get = asyncHandler(async (req, res, next) => {
  const [filmReview, allFilms] = await Promise.all([
    Review.findById(req.params.id).populate("film").exec(),
    Film.find(),
  ]);

  if (filmReview === null) {
    const err = new Error("Review not found");
    err.status = 404;
    return next(err);
  }

  res.render("filmreview_form", {
    title: "Update Review",
    film_list: allFilms,
    selected_film: filmReview.film._id,
    filmreview: filmReview,
  });
});

exports.review_update_post = [
  body("film", "Film must be specified").trim().isLength({ min: 1 }).escape(),
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("filmreview", "Share your thoughts on this film")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("rating").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const filmReview = new Review({
      film: req.body.film,
      username: req.body.username,
      filmreview: req.body.filmreview,
      rating: req.body.rating,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allFilms = await Film.find({}, "title").exec();

      res.render("filmreview_form", {
        title: "Update Review",
        film_list: allFilms,
        selected_film: filmReview.film._id,
        errors: errors.array(),
        filminstance: filmReview,
      });
      return;
    } else {
      await Review.findByIdAndUpdate(req.params.id, filmReview, {});
      res.redirect(filmReview.url);
    }
  }),
];