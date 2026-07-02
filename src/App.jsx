import Header from "./components/Header.jsx";
// import "./css/App.css";
import Navbar from "./components/Navbar.jsx";
import Container from "./components/Container";

function App() {
  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />
      <Container />
      <Navbar />
    </div>
  );
}

export default App;
