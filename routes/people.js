const express = require("express");
const router = express.Router();
const axios = require('axios');

// @route   GET people/peopleInLondon
// @desc    Get all people that are either listed to live in London or live within 60 miles of London. 
// @access  Public

router.get("/peopleInLondon", (req, res) => {

let coordEndPoint = "https://bpdts-test-app-v4.herokuapp.com/users"; 

let cityEndPoint = "https://bpdts-test-app-v4.herokuapp.com/city/London/users";

const requestOne = axios.get(coordEndPoint);

const requestTwo = axios.get(cityEndPoint);	

let result = [];

axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
	
	responses[0].data.forEach(function (item, index) {
		  if (item.latitude >= 50 && item.latitude <= 52 && item.longitude >= -1 && item.longitude <= 1) {
		  	result.push(item);
		  }
	})

	responses[1].data.forEach(function (item, index) {
                result.push(item);
        })

	res.send(result);

  })).catch(error => {
	  console.log(error);
  });

});

module.exports = router;
