import React from "react";
import BukkenTouroku from "./components/BukkenTouroku/BukkenTouroku";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import UserReg from "./components/UserReg/UserReg";
import UserReg2 from "./components/UserReg/UserReg2";
import NyusatsuIchiran from "./components/NyusatsuIchiran/NyusatsuIchiran";
import NyusatsuShosai from "./components/NyusatsuIchiran/NyusatsuShosai";
import LandingGyosha from "./components/LandingGyosha/LandingGyosha";
import GyoshaReg from "./components/GyoshaReg/GyoshaReg";
import GyoshaReg2 from "./components/GyoshaReg/GyoshaReg2";
import ProjectIchiran from "./components/ProjectIchiran/ProjectIchiran";
import ProjectShosai from "./components/ProjectIchiran/ProjectShosai";
import ProjectNyusatsu from "./components/ProjectIchiran/ProjectNyusatsu";

import Login from "./components/Login/Login";
import LoginGyosha from "./components/Login/LoginGyosha";

function App() {

  return (
    <div className="App">

      {/* react-router-domはv6から書き方変わっているので注意 */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/LoginGyosha" element={<LoginGyosha />} />

            <Route exact path="/UserReg" element={<UserReg />} />
            <Route exact path="/UserReg2" element={<UserReg2 />} />
            <Route exact path="/BukkenTouroku" element={<BukkenTouroku />} />
            <Route exact path="/NyusatsuIchiran" element={<NyusatsuIchiran />} />
            <Route exact path="/NyusatsuShosai" element={<NyusatsuShosai />} />
            <Route exact path="/LandingGyosha" element={<LandingGyosha />} />
            <Route exact path="/GyoshaReg" element={<GyoshaReg />} />
            <Route exact path="/GyoshaReg2" element={<GyoshaReg2 />} />
            <Route exact path="/ProjectIchiran" element={<ProjectIchiran />} />
            <Route exact path="/ProjectShosai" element={<ProjectShosai />} />
            <Route exact path="/ProjectNyusatsu" element={<ProjectNyusatsu />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
