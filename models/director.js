const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  short_bio: { type: String },
});

DirectorSchema.virtual("name").get(function () {
  return this.last_name + ", " + this.first_name;
});

DirectorSchema.virtual("url").get(function () {
  return "/home/director/" + this._id;
});

DirectorSchema.virtual("lifespan").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  else {
	  lifetime_string += " Present";
  }
  return lifetime_string;
});


module.exports = mongoose.model("Director", DirectorSchema);