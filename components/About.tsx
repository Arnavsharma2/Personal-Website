'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

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

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                01.
              </h2>
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
                About Me
              </h3>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hey! I&apos;m Arnav Sharma, and I&apos;m currently pursuing a Bachelor&apos;s Degree of Science in Computer Science at Penn State University, 
              with a minor in Artificial Intelligence. I&apos;m passionate about creating AI-powered solutions and love the entire process 
              of taking an idea from ideation to design to production.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My favorite part of programming is building full-stack applications and AI models that solve real-world problems. I love working 
              with machine learning, data science, and creating web applications that make a difference. I&apos;m particularly interested in 
              natural language processing and building conversational AI systems.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not coding, you can usually find me trying new recipes, unwinding with a good TV show, or getting competitive over board games. I&apos;m also a big fan of staying active and have been hitting the gym regularly for almost two years now.
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
              {/* Outer ring with gradient border */}
              <div className="w-[28rem] h-[36rem] bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-2xl p-1">
                {/* Inner rounded rectangle with main background */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Profile Image */}
                  <img 
                    src="/PERSONALWEBSITE.jpg" 
                    alt="Arnav Sharma"
                    className="w-full h-full object-cover object-bottom rounded-2xl"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center relative">
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/5 rounded-full blur-sm"></div>
                    <div className="absolute top-1/2 left-2 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
                    
                    {/* Main initials */}
                    <span className="text-7xl font-bold text-white relative z-10">AS</span>
                  </div>
                </div>
              </div>
              
              {/* Floating accent dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 -right-3 w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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
          <h4 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 text-center">
            Some technologies I like to work with
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="w-16 h-16 bg-gray-800 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors duration-200 group flex items-center justify-center"
                title={tech.name}
              >
                <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'block';
                      }
                    }}
                  />
                  <div className="hidden text-gray-400 text-lg font-medium">
                    {tech.name.charAt(0)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
