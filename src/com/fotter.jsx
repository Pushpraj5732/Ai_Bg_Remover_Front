import React from "react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            AI PDF Assistant
          </h2>
          <p className="text-sm">
            Smart AI tool to analyze, summarize and chat with your PDFs easily.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Upload PDF</li>
            <li className="hover:text-white cursor-pointer">Results</li>
            <li className="hover:text-white cursor-pointer">Buy Credits</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p className="text-sm">Email: support@aipdf.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} AI PDF Assistant. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
