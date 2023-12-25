// React
import { useEffect, useState, useCallback } from "react";
// React Router
import { Route, Routes } from "react-router-dom";
// Google Analytics
import ReactGA from "react-ga4";
// Redux
import { useSelector } from "react-redux";
// Global styles
import "./App.scss";
import { darkBackgroundColor, lightBackgroundColor } from "./config";
// Global components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
// Snowfall
import Snowfall from "react-snowfall";
import ConfirmAudioModal from "./components/ConfrimAudioModal/ConfirmAudioModal";
// Howler
import christmasMusic from "./assets/music/christmas.mp3";
import { Howl } from "howler";
// Routes
import ChristmasStoriesRoute from "./routes/christmas-stories";
import ChristmasStoryRoute from "./routes/christmas-story";
import HomeRoute from "./routes/home";
import NotFoundRoute from "./routes/not-found";
import DeviceInfoPrivacyPolicyRoute from "./routes/apps/DeviceInfoPrivacyPolicy";

let christmasSoundHowler = null;

const App = () => {
  const themeState = useSelector((state) => state.theme);
  const musicState = useSelector((state) => state.music);
  const [acceptAudio, setAcceptAudio] = useState(false);

  // Google Analytics
  ReactGA.initialize("G-XN8S38R7HZ");

  // Memorize the function to reduce unnecessary component rerender
  const setAcceptAudioModal = useCallback(() => {
    setAcceptAudio(true);
  }, [acceptAudio]);

  useEffect(() => {
    const theme = themeState.theme;

    // Create meta color tag
    const metaColorTag = document.createElement("meta");
    metaColorTag.setAttribute("name", "theme-color");

    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      metaColorTag.content = darkBackgroundColor;
      // Add color scheme CSS-property to HTML-tag
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.body.classList.remove("dark-theme");
      metaColorTag.content = lightBackgroundColor;
      // Add color scheme CSS-property to HTML-tag
      document.documentElement.style.colorScheme = "light";
    }
    // Append meta tag color to header and delete if exists previous
    if (document.querySelector(`meta[name="theme-color"]`)) {
      document.querySelector(`meta[name="theme-color"]`).remove();
    }
    document.getElementsByTagName("head")[0].appendChild(metaColorTag);
  }, [themeState.theme]);

  useEffect(() => {
    // Setup the new Howl
    christmasSoundHowler = new Howl({
      src: [christmasMusic],
      loop: true,
      onplayerror: () => {
        christmasSoundHowler.once("unlock", function () {
          christmasSoundHowler.play();
        });
      },
    });

    christmasSoundHowler.play();
  }, []);

  useEffect(() => {
    if (!musicState.play) {
      // Mute the sound
      christmasSoundHowler.mute(true);
    } else {
      // Play the sound
      christmasSoundHowler.mute(false);
    }
  }, [musicState.play]);

  return (
    <>
      <div id="app" className={`app`}>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route
              path="/christmas-stories"
              element={<ChristmasStoriesRoute />}
            />
            <Route
              path="/christmas-stories/:christmasStorySlug"
              element={<ChristmasStoryRoute />}
            />
            <Route
              path="/apps/device-info-privacy-policy"
              element={<DeviceInfoPrivacyPolicyRoute />}
            />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </Layout>
        {/* <Footer /> */}
      </div>
      <Snowfall style={{ zIndex: 5000 }} />
      <ConfirmAudioModal open={!acceptAudio} onClose={setAcceptAudioModal} />
    </>
  );
};

export default App;
