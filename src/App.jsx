import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './pages/Home';
import BuyBikes from './pages/BuyBikes';
import SellBike from './pages/SellBike';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentPage from "./pages/PaymentPage";
import BikeDetails from './pages/BuyBikes/BikeDetails';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar always visible */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyBikes />} />
            <Route path="/buy/:id" element={<BikeDetails />} />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/sell" element={<SellBike />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
