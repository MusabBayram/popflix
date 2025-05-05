import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import PersonDetailPage from "./pages/PersonDetail";
import TVDetail from "./pages/TVDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/person/:id" element={<PersonDetailPage />} />
        <Route path="/tv/:id" element={<TVDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
