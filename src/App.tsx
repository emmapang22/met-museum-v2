import { Route, Routes } from "react-router";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App;
