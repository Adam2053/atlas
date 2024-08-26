import axios from "axios";
import jsonData from "./data/countries/countries.json" assert { type: "json" };

let countriesName = [];

const data = async () => {
  try {
    let updateCountries = jsonData.map((country) => {
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
    // console.log(updateCountries);
    countriesName = jsonData.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};

// data();
// console.log(countriesName.length)

const flag = async (code) => {
  try {
    const data = await axios
      .post(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
        iso2: code,
      })
      .then((response) => console.log(response.data.data.flag));
  } catch (err) {
    console.log(err);
  }
};

// flag("IN");

const getAllFlags = async () => {
  try {
    const data = await axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => console.log(res.data.data.length));
  } catch (err) {
    console.log(err);
  }
};

// getAllFlags();

const addFlags = async () => {
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

    // check if the iso2 of above array is same as the iso2 of the below array using nested for loops

    let count = 0;
    for (let i = 0; i < countryData.length; i++) {
      for (let j = 0; j < flagData.length; j++) {
        if (flagData[j].iso2 === countryData[i].iso2) {
          // if iso2 is same, then add the flag to the country data
          countryData[i].flag = flagData[j].flag;
        }
      }
    }
    console.log(count);
    console.log(countryData[countryData.length - 1]);
  } catch (err) {
    console.log(err);
  }
};

// addFlags();

// remove the country which has no flags to it

const removeCountriesWithNoFlags = async () => {
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

    // check if the iso2 of above array is same as the iso2 of the below array using nested for loops

    let count = 0;
    for (let i = 0; i < countryData.length; i++) {
      for (let j = 0; j < flagData.length; j++) {
        if (flagData[j].iso2 === countryData[i].iso2) {
          // if iso2 is same, then add the flag to the country data
          countryData[i].flag = flagData[j].flag;
        }
      }
    }

    // remove the country which has no flags to it

    countryData = countryData.filter((country) => country.flag);

    console.log(countryData.length);

    // change the previos ids with the new continuos id of the country
    for (let i = 0; i < countryData.length; i++) {
      countryData[i].id = i + 1;
    }
    console.log(countryData[countryData.length - 1]);
  } catch (err) {
    console.log(err);
  }
};

// removeCountriesWithNoFlags();

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
