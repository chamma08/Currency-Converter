import { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {

    // the states for the fields
    const [date, Setdate] = useState();
    const [sourceCurrency, setsourceCurrency] = useState("");
    const [targetCurrency, settargetCurrency] = useState("");
    const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
    const [sourceCurrencyName, setsourceCurrencyName] = useState("");
    const [targetCurrencyName, settargetCurrencyName] = useState("");
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    //get all the currencies
    useEffect(() => {
      const getCurrentNames = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getAllCurrencies");
          // check the status code of the response
          if (response.status === 200) {
            setCurrencyNames(response.data);
          } else {
            // handle unsuccessful responses
            console.error(`Request failed with status code ${response.status}`);
          }
        } catch (err) {
          console.error(err);
        }
      };
      getCurrentNames();
    }, []); 
    


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get("http://localhost:5000/convert" ,{
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
        });

        setamountInTargetCurrency(response.data);

        setLoading(false);
    

      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-blue-300 text-center">Convert Your Currencies Today</h1>
      <p className="lg:mx-32 opacity-60 py-9" >Welcome to our cutting-edge Currency Conversion Web Application, your go-to tool for effortlessly managing international finances. Whether you're a seasoned traveler, a global business professional, or simply someone curious about exchange rates, our platform is designed to provide you with accurate and up-to-date currency conversions in real-time.</p>
      <div className='mt-5 flex items-center  justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>
            
            <div className='mb-4'>
              <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input onChange={(e)=>Setdate(e.target.value)} type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
            </div>

            <div className='mb-4'>
              <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
              <select
                 // Set the selected value
                onChange={(e) => setsourceCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
              >
                <option value="">Select source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
              <select onChange={(e)=>settargetCurrency(e.target.value)} type="text" id={targetCurrency} name={targetCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                <option>Select Target Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
              <input onChange={(e)=>setamountInSourceCurrency(e.target.value)} type="text" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required/>
            </div>

            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
              Get the Target Currency
            </button>

          </form>
        </section>
        <h3 className=" flex items-center justify-start py-5 text-lg">
        {!loading ? (
            <div>
              <span className=" text-xl"> {amountInSourceCurrency}</span>{" "}
              {currencyNames[sourceCurrency]} is equal to
              <span className=" text-xl font-bold text-green-400">
                {" "}
                {amountInTargetCurrency.toFixed(2)} 
              </span>{" "}
              <span className=" text-xl  ">
                {" "}
                 {currencyNames[targetCurrency]}
              </span>{" "}
            </div>
          ) : (
            ""
          )}
        </h3>
      </div>
    </div>
  );
}

