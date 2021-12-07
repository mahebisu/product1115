import React from "react";
import BukkenTouroku from "./components/BukkenTouroku/BukkenTouroku";
import TitlePage from "./components/TitlePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import UserReg from "./components/UserReg/UserReg";
import UserReg2 from "./components/UserReg/UserReg2";
import NyusatsuIchiran from "./components/NyusatsuIchiran/NyusatsuIchiran";
import NyusatsuShosai from "./components/NyusatsuIchiran/NyusatsuShosai";

function App() {

  return (
    <div className="App">

      {/* react-router-domはv6から書き方変わっているので注意 */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/Landing" element={<Landing />} />
            <Route exact path="/UserReg" element={<UserReg />} />
            <Route exact path="/UserReg2" element={<UserReg2 />} />
            <Route exact path="/BukkenTouroku" element={<BukkenTouroku />} />
            <Route exact path="/NyusatsuIchiran" element={<NyusatsuIchiran />} />
            <Route exact path="/NyusatsuShosai" element={<NyusatsuShosai />} />
            <Route exact path="/" element={<TitlePage />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
