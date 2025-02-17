import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/NavBar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import { useContext } from 'react'
import UserContext from '../contexts/userContext'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      <Hero navigate={navigate} user={user} />
      <Features />
      <Testimonials />
      <CallToAction navigate={navigate} user={user} />
      <Footer />
    </div>
  )
}

export default Home