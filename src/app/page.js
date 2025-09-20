"use client";
import "./home.css";
import { useState, useEffect, useRef } from "react";
import Matter from "matter-js";

// import DynamicBackground from "@/components/DynamicBackground/DynamicBackground";
import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import Footer from "@/components/Footer/Footer";
// import InteractiveGradient from "@/components/InteractiveGradient";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const workExperience = [
  {
    position: "Designer | Founder",
    company: "Mojang",
    duration: "2025",
  },
  {
    position: "Product Designer",
    company: "Mojang",
    duration: "2023 - 2024",
  },
  {
    position: "Product Designer",
    company: "Mojang",
    duration: "2022",
  },
  {
    position: "Product Designer",
    company: "Mojang",
    duration: "2022",
  },
  {
    position: "Product Designer",
    company: "Mojang",
    duration: "2018 - 2022",
  },
  {
    position: "Web Designer",
    company: "Mojang",
    duration: "2015 - 2018",
  },
];

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(false);
  const homeRef = useRef(null);
  const aboutImgRef = useRef(null);
  const workExperienceRef = useRef(null);

  useEffect(() => {
    // Check if this is the initial page load
    const hasVisited = sessionStorage.getItem("hasVisitedHome");

    if (!hasVisited) {
      // First time loading the home page in this session
      setShowPreloader(true);
      sessionStorage.setItem("hasVisitedHome", "true");
    } else {
      // Already visited home page, no preloader
      setShowPreloader(false);
    }
  }, []);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 6.2 : 0.9;

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.3,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1,
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1,
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 1,
            ease: "hop",
          },
          index * 1,
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.75,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            preloaderOverlay.style.display = "none";
          },
        });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }

    // About image animation
    if (aboutImgRef.current) {
      const aboutImg = aboutImgRef.current.querySelector(
        ".about-img-container",
      );

      gsap.set(aboutImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      ScrollTrigger.create({
        trigger: aboutImg,
        start: "top 80%",
        onEnter: () => {
          gsap.to(aboutImg, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    }

    // Work experience animations
    if (workExperienceRef.current) {
      const workRows = workExperienceRef.current.querySelectorAll(
        ".work-experience-row",
      );

      workRows.forEach((row) => {
        const bg = row.querySelector(".work-experience-bg");
        const position = row.querySelector(".work-experience-position h3");
        const company = row.querySelector(".work-experience-company p");
        const duration = row.querySelector(".work-experience-duration span");

        // Set initial states
        gsap.set(bg, { scaleY: 0, transformOrigin: "bottom" });

        row.addEventListener("mouseenter", () => {
          gsap.to(bg, {
            scaleY: 1,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to([position, company, duration], {
            color: "var(--white)",
            duration: 0.4,
            ease: "power3.out",
          });
        });

        row.addEventListener("mouseleave", () => {
          gsap.to(bg, {
            scaleY: 0,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(position, {
            color: "var(--black)",
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(company, {
            color: "var(--black)",
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(duration, {
            color: "var(--foreground-200)",
            duration: 0.6,
            ease: "power3.out",
          });
        });
      });
    }
    // Add this new code here, at the end of the useGSAP callback
    // Initialize skills physics
    if (typeof window !== "undefined") {
      import("@/components/skillphysics").then(({ initSkillsPhysics }) => {
        initSkillsPhysics();
      });
    }
  }, [showPreloader]);

  return (
    <main className="home-page">
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-header">
          <Copy delay={showPreloader ? 6.2 : 0.9}>
            <h1>
              <span className="spacer">&nbsp;</span>
              Pakistan based Product Designer and Design Engineer with 8+ years
              of experience creating digital products across fintech, mobility,
              and consumer apps.
            </h1>
          </Copy>
        </div>
      </section>

      <section className="about-img" ref={aboutImgRef}>
        <div className="about-img-container">
          <img src="/about.jpg" alt="Ahmed Saleem" />
        </div>
      </section>

      <section className="story">
        <div className="col">
          <Copy>
            <h1>
              The Journey Behind <br /> My Design Approach
            </h1>
          </Copy>
        </div>
        <div className="col story-copy">
          <Copy>
            <p>
              My path to design started as a kid with sketchbooks and Lego,
              moved through poster design, and evolved into a passion for
              digital design. Because I’ve always loved bringing ideas to life,
              I went a step further and developed the skills to build what I
              designed. That dual skillset became my strength, ensuring ideas
              are carried through without compromise.
            </p>
          </Copy>
          <Copy delay={0.4}>
            <p>
              At Mojang, my mentor Jithin helped me refine my development skills
              while design remained my focus. Since then, I’ve worked on
              platforms for Mojang and Minecraft. In every project, my role has
              been to craft clear, user-centered solutions that balance
              aesthetics with usability.
            </p>
          </Copy>
          <Copy delay={0.6}>
            <p>
              Today, I’m the founder of Nothing. My current work centers on
              developing a system design approach that helps startups and
              fintech companies ship faster and with greater consistency.
            </p>
          </Copy>

          {/* <p>
              Hi I'm Ahemd Saleem, a product designer with a background in development.
              As designer I play an active role in the product development
              process, from shaping ideas, designing end-to-end flows, and
              collaborating with cross-functional teams to deliver elegant
              solutions that drive impact.
            </p>

            <p>
              I'm fluent in tools like Figma & design systems, React.js, React
              Native, Next.js, HTML/CSS, JavaScript, and TailwindCSS. I am a
              self-driven, self-motivated designer with a growth mindset. Right
              now, I run a newly founded Design Studio where I help startups and
              modern businesses build bold, high-impact digital products.
            </p> */}
        </div>
      </section>

      <section className="philosophy">
        <Copy>
          <span>The Thought Beneath</span>
        </Copy>
        <div className="header">
          <Copy>
            <h1>
              <span className="spacer">&nbsp;</span>Traveling shapes how i
              design. Every new place, every conversation, every observation
              adds to my understanding of how people interact with the world
              around them. Because the best designers aren't just students of
              design, they're students of humanity.
            </h1>
          </Copy>
        </div>
      </section>

      <section className="about-skills">
        <div className="container">
          <div className="about-skills-col">
            <div className="symbols-container"></div>
            <div className="about-skills-copy-wrapper">
              <div className="about-skills-callout">
                <Copy delay={0.2}>
                  <p className="mono">
                    <span>▶</span> Proving gravity applies to divs too
                  </p>
                </Copy>
              </div>
              <div className="about-skills-header">
                <Copy delay={0.4}>
                  <h3>Things I know that make the web cooler</h3>
                </Copy>
              </div>
            </div>
          </div>
          <div className="about-skills-col skills-playground">
            <div className="object-container">
              <div className="object os-1">
                <p className="mono">HTML</p>
              </div>
              <div className="object os-2">
                <p className="mono">CSS</p>
              </div>
              <div className="object os-3">
                <p className="mono">JavaScript</p>
              </div>
              <div className="object os-1">
                <p className="mono">GSAP</p>
              </div>
              <div className="object os-2">
                <p className="mono">Discord.js</p>
              </div>
              <div className="object os-3">
                <p className="mono">Lenis</p>
              </div>
              <div className="object os-1">
                <p className="mono">React</p>
              </div>
              <div className="object os-2">
                <p className="mono">Next.js</p>
              </div>
              <div className="object os-3">
                <p className="mono">WebGL</p>
              </div>
              <div className="object os-1">
                <p className="mono">Three.js</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-experience" ref={workExperienceRef}>
        <Copy>
          <span>Experience & Journey</span>
        </Copy>
        <div className="work-experience-table">
          {workExperience.map((experience, index) => (
            <div key={index} className="work-experience-row">
              <div className="work-experience-bg"></div>
              <div className="work-experience-position">
                <h3>{experience.position}</h3>
              </div>
              <div className="work-experience-company">
                <p>{experience.company}</p>
              </div>
              <div className="work-experience-duration">
                <span>{experience.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
