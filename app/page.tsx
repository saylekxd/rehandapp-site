"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  Heart, 
  Activity,
  CheckCircle,
  Play,
  Download,
  Menu,
  X,
  ArrowRight,
  Zap,
  Lock,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Real-time AI Feedback",
      description: "Get instant corrections and guidance with on-device AI motion analysis that learns your movement patterns."
    },
    {
      icon: Activity,
      title: "Exercise Library",
      description: "Access professional exercises with step-by-step guidance designed by certified physiotherapists."
    },
    {
      icon: Target,
      title: "Personalized Plans",
      description: "Receive customized rehabilitation programs adapted to your specific needs and fitness level."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed stats, weekly goals, and comprehensive session history."
    },
    {
      icon: Shield,
      title: "Safety Protocols",
      description: "Follow safety-first protocols developed in collaboration with healthcare professionals."
    },
    {
      icon: Lock,
      title: "Privacy Focused",
      description: "Your data stays on your device. Complete control with export capabilities anytime you need."
    }
  ];

  const targetAudiences = [
    {
      icon: Heart,
      title: "Post-Injury Recovery",
      description: "Accelerate your recovery process with guided exercises and progress monitoring after injury or surgery."
    },
    {
      icon: Users,
      title: "Seniors & Mobility",
      description: "Improve strength, balance, and mobility with gentle, age-appropriate rehabilitation exercises."
    },
    {
      icon: Zap,
      title: "Prevention & Maintenance",
      description: "Maintain your health and prevent future issues with daily rehabilitation routines."
    }
  ];

  const stats = [
    { number: "100+", label: "Professional Exercises" },
    { number: "24/7", label: "AI Motion Analysis" },
    { number: "100%", label: "Privacy Protected" },
    { number: "0", label: "Data Sent to Servers" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ReHand</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
              <nav className="flex flex-col space-y-4 p-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">Benefits</a>
                <a href="#privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  Smart rehabilitation trainer
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  ReHand
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  ReHand uses AI motion analysis to guide safe home rehabilitation. Get real‑time feedback, 
                  personalized plans, clear instructions, and track your progress with goals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  <Download className="w-5 h-5 mr-2" />
                  Download Now
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>On-device AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Privacy first</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Professional guidance</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-[520px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-[3rem] shadow-2xl transform rotate-6"></div>
                <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-xl">
                  <div className="bg-white rounded-[2.5rem] h-full flex items-center justify-center overflow-hidden">
                    {/* Placeholder for phone screenshot */}
                    <div className="text-center space-y-4 p-8">
                      <Smartphone className="w-16 h-16 text-blue-600 mx-auto" />
                      <p className="text-gray-600 text-sm">
                        Add your app screenshot here
                      </p>
                      <div className="space-y-2">
                        <div className="h-2 bg-blue-100 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <p className="text-xs text-gray-500">Progress tracking in action</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Intelligent Rehabilitation Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your phone becomes a personal physiotherapy coach with advanced AI motion analysis 
              and professional guidance systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Perfect For Every Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're recovering, maintaining health, or preventing future issues, 
              ReHand adapts to your specific needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <audience.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600">
                    {audience.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section id="privacy" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Your Privacy & Safety First
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">On-Device Processing</h3>
                    <p className="text-gray-600">All AI analysis happens on your device. Your data never leaves your phone.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Export Your Data</h3>
                    <p className="text-gray-600">Complete control over your rehabilitation data with export capabilities anytime.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Professional Standards</h3>
                    <p className="text-gray-600">Safety protocols designed with certified physiotherapists and healthcare professionals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Notice</h3>
                </div>
                <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Important:</strong> ReHand does not replace professional medical advice. 
                    Always consult with your healthcare provider before starting any rehabilitation program. 
                    Stop exercises immediately if you experience pain and seek professional medical guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Start Your Recovery Journey Today
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands who have transformed their rehabilitation experience with AI-powered guidance and personalized care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReHand</span>
              </div>
              <p className="text-gray-400">
                Smart rehabilitation trainer powered by AI motion analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Medical Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {["rehabilitation", "physiotherapy", "AI", "motion analysis", "health", "mobility"].map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ReHand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}