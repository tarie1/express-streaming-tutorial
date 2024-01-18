const express = require("express");
const router = express.Router();


const film_controller = require("../controllers/filmController");
const director_controller = require("../controllers/directorController");
const genre_controller = require("../controllers/genreController");
const review_controller = require("../controllers/reviewController");

/// FILM ROUTES ///

// GET catalog home page.
router.get("/", film_controller.index);

// GET request for one Film.
router.get("/film/:id", film_controller.film_detail);

// GET request for list of all Film items.
router.get("/films", film_controller.film_list);

// GET request for one Director.
router.get("/director/:id", director_controller.director_detail);

// GET request for list of all Directors.
router.get("/directors", director_controller.director_list);


router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

// GET request for creating a Review. NOTE This must come before route that displays Review (uses id).
router.get(
  "/review/create",
  review_controller.review_create_get,
);

// POST request for creating Review.
router.post(
  "/review/create",
  review_controller.review_create_post,
);

// GET request to delete Review.
router.get(
  "/review/:id/delete",
  review_controller.review_delete_get,
);

// POST request to delete Review.
router.post(
  "/review/:id/delete",
  review_controller.review_delete_post,
);

// GET request to update Review.
router.get(
  "/review/:id/update",
  review_controller.review_update_get,
);

// POST request to update Review.
router.post(
  "/review/:id/update",
  review_controller.review_update_post,
);

// GET request for one Review.
router.get("/review/:id", review_controller.review_detail);

// GET request for list of all Review.
router.get("/reviews", review_controller.review_list);

module.exports = router;
