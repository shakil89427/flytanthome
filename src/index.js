import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReactLoading from "react-loading";
import reportWebVitals from "./reportWebVitals";
import StoreProvider from "./Store/StoreProvider";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="z-50 fixed w-full h-screen bg-[#ffffff81] top-0 left-0 flex flex-col items-center justify-center">
              <ReactLoading
                type={"bars"}
                color={"#000000"}
                height={90}
                width={90}
              />
              <p className="text-sm font-semibold mt-1">
                <i>Please Wait...</i>
              </p>
            </div>
          }
        >
          <App />
        </Suspense>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
