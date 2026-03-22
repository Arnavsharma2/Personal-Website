'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProfileHero() {
  return (
    <section id="home" className="profile-hero">
      <div className="profile-hero-content">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="profile-avatar"
        >
          <div className="avatar-circle">
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="profile-name"
        >
          Arnav Sharma
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="profile-tagline"
        >
          <p>
            CS @ Penn State University
          </p>
        </motion.div>
      </div>
    </section>
  )
}
