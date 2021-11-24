import React from "react";
import BukkenTouroku from "./components/BukkenTouroku";
import TitlePage from "./components/TitlePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div className="App">

      {/* react-router-domはv6から書き方変わっているので注意 */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TitlePage />} />
            <Route exact path="/BukkenTouroku" element={<BukkenTouroku />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
