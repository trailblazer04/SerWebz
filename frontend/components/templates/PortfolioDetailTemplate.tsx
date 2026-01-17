'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, ExternalLink, Calendar, TrendingUp, Clock, Check, Quote } from 'lucide-react'

interface PortfolioDetailProps {
  project: {
    title: string
    category: string
    client: string
    description: string
    challenge: string
    solution: string
    features: string[]
    technologies: string[]
    results: {
      metric: string
      value: string
      icon?: React.ReactNode
    }[]
    images: {
      hero: string
      gallery: string[]
    }
    testimonial?: {
      quote: string
      author: string
      role: string
      company: string
    }
    timeline: string
    liveUrl?: string
  }
}

export default function PortfolioDetailTemplate({ project }: PortfolioDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-64 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-coral-400 hover:text-coral-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>

            <Badge variant="coral" className="mb-4">{project.category}</Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-display">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-coral-400" />
                <span className="text-gray-300">Timeline: {project.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Client:</span>
                <span className="font-semibold">{project.client}</span>
              </div>
              {project.liveUrl && (
               <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-coral-400 hover:text-coral-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live Site
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative -mt-32 mb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={project.images.hero}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Project Results</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-coral-100 flex items-center justify-center mx-auto mb-4">
                    {result.icon || <TrendingUp className="w-8 h-8 text-coral-600" />}
                  </div>
                  <div className="text-4xl font-bold text-navy-900 mb-2">{result.value}</div>
                  <div className="text-gray-600">{result.metric}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features Implemented</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex items-start gap-3 bg-white p-6 rounded-xl shadow-sm"
                >
                  <Check className="w-6 h-6 text-coral-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Technologies Used</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-base px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.gallery.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Project Gallery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-navy-50 to-blue-50 rounded-2xl p-12 relative"
              >
                <Quote className="w-16 h-16 text-coral-500/20 absolute top-8 left-8" />
                <div className="relative z-10">
                  <p className="text-2xl text-gray-800 leading-relaxed mb-8 italic">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900 text-lg">
                        {project.testimonial.author}
                      </div>
                      <div className="text-gray-600">
                        {project.testimonial.role}, {project.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s build something amazing together. Get in touch for a free consultation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#contact">
              <Button variant="primary" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}