import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram, Github } from "lucide-react";
import Logo from "../assets/Logo1.jpg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-6 flex flex-col md:flex-row items-center justify-between w-full mt-auto">
      {/* Background Animations */}
      {[
        { top: "10%", left: "15%" },
        { top: "80%", left: "30%" },
        { top: "30%", left: "70%" },
      ].map((pos, index) => (
        <motion.div
          key={index}
          animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            width: 100,
            height: 100,
            background: "linear-gradient(45deg, #FFCCE1, #FF77B7)",
            borderRadius: "50%",
            opacity: 0.6,
            zIndex: 0,
          }}
        />
      ))}

      {/* Social Media Links (Left Side) */}
      <div className="flex gap-6 z-10">
        <SocialIcon
          href="https://www.linkedin.com/in/kaklotar-k/"
          Icon={Linkedin}
        />
        <SocialIcon href="mailto:kdemo2205@gmail.com" Icon={Mail} />
        <SocialIcon href="#" Icon={Instagram} />
        <SocialIcon href="https://github.com/Krupa2205" Icon={Github} />
      </div>

      {/* Caption (Centered) */}
      <p className="text-center text-lg font-semibold z-10 mt-6 md:mt-0">
        "Aapka dimaag tez hai ya bas kismat achhi? 🤔🍀😂, Kher Jitne ka asli
        maza tab hai jab jawab pata na ho 😎🔥"
        <p className="mt-2 flex items-center justify-center gap-1">
          Made with
          <motion.span
            className="text-red-500 text-xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          >
            ❤✨
          </motion.span>
          By Krupa
        </p>
      </p>

      {/* Logo (Right Side) */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="z-10 mt-6 md:mt-0"
      >
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 md:w-28 md:h-28 bg-gray-900 rounded-xl border-4 border-white shadow-lg"
        />
      </motion.div>
    </footer>
  );
};

// Social Media Icon Component
const SocialIcon = ({ href, Icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 shadow-md"
      whileHover={{ scale: 1.3, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon size={30} className="text-white" />
    </motion.a>
  );
};

export default Footer;
