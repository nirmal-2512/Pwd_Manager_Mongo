import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navbar />
        <Manager />
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
