import React, { useState, useEffect } from "react";

// const LanguageTranslation = ({ response }: { response: string }) => {
//   const [fromLang, setFromLang] = useState("auto");
//   const [toLang, setToLang] = useState("fr");
//   const [translatedText, setTranslatedText] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   // ✅ Ensure speech synthesis is available
//   useEffect(() => {
//     if (!window.speechSynthesis) {
//       console.error("Speech Synthesis not supported in this browser.");
//     }
//   }, []);

//   // ✅ Function to format response properly
//   const formatResponse = (response: string) => {
//     return response.includes("=")
//       ? response.replace("=", " = ") // Add spaces around '=' for clarity
//       : response;
//   };

//   const translateText = async () => {
//     try {
//       const formattedResponse = formatResponse(response); // ✅ Ensure full response is sent

//       const res = await fetch("http://localhost:8900/translator/translate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text: formattedResponse, // ✅ Send formatted response
//           from_lang: fromLang,
//           to_lang: toLang,
//         }),
//       });

//       const data = await res.json();
//       console.log("Translation Response:", data); // ✅ Debugging API response

//       if (data.translated) {
//         setTranslatedText(data.translated);
//       } else {
//         setTranslatedText("Translation failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Translation Error:", error);
//       setTranslatedText("Error in translation.");
//     }
//   };

//   // ✅ Fixed Speech Synthesis (Prevents overlapping voices)
//   const speakText = (text: string, lang: string = "en-US") => {
//     if (!text) return; // Prevent empty speech
//     const synth = window.speechSynthesis;
//     synth.cancel(); // Stop any ongoing speech before starting new one

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang === "auto" ? "en-US" : lang; // Default "auto" to "en-US"
//     synth.speak(utterance);
//   };

//   return (
//     <>
//       {response && (
//         <button
//           className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition"
//           onClick={() => setShowPopup(true)}
//         >
//           Translate 🌐
//         </button>
//       )}

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96 text-black">
//             <h3 className="text-lg font-bold text-black">Original Response</h3>
//             <p className="text-lg flex items-center text-black">
//               {formatResponse(response)}{" "}
//               <button onClick={() => speakText(response, fromLang)}>🔊</button>
//             </p>

//             <div className="flex gap-2 mt-4">
//               <label className="text-sm font-semibold">From:</label>
//               <select
//                 value={fromLang}
//                 onChange={(e) => setFromLang(e.target.value)}
//                 className="border p-1"
//               >
//                 <option value="auto">Auto Detect</option>
//                 <option value="en">English</option>
//                 <option value="fr">French</option>
//                 <option value="es">Spanish</option>
//               </select>

//               <label className="text-sm font-semibold">To:</label>
//               <select
//                 value={toLang}
//                 onChange={(e) => setToLang(e.target.value)}
//                 className="border p-1"
//               >
//                 <option value="fr">French</option>
//                 <option value="es">Spanish</option>
//                 <option value="de">German</option>
//                 <option value="te">Telugu</option>
//                 <option value="hi">Hindi</option>
//               </select>
//             </div>

//             <button
//               className="mt-4 bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition"
//               onClick={translateText}
//             >
//               Translate
//             </button>

//             {translatedText && (
//               <p className="text-lg mt-4 flex items-center text-black">
//                 {translatedText}{" "}
//                 <button onClick={() => speakText(translatedText, toLang)}>
//                   🔊
//                 </button>
//               </p>
//             )}

//             <button
//               className="mt-4 bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition"
//               onClick={() => setShowPopup(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LanguageTranslation;
interface LanguageTranslationProps {
  expression: string;
  response: string;
}

const LanguageTranslation: React.FC<LanguageTranslationProps> = ({
  expression,
  response,
}) => {
  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("fr");
  const [translatedText, setTranslatedText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis not supported in this browser.");
    }
  }, []);

  // const translateText = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8900/translator/translate", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         text: response,
  //         from_lang: fromLang,
  //         to_lang: toLang,
  //       }),
  //     });

  //     const data = await res.json();
  //     console.log("Translation Response:", data);

  //     if (data.translated) {
  //       setTranslatedText(data.translated);
  //     } else {
  //       setTranslatedText("Translation failed. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("Translation Error:", error);
  //     setTranslatedText("Error in translation.");
  //   }
  // };

  const translateText = async () => {
    try {
      const fullText = `${expression} = ${response}`; // ✅ Include both expression and response

      const res = await fetch("https://ai-smart-sketch-analyzer-be.onrender.com/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText, // ✅ Send full text for translation
          from_lang: fromLang,
          to_lang: toLang,
        }),
      });

      const data = await res.json();
      console.log("Translation Response:", data);

      if (data.translated) {
        setTranslatedText(data.translated);
      } else {
        setTranslatedText("Translation failed. Try again.");
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Error in translation.");
    }
  };

  const speakText = (text: string, lang: string = "en-US") => {
    if (!text) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "auto" ? "en-US" : lang;
    synth.speak(utterance);
  };

  return (
    <>
      {response && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition"
          onClick={() => setShowPopup(true)}
        >
          Translate 🌐
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-black">
            <h3 className="text-lg font-bold text-black">Original Response</h3>
            <p className="text-lg flex items-center text-black">
              {expression} = {response}
              <button
                onClick={() =>
                  speakText(`${expression} equals ${response}`, fromLang)
                }
              >
                🔊
              </button>
            </p>

            <div className="flex gap-2 mt-4">
              <label className="text-sm font-semibold">From:</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="border p-1"
              >
                <option value="auto">Auto Detect</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>

              <label className="text-sm font-semibold">To:</label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="border p-1"
              >
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="te">Telugu</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <button
              className="mt-4 bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition"
              onClick={translateText}
            >
              Translate
            </button>

            {translatedText && (
              <p className="text-lg mt-4 flex items-center text-black">
                {translatedText}
                {/* <button onClick={() => speakText(translatedText, toLang)}>🔊</button> */}
                <button onClick={() => speakText(translatedText, toLang)}>
                  🔊
                </button>
              </p>
            )}

            <button
              className="mt-4 bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageTranslation;
