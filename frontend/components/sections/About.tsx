'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Check, ExternalLink, Award, Users, Target } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section 1: About SerWebz (Company) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="SerWebz Team Collaboration"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold text-navy-900">50+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="coral">About SerWebz</Badge>

            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Connecting Businesses to Digital Excellence
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              At SerWebz, we believe every business deserves a powerful online presence. 
              We specialize in creating modern, high-performing websites that don&apos;t just look 
              good—they drive real results.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience and a passion for innovation, we&apos;ve helped over 50 
              businesses transform their digital presence and accelerate growth. From restaurants 
              to hotels, tours to retail, we understand what it takes to succeed online.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-6">
              {[
                'Custom-built websites tailored to your business',
                'Mobile-responsive design for all devices',
                'SEO-optimized for better Google rankings',
                'Ongoing support and maintenance',
                'Fast delivery—most projects in 2-3 weeks'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-coral-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div className="mt-8 p-6 bg-gradient-to-br from-navy-50 to-blue-50 rounded-2xl border border-navy-100">
              <div className="flex items-start gap-3 mb-2">
                <Target className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    To empower growing businesses with professional web solutions that are 
                    accessible, affordable, and results-driven.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Meet the Founder (NEW!) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-12 border-t border-gray-200">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:order-1"
          >
            <Badge variant="coral">Meet the Founder</Badge>

            <h2 className="text-4xl lg:text-5xl font-bold font-display">
              Hi, I&apos;m Leo Francis
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Founder and Lead Developer at SerWebz. With a passion for web development 
              and a commitment to helping businesses thrive online, I created SerWebz to 
              bridge the gap between traditional businesses and the digital world.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Every website we build is crafted with care, attention to detail, and a focus 
              on delivering real results. I don&apos;t just create websites—I create digital 
              experiences that help your business grow.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 mb-1">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 mb-1">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="font-semibold text-navy-900">Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'UI/UX Design'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link 
                href="https://leo-francis-portfolio.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="group">
                  View My Portfolio
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>

              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Let&apos;s Work Together
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 p-4 bg-gradient-to-r from-coral-50 to-pink-50 rounded-xl border border-coral-100">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-coral-600" />
                <div>
                  <p className="font-semibold text-gray-900">Verified Professional</p>
                  <p className="text-sm text-gray-600">
                    Based in Goa, India • Available for projects worldwide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:order-2"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Replace this with your actual photo */}
              <Image
                src="/leo-francis.jpg"
                alt="Leo Francis - Founder of SerWebz"
                fill
                className="object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
              
              {/* Name badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <h3 className="text-xl font-bold text-navy-900 mb-1">Leo Francis</h3>
                <p className="text-gray-600">Founder & Lead Developer</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Trusted by 50+ businesses</span>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-coral-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-navy-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}