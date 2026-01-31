import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Album from "./routes/Album";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home sahifaga kirganda avtomatik birinchi sinfga yo‘naltirish */}
        {/* <Route path="/" element={<Navigate to="/a/8f3kLm92" />} /> */}

        {/* Albom route */}
        <Route path="/a/:albumId" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
