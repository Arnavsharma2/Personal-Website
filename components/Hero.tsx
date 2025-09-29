'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useMemo, useRef } from 'react'

export default function Hero() {
  // Configurable layer coordinates
  const layerCoordinates = {
    input: { x: 45, y: 200 }, // Starting position for input layer
    hidden1: { x: 190, y: 180 }, // Starting position for hidden layer 1
    hidden2: { x: 390, y: 180 }, // Starting position for hidden layer 2
    output: { x: 540, y: 200 }, // Starting position for output layer
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

  // Update node positions when layer coordinates change
  useEffect(() => {
    setNodePositions({
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
  }, [layerCoordinates.input.x, layerCoordinates.hidden1.x, layerCoordinates.hidden2.x, layerCoordinates.output.x, layerCoordinates.input.y, layerCoordinates.hidden1.y, layerCoordinates.hidden2.y, layerCoordinates.output.y, nodeSpacing.input, nodeSpacing.hidden1, nodeSpacing.hidden2, nodeSpacing.output])

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

  // State for interactive features
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  // Store timeout IDs for cleanup
  const [timeoutIds, setTimeoutIds] = useState<ReturnType<typeof setTimeout>[]>([])
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)


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
    <section id="home" className="min-h-[100vh] flex items-center justify-center relative overflow-hidden">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-primary-50" />

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
              className="text-xl sm:text-2xl text-primary-800 font-medium mb-2"
            >
              Hey there! I&apos;m
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 leading-tight mb-2"
            >
              Arnav Sharma
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-primary-700 mt-6 max-w-lg mx-auto"
            >
              I like creating ML models, AI-powered applications, and websites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 space-y-6"
            >
              <div className="flex justify-center">
                <motion.button
                  onClick={scrollToAbout}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-accent-500 text-white hover:bg-accent-600 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base"
                >
                  See my experience
                  <ChevronDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>

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
                className="absolute inset-0 bg-gradient-to-br from-accent-100 to-primary-100 rounded-3xl border border-accent-200 shadow-2xl backdrop-blur-sm group-hover:shadow-accent-300/25 group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(242, 147, 12, 0.1)",
                    "0 0 40px rgba(242, 147, 12, 0.2)",
                    "0 0 20px rgba(242, 147, 12, 0.1)"
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
                    className={`absolute w-6 h-6 rounded-full shadow-lg border-2 ${
                      activeNodes[`input-${i}`] 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-300' 
                        : 'bg-gradient-to-br from-yellow-600 to-yellow-700 border-yellow-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`input-${i}`] || 0.3,
                      boxShadow: activeNodes[`input-${i}`] 
                        ? `0 0 ${20 * (nodeBrightness[`input-${i}`] || 0.8)}px rgba(234, 179, 8, ${nodeBrightness[`input-${i}`] || 0.8}), 0 0 ${40 * (nodeBrightness[`input-${i}`] || 0.8)}px rgba(234, 179, 8, ${(nodeBrightness[`input-${i}`] || 0.8) * 0.8}), 0 0 ${60 * (nodeBrightness[`input-${i}`] || 0.8)}px rgba(234, 179, 8, ${(nodeBrightness[`input-${i}`] || 0.8) * 0.4})`
                        : '0 2px 8px rgba(234, 179, 8, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 25px rgba(234, 179, 8, 0.9)"
                    }}
                    animate={{
                      scale: activeNodes[`input-${i}`] 
                        ? [1, 1.4, 1]
                        : [1, 1.2, 1],
                      opacity: activeNodes[`input-${i}`] 
                        ? [(nodeBrightness[`input-${i}`] || 0.8) * 0.95, nodeBrightness[`input-${i}`] || 0.8, (nodeBrightness[`input-${i}`] || 0.8) * 0.95]
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
                    className={`absolute w-8 h-8 rounded-full shadow-lg border-2 ${
                      activeNodes[`hidden1-${i}`] 
                        ? 'bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300' 
                        : 'bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`hidden1-${i}`] || 0.3,
                      boxShadow: activeNodes[`hidden1-${i}`] 
                        ? `0 0 ${25 * (nodeBrightness[`hidden1-${i}`] || 0.8)}px rgba(251, 146, 60, ${nodeBrightness[`hidden1-${i}`] || 0.8}), 0 0 ${50 * (nodeBrightness[`hidden1-${i}`] || 0.8)}px rgba(251, 146, 60, ${(nodeBrightness[`hidden1-${i}`] || 0.8) * 0.8}), 0 0 ${75 * (nodeBrightness[`hidden1-${i}`] || 0.8)}px rgba(251, 146, 60, ${(nodeBrightness[`hidden1-${i}`] || 0.8) * 0.4})`
                        : '0 2px 8px rgba(251, 146, 60, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 30px rgba(251, 146, 60, 0.9)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden1-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden1-${i}`] 
                        ? [(nodeBrightness[`hidden1-${i}`] || 0.8) * 0.95, nodeBrightness[`hidden1-${i}`] || 0.8, (nodeBrightness[`hidden1-${i}`] || 0.8) * 0.95]
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
                    className={`absolute w-8 h-8 rounded-full shadow-lg border-2 ${
                      activeNodes[`hidden2-${i}`] 
                        ? 'bg-gradient-to-br from-orange-500 to-red-400 border-orange-400' 
                        : 'bg-gradient-to-br from-orange-700 to-red-600 border-orange-600'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`hidden2-${i}`] || 0.3,
                      boxShadow: activeNodes[`hidden2-${i}`] 
                        ? `0 0 ${25 * (nodeBrightness[`hidden2-${i}`] || 0.8)}px rgba(251, 146, 60, ${nodeBrightness[`hidden2-${i}`] || 0.8}), 0 0 ${50 * (nodeBrightness[`hidden2-${i}`] || 0.8)}px rgba(251, 146, 60, ${(nodeBrightness[`hidden2-${i}`] || 0.8) * 0.8}), 0 0 ${75 * (nodeBrightness[`hidden2-${i}`] || 0.8)}px rgba(251, 146, 60, ${(nodeBrightness[`hidden2-${i}`] || 0.8) * 0.4})`
                        : '0 2px 8px rgba(251, 146, 60, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 30px rgba(251, 146, 60, 0.9)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden2-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden2-${i}`] 
                        ? [(nodeBrightness[`hidden2-${i}`] || 0.8) * 0.95, nodeBrightness[`hidden2-${i}`] || 0.8, (nodeBrightness[`hidden2-${i}`] || 0.8) * 0.95]
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
                    className={`absolute w-10 h-10 rounded-full shadow-lg border-2 ${
                      activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? 'bg-gradient-to-br from-red-400 to-red-500 border-red-300'
                          : 'bg-gradient-to-br from-red-500 to-red-600 border-red-400'
                        : 'bg-gradient-to-br from-red-600 to-red-700 border-red-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: nodeBrightness[`output-${i}`] || 0.3,
                      boxShadow: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? `0 0 ${50 * (nodeBrightness[`output-${i}`] || 1.0)}px rgba(220, 38, 38, ${nodeBrightness[`output-${i}`] || 1.0}), 0 0 ${100 * (nodeBrightness[`output-${i}`] || 1.0)}px rgba(220, 38, 38, ${(nodeBrightness[`output-${i}`] || 1.0) * 0.9}), 0 0 ${150 * (nodeBrightness[`output-${i}`] || 1.0)}px rgba(220, 38, 38, ${(nodeBrightness[`output-${i}`] || 1.0) * 0.6}), 0 0 ${200 * (nodeBrightness[`output-${i}`] || 1.0)}px rgba(220, 38, 38, ${(nodeBrightness[`output-${i}`] || 1.0) * 0.3})`
                          : `0 0 ${35 * (nodeBrightness[`output-${i}`] || 0.8)}px rgba(220, 38, 38, ${nodeBrightness[`output-${i}`] || 0.8}), 0 0 ${70 * (nodeBrightness[`output-${i}`] || 0.8)}px rgba(220, 38, 38, ${(nodeBrightness[`output-${i}`] || 0.8) * 0.8}), 0 0 ${105 * (nodeBrightness[`output-${i}`] || 0.8)}px rgba(220, 38, 38, ${(nodeBrightness[`output-${i}`] || 0.8) * 0.4})`
                        : '0 2px 8px rgba(220, 38, 38, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 35px rgba(220, 38, 38, 0.9)"
                    }}
                    animate={{
                      scale: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? [1, 2, 1]
                          : [1, 1.6, 1]
                        : [1, 1.4, 1],
                      opacity: activeNodes[`output-${i}`] 
                        ? concentratedNode === i
                          ? [(nodeBrightness[`output-${i}`] || 1.0) * 0.98, nodeBrightness[`output-${i}`] || 1.0, (nodeBrightness[`output-${i}`] || 1.0) * 0.98]
                          : [(nodeBrightness[`output-${i}`] || 0.8) * 0.95, nodeBrightness[`output-${i}`] || 0.8, (nodeBrightness[`output-${i}`] || 0.8) * 0.95]
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
                      <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>


                {/* Layer Labels */}
                <motion.div 
                  className="absolute top-4 text-xs font-mono text-accent-600 font-semibold"
                  style={{ left: '26px' }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  INPUT
                </motion.div>
                <motion.div 
                  className="absolute left-1/3 top-4 text-xs font-mono text-primary-700 font-semibold transform -translate-x-1/2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  HIDDEN 1
                </motion.div>
                <motion.div 
                  className="absolute right-1/3 top-4 text-xs font-mono text-secondary-600 font-semibold transform translate-x-1/2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  HIDDEN 2
                </motion.div>
                <motion.div 
                  className="absolute right-4 top-4 text-xs font-mono text-accent-600 font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
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
                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-500 disabled:text-gray-300 text-xs font-medium rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isAnimating ? `Processing... ${timeRemaining}s` : 'Animate Network'}
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

    </section>
  )
}
