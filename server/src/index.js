const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Enable cors at the server side
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));



//all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const namesURl = "https://openexchangerates.org/api/currencies.json?app_id=e0e481b1a9b44b298a57105068dc6d04";
  try {
    const namesResponse = await axios.get(namesURl);
    const namesData = namesResponse.data;

    return res.json(namesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
  
});

//get target amount
app.get("/convert", async (req,res) =>{
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=e0e481b1a9b44b298a57105068dc6d04`;
  try {
    

    const response = await axios.get(dataURL);
    const data = response.data;

    // Check the data is valid
    if (!data || response.status !== 200) {
      throw new Error("Unable to fetch exchange rates");
    }

    const rates = data.rates;

    //rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount);

  } catch (err) {
    console.error(err);
  }
})

// Middleware
app.use(express.json());
app.use(cors());

// Port
app.listen(5000, () => {
    console.log("Server started on port 5000");
  });