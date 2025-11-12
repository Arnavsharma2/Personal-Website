'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
// Removed unused imports

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

  const profilePhoto = { src: '/PERSONALWEBSITE.jpg', alt: 'Arnav Sharma' }

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://static.frieze.com/files/inline-images/jeffreys-main.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cool overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Animated overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1 relative"
          >
            {/* Subtle backdrop blur for text readability */}
            <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm rounded-2xl -m-4" />
            
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                01.
              </h2>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 drop-shadow-lg">
                About Me
              </h3>
              <div className="w-full h-1 bg-accent-400"></div>
            </div>
            <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
              Hey! I&apos;m Arnav Sharma, and I&apos;m currently pursuing a Bachelor&apos;s Degree of Science in Computer Science at The Pennsylvania State University.
              I love making projects where I apply Machine Learning or Artificial Intelligence concepts to create cool or useful features for full-stack applications. 
            </p>
            
            <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
            I am constantly fascinated by the vast and evolving processes behind Machine Learning and Artificial Intelligence, and I am dedicated to lifelong learning in the field.
            </p>
            
            <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
              When I&apos;m not coding, you can usually find me trying to cook up some new recipes, unwinding with a good TV show, or hiking a trail. 
              I&apos;m also a big fan of staying active by hitting the gym or playing sports like soccer and pickleball. 
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
              {/* Clean accent border with glass effect */}
              <div className="w-64 h-80 sm:w-80 sm:h-96 lg:w-[28rem] lg:h-[36rem] bg-white/20 backdrop-blur-md rounded-2xl p-1 border border-white/30 shadow-2xl">
                {/* Inner rounded rectangle with main background */}
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Profile Image */}
                  <Image 
                    src={profilePhoto.src}
                    alt={profilePhoto.alt}
                    fill
                    className={`object-cover rounded-2xl transition-all duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
                    onLoad={handleImageLoad}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  
                  {/* Loading Spinner */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
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
              
              {/* Clean minimal dots with glow */}
              <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/60 rounded-full shadow-lg shadow-white/50"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full shadow-lg shadow-white/40"></div>
              <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full shadow-md shadow-white/30"></div>
            </div>
          </motion.div>
        </div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 relative"
        >
          {/* Subtle backdrop blur for technologies section */}
          <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm rounded-2xl -m-4" />
          
          <h4 className="text-2xl font-semibold text-white mb-8 text-center drop-shadow-lg">
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
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-white/20 border border-white/30">
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
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-lg shadow-lg border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {tech.name}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
