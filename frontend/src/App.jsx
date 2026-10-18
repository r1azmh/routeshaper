import './App.css';
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Vehicle Routing Problem Solver
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Optimising industrial distribution transport planning with integrated emission estimation.
          </p>
          <div className="mt-8">
            <a
              href="/dashboard/"
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-blue-100"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
          <p className="mt-2 text-gray-600">
            Our solver is designed for small and medium industries to optimize
            their transport planning. It can also be used for research and academic case studies.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">Optimisation</h3>
              <p className="mt-2 text-gray-600">
                Solve complex routing problems with efficient algorithms tailored
                for distribution transport.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">Emission Estimation</h3>
              <p className="mt-2 text-gray-600">
                Provide emission estimation for the suggested route plan in accordance with the EEA guidelines.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">Open Source</h3>
              <p className="mt-2 text-gray-600">
                Available under Apache 2.0 license for transparency, collaboration,
                and academic use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800">
            About RouteShaper
          </h2>
          <p className="mt-4 text-gray-600">
            This tool has been developed as part of the{' '}
            <span className="font-medium">
              Optimising distribution transport in the food ecosystem
            </span>{' '}
            project at the University of Vaasa, Finland.
          </p>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://github.com/r1azmh/vrp-backend/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Backend Code
            </a>
            <a
              href="http://github.com/r1azmh/vrp-frontend/"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Frontend Code
            </a>
            <a
              href="https://www.uwasa.fi/en/elintarvike-ekosysteemi"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
            >
              Project Link
            </a>
          </div>

          {/* Project Actors */}
          <section id="contact" className="mt-10">
            <h3 className="text-2xl font-semibold">Project Details</h3>
            <p className="mt-2 text-gray-600">
              <strong>Research Group:</strong> Networked Value Systems (NeVS) <br />
              <strong>School:</strong> School of Technology and Innovations
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Petri Helo</strong> – Principal Investigator, Professor,
                Industrial Management, University of Vaasa.
              </li>
              <li>
                <strong>Riaz Mahmud</strong> – Project Researcher, Industrial
                Systems Analytics, University of Vaasa.
              </li>
            </ul>
          </section>

          {/* Funding */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Funding Partners</h3>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
              <li>EU – European Regional Development Fund (ERDF)</li>
              <li>Etelä-Pohjanmaan liitto, Seinäjoki</li>
            </ul>
          </div>

          {/* License */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">License</h3>
            <p className="mt-2 text-gray-600 whitespace-pre-line">
              Apache License, Version 2.0, January 2004 {'\n'}
              Copyright © 2024 Petri Helo and Riaz Mahmud.
            </p>
            <p className="mt-4 text-gray-600">
              Licensed under the Apache License, Version 2.0. You may obtain a
              copy at{' '}
              <a
                href="http://www.apache.org/licenses/LICENSE-2.0"
                className="text-blue-600 underline"
              >
                http://www.apache.org/licenses/LICENSE-2.0
              </a>
            </p>
          </div>
          {/* Contact */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Contact</h3>
            <p className="mt-2 text-gray-600 whitespace-pre-line">
              For any issues or queries, contact at: {'\n'}
              routeshaper at gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-200 text-center text-gray-700">
        © 2025 RouteShaper
      </footer>
    </div>
  );
}


export default App;

