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

  // State for individual node positions (moved 15px left and 20px up total)
  const [nodePositions, setNodePositions] = useState({
    input: [
      { x: layerCoordinates.input.x - 15, y: layerCoordinates.input.y - 20 },
      { x: layerCoordinates.input.x - 15, y: layerCoordinates.input.y + nodeSpacing.input - 20 },
      { x: layerCoordinates.input.x - 15, y: layerCoordinates.input.y + nodeSpacing.input * 2 - 20 }
    ],
    hidden1: [
      { x: layerCoordinates.hidden1.x - 15, y: layerCoordinates.hidden1.y - 20 },
      { x: layerCoordinates.hidden1.x - 15, y: layerCoordinates.hidden1.y + nodeSpacing.hidden1 - 20 },
      { x: layerCoordinates.hidden1.x - 15, y: layerCoordinates.hidden1.y + nodeSpacing.hidden1 * 2 - 20 },
      { x: layerCoordinates.hidden1.x - 15, y: layerCoordinates.hidden1.y + nodeSpacing.hidden1 * 3 - 20 }
    ],
    hidden2: [
      { x: layerCoordinates.hidden2.x - 15, y: layerCoordinates.hidden2.y - 20 },
      { x: layerCoordinates.hidden2.x - 15, y: layerCoordinates.hidden2.y + nodeSpacing.hidden2 - 20 },
      { x: layerCoordinates.hidden2.x - 15, y: layerCoordinates.hidden2.y + nodeSpacing.hidden2 * 2 - 20 },
      { x: layerCoordinates.hidden2.x - 15, y: layerCoordinates.hidden2.y + nodeSpacing.hidden2 * 3 - 20 }
    ],
    output: [
      { x: layerCoordinates.output.x - 15, y: layerCoordinates.output.y - 20 },
      { x: layerCoordinates.output.x - 15, y: layerCoordinates.output.y + nodeSpacing.output - 20 }
    ]
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

  // Function to start data flow animation
  const startDataFlow = () => {
    setIsAnimating(true)
    setActiveNodes({})
    setVisibleConnections({})
    
    // Animate input layer first
    setTimeout(() => {
      setActiveNodes(prev => ({ ...prev, 'input-0': true, 'input-1': true, 'input-2': true }))
    }, 100)

    // Show input to hidden1 connections
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'input-hidden1': true }))
    }, 500)

    // Animate hidden1 layer
    setTimeout(() => {
      setActiveNodes(prev => ({ ...prev, 'hidden1-0': true, 'hidden1-1': true, 'hidden1-2': true, 'hidden1-3': true }))
    }, 1000)

    // Show hidden1 to hidden2 connections
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden1-hidden2': true }))
    }, 1500)

    // Animate hidden2 layer
    setTimeout(() => {
      setActiveNodes(prev => ({ ...prev, 'hidden2-0': true, 'hidden2-1': true, 'hidden2-2': true, 'hidden2-3': true }))
    }, 2000)

    // Show hidden2 to output connections
    setTimeout(() => {
      setVisibleConnections(prev => ({ ...prev, 'hidden2-output': true }))
    }, 2500)

    // Animate output layer
    setTimeout(() => {
      setActiveNodes(prev => ({ ...prev, 'output-0': true, 'output-1': true }))
    }, 3000)

    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false)
      setActiveNodes({})
      setVisibleConnections({})
    }, 5000)
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
                    className={`absolute w-6 h-6 rounded-full shadow-lg cursor-grab active:cursor-grabbing ${
                      activeNodes[`input-${i}`] 
                        ? 'bg-gradient-to-br from-green-300 to-emerald-400' 
                        : 'bg-gradient-to-br from-green-400 to-emerald-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: activeNodes[`input-${i}`] 
                        ? '0 0 25px rgba(34, 197, 94, 1), 0 0 50px rgba(34, 197, 94, 0.6)'
                        : '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    onDrag={(event, info) => {
                      updateNodePosition('input', i, position.x + info.delta.x, position.y + info.delta.y)
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)"
                    }}
                    whileDrag={{
                      scale: 1.5,
                      boxShadow: "0 0 30px rgba(34, 197, 94, 1)"
                    }}
                    animate={{
                      scale: activeNodes[`input-${i}`] 
                        ? [1, 1.4, 1]
                        : [1, 1.2, 1],
                      opacity: activeNodes[`input-${i}`] 
                        ? [0.9, 1, 0.9]
                        : [0.7, 1, 0.7]
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
                    className={`absolute w-8 h-8 rounded-full shadow-lg cursor-grab active:cursor-grabbing ${
                      activeNodes[`hidden1-${i}`] 
                        ? 'bg-gradient-to-br from-purple-300 to-blue-400' 
                        : 'bg-gradient-to-br from-purple-400 to-blue-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: activeNodes[`hidden1-${i}`] 
                        ? '0 0 30px rgba(147, 51, 234, 1), 0 0 60px rgba(147, 51, 234, 0.6)'
                        : '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    onDrag={(event, info) => {
                      updateNodePosition('hidden1', i, position.x + info.delta.x, position.y + info.delta.y)
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 25px rgba(147, 51, 234, 0.8)"
                    }}
                    whileDrag={{
                      scale: 1.8,
                      boxShadow: "0 0 35px rgba(147, 51, 234, 1)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden1-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden1-${i}`] 
                        ? [0.8, 1, 0.8]
                        : [0.6, 1, 0.6]
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
                    className={`absolute w-8 h-8 rounded-full shadow-lg cursor-grab active:cursor-grabbing ${
                      activeNodes[`hidden2-${i}`] 
                        ? 'bg-gradient-to-br from-blue-300 to-cyan-400' 
                        : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: activeNodes[`hidden2-${i}`] 
                        ? '0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6)'
                        : '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    onDrag={(event, info) => {
                      updateNodePosition('hidden2', i, position.x + info.delta.x, position.y + info.delta.y)
                    }}
                    whileHover={{ 
                      scale: 2.5,
                      boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)"
                    }}
                    whileDrag={{
                      scale: 1.8,
                      boxShadow: "0 0 35px rgba(59, 130, 246, 1)"
                    }}
                    animate={{
                      scale: activeNodes[`hidden2-${i}`] 
                        ? [1, 1.5, 1]
                        : [1, 1.3, 1],
                      opacity: activeNodes[`hidden2-${i}`] 
                        ? [0.8, 1, 0.8]
                        : [0.6, 1, 0.6]
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
                    className={`absolute w-10 h-10 rounded-full shadow-lg cursor-grab active:cursor-grabbing ${
                      activeNodes[`output-${i}`] 
                        ? 'bg-gradient-to-br from-pink-300 to-rose-400' 
                        : 'bg-gradient-to-br from-pink-400 to-rose-500'
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: activeNodes[`output-${i}`] 
                        ? '0 0 35px rgba(244, 114, 182, 1), 0 0 70px rgba(244, 114, 182, 0.6)'
                        : '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    onDrag={(event, info) => {
                      updateNodePosition('output', i, position.x + info.delta.x, position.y + info.delta.y)
                    }}
                    whileHover={{ 
                      scale: 2,
                      boxShadow: "0 0 30px rgba(244, 114, 182, 0.8)"
                    }}
                    whileDrag={{
                      scale: 1.6,
                      boxShadow: "0 0 40px rgba(244, 114, 182, 1)"
                    }}
                    animate={{
                      scale: activeNodes[`output-${i}`] 
                        ? [1, 1.6, 1]
                        : [1, 1.4, 1],
                      opacity: activeNodes[`output-${i}`] 
                        ? [0.9, 1, 0.9]
                        : [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: activeNodes[`output-${i}`] ? 0.8 : 1.5 + i * 0.5,
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
                  {visibleConnections['input-hidden1'] && [0, 1, 2].map((inputIdx) => 
                    [0, 1, 2, 3].map((hiddenIdx) => (
                      <motion.line
                        key={`input-hidden1-${inputIdx}-${hiddenIdx}`}
                        x1={layerCoordinates.input.x}
                        y1={layerCoordinates.input.y + inputIdx * nodeSpacing.input - (inputIdx === 0 ? 10 : inputIdx === 1 ? 7 : 0)}
                        x2={layerCoordinates.hidden1.x}
                        y2={layerCoordinates.hidden1.y + hiddenIdx * nodeSpacing.hidden1 - (hiddenIdx === 0 ? 10 : 0)}
                        stroke="url(#gradient1)"
                        strokeWidth="1"
                        opacity={activeNodes[`input-${inputIdx}`] ? 0.9 : 0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 2,
                          delay: inputIdx * 0.2 + hiddenIdx * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    ))
                  )}

                  {/* Hidden Layer 1 to Hidden Layer 2 */}
                  {visibleConnections['hidden1-hidden2'] && [0, 1, 2, 3].map((hidden1Idx) => 
                    [0, 1, 2, 3].map((hidden2Idx) => (
                      <motion.line
                        key={`hidden1-hidden2-${hidden1Idx}-${hidden2Idx}`}
                        x1={layerCoordinates.hidden1.x}
                        y1={layerCoordinates.hidden1.y + hidden1Idx * nodeSpacing.hidden1 - (hidden1Idx === 0 ? 10 : 0)}
                        x2={layerCoordinates.hidden2.x}
                        y2={layerCoordinates.hidden2.y + hidden2Idx * nodeSpacing.hidden2 - (hidden2Idx === 0 ? 10 : 0)}
                        stroke="url(#gradient2)"
                        strokeWidth="1.5"
                        opacity={activeNodes[`hidden1-${hidden1Idx}`] ? 0.9 : 0.7}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 2.5,
                          delay: hidden1Idx * 0.15 + hidden2Idx * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    ))
                  )}

                  {/* Hidden Layer 2 to Output */}
                  {visibleConnections['hidden2-output'] && [0, 1, 2, 3].map((hidden2Idx) => 
                    [0, 1].map((outputIdx) => (
                      <motion.line
                        key={`hidden2-output-${hidden2Idx}-${outputIdx}`}
                        x1={layerCoordinates.hidden2.x}
                        y1={layerCoordinates.hidden2.y + hidden2Idx * nodeSpacing.hidden2 - (hidden2Idx === 0 ? 10 : 0)}
                        x2={layerCoordinates.output.x}
                        y2={layerCoordinates.output.y + outputIdx * nodeSpacing.output - (outputIdx === 0 ? 10 : 0)}
                        stroke="url(#gradient3)"
                        strokeWidth="2"
                        opacity={activeNodes[`hidden2-${hidden2Idx}`] ? 0.9 : 0.8}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 3,
                          delay: hidden2Idx * 0.2 + outputIdx * 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
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
