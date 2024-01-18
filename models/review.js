var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
   film: { type: Schema.ObjectId, ref: "Film", required: true },
   username: {type: String, required: true},
   filmreview: { type: String, required: true },
   rating: {
    type: Number,
    min: 0,
    max: 5,
	required: true,
  },
});

ReviewSchema.virtual("url").get(function () {
  return "/home/review/" + this._id;
});

module.exports = mongoose.model("Review", ReviewSchema);