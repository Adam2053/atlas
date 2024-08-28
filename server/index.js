import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
// import connectionToDb from "./db/connectionToDb.js";
import connectToDb from "./db/connectionToDb.js";
import {
  addAllData,
  addFlag,
  everyData,
  getRandomCountry,
  getSingleCountry,
  getSingleName,
} from "./controllers/country.controllers.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://atlas-game-beta.vercel.app'
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api is successfully running",
  });
});

const baseUrl = "https://countriesnow.space/api/v0.1";

// app.get("/country/:country", async (req, res) => {
//   const data = {
//     iso2: req.params.country,
//   };
//   try {
//     const response = await axios.post(`${baseUrl}/countries/flag/images`, {
//       data,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Country flag image fetched successfully",
//       flagUrl: response.data.data.flag,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching country data",
//       error: err.message,
//     });
//   }
// });

app.get("/all", async (req, res) => {
  try {
    // count reduce function
    // citiesCount.reduce((acc, curr) => acc + curr.length, 0)
    const response = await axios.get(`${baseUrl}/countries`);
    const citiesCount = response.data.data.map((c) => c.cities);
    res.status(200).json({
      success: true,
      message: "cities are fetched successfully",
      citiesCount: citiesCount.reduce((acc, curr) => acc + curr.length, 0),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching countries data",
      error: err.message,
    });
  }
});

// app.post('/add', addFlag)
// app.post('/addFlag', addFlagToCountry)
// app.get('/country/:code', getSingleCountry)
app.get("/api/random", getRandomCountry);
app.post("/api/get/:name", getSingleName);

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.listen(port, (req, res) => {
  console.log(`The server is listening on ${port} `);
  connectToDb(MONGO_URI);
});
