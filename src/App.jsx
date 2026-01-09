import { Route, Routes } from "react-router-dom";
import Header from "./com/header";
import Footer from "./com/fotter";
import Home from "./pages/Home";
import SignInPage from "./pages/SIgn";
import AdminPayments from "./pages/AdminPayments";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/buy" element={<div>Buy</div>} />
        <Route path="/result" element={<div>Result</div>} />
        <Route path="/admin/payments" element={<AdminPayments />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
