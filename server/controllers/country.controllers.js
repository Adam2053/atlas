import mongoose from "mongoose";
import Country from "../models/country.model.js";
import Flags from "../models/countryFlags.model.js";
import axios from "axios";
import jsonData from "../data/countries/countries.json" assert { type: "json" };

export const addFlag = async (req, res) => {
  try {
    const flagData = await axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => res.data.data);
    let countryData = jsonData.map((country) => {
      const {
        translations,
        numeric_code,
        phone_code,
        tld,
        region_id,
        subregion_id,
        timezones,
        ...rest
      } = country;
      return rest;
    });

    for (let i = 0; i < countryData.length; i++) {
      for (let j = 0; j < flagData.length; j++) {
        if (flagData[j].iso2 === countryData[i].iso2) {
          // if iso2 is same, then add the flag to the country data
          countryData[i].flag = flagData[j].flag;
        }
      }
    }

    await Country.insertMany(countryData);
    await Country.aggregate([{ $sort: { id: 1 } }]);

    res.status(200).json({
      success: true,
      //   data: countryData.length,
      message: "Countries with flags added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
};

export const getSingleCountry = async (req, res) => {
  try {
    const countryCode = req.params.code;
    const country = await Country.findOne({ iso2: countryCode });

    res.status(200).json({
      success: true,
      data: [
        { name: country.name },
        { flag: country.flag },
        { region: country.region },
      ],
      message: "Country fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
};

export const getRandomCountry = async (req, res) => {
  try {
    // get random country from the database
    function getRandomNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    function generateUniqueRandomNumbers(mainNumber, max) {
      const randomNumbers = new Set();

      while (randomNumbers.size < 3) {
        const num = getRandomNumber(max);
        if (num !== mainNumber && !randomNumbers.has(num)) {
          randomNumbers.add(num);
        }
      }

      return Array.from(randomNumbers);
    }

    const mainNumber = getRandomNumber(220);
    console.log("Main Number:", mainNumber);

    const uniqueNumbers = generateUniqueRandomNumbers(mainNumber, 220);
    console.log("Three Unique Numbers:", uniqueNumbers);

    const randomCountry = await Flags.find({
      id: [mainNumber, ...uniqueNumbers],
    });

    res.status(200).json({
      success: true,
      data: {
        mainCountry: randomCountry[0],
        options: [
          randomCountry[1].name,
          randomCountry[2].name,
          randomCountry[3].name,
        ],
      },
      message: "Random country fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
};

// export const addFlagToCountry = async (req, res) => {
//   try {
//     const flagData = await axios
//       .get("https://countriesnow.space/api/v0.1/countries/flag/images")
//       .then((res) => res.data.data);

//     let countryData = jsonData.map((country) => {
//       const {
//         translations,
//         numeric_code,
//         phone_code,
//         tld,
//         region_id,
//         subregion_id,
//         timezones,
//         ...rest
//       } = country;
//       return rest;
//     });

//     // check if the iso2 of above array is same as the iso2 of the below array using nested for loops

//     let count = 0;
//     for (let i = 0; i < countryData.length; i++) {
//       for (let j = 0; j < flagData.length; j++) {
//         if (flagData[j].iso2 === countryData[i].iso2) {
//           // if iso2 is same, then add the flag to the country data
//           countryData[i].flag = flagData[j].flag;
//         }
//       }
//     }

//     // remove the country which has no flags to it

//     countryData = countryData.filter((country) => country.flag);
//     for (let i = 0; i < countryData.length; i++) {
//       countryData[i].id = i + 1;
//     }

//     await Flags.insertMany(countryData)
//     res.status(201).json({
//       success: true,
//       message: "Flags added successfully",
//     })
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching data",
//       error: err.message,
//     })
//   }
// };
