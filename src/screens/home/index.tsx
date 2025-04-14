import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { SWATCHES } from "@/constants";
import TestComponent from "@/components/ui/test";
import LanguageTranslation from "./LanguageTranslation";

interface GeneratedResult {
  expression: string;
  answer: string;
}

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [dictOfVars, setDictOfVars] = useState({});
  const [result, setResult] = useState<GeneratedResult>();
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [lineWidth, setLineWidth] = useState(3);
  // const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);

  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [lineWidth]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;

  //   if (canvas) {
  //     if (isErasing) {
  //       // Change cursor to custom SVG when erasing
  //       canvas.style.cursor = isErasing
  //         ? 'url("/eraser.svg") 0 16, auto'
  //         : "crosshair";

  //       // canvas.style.cursor = "crosshair";
  //       // console.log("Cursor changed to:", canvas.style.cursor);
  //     } else {
  //       // Default cursor
  //       canvas.style.cursor = "default";
  //     }
  //   }
  // }, [isErasing]);

  const renderLatexToCanvas = (expression: string, answer: string) => {
    // Corrected the latex variable to use template literals properly
    // const latex = `\\(${expression} = ${answer}\\)`;
    const latex = `\\(${expression.replace(/ /g, "\\,")} = ${answer}\\)`; // Use `\\,` to insert spaces

    setLatexExpression([...latexExpression, latex]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     canvas.style.background = "black";
  //     const ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       ctx.beginPath();
  //       ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //       setIsDrawing(true);
  //     }
  //   }
  // };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let offsetX, offsetY;

        // ✅ Added touch support: Get correct coordinates on mobile
        if ("touches" in e) {
          e.preventDefault(); // Prevents scrolling when touching the canvas
          const rect = canvas.getBoundingClientRect();
          offsetX = e.touches[0].clientX - rect.left;
          offsetY = e.touches[0].clientY - rect.top;
        } else {
          offsetX = e.nativeEvent.offsetX;
          offsetY = e.nativeEvent.offsetY;
        }

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      }
    }
  };

  // const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       ctx.strokeStyle = color;
  //       ctx.lineWidth = lineWidth;
  //       ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //       ctx.stroke();
  //     }
  //   }
  // };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let offsetX, offsetY;

        // ✅ Added touch support: Get correct coordinates on mobile
        if ("touches" in e) {
          // e.preventDefault(); // Prevents page scrolling while drawing
          const rect = canvas.getBoundingClientRect();
          offsetX = e.touches[0].clientX - rect.left;
          offsetY = e.touches[0].clientY - rect.top;
        } else {
          offsetX = e.nativeEvent.offsetX;
          offsetY = e.nativeEvent.offsetY;
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleErase = () => {
    setColor("rgb(0, 0, 0)"); // Erase color
    // setIsErasing(true);
  };

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/calculate`, // Corrected URL
        data: {
          image: canvas.toDataURL("image/png"),
          dict_of_vars: dictOfVars,
        },
      });

      const resp = response.data; // Changed to direct assignment
      resp.data.forEach((data: Response) => {
        if (data.assign === true) {
          setDictOfVars((prev) => ({
            ...prev,
            [data.expr]: data.result,
          }));
        }
      });

      const ctx = canvas.getContext("2d");
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      let minX = canvas.width,
        minY = canvas.height,
        maxX = 0,
        maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 0) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      setLatexPosition({ x: centerX, y: centerY });
      resp.data.forEach((data: Response) => {
        // const formattedExpression = `${data.expr} = ${data.result}`;
        setTimeout(() => {
          setResult({
            expression: data.expr,
            answer: data.result,
          });
          // renderLatexToCanvas(data.expr, data.result);
          console.log(data.expr);
        }, 1000);
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => setReset(true)}
          className="z-20 bg-orange-500 text-white"
          variant="default"
          color="orange"
        >
          Reset
        </Button>
        {/* <Button
          onClick={() => setColor("rgb(0, 0, 0)")} // Set color to black
          className="z-20 bg-gray-400 text-white"
          variant="default"
          color="black"
        >
          Erase
        </Button> */}

        <Button
          onClick={handleErase}
          className="z-20 bg-gray-400 text-white"
          variant="default"
          color="black"
        >
          Erase
        </Button>

        <Group className="z-20">
          {SWATCHES.map((swatch) => (
            <ColorSwatch
              key={swatch}
              color={swatch}
              onClick={() => setColor(swatch)}
            />
          ))}
        </Group>

        <div className="relative z-50">
          <TestComponent lineWidth={lineWidth} setLineWidth={setLineWidth} />{" "}
        </div>

        <Button
          onClick={runRoute}
          className="z-20 bg-green-500 text-white"
          variant="default"
          color="white"
        >
          Run
        </Button>
      </div>
      {/* <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      /> */}
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        // ✅ Added mobile touch support
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {latexExpression &&
        latexExpression.map((latex, index) => (
          <Draggable
            key={index}
            defaultPosition={latexPosition}
            onStop={(_, data) => setLatexPosition({ x: data.x, y: data.y })}
            // onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
          >
            <div className="absolute p-2 text-white rounded shadow-md">
              <div className="latex-content">{latex}</div>
            </div>
          </Draggable>
        ))}

      {result && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded">
          <p className="text-lg font-bold">Expression: {result.expression}</p>
          <p className="text-lg">Answer: {result.answer}</p>

          {/* ✅ Updated to pass both expression and answer */}
          <LanguageTranslation
            expression={result.expression}
            response={result.answer}
          />
        </div>
      )}

      {/* {result && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded">
          <p className="text-lg font-bold">Expression: {result.expression}</p>
          <p className="text-lg">Answer: {result.answer}</p>

       
          <LanguageTranslation response={result?.answer || ""} />
        </div>
      )} */}
    </>
  );
}

// import { ColorSwatch, Group } from "@mantine/core";
// import { Button } from "@/components/ui/button";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Draggable from "react-draggable";
// import { SWATCHES } from "@/constants";
// import TestComponent from "@/components/ui/test";
// // import { LazyBrush } from 'lazy-brush';

// interface GeneratedResult {
//   expression: string;
//   answer: string;
// }

// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// export default function Home() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("rgb(255, 255, 255)");
//   const [reset, setReset] = useState(false);
//   const [dictOfVars, setDictOfVars] = useState({});
//   const [result, setResult] = useState<GeneratedResult>();
//   const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
//   const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
//   const [lineWidth, setLineWidth] = useState(3);

//   // const lazyBrush = new LazyBrush({
//   //   radius: 10,
//   //   enabled: true,
//   //   initialPoint: { x: 0, y: 0 },
//   // });

//   useEffect(() => {
//     if (latexExpression.length > 0 && window.MathJax) {
//       setTimeout(() => {
//         window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
//       }, 0);
//     }
//   }, [latexExpression]);

//   useEffect(() => {
//     if (result) {
//       renderLatexToCanvas(result.expression, result.answer);
//     }
//   }, [result]);

//   useEffect(() => {
//     if (reset) {
//       resetCanvas();
//       setLatexExpression([]);
//       setResult(undefined);
//       setDictOfVars({});
//       setReset(false);
//     }
//   }, [reset]);

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight - canvas.offsetTop;
//         ctx.lineCap = "round";
//         ctx.lineWidth = lineWidth;

//         // Initial background color set to black
//         ctx.fillStyle = "black";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//     const script = document.createElement("script");
//     script.src =
//       "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.MathJax.Hub.Config({
//         tex2jax: {
//           inlineMath: [
//             ["$", "$"],
//             ["\\(", "\\)"],
//           ],
//         },
//       });
//     };

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   const renderLatexToCanvas = (expression: string, answer: string) => {
//     const latex = `${expression} = ${answer}`;
//     setLatexExpression([...latexExpression, latex]);

//     // Clear the main canvas
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const resetCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const getEventPosition = (e: React.MouseEvent | React.TouchEvent) => {
//     if (e.nativeEvent instanceof MouseEvent) {
//       return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
//     } else {
//       const touch = e.nativeEvent.touches[0];
//       const rect = canvasRef.current?.getBoundingClientRect();
//       if (rect) {
//         return {
//           offsetX: touch.clientX - rect.left,
//           offsetY: touch.clientY - rect.top,
//         };
//       }
//       return { offsetX: 0, offsetY: 0 };
//     }
//   };

//   const startDrawing = (
//     e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
//   ) => {
//     const canvas = canvasRef.current;
//     const { offsetX, offsetY } = getEventPosition(e);

//     if (canvas) {
//       canvas.style.background = "black";
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.beginPath();
//         ctx.moveTo(offsetX, offsetY);
//         setIsDrawing(true);
//       }
//     }
//   };

//   const draw = (
//     e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
//   ) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     const { offsetX, offsetY } = getEventPosition(e);

//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.strokeStyle = color;
//         ctx.lineWidth = lineWidth;
//         ctx.lineTo(offsetX, offsetY);
//         ctx.stroke();
//       }
//     }
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const runRoute = async () => {
//     const canvas = canvasRef.current;

//     if (canvas) {
//       const response = await axios({
//         method: "post",
//         url: `${import.meta.env.VITE_API_URL}/calculate`,
//         data: {
//           image: canvas.toDataURL("image/png"),
//           dict_of_vars: dictOfVars,
//         },
//       });

//       const resp = await response.data;
//       console.log("Response", resp);
//       resp.data.forEach((data: Response) => {
//         if (data.assign === true) {
//           setDictOfVars({
//             ...dictOfVars,
//             [data.expr]: data.result,
//           });
//         }
//       });
//       const ctx = canvas.getContext("2d");
//       const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
//       let minX = canvas.width,
//         minY = canvas.height,
//         maxX = 0,
//         maxY = 0;

//       for (let y = 0; y < canvas.height; y++) {
//         for (let x = 0; x < canvas.width; x++) {
//           const i = (y * canvas.width + x) * 4;
//           if (imageData.data[i + 3] > 0) {
//             minX = Math.min(minX, x);
//             minY = Math.min(minY, y);
//             maxX = Math.max(maxX, x);
//             maxY = Math.max(maxY, y);
//           }
//         }
//       }

//       const centerX = (minX + maxX) / 2;
//       const centerY = (minY + maxY) / 2;

//       setLatexPosition({ x: centerX, y: centerY });
//       resp.data.forEach((data: Response) => {
//         setTimeout(() => {
//           setResult({
//             expression: data.expr,
//             answer: data.result,
//           });
//         }, 1000);
//       });
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-3 gap-2">
//         <Button
//           onClick={() => setReset(true)}
//           className="z-20 bg-orange-500 text-white"
//           variant="default"
//           color="orange"
//         >
//           Reset
//         </Button>
//         <Button
//           onClick={() => setColor("rgb(0, 0, 0)")}
//           className="z-20 bg-gray-400 text-white"
//           variant="default"
//           color="black"
//         >
//           Erase
//         </Button>

//         <Group className="z-20">
//           {SWATCHES.map((swatch) => (
//             <ColorSwatch
//               key={swatch}
//               color={swatch}
//               onClick={() => setColor(swatch)}
//             />
//           ))}
//         </Group>

//         <div className="relative z-50">
//           <TestComponent lineWidth={lineWidth} setLineWidth={setLineWidth} />
//         </div>

//         <Button
//           onClick={runRoute}
//           className="z-20 bg-green-500 text-white"
//           variant="default"
//           color="white"
//         >
//           Run
//         </Button>
//       </div>
//       <canvas
//         ref={canvasRef}
//         id="canvas"
//         className="absolute top-0 left-0 w-full h-full"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseOut={stopDrawing}
//         onTouchStart={startDrawing}
//         onTouchMove={draw}
//         onTouchEnd={stopDrawing}
//       />

//       {latexExpression &&
//         latexExpression.map((latex, index) => (
//           <Draggable
//             key={index}
//             position={{ x: latexPosition.x, y: latexPosition.y }}
//           >
//             <div
//               className="text-white text-lg z-20"
//               dangerouslySetInnerHTML={{ __html: `$${latex}$` }}
//             />
//           </Draggable>
//         ))}
//     </>
//   );
// }
