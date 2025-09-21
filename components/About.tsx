'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const technologies = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
]

  const personalPhotos = [
    { src: '/PERSONALWEBSITE.jpg', alt: 'Arnav Sharma' },
    { src: '/bakeddrum.jpg', alt: 'Baked drum' },
    { src: '/korfriedch.jpg', alt: 'Korean fried chicken' },
    { src: '/meal.jpg', alt: 'Meal' },
    { src: '/pestowrap.jpg', alt: 'Pesto wrap' },
    { src: '/popcornch.jpg', alt: 'Popcorn chicken' },
    { src: '/sesch.jpg', alt: 'Sesame chicken' },
    { src: '/treehike.jpg', alt: 'Tree hike' },
    { src: '/valleynature.jpg', alt: 'Valley nature' },
    { src: '/yellowcurry.jpg', alt: 'Yellow curry' }
  ]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentProfilePhotoIndex, setCurrentProfilePhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % personalPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + personalPhotos.length) % personalPhotos.length)
  }

  const openGallery = (index: number) => {
    setCurrentPhotoIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const rotateProfilePhoto = () => {
    setCurrentProfilePhotoIndex((prev) => {
      const nextIndex = (prev + 1) % personalPhotos.length
      console.log('Rotating from', prev, 'to', nextIndex, 'photo:', personalPhotos[nextIndex].src)
      return nextIndex
    })
  }

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-accent-600 mb-4">
                01.
              </h2>
              <h3 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-4">
                About Me
              </h3>
              <div className="w-full h-1 bg-accent-500"></div>
            </div>
            <p className="text-lg text-primary-800 leading-relaxed">
              Hey! I&apos;m Arnav Sharma, and I&apos;m currently pursuing a Bachelor&apos;s Degree of Science in Computer Science at Penn State University, 
              with a minor in Artificial Intelligence. I absolutely love AI and the possibilities it has opened up for software development in the world today, 
              which is why you will probably see that a lot of my projects utilize the Gemini or OpenAI APIs.
            </p>
            
            <p className="text-lg text-primary-800 leading-relaxed">
              Another thing I love about programming is AI&apos;s predictive ability, made possible by its ability to be trained on data. 
              A lot of my time is usually spent making small tools to automate tedious things in my life. My goal is to slowly learn to gain the ability to
              create big programs that actually matter to people. Right now I am focused on completely understanding the process behind neural networks.
            </p>
            
            <p className="text-lg text-primary-800 leading-relaxed">
              When I&apos;m not coding, you can usually find me trying new recipes, unwinding with a good TV show, or hiking up a mountain or trail. 
              I love eating food and at the moment I really want to try KBBQ and Poke Bowls.
              I&apos;m also a big fan of staying active and have been hitting the gym regularly for almost two years now. I would always be down to hit the gym with anyone, anytime!
            </p>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Clean accent border */}
              <div className="w-64 h-80 sm:w-80 sm:h-96 lg:w-[28rem] lg:h-[36rem] bg-accent-200 rounded-2xl p-1">
                {/* Inner rounded rectangle with main background */}
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Profile Image */}
                  <Image 
                    key={currentProfilePhotoIndex} // Force re-render when index changes
                    src={personalPhotos[currentProfilePhotoIndex].src}
                    alt={personalPhotos[currentProfilePhotoIndex].alt}
                    fill
                    className="object-cover rounded-2xl transition-all duration-500"
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
                  />
                  {/* Fallback initials */}
                  <div className="hidden w-full h-full bg-white rounded-2xl flex items-center justify-center relative">
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-accent-100 rounded-full blur-sm"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-secondary-100 rounded-full blur-sm"></div>
                    <div className="absolute top-1/2 left-2 w-8 h-8 bg-accent-100 rounded-full blur-sm"></div>
                    
                    {/* Main initials */}
                    <span className="text-4xl sm:text-5xl lg:text-7xl font-bold text-accent-600 relative z-10">AS</span>
                  </div>
                </div>
              </div>
              
              {/* Rotation Button */}
              <motion.button
                onClick={rotateProfilePhoto}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-4 -right-4 bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                title={`Click to see more photos (${currentProfilePhotoIndex + 1}/${personalPhotos.length})`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              
              {/* Photo Counter */}
              <div className="absolute -top-2 -left-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                {currentProfilePhotoIndex + 1}/{personalPhotos.length}
              </div>
              
              {/* Clean minimal dots */}
              <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-accent-400 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-secondary-400 rounded-full"></div>
              <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-300 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <h4 className="text-2xl font-semibold text-primary-900 mb-8 text-center">
            Some technologies I like to work with
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="relative group"
              >
                <div className="w-16 h-16 bg-white backdrop-blur-sm rounded-full hover:bg-accent-50 transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md hover:shadow-accent-200/20 border border-accent-200">
                  <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center relative">
                  <Image 
                    src={tech.logo} 
                    alt={tech.name}
                    fill
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 64px, 64px"
                  />
                  </div>
                </div>
                
                {/* Custom Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {tech.name}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <Image
                src={personalPhotos[currentPhotoIndex].src}
                alt={personalPhotos[currentPhotoIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {currentPhotoIndex + 1} / {personalPhotos.length}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
