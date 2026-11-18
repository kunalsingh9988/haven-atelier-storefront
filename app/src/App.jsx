import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import OurStory from './pages/OurStory';
import Atelier from './pages/Atelier';
import Recipe from './pages/Recipe';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import { ShippingReturns, PrivacyPolicy, Terms, ManageSubscription } from './pages/Policies';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/products/:handle" element={<Product />} />
          <Route path="/pages/our-story" element={<OurStory />} />
          <Route path="/pages/the-atelier" element={<Atelier />} />
          <Route path="/recipes/:handle" element={<Recipe />} />
          <Route path="/pages/contact" element={<Contact />} />
          <Route path="/pages/faqs" element={<Faqs />} />
          <Route path="/pages/shipping-returns" element={<ShippingReturns />} />
          <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/pages/terms" element={<Terms />} />
          <Route path="/pages/manage-subscription" element={<ManageSubscription />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}
