import React from "react";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../../assets/svgs/kiosk-logo.svg";

const Footer = () => {
  const quickLinks = [
    { title: "Home", url: "/home" },
    { title: "Browse Events", url: "#" },
    { title: "About Us", url: "/about-us" },
    { title: "Contact", url: "#" },
  ];

  const resources = [
    { title: "FAQs", url: "#" },
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Blog", url: "#" },
  ];

  return (
    <footer className="flex flex-col w-full items-center px-6 py-12 bg-white md:px-16 lg:px-24">
      <div className="w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <img alt="Kiosk Logo Icon" src={logo} />
            </div>

            <p className="text-sm text-[#736d78] max-w-[317px]">
              Bringing people together through memorable events. Discover,
              register, and enjoy a seamless event management experience.
            </p>

            <div className="flex items-center gap-4">
              <Facebook className="w-5 h-5 cursor-pointer" color="#736D78" />
              <Twitter className="w-5 h-5 cursor-pointer" color="#736D78" />
              <Instagram className="w-5 h-5 cursor-pointer" color="#736D78" />
              <Linkedin className="w-5 h-5 cursor-pointer" color="#736D78" />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-xl text-[#12141d]">Quick Links</h3>
            <ul className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="text-sm text-[#736d78] leading-6 hover:text-black"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-xl text-[#12141d]">Resources</h3>
            <ul className="flex flex-col space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="text-sm text-[#736d78] leading-6 hover:text-black"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-xl text-[#12141d]">Contact Us</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 mt-1" color="#6941C6" />
                <p className="text-sm text-[#736d78] leading-6">
                  123 Event Plaza, Suite 200
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5" color="#6941C6" />
                <p className="text-sm text-[#736d78] leading-6">
                  (555) 123-4567
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5" color="#6941C6" />
                <p className="text-sm text-[#736d78] leading-6">
                  info@kiosk.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-8 mt-8 border-t border-[#e6e3e8]">
          <p className="text-base text-center text-[#736d78]">
            © {new Date().getFullYear()} Kiosk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
