import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
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
            <div className="barwrapper">
              <div className="barmain">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
              </div>
              <p className="bartext">
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
