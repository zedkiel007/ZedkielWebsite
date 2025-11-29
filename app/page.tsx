'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import ContactForm from '@/components/contact-form';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null);

  const experiences = [
    {
      id: 0,
      title: 'Virtual Assistant',
      company: 'TWO-COMMA PM',
      period: 'March 2022 - Sept 2023',
      details: 'Provided administrative and technical support to international clients. Managed schedules, coordinated meetings, and handled customer communications.'
    },
    {
      id: 1,
      title: 'Virtual Assistant',
      company: 'Hexa Mortgage',
      period: 'December 2021 - February 2022',
      details: 'Assisted with mortgage documentation, client support, and administrative tasks.'
    },
    {
      id: 2,
      title: 'Full-time Missionary',
      company: 'The Church of Jesus Christ of Latter-day Saints',
      period: '2019 - 2021',
      details: 'Served in community outreach and leadership roles as a full-time missionary, helping others come unto Christ through teaching, service, and example. Developed strong communication skills while striving to live Christlike principles.'
    }
  ];

  const educationList = [
    {
      id: 3,
      title: 'Bachelor of Information Systems',
      school: 'Naga College Foundation',
      period: '2025 - Present',
      details: 'Currently studying Bachelor of Information Systems at Naga College Foundation.'
    },
    {
      id: 0,
      title: 'Computer System Servicing NC II',
      school: 'Padayan City National High School',
      period: '2021 - 2023',
      details: 'Technical vocational course focusing on computer hardware, troubleshooting, and system maintenance.'
    },
    {
      id: 1,
      title: 'Senior High School',
      school: 'Padayan City National High School',
      period: '2021 - 2023',
      details: 'Completed senior high school education with focus on technical and academic subjects.'
    },
    {
      id: 2,
      title: 'Junior High School',
      school: 'Padayan City National High School',
      period: '2012 - 2016',
      details: 'Completed junior high school curriculum with strong academic performance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-3xl font-bold text-slate-900 dark:text-white"></div>
        <div className="flex items-center gap-8">
          <Link href="#portfolio" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
            Portfolio
          </Link>
          <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
            About
          </Link>
          <Link href="#resume" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
            Resume
          </Link>
          <Link href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4">
                Hi, I'm Zedkiel N. Estrella
              </h3>
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-6"><b><i>
                Virtual Assistant and Musician
              </i></b></p>

              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hardworking student, devoted husband and father, and passionate musician skilled in piano, guitar, flute, and vocals.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Former full-time Missionary at The Church of Jesus Christ of latter-day Saints from 2019–2021 with strong values of honesty, integrity, and reliability.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed"><i>
                  "I strive to live a purposeful life, balancing family, studies, and my love for music."
                </i></p>
              </div>
            </div>

            <div>
              <Link 
                href="#resume" 
                className="inline-block text-lg font-semibold text-slate-900 dark:text-white pb-2 border-b-2 border-slate-900 dark:border-white hover:opacity-70 transition"
              >
                Check out my work!
              </Link>
            </div>
          </div>

          {/* Right - Profile Image with Artistic Overlay */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Artistic colored overlay effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-300 via-cyan-200 to-orange-300 opacity-50 dark:opacity-40"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800">
                <img
                  src="/zed.png"
                  alt="Zedkiel N. Estrella"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-400 rounded-full opacity-20 dark:opacity-10 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400 rounded-full opacity-20 dark:opacity-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div id="about" className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">LOCATION</h3>
                <p className="text-lg text-slate-900 dark:text-white">
                  San Fernando, Camarines Sur
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">EMAIL</h3>
              <p className="text-lg text-slate-900 dark:text-white">
                zedkielestrella3@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">PHONE</h3>
              <p className="text-lg text-slate-900 dark:text-white">
                +63 961 775 2342
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Time Management',
            'Operating System Navigation',
            'Microsoft Office',
            'Critical Thinking',
            'Computer Troubleshooting',
            'CRM Systems',
            'Lead Generation',
            'Multitasking',
            'Technical Support',
          ].map((skill, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-100 dark:bg-slate-900 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div id="resume" className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">Experience</h2>
          
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{exp.period}</p>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-600 dark:text-slate-400 transition-transform ${
                      expandedExperience === exp.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedExperience === exp.id && (
                  <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300">{exp.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">Education</h2>
        
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border-l-4 border-teal-400"
            >
              <button
                onClick={() => setExpandedEducation(expandedEducation === edu.id ? null : edu.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{edu.school}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{edu.period}</p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 dark:text-slate-400 transition-transform ${
                    expandedEducation === edu.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedEducation === edu.id && (
                <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300">{edu.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
          <p className="text-slate-300 mb-8 text-center">Feel free to reach out for opportunities or collaborations. Messages will be sent to the email on file.</p>

          <div className="max-w-2xl mx-auto bg-slate-800 dark:bg-slate-900 p-8 rounded-lg">
            {/* Client-side contact form component */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
