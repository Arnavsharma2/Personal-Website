'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Code, Cpu, Database, Globe, Zap, Sparkles } from 'lucide-react'
import { useState, useEffect, useMemo, useRef } from 'react'

export default function Hero() {
  // Configurable layer coordinates
  const layerCoordinates = {
    input: { x: 55, y: 200 }, // Starting position for input layer
    hidden1: { x: 200, y: 180 }, // Starting position for hidden layer 1
    hidden2: { x: 400, y: 180 }, // Starting position for hidden layer 2
    output: { x: 550, y: 200 }, // Starting position for output layer
  }

  // Node spacing within each layer
  const nodeSpacing = {
    input: 50, // Vertical spacing between input nodes
    hidden1: 40, // Vertical spacing between hidden1 nodes
    hidden2: 40, // Vertical spacing between hidden2 nodes
    output: 50, // Vertical spacing between output nodes
  }

  // State for individual node positions (moved 15px left, centered vertically, and shifted down 50px)
  const [nodePositions, setNodePositions] = useState({
    input: Array.from({ length: 6 }, (_, i) => ({
      x: layerCoordinates.input.x - 15,
      y: layerCoordinates.input.y - 20 + 50 + (i - 2.5) * (nodeSpacing.input * 0.8)
    })),
    hidden1: Array.from({ length: 8 }, (_, i) => ({
      x: layerCoordinates.hidden1.x - 15,
      y: layerCoordinates.hidden1.y - 20 + 50 + 20 + (i - 3.5) * (nodeSpacing.hidden1 * 1.2)
    })),
    hidden2: Array.from({ length: 8 }, (_, i) => ({
      x: layerCoordinates.hidden2.x - 15,
      y: layerCoordinates.hidden2.y - 20 + 50 + 20 + (i - 3.5) * (nodeSpacing.hidden2 * 1.2)
    })),
    output: Array.from({ length: 4 }, (_, i) => ({
      x: layerCoordinates.output.x - 15,
      y: layerCoordinates.output.y - 20 + 50 + (i - 1.5) * (nodeSpacing.output * 1.3)
    }))
  })

  // Function to update node position - memoized to prevent unnecessary re-renders
  const updateNodePosition = useMemo(() => (layer: keyof typeof nodePositions, index: number, x: number, y: number) => {
    setNodePositions(prev => ({
      ...prev,
      [layer]: prev[layer].map((pos, i) => 
        i === index ? { x, y } : pos
      )
    }))
  }, [])

  // State for data flow animation
  const [activeNodes, setActiveNodes] = useState<{[key: string]: boolean}>({})
  const [visibleConnections, setVisibleConnections] = useState<{[key: string]: boolean}>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [concentratedNode, setConcentratedNode] = useState<number | null>(null)
  const [nodeBrightness, setNodeBrightness] = useState<{[key: string]: number}>({})
  const [timeRemaining, setTimeRemaining] = useState(0)

  // State for typing animation
  const [currentRole, setCurrentRole] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  // State for interactive features
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(false)
  const [statsShownOnce, setStatsShownOnce] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [themeMode, setThemeMode] = useState<'default' | 'cyber' | 'neon'>('neon')

  // Roles for typing animation - based on actual work
  const roles = useMemo(() => [
    'Machine Learning Engineer',
    'Python Developer', 
    'AI/ML Specialist',
    'Data Scientist',
    'Software Engineer',
    'Reddit Data Analyst',
    'NLP Engineer',
    'Predictive Modeler'
  ], [])

  // Stats data - based on actual projects and experience
  const stats = [
    { label: 'ML Projects', value: 5, icon: Code },
    { label: 'Years Experience', value: 1, icon: Cpu },
    { label: 'Technologies', value: 20, icon: Database },
    { label: 'GitHub Repositories', value: 7, icon: Globe }
  ]

  // Typing animation effect - optimized with slower updates
  useEffect(() => {
    const currentRoleText = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRoleText.length) {
          setDisplayedText(currentRoleText.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 75 : 150) // Slower updates for better performance

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentRole, roles])

  // Store timeout IDs for cleanup
  const [timeoutIds, setTimeoutIds] = useState<ReturnType<typeof setTimeout>[]>([])
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show stats on scroll only once
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !statsShownOnce) {
        setShowStats(true)
        setStatsShownOnce(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [statsShownOnce])

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [timeoutIds])

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isAnimating && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAnimating, timeRemaining])

  // Function to reset animation state
  const resetAnimation = () => {
    setIsAnimating(false)
    setActiveNodes({})
    setVisibleConnections({})
    setConcentratedNode(null)
    setNodeBrightness({})
    setTimeRemaining(0)
    
    // Clear any existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
  }

  // Function to start data flow animation
  const startDataFlow = () => {
    // Reset state first (this will clear any ongoing animation)
    resetAnimation()
    
    // Clear any existing timeouts first (except reset timeout)
    timeoutIds.forEach(id => clearTimeout(id))
    setTimeoutIds([])
    
    console.log('Starting new animation, clearing old timeouts')
    
    // Start new animation after a brief delay
    setTimeout(() => {
      setIsAnimating(true)
      setTimeRemaining(25) // Start countdown from 25 seconds
      
      // Generate neural network-like brightness patterns
      const generateBrightness = () => {
      const brightness: {[key: string]: number} = {}
      
      // Simulate input data with varying signal strength
      // Input layer: Most nodes active (real data), some very low (noise/irrelevant features)
      for (let i = 0; i < 6; i++) {
        const signalStrength = Math.random()
        if (signalStrength > 0.3) {
          // Strong input signals (70% chance)
          brightness[`input-${i}`] = 0.4 + Math.random() * 0.6 // 0.4 to 1.0
        } else {
          // Weak/noise signals (30% chance)
          brightness[`input-${i}`] = 0.2 + Math.random() * 0.3 // 0.2 to 0.5
        }
      }
      
      // First hidden layer: Feature extraction - many neurons active for pattern recognition
      // This layer learns to detect various features from input
      for (let i = 0; i < 8; i++) {
        const featureActivation = Math.random()
        if (featureActivation > 0.25) {
          // Most neurons active for feature detection (75% chance)
          brightness[`hidden1-${i}`] = 0.3 + Math.random() * 0.7 // 0.3 to 1.0
        } else {
          // Some neurons less active (25% chance)
          brightness[`hidden1-${i}`] = 0.2 + Math.random() * 0.4 // 0.2 to 0.6
        }
      }
      
      // Second hidden layer: Higher-level feature combination and abstraction
      // Fewer neurons active as we move to more abstract representations
      for (let i = 0; i < 8; i++) {
        const abstractionLevel = Math.random()
        if (abstractionLevel > 0.4) {
          // Some neurons active for complex patterns (60% chance)
          brightness[`hidden2-${i}`] = 0.4 + Math.random() * 0.6 // 0.4 to 1.0
        } else {
          // Many neurons less active (40% chance)
          brightness[`hidden2-${i}`] = 0.2 + Math.random() * 0.5 // 0.2 to 0.7
        }
      }
      
      // Output layer: Decision making - typically sparse activation
      // Only a few neurons should be highly active for final decision
      const outputIndices = Array.from({ length: 4 }, (_, i) => i)
      const shuffledOutput = outputIndices.sort(() => Math.random() - 0.5)
      
      for (let i = 0; i < 4; i++) {
        if (i === 0) {
          // Primary decision neuron - highest activation
          brightness[`output-${shuffledOutput[i]}`] = 0.8 + Math.random() * 0.2 // 0.8 to 1.0
        } else if (i === 1) {
          // Secondary decision neuron - moderate activation
          brightness[`output-${shuffledOutput[i]}`] = 0.5 + Math.random() * 0.3 // 0.5 to 0.8
        } else {
          // Other neurons - low activation (inhibited)
          brightness[`output-${shuffledOutput[i]}`] = 0.2 + Math.random() * 0.4 // 0.2 to 0.6
        }
      }
      
      setNodeBrightness(brightness)
    }
    
    generateBrightness()
    
    // Randomly select which output node will be the final concentrated one
    const finalNode = Math.floor(Math.random() * 4)
    setConcentratedNode(finalNode)
    
    // Helper function to randomly activate nodes in a layer
    const activateLayerRandomly = (layer: string, count: number, delay: number) => {
      const timeoutId = setTimeout(() => {
        const indices = Array.from({ length: count }, (_, i) => i)
        const shuffled = indices.sort(() => Math.random() - 0.5)
        const numToActivate = Math.floor(Math.random() * (count - 1)) + 1 // At least 1, at most all
        
        const nodes: {[key: string]: boolean} = {}
        for (let i = 0; i < numToActivate; i++) {
          nodes[`${layer}-${shuffled[i]}`] = true
        }
        setActiveNodes(prev => ({ ...prev, ...nodes }))
      }, delay)
      
      setTimeoutIds(prev => [...prev, timeoutId])
    }
    
    // Show input to hidden1 connections first
    const timeout1 = setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'input-hidden1': true }))
    }, 100)
    setTimeoutIds(prev => [...prev, timeout1])

    // Animate input layer after lines start (lines take max 3.7s to complete)
    activateLayerRandomly('input', 6, 100)
    
    // Show hidden1 to hidden2 connections after input lines complete + processing time
    const timeout2 = setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden1-hidden2': true }))
    }, 6000) // 100ms start + 3700ms max line duration + 2200ms processing time
    setTimeoutIds(prev => [...prev, timeout2])

    // Animate hidden1 layer after its lines complete (lines take max 4.25s to complete)
    activateLayerRandomly('hidden1', 8, 3500) // 6000ms + 4250ms + 250ms buffer

    // Show hidden2 to output connections after hidden1 lines complete + processing time
    const timeout3 = setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden2-output': true }))
    }, 12500) // 10500ms + 4250ms + 3250ms processing time
    setTimeoutIds(prev => [...prev, timeout3])

    // Animate hidden2 layer after its lines complete (lines take max 5.3s to complete)
    activateLayerRandomly('hidden2', 8, 10000) // 18000ms + 5300ms + 1200ms buffer

    // Animate output layer with concentration effect after hidden2 lines complete + processing time
    const timeout4 = setTimeout(() => {
      // First activate all output nodes
      const outputNodes: {[key: string]: boolean} = {}
      for (let i = 0; i < 4; i++) {
        outputNodes[`output-${i}`] = true
      }
      setActiveNodes(prev => ({ ...prev, ...outputNodes }))
      
      // Then gradually deactivate others, leaving only the concentrated one
      const timeout5 = setTimeout(() => {
        const finalNodes: {[key: string]: boolean} = {}
        finalNodes[`output-${finalNode}`] = true
        setActiveNodes(prev => ({ ...prev, ...finalNodes }))
      }, 1000) // 1 second delay for concentration effect
      setTimeoutIds(prev => [...prev, timeout5])
    }, 17500) // 24500ms + 5300ms + 2200ms processing time
    setTimeoutIds(prev => [...prev, timeout4])

    // Reset after animation - separate timeout that doesn't get cleared
    resetTimeoutRef.current = setTimeout(() => {
      console.log('Resetting animation after timeout')
      resetAnimation()
    }, 25000) // 25s total - longer for full animation
    
    console.log('Reset timeout set for 25 seconds')
    
    }, 100) // End of animation start setTimeout
  }

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-[140vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-300 font-medium mb-2"
            >
              Hey there! I&apos;m
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-2"
            >
              Arnav Sharma
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 font-medium min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center whitespace-nowrap"
            >
              <span className="mr-2 flex-shrink-0">I&apos;m a</span>
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold flex-shrink-0"
              >
                {displayedText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base sm:text-lg text-gray-400 mt-4 max-w-lg mx-auto"
            >
              Building ML models, analyzing data, and creating AI-powered applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <motion.button
                  onClick={scrollToAbout}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-blue-700 sm:from-purple-600 sm:to-blue-600 sm:hover:from-purple-700 sm:hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  See my experience
                  <ChevronDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
                
                <motion.button
                  onClick={() => setShowStats(!showStats)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-700 to-emerald-700 sm:from-green-600 sm:to-emerald-600 sm:hover:from-green-700 sm:hover:to-emerald-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <Zap className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {showStats ? 'Hide Stats' : 'Show Stats'}
                </motion.button>
              </div>

              {/* Animated Stats */}
              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 mt-6"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-400/20 text-center"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mx-auto mb-2" />
                          <motion.div
                            className="text-xl sm:text-2xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            {stat.value}+
                          </motion.div>
                          <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-400/20"
                    >
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                        {['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'LangChain', 'OpenAI API', 'Flask', 'PRAW', 'NLP', 'LSTM', 'XGBoost'].map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.05 }}
                            className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-400/30 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Neural Network Design - Right Side - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end group mt-8 lg:mt-0 hidden lg:flex"
          >
            <div className="relative w-[300px] h-[250px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[400px] xl:w-[600px] xl:h-[500px] cursor-pointer">
              {/* Neural Network Container */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl border border-purple-400/20 shadow-2xl backdrop-blur-sm group-hover:shadow-purple-500/25 group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.1)",
                    "0 0 40px rgba(147, 51, 234, 0.2)",
                    "0 0 20px rgba(147, 51, 234, 0.1)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Input Layer */}
                {nodePositions.input.map((position, i) => (
                  <motion.div
                    key={`input-${i}`}
                    className={`absolute w-6 h-6 rounded-full shadow-lg border-4 ${
                      activeNodes[`input-${i}`] 
                        ? 'bg-gradient-to-br from-green-200 to-emerald-300 border-green-200' 
                        : 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`input-${i}`] || 0.3,
                      boxShadow: activeNodes[`input-${i}`] 
                        ? `0 0 ${30 * (nodeBrightness[`input-${i}`] || 0.5)}px rgba(34, 197, 94, ${nodeBrightness[`input-${i}`] || 0.5}), 0 0 ${60 * (nodeBrightness[`input-${i}`] || 0.5)}px rgba(34, 197, 94, ${(nodeBrightness[`input-${i}`] || 0.5) * 0.8}), 0 0 ${90 * (nodeBrightness[`input-${i}`] || 0.5)}px rgba(34, 197, 94, ${(nodeBrightness[`input-${i}`] || 0.5) * 0.4})`
                        : '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)"
                    }}
                    animate={{
                      scale: activeNodes[`input-${i}`] 
                        ? [1, 1.4, 1]
                        : [1, 1.2, 1],
                      opacity: activeNodes[`input-${i}`] 
                        ? [(nodeBrightness[`input-${i}`] || 0.5) * 0.95, nodeBrightness[`input-${i}`] || 0.5, (nodeBrightness[`input-${i}`] || 0.5) * 0.95]
                        : [(nodeBrightness[`input-${i}`] || 0.3) * 0.4, (nodeBrightness[`input-${i}`] || 0.3) * 0.6, (nodeBrightness[`input-${i}`] || 0.3) * 0.4]
                    }}
                    transition={{
                      duration: activeNodes[`input-${i}`] ? 0.8 : 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                      scale: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                ))}

                {/* Hidden Layer 1 */}
                {nodePositions.hidden1.map((position, i) => (
                  <motion.div
                    key={`hidden1-${i}`}
                    className={`absolute w-8 h-8 rounded-full shadow-lg border-4 ${
                      activeNodes[`hidden1-${i}`] 
                        ? 'bg-gradient-to-br from-purple-200 to-blue-300 border-purple-200' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-600 border-purple-300'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`hidden1-${i}`] || 0.3,
                      boxShadow: activeNodes[`hidden1-${i}`] 
                        ? `0 0 ${35 * (nodeBrightness[`hidden1-${i}`] || 0.5)}px rgba(147, 51, 234, ${nodeBrightness[`hidden1-${i}`] || 0.5}), 0 0 ${70 * (nodeBrightness[`hidden1-${i}`] || 0.5)}px rgba(147, 51, 234, ${(nodeBrightness[`hidden1-${i}`] || 0.5) * 0.8}), 0 0 ${100 * (nodeBrightness[`hidden1-${i}`] || 0.5)}px rgba(147, 51, 234, ${(nodeBrightness[`hidden1-${i}`] || 0.5) * 0.4})`
                        : '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 25px rgba(147, 51, 234, 0.8)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden1-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden1-${i}`] 
                        ? [(nodeBrightness[`hidden1-${i}`] || 0.5) * 0.95, nodeBrightness[`hidden1-${i}`] || 0.5, (nodeBrightness[`hidden1-${i}`] || 0.5) * 0.95]
                        : [(nodeBrightness[`hidden1-${i}`] || 0.3) * 0.3, (nodeBrightness[`hidden1-${i}`] || 0.3) * 0.5, (nodeBrightness[`hidden1-${i}`] || 0.3) * 0.3]
                    }}
                    transition={{
                      duration: activeNodes[`hidden1-${i}`] ? 0.8 : 1.8 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                      scale: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                ))}

                {/* Hidden Layer 2 */}
                {nodePositions.hidden2.map((position, i) => (
                  <motion.div
                    key={`hidden2-${i}`}
                    className={`absolute w-8 h-8 rounded-full shadow-lg border-4 ${
                      activeNodes[`hidden2-${i}`] 
                        ? 'bg-gradient-to-br from-blue-200 to-cyan-300 border-blue-200' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-300'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`hidden2-${i}`] || 0.3,
                      boxShadow: activeNodes[`hidden2-${i}`] 
                        ? `0 0 ${35 * (nodeBrightness[`hidden2-${i}`] || 0.5)}px rgba(59, 130, 246, ${nodeBrightness[`hidden2-${i}`] || 0.5}), 0 0 ${70 * (nodeBrightness[`hidden2-${i}`] || 0.5)}px rgba(59, 130, 246, ${(nodeBrightness[`hidden2-${i}`] || 0.5) * 0.8}), 0 0 ${100 * (nodeBrightness[`hidden2-${i}`] || 0.5)}px rgba(59, 130, 246, ${(nodeBrightness[`hidden2-${i}`] || 0.5) * 0.4})`
                        : '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden2-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden2-${i}`] 
                        ? [(nodeBrightness[`hidden2-${i}`] || 0.5) * 0.95, nodeBrightness[`hidden2-${i}`] || 0.5, (nodeBrightness[`hidden2-${i}`] || 0.5) * 0.95]
                        : [(nodeBrightness[`hidden2-${i}`] || 0.3) * 0.3, (nodeBrightness[`hidden2-${i}`] || 0.3) * 0.5, (nodeBrightness[`hidden2-${i}`] || 0.3) * 0.3]
                    }}
                    transition={{
                      duration: activeNodes[`hidden2-${i}`] ? 0.8 : 2.2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                      scale: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                ))}

                {/* Output Layer */}
                {nodePositions.output.map((position, i) => (
                  <motion.div
                    key={`output-${i}`}
                    className={`absolute w-10 h-10 rounded-full shadow-lg border-4 ${
                      activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? 'bg-gradient-to-br from-pink-100 to-rose-200 border-pink-100'
                          : 'bg-gradient-to-br from-pink-200 to-rose-300 border-pink-200'
                        : 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-300'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`output-${i}`] || 0.3,
                      boxShadow: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? `0 0 ${60 * (nodeBrightness[`output-${i}`] || 0.9)}px rgba(244, 114, 182, ${nodeBrightness[`output-${i}`] || 0.9}), 0 0 ${120 * (nodeBrightness[`output-${i}`] || 0.9)}px rgba(244, 114, 182, ${(nodeBrightness[`output-${i}`] || 0.9) * 0.9}), 0 0 ${180 * (nodeBrightness[`output-${i}`] || 0.9)}px rgba(244, 114, 182, ${(nodeBrightness[`output-${i}`] || 0.9) * 0.6}), 0 0 ${240 * (nodeBrightness[`output-${i}`] || 0.9)}px rgba(244, 114, 182, ${(nodeBrightness[`output-${i}`] || 0.9) * 0.3})`
                          : `0 0 ${40 * (nodeBrightness[`output-${i}`] || 0.5)}px rgba(244, 114, 182, ${nodeBrightness[`output-${i}`] || 0.5}), 0 0 ${80 * (nodeBrightness[`output-${i}`] || 0.5)}px rgba(244, 114, 182, ${(nodeBrightness[`output-${i}`] || 0.5) * 0.8}), 0 0 ${120 * (nodeBrightness[`output-${i}`] || 0.5)}px rgba(244, 114, 182, ${(nodeBrightness[`output-${i}`] || 0.5) * 0.4})`
                        : '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 30px rgba(244, 114, 182, 0.8)"
                    }}
                    animate={{
                      scale: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? [1, 2, 1]
                          : [1, 1.6, 1]
                        : [1, 1.4, 1],
                      opacity: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? [(nodeBrightness[`output-${i}`] || 0.9) * 0.98, nodeBrightness[`output-${i}`] || 0.9, (nodeBrightness[`output-${i}`] || 0.9) * 0.98]
                          : [(nodeBrightness[`output-${i}`] || 0.5) * 0.95, nodeBrightness[`output-${i}`] || 0.5, (nodeBrightness[`output-${i}`] || 0.5) * 0.95]
                        : [(nodeBrightness[`output-${i}`] || 0.3) * 0.3, (nodeBrightness[`output-${i}`] || 0.3) * 0.5, (nodeBrightness[`output-${i}`] || 0.3) * 0.3]
                    }}
                    transition={{
                      duration: activeNodes[`output-${i}`] 
                        ? concentratedNode === i ? 0.6 : 0.8
                        : 1.5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.6,
                      scale: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                ))}

                {/* Animated Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Input to Hidden Layer 1 */}
                  {visibleConnections['input-hidden1'] && Array.from({ length: 6 }, (_, inputIdx) => 
                    Array.from({ length: 8 }, (_, hiddenIdx) => (
                      <motion.line
                        key={`input-hidden1-${inputIdx}-${hiddenIdx}`}
                        x1={nodePositions.input[inputIdx].x + 14 + 9}
                        y1={nodePositions.input[inputIdx].y - (inputIdx === 0 ? 0 : inputIdx === 1 ? 0 : 0) + 14}
                        x2={nodePositions.hidden1[hiddenIdx].x + 14 - 13}
                        y2={nodePositions.hidden1[hiddenIdx].y - (hiddenIdx === 0 ? 5 : 0) + 16}
                        stroke="url(#gradient1)"
                        strokeWidth="1"
                        opacity={activeNodes[`input-${inputIdx}`] ? 0.9 : 0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 2,
                          delay: inputIdx * 0.2 + hiddenIdx * 0.1
                        }}
                      />
                    ))
                  )}

                  {/* Hidden Layer 1 to Hidden Layer 2 */}
                  {visibleConnections['hidden1-hidden2'] && Array.from({ length: 8 }, (_, hidden1Idx) => 
                    Array.from({ length: 8 }, (_, hidden2Idx) => (
                      <motion.line
                        key={`hidden1-hidden2-${hidden1Idx}-${hidden2Idx}`}
                        x1={nodePositions.hidden1[hidden1Idx].x + 14 + 16}
                        y1={nodePositions.hidden1[hidden1Idx].y - (hidden1Idx === 0 ? 5 : 0) + 16}
                        x2={nodePositions.hidden2[hidden2Idx].x + 14 - 13}
                        y2={nodePositions.hidden2[hidden2Idx].y - (hidden2Idx === 0 ? 5 : 0) + 16}
                        stroke="url(#gradient2)"
                        strokeWidth="1.5"
                        opacity={activeNodes[`hidden1-${hidden1Idx}`] ? 0.9 : 0.7}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 2.5,
                          delay: hidden1Idx * 0.15 + hidden2Idx * 0.1
                        }}
                      />
                    ))
                  )}

                  {/* Hidden Layer 2 to Output */}
                  {visibleConnections['hidden2-output'] && Array.from({ length: 8 }, (_, hidden2Idx) => 
                    Array.from({ length: 4 }, (_, outputIdx) => (
                      <motion.line
                        key={`hidden2-output-${hidden2Idx}-${outputIdx}`}
                        x1={nodePositions.hidden2[hidden2Idx].x + 14 + 16}
                        y1={nodePositions.hidden2[hidden2Idx].y - (hidden2Idx === 0 ? 5 : 0) + 16}
                        x2={nodePositions.output[outputIdx].x + 14 - 13}
                        y2={nodePositions.output[outputIdx].y - (outputIdx === 0 ? 5 : 0) + 19}
                        stroke="url(#gradient3)"
                        strokeWidth="2"
                        opacity={activeNodes[`hidden2-${hidden2Idx}`] ? 0.9 : 0.8}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 3,
                          delay: hidden2Idx * 0.2 + outputIdx * 0.3
                        }}
                      />
                    ))
                  )}

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Data Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-white/80 rounded-full"
                    style={{
                      left: `${20 + (i * 10) % 60}%`,
                      top: `${30 + (i * 15) % 40}%`
                    }}
                    whileHover={{ 
                      scale: 3,
                      opacity: 1
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                      scale: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                ))}

                {/* Layer Labels */}
                <motion.div 
                  className="absolute left-4 top-4 text-xs font-mono text-green-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  INPUT
                </motion.div>
                <motion.div 
                  className="absolute left-1/3 top-4 text-xs font-mono text-purple-400 transform -translate-x-1/2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  HIDDEN 1
                </motion.div>
                <motion.div 
                  className="absolute right-1/3 top-4 text-xs font-mono text-blue-400 transform translate-x-1/2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  HIDDEN 2
                </motion.div>
                <motion.div 
                  className="absolute right-4 top-4 text-xs font-mono text-pink-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  OUTPUT
                </motion.div>

                {/* Tech Stack Icons */}
                <motion.div 
                  className="absolute bottom-4 left-4 text-xs font-mono text-gray-400"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div>TensorFlow</div>
                  <div>Keras</div>
                  <div>Python</div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-4 right-4 text-xs font-mono text-gray-400"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div>Neural Networks</div>
                  <div>Deep Learning</div>
                  <div>AI/ML</div>
                </motion.div>

                {/* Interactive Controls */}
                <motion.div 
                  className="absolute bottom-4 right-1/2 transform translate-x-1/2 flex gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <button
                    onClick={startDataFlow}
                    disabled={isAnimating}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white text-xs font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isAnimating ? `Processing... ${timeRemaining}s` : 'Animate Network'}
                  </button>
                  
                  <button
                    onClick={() => setThemeMode(themeMode === 'default' ? 'cyber' : themeMode === 'cyber' ? 'neon' : 'default')}
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {themeMode === 'default' ? '🌙' : themeMode === 'cyber' ? '⚡' : '🎨'}
                  </button>
                </motion.div>

                {/* Interactive Hover Effects */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width) * 100
                    const y = ((e.clientY - rect.top) / rect.height) * 100
                    setHoveredElement(`${x},${y}`)
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {hoveredElement && (
                    <motion.div
                      className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                      style={{
                        left: hoveredElement.split(',')[0] + '%',
                        top: hoveredElement.split(',')[1] + '%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 cursor-pointer"
          onClick={scrollToAbout}
        >
          <motion.div
            whileHover={{ scale: 1.2, y: -5 }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
        >
          <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Theme-based visual enhancements */}
      {themeMode === 'cyber' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-purple-500 via-blue-500 to-green-500 animate-pulse" />
        </motion.div>
      )}

      {themeMode === 'neon' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
        </motion.div>
      )}
    </section>
  )
}
