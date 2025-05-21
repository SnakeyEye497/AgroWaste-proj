// import React, { useState } from "react";

// const App = () => {
//   const [cropType, setCropType] = useState("");
//   const [wasteType, setWasteType] = useState("");
//   const [farmSize, setFarmSize] = useState("");
//   const [predictedWaste, setPredictedWaste] = useState(null);
//   const [wastePrice, setWastePrice] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingPrice, setIsLoadingPrice] = useState(false);

//   // Dropdown Options
//   const cropOptions = ["Soybean", "Wheat", "Sugarcane", "Rice", "Sunflower", "Barley"];
//   const wasteOptions = ["Husks", "Leaves", "Stalks", "Residues", "Straw"];

//   // 🔹 Predict Waste Function
  // const handlePredictWaste = async () => {
  //   setIsLoading(true);
  //   setError("");
  //   setPredictedWaste(null);
  //   setWastePrice(null);

  //   console.log("Sending data for waste prediction:", { cropType, wasteType, farmSize });

  //   // Validation: Check if inputs are provided
  //   if (!cropType || !wasteType || !farmSize) {
  //     setError("Please select crop type, waste type, and enter farm size.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/api/predict", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         cropType,
  //         wasteType,
  //         farmSize: parseFloat(farmSize),
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("Waste prediction response:", data);

  //     if (data.success) {
  //       setPredictedWaste(data.predictedWaste);
  //     } else {
  //       setError(data.error || "Error predicting waste. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("API error:", err);
  //     setError("Error predicting waste. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // 🔹 Predict Price Function
  // const handlePredictPrice = async () => {
  //   setIsLoadingPrice(true);
  //   setError("");
  //   setWastePrice(null);

  //   console.log("Sending data for price prediction:", { cropType, wasteType, farmSize, predictedWaste });

  //   // Validation: Ensure required values exist
  //   if (!cropType || !wasteType || !farmSize || !predictedWaste) {
  //     setError("Please complete the waste prediction first.");
  //     setIsLoadingPrice(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/api/predict_price", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         cropType,
  //         wasteType,
  //         farmSize: parseFloat(farmSize),
  //         predictedWaste: parseFloat(predictedWaste),
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("Price prediction response:", data);

  //     if (data.success) {
  //       setWastePrice(data.wastePrice);
  //     } else {
  //       setError(data.error || "Error predicting price. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("API error:", err);
  //     setError("Error predicting price. Please try again.");
  //   } finally {
  //     setIsLoadingPrice(false);
  //   }
  // };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       {/* Page Header */}
//       <header className="w-full max-w-4xl mb-8 text-center">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
//           Crop Waste & Price Prediction
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Predict agricultural waste quantities and potential market prices based on crop type, waste type, and farm size
//         </p>
//       </header>

//       <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
//         {/* Crop Waste Prediction Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crop Waste Prediction</h2>
          
//           <div className="space-y-4">
//             {/* Crop Type Dropdown */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Crop Type</label>
//               <select 
//                 value={cropType} 
//                 onChange={(e) => setCropType(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="">Select Crop Type</option>
//                 {cropOptions.map((crop, index) => (
//                   <option key={index} value={crop}>{crop}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Waste Type Dropdown */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Waste Type</label>
//               <select 
//                 value={wasteType} 
//                 onChange={(e) => setWasteType(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="">Select Waste Type</option>
//                 {wasteOptions.map((waste, index) => (
//                   <option key={index} value={waste}>{waste}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Farm Size Input */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Farm Size (hectares)</label>
//               <input
//                 type="number"
//                 value={farmSize}
//                 onChange={(e) => setFarmSize(e.target.value)}
//                 placeholder="Enter farm size"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             {/* Predict Waste Button */}
//             <button 
//               onClick={handlePredictWaste} 
//               disabled={isLoading}
//               className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${
//                 isLoading 
//                   ? 'bg-gray-400 cursor-not-allowed' 
//                   : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
//               }`}
//             >
//               {isLoading ? "Predicting..." : "Predict Waste"}
//             </button>

//             {/* Prediction Result */}
//             {predictedWaste !== null && (
//               <div className="text-center mt-4">
//                 <p className="text-green-600 font-bold">
//                   Predicted Waste: {predictedWaste} tons
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Waste Price Prediction Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Waste Price Prediction</h2>
          
//           <div className="space-y-4">
//             {/* Predicted Waste Input */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Predicted Waste (tons)</label>
//               <input
//                 type="number"
//                 value={predictedWaste || ""}
//                 disabled
//                 placeholder="Predicted waste will appear here"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Predict Price Button */}
//             <button 
//               onClick={handlePredictPrice} 
//               disabled={isLoadingPrice || !predictedWaste}
//               className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${
//                 isLoadingPrice || !predictedWaste
//                   ? 'bg-gray-400 cursor-not-allowed' 
//                   : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
//               }`}
//             >
//               {isLoadingPrice ? "Predicting..." : "Predict Price"}
//             </button>

//             {/* Price Prediction Result */}
//             {wastePrice !== null && (
//               <div className="text-center mt-4">
//                 <p className="text-blue-600 font-bold">
//                   Predicted Price: ₹{wastePrice} per ton
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="md:col-span-2 text-center">
//             <p className="text-red-600 font-bold bg-red-100 p-3 rounded-md">
//               {error}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;





import React, { useState } from "react";

const App = () => {
  const [cropType, setCropType] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [predictedWaste, setPredictedWaste] = useState(null);
  const [wastePrice, setWastePrice] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  
  // New state for Gemini insights
  const [geminiInsights, setGeminiInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Dropdown Options
  const cropOptions = ["Soybean", "Wheat", "Sugarcane", "Rice", "Sunflower", "Barley"];
  const wasteOptions = ["Husks", "Leaves", "Stalks", "Residues", "Straw"];

  // 🔹 Predict Waste Function
  const handlePredictWaste = async () => {
    setIsLoading(true);
    setError("");
    setPredictedWaste(null);
    setWastePrice(null);

    console.log("Sending data for waste prediction:", { cropType, wasteType, farmSize });

    // Validation: Check if inputs are provided
    if (!cropType || !wasteType || !farmSize) {
      setError("Please select crop type, waste type, and enter farm size.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          wasteType,
          farmSize: parseFloat(farmSize),
        }),
      });

      const data = await response.json();
      console.log("Waste prediction response:", data);

      if (data.success) {
        setPredictedWaste(data.predictedWaste);
      } else {
        setError(data.error || "Error predicting waste. Please try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Error predicting waste. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Predict Price Function
  const handlePredictPrice = async () => {
    setIsLoadingPrice(true);
    setError("");
    setWastePrice(null);

    console.log("Sending data for price prediction:", { cropType, wasteType, farmSize, predictedWaste });

    // Validation: Ensure required values exist
    if (!cropType || !wasteType || !farmSize || !predictedWaste) {
      setError("Please complete the waste prediction first.");
      setIsLoadingPrice(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict_price", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          wasteType,
          farmSize: parseFloat(farmSize),
          predictedWaste: parseFloat(predictedWaste),
        }),
      });

      const data = await response.json();
      console.log("Price prediction response:", data);

      if (data.success) {
        setWastePrice(data.wastePrice);
      } else {
        setError(data.error || "Error predicting price. Please try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Error predicting price. Please try again.");
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // 🔹 Fetch Gemini Insights Function
  const handleFetchGeminiInsights = async () => {
    setIsLoadingInsights(true);
    setError("");

    // Prepare the prediction output string
    const predictionOutput = `
Crop: ${cropType}
Hectares: ${farmSize}
Predicted Waste: ${predictedWaste} tons
Predicted Price: ₹${wastePrice} per ton
Waste Type: ${wasteType}
    `;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/gemini_insights", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prediction_output: predictionOutput
        }),
      });

      const data = await response.json();
      console.log("Gemini insights response:", data);

      if (data.success) {
        setGeminiInsights(data.insights);
      } else {
        setError(data.error || "Error fetching Gemini insights. Please try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Error fetching Gemini insights. Please try again.");
    } finally {
      setIsLoadingInsights(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Page Header */}
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Crop Waste & Price Prediction
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Predict agricultural waste quantities and potential market prices based on crop type, waste type, and farm size
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Crop Waste Prediction Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crop Waste Prediction</h2>
          
          <div className="space-y-4">
            {/* Crop Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Crop Type</label>
              <select 
                value={cropType} 
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Crop Type</option>
                {cropOptions.map((crop, index) => (
                  <option key={index} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {/* Waste Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Waste Type</label>
              <select 
                value={wasteType} 
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Waste Type</option>
                {wasteOptions.map((waste, index) => (
                  <option key={index} value={waste}>{waste}</option>
                ))}
              </select>
            </div>

            {/* Farm Size Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Farm Size (hectares)</label>
              <input
                type="number"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder="Enter farm size"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Predict Waste Button */}
            <button 
              onClick={handlePredictWaste} 
              disabled={isLoading}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              }`}
            >
              {isLoading ? "Predicting..." : "Predict Waste"}
            </button>

            {/* Prediction Result */}
            {predictedWaste !== null && (
              <div className="text-center mt-4">
                <p className="text-green-600 font-bold">
                  Predicted Waste: {predictedWaste} tons
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Waste Price Prediction Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Waste Price Prediction</h2>
          
          <div className="space-y-4">
            {/* Predicted Waste Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Predicted Waste (tons)</label>
              <input
                type="number"
                value={predictedWaste || ""}
                disabled
                placeholder="Predicted waste will appear here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Predict Price Button */}
            <button 
              onClick={handlePredictPrice} 
              disabled={isLoadingPrice || !predictedWaste}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${
                isLoadingPrice || !predictedWaste
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isLoadingPrice ? "Predicting..." : "Predict Price"}
            </button>

            {/* Price Prediction Result */}
            {wastePrice !== null && (
              <div className="text-center mt-4">
                <p className="text-blue-600 font-bold">
                  Predicted Price: ₹{wastePrice} per ton
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Gemini Insights Card */}
        {(predictedWaste !== null && wastePrice !== null) && (
          <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
              <button 
                onClick={handleFetchGeminiInsights} 
                disabled={isLoadingInsights}
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
                  isLoadingInsights 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
                }`}
              >
                {isLoadingInsights ? "Loading Insights..." : "Get AI Insights"}
              </button>
            </div>

            {/* Insights Display with Scrollbar */}
            {geminiInsights && (
              <div className="max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {geminiInsights}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="md:col-span-2 text-center">
            <p className="text-red-600 font-bold bg-red-100 p-3 rounded-md">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;