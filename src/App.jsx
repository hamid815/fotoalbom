import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Album from "./routes/Album";
import LightRays from "./LightRays";
import "./Splash.css";

/* ===== Splash + Album Wrapper ===== */
function SplashWrapper() {
  const { albumId } = useParams();
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`/data/${albumId}.json`)
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, [albumId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash">
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={1.2}
            rayLength={2.3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.1}
            saturation={1.1}
          />

          <div className="intro">
            <h1 className="logo">FotoAlbom</h1>

            {album && (
              <div className="sub-info">
                <h2>{album.school}</h2>
                <p>
                  {album.class} | {album.year}
                </p>
              </div>
            )}
          </div>
        </div>
        <span className="developer">Deweloper:Xamidjon</span>
      </div>
    );
  }

  return <Album />;
}

/* ===== Main App ===== */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/a/:albumId" element={<SplashWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;