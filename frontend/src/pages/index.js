import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LockIcon, MessageSquareIcon, ShieldIcon, ArrowRight } from 'lucide-react'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 text-white">
      <Head>
        <title>Stealth Space - Secure Encrypted Messaging</title>
        <meta name="description" content="Stealth Space is a cutting-edge, end-to-end encrypted messaging application designed for users who prioritize privacy and security in their digital communications." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold">Stealth Space</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <Link href="/login" className="hover:text-blue-300 transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              Register
            </Link>
          </motion.div>
        </nav>

        <main className="flex flex-col items-center justify-center text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Welcome to Stealth Space
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 max-w-2xl"
          >
            Secure, encrypted messaging for those who value privacy and confidentiality.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/register" className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-full border-2 border-white transition-colors duration-300 flex items-center justify-center">
              Login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<LockIcon size={40} />}
              title="End-to-End Encryption"
              description="Your messages are encrypted from the moment you hit send until they reach the recipient."
            />
            <FeatureCard
              icon={<MessageSquareIcon size={40} />}
              title="Real-Time Chat"
              description="Enjoy seamless, instant messaging with real-time updates and notifications."
            />
            <FeatureCard
              icon={<ShieldIcon size={40} />}
              title="Self-Destructing Messages"
              description="Set messages to automatically delete after a specified time for added security."
            />
          </motion.div>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Stealth Space. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
    >
      <div className="mb-4 text-blue-300">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}