import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/NavBar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero navigate={navigate} />
      <Features />
      <Testimonials />
      <CallToAction navigate={navigate} />
      <Footer />
    </div>
  )
}

export default Home