#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Film = require("./models/film");
const Director = require("./models/director");
const Genre = require("./models/genre");
const Review = require("./models/review");

const genres = [];
const directors = [];
const films = [];
const reviews = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createDirectors();
  await createFilms();
  await createReviews();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log("Added genre");
}

async function directorCreate(index, first_name, last_name, d_birth, d_death, d_bio) {
  const dirdetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) dirdetail.date_of_birth = d_birth;
  if (d_death != false) dirdetail.date_of_death = d_death;
  if (d_bio != false) dirdetail.short_bio = d_bio;

  const director = new Director(dirdetail);

  await director.save();
  directors[index] = director;
  console.log("Added director");
}

async function filmCreate(index, title, summary, director, genre) {
  const filmdetail = {
    title: title,
    summary: summary,
    director: director,
  };
  if (genre != false) filmdetail.genre = genre;

  const film = new Film(filmdetail);
  await film.save();
  films[index] = film;
  console.log("Added film");
}

async function reviewCreate(index, film, username, filmreview, rating) {
  const reviewdetail = {
    film: film,
    username: username,
	filmreview: filmreview,
	rating: rating,
  };
  const review = new Review(reviewdetail);
  await review.save();
  reviews[index] = review;
  console.log("Added review");
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Thriller"),
    genreCreate(1, "Drama"),
    genreCreate(2, "Horror"),
	genreCreate(3, "Comedy"),
	genreCreate(4, "Romance"),
	genreCreate(5, "Action"),
	genreCreate(6, "Documentary"),
	genreCreate(7, "Animation"),
	genreCreate(8, "Science Fiction"),
	genreCreate(9, "Fantasy"),
  ]);
}

async function createDirectors() {
  console.log("Adding directors");
  await Promise.all([
    directorCreate(0, "William", "Oldroyd", "1979-01-01", false, false), //thriller
    directorCreate(1, "John", "Fawcett", "1968-04-05", false, "John Fawcett is a Canadian director, writer, and producer of film and television. Alongside Graeme Manson, he co-created and is a director for the award-winning BBC America television series Orphan Black."), //horror
    directorCreate(2, "Julia", "Ducournau", false, false, "Julia Ducournau is a French film director and screenwriter. She made her feature film debut in 2016 with Raw. At the 2021 Cannes Film Festival, she won the Palme d'Or for her film Titane, which made her the second female director to win the award as well as the first to win the award solo."), //horror
    directorCreate(3, "Anand", "Tiwari", false, false, "Anand Tiwari is an Indian actor, producer, writer, lyricist and director known for his work in Hindi films. He has appeared in films like Kites (2010), Udaan (2010), Aisha (2010), and Go Goa Gone (2013)."), //drama
    directorCreate(4, "Céline", "Sciamma", "1978-11-12", false, false), //drama
	directorCreate(5, "Nahnatchka", "Khan", "1973-06-17", false, "Nahnatchka Khan is an American television writer and producer.")
  ]);
}

async function createFilms() {
  console.log("Adding Films");
  await Promise.all([
    filmCreate(0,
      "Eileen",
      "During a bitter 1964 Massachusetts winter, young secretary Eileen becomes enchanted by Rebecca, the glamorous new counselor at the prison where she works. Their budding friendship takes a twisted turn when Rebecca reveals a dark secret — throwing Eileen onto a sinister path.",
      directors[0],
      [genres[0]]
    ),
    filmCreate(1,
      "Ginger Snaps",
      "The story of two outcast sisters, Ginger (Katharine Isabelle) and Brigitte (Emily Perkins), in the mindless suburban town of Bailey Downs. On the night of Ginger stage, she is savagely attacked by a creature. Ginger's wounds heal but some thing is not right. Brigitte save herself and also has to save her sister.",
      directors[1],
      [genres[1], genres[2]]
    ),
    filmCreate(2,
      "Titane",
      "A female with a metal plate in her head from a childhood years automobile mishap starts a peculiar trip, bringing her into contact with a firefighter who's rejoined with his absent boy after one decade.",
      directors[2],
      [genres[0], genres[2]]
    ),
    filmCreate(3,
      "Maja Ma",
      "Pallavi Patel is the quintessential, middle aged, devoted housewife who is equally famous for her dance as she is for her cooking. But what happens when a truth about her, threatens to disrupt her middle-class family's ethos, on the eve of her son Tejas' engagement with a rich, NRI girl?",
      directors[3],
      [genres[1], genres[3]]
    ),
    filmCreate(4,
      "Portrait de la jeune fille en feu",
      "At the end of the 18th century, an artist is asked to paint a young woman's wedding portrait on a small island in Brittany.",
      directors[4],
      [genres[1], genres[4]]
    ),
    filmCreate(5,
      "Totally Killer",
      "Thirty-five years after the shocking murder of three teens, the infamous Sweet Sixteen Killer returns on Halloween night to claim a fourth victim. Seventeen-year-old Jamie ignores her overprotective mom's warning and comes face-to-face with the masked maniac and, on the run for her life, accidentally time travels back to 1987, the year of the original killings. Forced to navigate the unfamiliar and outrageous culture of the 1980s, Jamie teams up with her teen mom to take down the killer once and for all, before she's stuck in the past forever.",
      directors[5],
      [genres[2], genres[3]]
    ),
    filmCreate(6,
      "Naissance des Pieuvres",
      "During a hot summer in a French suburb, Marie is desperate to join the local pool's synchronized swimming team, but is her motivation solely for the sake of sport or for a chance to get close to Floriane, the team's bad girl? In this delicate drama of adolescent angst, Sciamma and the two leads capture the uncertainty of adolescent sexuality with a sympathetic eye.",
      directors[4],
      [genres[4]]
    ),
  ]);
}

async function createReviews() {
  console.log("Adding reviews");
  await Promise.all([
    reviewCreate(0, films[0], "AmandaTheJedi", "Can’t wait til we complete the ‘Thomasin McKenzie obsessing over hot blondes’ trilogy", 4),
    reviewCreate(1, films[1], "Justin LaLiberty", 'the apt feminist discourse around Ginger Snaps typically centers around the sisters but the mom, who bakes multiple cakes and offers to burn down the family home with the dad in it in order to protect her daughters, deserves to be a part of the conversation', 4),
    reviewCreate(2, films[2], "viking", "me the whole movie: i would like to see the baby", 2),
    reviewCreate(3,
      films[3],
      "ginbanessa",
      "never fails to break me every damn time.",
      4
    ),
    reviewCreate(4,
      films[3],
      "Lexi",
      "I have a few complaints about this film, but I will only mention the main one: Pallavi and Kanchan not having more moments together! I really love to see more of our lesbian milfs but their scene at the end is too cute to even complain further.",
      4
    ), 
    reviewCreate(5,
      films[0],
      "lucy",
      "gay son (saltburn) or thot daughter (eileen)",
      3
    ),
    reviewCreate(6,
      films[4],
      "cookie",
      "its come to my attention that women are the only people who know how to make movies",
      5
    ),
    reviewCreate(7,
      films[4],
      "CaroPri",
      "What felt like 20 minutes of Adele Haenel silently crying as she remembers instead of regretting, over Vivaldi's Four Seasons (Winter), is the most heart-wrenching scene anybody could ever create. Celine Sciamma should be charged for attempted murder.note for future self: only watch movies made by women with women and that have an exclusively female gaze.",
      5
    ),
    reviewCreate(8,
      films[5],
      "jade",
      "i love me some fun silly campy bubblegum girly horror comedy slasher film set in the 80s!",
      3
    ),
    reviewCreate(9, films[5], "PJ", "LET KIERNAN SHIPKA SERVE CUNT", 5),
    reviewCreate(10, films[6], "Michelle Nash", "Well folks!! She ate that musty apple years before Ellio fucked that peach!!", 2),
  ]);
}