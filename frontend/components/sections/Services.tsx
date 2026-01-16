'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Check, Globe, ShoppingCart, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Basic Website',
    description: 'Perfect for small businesses getting started online',
    price: '₹15,000',
    priceNote: 'One-time payment',
    features: [
      '5-page professional website',
      'Mobile responsive design',
      'Contact form integration',
      'Google Maps integration',
      'Basic SEO optimization',
      '1 month support',
    ],
    link: '/services/website-development',  // ADD THIS
    buttonText: 'Get Started',
  },
  {
    icon: Sparkles,
    title: 'Business Website',
    description: 'Ideal for established businesses looking to grow',
    price: '₹30,000',
    priceNote: 'One-time payment',
    popular: true,
    features: [
      'Everything in Basic +',
      'Up to 10+ pages',
      'Photo gallery/portfolio',
      'Social media integration',
      'Blog section',
      'WhatsApp Business integration',
      '3 months support',
      'Google My Business setup',
    ],
    link: '/services/website-development',  // ADD THIS
    buttonText: 'Get Started',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Complete online store with payment gateway',
    price: '₹60,000',
    priceNote: 'One-time payment',
    features: [
      'Everything in Business +',
      'Online store setup',
      'Payment gateway integration',
      'Product management system',
      'Order tracking',
      'Inventory management',
      '6 months support',
    ],
    link: '/services/ecommerce',  // ADD THIS
    buttonText: 'Get Started',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="coral" className="mb-4">Our Services</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-display">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. All packages include modern 
            design, mobile responsiveness, and ongoing support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="coral" className="text-sm px-4 py-1.5 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                service.popular ? 'border-2 border-coral-500' : 'border border-gray-200'
              }`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  service.popular 
                    ? 'bg-gradient-to-br from-coral-500 to-pink-500' 
                    : 'bg-gradient-to-br from-navy-600 to-navy-800'
                }`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-navy-900 mb-1">
                    {service.price}
                  </div>
                  <div className="text-sm text-gray-500">{service.priceNote}</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button - NOW CLICKABLE! */}
                <Link href={service.link} className="block">
                  <Button
                    variant={service.popular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    {service.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}