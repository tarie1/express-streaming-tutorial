const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

FilmSchema.virtual("url").get(function () {
  return "/home/film/" + this._id;
});

module.exports = mongoose.model("Film", FilmSchema);