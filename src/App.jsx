import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import BrandFeed from './pages/BrandFeed';
import UserFeed from './pages/UserFeed';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import BrandCreatePost from './pages/BrandCreatePost';
import BrandDashboard from './pages/BrandDashboard';
import BrandOrders from './pages/BrandOrders';
import BrandProfile from './pages/BrandProfile';
import Footer from './components/footer';
import CartPage from './pages/CartPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import { SearchProvider } from './context/SearchContext';
import OffersPage from './pages/OffersPage';
import OfferCard from './components/OfferCard';
import { Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <SearchProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/brand-feed" replace />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brand-feed" element={<BrandFeed />} />
        <Route path="/user-feed" element={<UserFeed />} />
        <Route path="/OffersPage" element={<OffersPage />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/brand/create" element={<BrandCreatePost />} />
        <Route path="/brand/dashboard" element={<BrandDashboard />} />
        <Route path="/brand/orders" element={<BrandOrders />} />
        <Route path="/brand/profile" element={<BrandProfile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart1" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/OfferCard" element={<OfferCard />} />


      </Routes>
      <Footer/>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
