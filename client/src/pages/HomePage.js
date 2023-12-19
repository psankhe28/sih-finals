import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { SignUp, Login, Homepage } from "./index";
import { StudentProfile } from "./Student";
import {
  AddScheme,
  AcceptedApplicants,
  PendingApplicants,
  StateProfile,
} from "./State";
import { InstitutionProfile, Accepted, Pending } from "./Institution";
import { StudentNav, StateNav, InstituteNav } from "./Sidebar";
import VerifiedId from "./Student/VerifiedCard/Card";

// components
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import LandingPg from "./LandingPg/LandingPg";
import ViewScheme from "./State/ViewScheme/ViewScheme";
import Scheme from "./Student/Schemes/Scheme";
import SchemeHistory from "./Student/SchemeHistory/SchemeHistory";
import Usp from "../UniqueSellingPoint/verifyDigitalID";

const StateWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar navItemsData={StateNav} />
      <main className="content mt-4">
        {/* <Navbar /> */}
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

const StudentWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar navItemsData={StudentNav} />
      <main className="content mt-4">
        {/* <Navbar /> */}
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

const InstitutionWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar navItemsData={InstituteNav} />
      <main className="content mt-4">
        {/* <Navbar /> */}
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

const HomePage = () => {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/"} element={<LandingPg />} />
          <Route path={"/login"} element={<Login setToken={setToken} />} />

          <Route
            exact
            path={"/student/profile"}
            element={<StudentWithSidebar component={StudentProfile} />}
          />
          <Route
            exact
            path={"/student/schemes"}
            element={<StudentWithSidebar component={Scheme} />}
          />
          <Route
            exact
            path={"/student/applied-schemes"}
            element={<StudentWithSidebar component={SchemeHistory} />}
          />
          {/* <Route
            exact
            path={"/student/verified-card"}
            element={<StudentWithSidebar component={VerifiedId} />}
          /> */}
          {/* <Route path={"/card"} element={<VerifiedId token={token} />} /> */}
          <Route
            exact
            path={"/state/profile"}
            element={<StateWithSidebar component={StateProfile} />}
          />
          <Route
            exact
            path={"/state/view-schemes"}
            element={<StateWithSidebar component={ViewScheme} />}
          />
          <Route
            exact
            path={"/state/accepted-applicants"}
            element={<StateWithSidebar component={AcceptedApplicants} />}
          />
          <Route
            exact
            path={"/state/pending-applicants"}
            element={<StateWithSidebar component={PendingApplicants} />}
          />

          <Route
            exact
            path={"/institute/profile"}
            element={<InstitutionWithSidebar component={InstitutionProfile} />}
          />
          <Route
            exact
            path={"/institute/accepted-applicants"}
            element={<InstitutionWithSidebar component={Accepted} />}
          />
          <Route
            exact
            path={"/institute/pending-applicants"}
            element={<InstitutionWithSidebar component={Pending} />}
          />
          <Route
            exact
            path={"/usp"}
            element={<Usp/>}
          />

          {token ? (
            <Route path={"/homepage"} element={<Homepage token={token} />} />
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
      <df-messenger
        intent="WELCOME"
        chat-title="SIH_2023"
        agent-id="30844c74-45ee-46f7-9b07-3401947e4342"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default HomePage;
