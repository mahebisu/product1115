import React from "react";
import BukkenTouroku from "./components/BukkenTouroku";
import TitlePage from "./components/TitlePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";

function App() {

  return (
    <div className="App">

      {/* react-router-domはv6から書き方変わっているので注意 */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TitlePage />} />
            <Route exact path="/BukkenTouroku" element={<BukkenTouroku />} />
            <Route exact path="/Landing" element={<Landing />} />

          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
