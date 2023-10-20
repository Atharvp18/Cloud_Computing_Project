const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';

async function getCoordsForAddress(address) {
  return {
     lat: 40.7484474,
     lng: -73.9871516
  };
}

module.exports = getCoordsForAddress;
