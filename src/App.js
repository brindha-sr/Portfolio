import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Share2, Mail, ExternalLink, Code, Database, Lightbulb, Trophy, Braces, Palette, Server, Brain, Wrench } from "lucide-react";
import { SiJavascript, SiPython, SiMongodb, SiMysql, SiHtml5, SiCss, SiReact, SiExpress, SiNodedotjs, SiTensorflow, SiPandas, SiScikitlearn, SiGit, SiGithub } from "react-icons/si";

// Scroll Animation Hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const projects = [
    {
      name: "VerdeRoute",
      description: "AI-powered route optimization for sustainable delivery systems. Reduces carbon footprint using machine learning algorithms.",
      tech: ["JavaScript","Leaflet.js", "OpenRouteService API","MongoDB"],
      link: "https://github.com/brindha-sr",
      icon: Lightbulb,
    },
    {
      name: "AI- Powered Stock Prediction System using LSTM Model",
      description: "LSTM-based model for stock price prediction with 85%+ accuracy on test data.",
      tech: ["Python", "TensorFlow", "Pandas", "Keras"],
      link: "https://github.com/brindha-sr",
      icon: Code,
    },
    {
      name: "Inventory Management System",
      description: "Inventory management system with real-time tracking and predictive stock analysis.",
      tech: ["Java", "SQL"],
      link: "https://github.com/brindha-sr",
      icon: Database,
    },
  ];

  const skills = {
    "Languages": { icon: Braces, items: ["Java", "Python", "JavaScript", "SQL"] },
    "Frontend": { icon: Palette, items: ["HTML", "CSS", "React"] },
    "Backend": { icon: Server, items: ["Express.js", "Node.js", "APIs"] },
    "Database": { icon: Database, items: ["MongoDB", "DBMS"] },
    "ML/AI": { icon: Brain, items: ["TensorFlow", "Pandas","Scikit-learn", "LSTM"] },
    "Tools": { icon: Wrench, items: ["Git", "Github", "VS Code", "PowerBI"] },
  };

  // Mapping individual skills to their icons
  const skillIconMap = {
    "Java": Code,
    "Python": SiPython,
    "JavaScript": SiJavascript,
    "SQL": SiMysql,
    "HTML": SiHtml5,
    "CSS": SiCss,
    "React": SiReact,
    "Express.js": SiExpress,
    "Node.js": SiNodedotjs,
    "MongoDB": SiMongodb,
    "TensorFlow": SiTensorflow,
    "Pandas": SiPandas,
    "Scikit-learn": SiScikitlearn,
    "Git": SiGit,
    "Github": SiGithub,
    "PowerBI": Code,
    "VS Code": Code,
  };

  // Brand colors for each skill
  const skillColorMap = {
    "Python": "#3776AB",
    "JavaScript": "#F7DF1E",
    "React": "#61DAFB",
    "MongoDB": "#13AA52",
    "SQL": "#00758F",
    "HTML": "#E34C26",
    "CSS": "#1572B6",
    "Node.js": "#68A063",
    "Express.js": "#FFFFFF",
    "TensorFlow": "#FF6F00",
    "Pandas": "#150458",
    "Scikit-learn": "#F7931E",
    "Git": "#F1502F",
    "Github": "#FFFFFF",
    "Java": "#007396",
    "VS Code": "#007ACC",
    "PowerBI": "#F2C811",
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus("Sending message...");
      
      // Send to Formspree
      fetch("https://formspree.io/f/maqvjpwo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
        .then(() => {
          setFormStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setFormStatus(""), 3000);
        })
        .catch(() => {
          setFormStatus("Failed to send message. Please try again.");
          setTimeout(() => setFormStatus(""), 3000);
        });
    } else {
      setFormStatus("Please fill all fields");
    }
  };

  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();
  const [projectsRef, projectsVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-950 to-black text-white min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 border-b border-gray-800 bg-black/80 backdrop-blur">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
        >
          Brindha S
        </motion.h1>

        {/* Desktop Menu */}
        <div className="space-x-8 hidden md:flex">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#60a5fa", scale: 1.05 }}
              className="transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur md:hidden z-40 p-4 border-b border-gray-800"
        >
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 px-4 hover:text-blue-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Building Real-World Tech Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg mb-8"
        >
          AI & Data Science student passionate about solving real-world problems with code. Specializing in machine learning, backend systems, and full-stack development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-4 md:gap-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)" }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold"
          >
            View My Work
          </motion.a>
          <motion.a
            href="https://github.com/brindha-sr"
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400/10 transition-colors"
          >
            GitHub Profile
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="px-6 py-20 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={aboutVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About Me
          </motion.h2>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur border border-gray-800 p-8 rounded-2xl">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a passionate developer and AI enthusiast with a strong foundation in Machine Learning and Data Structures, Algorithms. Currently pursuing my studies in AI & Data Science at Kongu Engineering College, I've worked on multiple projects that combine backend development with intelligent systems.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              My expertise spans from building scalable backend systems with MERN to developing ML models using Python and TensorFlow. I'm particularly interested in sustainable tech and optimization algorithms.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and solving complex algorithmic problems on programming platforms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="px-6 py-20">
        <motion.div
          initial="hidden"
          animate={skillsVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Skills & Expertise
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(skills).map(([category, { icon: IconComponent, items }]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)" }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur border border-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <IconComponent className="text-blue-400" size={24} />
                  <h3 className="font-bold text-blue-400 text-lg">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => {
                    const SkillIcon = skillIconMap[skill];
                    const skillColor = skillColorMap[skill] || "#60a5fa";
                    return (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-gray-700 rounded-lg hover:border-blue-400 hover:bg-blue-400/10 transition-all cursor-pointer"
                      >
                        {SkillIcon ? (
                          <SkillIcon size={28} style={{ color: skillColor }} />
                        ) : (
                          <Code className="text-gray-400" size={28} />
                        )}
                        <span className="text-xs font-medium text-center">{skill}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="px-6 py-20">
        <motion.div
          initial="hidden"
          animate={projectsVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Projects
          </motion.h2>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: "0 0 30px rgba(96, 165, 250, 0.4)" }}
                  className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-xl group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-xl">{project.name}</h3>
                      <IconComponent className="text-blue-400" size={24} />
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                          {t}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ gap: "8px" }}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      View Project <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="px-6 py-20">
        <motion.div
          initial="hidden"
          animate={contactVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Get In Touch
          </motion.h2>

          {/* Social Links */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center gap-8 mb-12"
          >
            {[
              { icon: Code, link: "https://github.com/brindha-sr", label: "GitHub" },
              { icon: Share2, link: "https://linkedin.com/in/brindha-s-8bb9b52ba", label: "LinkedIn" },
              { icon: Trophy, link: "https://leetcode.com/Brindha22", label: "LeetCode" },
              { icon: Mail, link: "mailto:brindhasenthilkumar2006@gmail.com", label: "Email" },
            ].map(({ icon: Icon, link, label }) => (
              <motion.a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.2, color: "#60a5fa" }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={32} className="hover:text-blue-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleFormSubmit}
            className="bg-white/5 backdrop-blur border border-gray-800 p-8 rounded-2xl"
          >
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full bg-white/10 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full bg-white/10 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows="4"
                className="w-full bg-white/10 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Your message"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Send Message
            </motion.button>

            {formStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-center text-sm ${formStatus.includes("successfully") ? "text-green-400" : "text-red-400"}`}
              >
                {formStatus}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 text-center text-gray-500">
        <p>© 2026 Brindha S. All rights reserved.</p>
        <p className="text-sm mt-2">Built with React, Tailwind CSS, and Framer Motion</p>
      </footer>
    </div>
  );
}

export default App;
