import mongoose, { mongo } from "mongoose";

const countrySchema = new mongoose.Schema({
  id: {
    type: Number,
    // required: true,
    // unique: true,
  },
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  iso2: {
    type: String,
    // required: true,
    // unique: true,
  },
  iso3: {
    type: String,
    // required: true,
    // unique: true,
  },
  capital: {
    type: String,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  currency_name: {
    type: String,
    // required: true,
  },
  currency_symbol: {
    type: String,
    // required: true,
  },
  native: {
    type: String,
    // required: true,
  },
  region: {
    type: String,
    // required: true,
  },
  subregion: {
    type: String,
    // required: true,
  },
  nationality: {
    type: String,
    // required: true,
  },
  latitude: {
    type: String,
    // required: true,
  },
  longitude: {
    type: String,
    // required: true,
  },
  emoji: {
    type: String,
    // required: true,
  },
  emojiU: {
    type: String,
    // required: true,
  },
  flag : {
    type: String,
 
  }
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
