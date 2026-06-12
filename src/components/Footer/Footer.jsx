import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 relative overflow-hidden transition-colors duration-200">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/[0.03] dark:bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Logo & copyright */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full gap-4">
            <div>
              <div className="mb-4 inline-flex items-center">
                <Logo />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                A modern tech blogging platform built for developers, designers, and creators to share ideas and stories.
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                &copy; Copyright 2026. All Rights Reserved by StorySync.
              </p>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Legals
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-150" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer