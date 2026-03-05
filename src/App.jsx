import Navbar from '../src/components/Navbar'
import LandingPage from '../src/components/LandingPage'
import Selections from './components/Selections'
import OurStory from './components/OurStory'
import Menu from './components/Menu'
import Marquee from './components/Marquee'
import Reviews from './components/Reviews'
import FindUs from './components/FindUs'
import Footer from './components/Footer'
import CartModal from './components/CartModal'  // NEW
import { useState } from 'react'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <LandingPage />
      <Selections />
      <OurStory />
      <Menu />
      <Marquee />
      <Reviews />
      <FindUs />
      <Footer />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default App