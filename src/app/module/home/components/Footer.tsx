import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/footer-logo.png"
                alt="HomeMaster Logo"
                width={160}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-6">
              A leading provider of professional cleaning services and
              solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Client Review
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Move In/Out Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                >
                  Specialized Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-gray-600">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#19A4C6] mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  4296 Coplin Avenue, Phoenix, Arizona, 59412
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#19A4C6] mr-3 flex-shrink-0" />
                {/* <a
                  href="mailto:contact@homemaster.pro"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                > */}
                contact@homemaster.pro
                {/* </a> */}
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#19A4C6] mr-3 flex-shrink-0" />
                {/* <a
                  href="tel:+14802025906"
                  className="text-gray-600 hover:text-[#19A4C6] transition-colors"
                > */}
                +1 480-202-5906
                {/* </a> */}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} HomeMaster. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-gray-500 text-sm hover:text-[#19A4C6] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 text-sm hover:text-[#19A4C6] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
