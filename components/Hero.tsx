'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

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

  // Function to update node position
  const updateNodePosition = (layer: keyof typeof nodePositions, index: number, x: number, y: number) => {
    setNodePositions(prev => ({
      ...prev,
      [layer]: prev[layer].map((pos, i) => 
        i === index ? { x, y } : pos
      )
    }))
  }

  // State for data flow animation
  const [activeNodes, setActiveNodes] = useState<{[key: string]: boolean}>({})
  const [visibleConnections, setVisibleConnections] = useState<{[key: string]: boolean}>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [concentratedNode, setConcentratedNode] = useState<number | null>(null)
  const [nodeBrightness, setNodeBrightness] = useState<{[key: string]: number}>({})

  // Function to start data flow animation
  const startDataFlow = () => {
    setIsAnimating(true)
    setActiveNodes({})
    setVisibleConnections({})
    setConcentratedNode(null)
    
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
      setTimeout(() => {
        const indices = Array.from({ length: count }, (_, i) => i)
        const shuffled = indices.sort(() => Math.random() - 0.5)
        const numToActivate = Math.floor(Math.random() * (count - 1)) + 1 // At least 1, at most all
        
        const nodes: {[key: string]: boolean} = {}
        for (let i = 0; i < numToActivate; i++) {
          nodes[`${layer}-${shuffled[i]}`] = true
        }
        setActiveNodes(prev => ({ ...prev, ...nodes }))
      }, delay)
    }
    
    // Show input to hidden1 connections first
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'input-hidden1': true }))
    }, 100)

    // Animate input layer after lines start (lines take max 3.7s to complete)
    activateLayerRandomly('input', 6, 100)
    
    // Show hidden1 to hidden2 connections after input lines complete + processing time
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden1-hidden2': true }))
    }, 6000) // 100ms start + 3700ms max line duration + 2200ms processing time

    // Animate hidden1 layer after its lines complete (lines take max 4.25s to complete)
    activateLayerRandomly('hidden1', 8, 3500) // 6000ms + 4250ms + 250ms buffer

    // Show hidden2 to output connections after hidden1 lines complete + processing time
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden2-output': true }))
    }, 12500) // 10500ms + 4250ms + 3250ms processing time

    // Animate hidden2 layer after its lines complete (lines take max 5.3s to complete)
    activateLayerRandomly('hidden2', 8, 10000) // 18000ms + 5300ms + 1200ms buffer

    // Animate output layer with concentration effect after hidden2 lines complete + processing time
    setTimeout(() => {
      // First activate all output nodes
      const outputNodes: {[key: string]: boolean} = {}
      for (let i = 0; i < 4; i++) {
        outputNodes[`output-${i}`] = true
      }
      setActiveNodes(prev => ({ ...prev, ...outputNodes }))
      
      // Then gradually deactivate others, leaving only the concentrated one
      setTimeout(() => {
        const finalNodes: {[key: string]: boolean} = {}
        finalNodes[`output-${finalNode}`] = true
        setActiveNodes(prev => ({ ...prev, ...finalNodes }))
      }, 1000) // 1 second delay for concentration effect
    }, 17500) // 24500ms + 5300ms + 2200ms processing time

    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false)
      setActiveNodes({})
      setVisibleConnections({})
      setConcentratedNode(null)
      setNodeBrightness({})
    }, 20000) // 32000ms + 1000ms concentration + 5000ms display time
  }

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-2"
            >
              Arnav Sharma
            </motion.h1>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-medium"
            >
              I like building AI-powered applications and full-stack solutions
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 space-y-4"
            >
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                See my experience
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={startDataFlow}
                disabled={isAnimating}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isAnimating ? 'Processing...' : 'Animate Neural Network'}
              </button>
            </motion.div>
          </motion.div>

          {/* Neural Network Design - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end group"
          >
            <div className="relative w-[600px] h-[500px] cursor-pointer">
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
