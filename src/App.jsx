import Header from "./components/Header.jsx";
// import "./css/App.css";
import Navbar from "./components/Navbar.jsx";
import Container from "./components/Container";

function App() {
  return (
    <div className=" w-[100vw] h-[100vh] bg-red-500 text-white grid grid-rows-[75px_1fr_76px]">
      <Header />
      <Container />
      <Navbar />
    </div>
  );
}

export default App;
