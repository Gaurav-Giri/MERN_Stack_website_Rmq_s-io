// import React from 'react';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import './AboutUsPage.css';

// const AboutUsPage = () => {
//   const { darkMode } = useThemeTrigger();

//   const teamMembers = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "👩‍💼",
//       bio: "15+ years of industry experience. Passionate about innovation and customer success.",
//       social: {
//         linkedin: "#",
//         twitter: "#",
//         email: "#"
//       }
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "CTO",
//       image: "👨‍💻",
//       bio: "Tech visionary with expertise in AI and cloud computing. Leads our technical strategy.",
//       social: {
//         linkedin: "#",
//         github: "#",
//         email: "#"
//       }
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       role: "Head of Design",
//       image: "👩‍🎨",
//       bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
//       social: {
//         linkedin: "#",
//         dribbble: "#",
//         email: "#"
//       }
//     },
//     {
//       id: 4,
//       name: "David Kim",
//       role: "Lead Developer",
//       image: "👨‍🔧",
//       bio: "Full-stack developer specializing in scalable architecture and performance optimization.",
//       social: {
//         linkedin: "#",
//         github: "#",
//         email: "#"
//       }
//     }
//   ];

//   const milestones = [
//     {
//       year: "2018",
//       title: "Company Founded",
//       description: "Started with a vision to revolutionize the industry"
//     },
//     {
//       year: "2019",
//       title: "Seed Funding",
//       description: "Raised $2M in seed funding from top investors"
//     },
//     {
//       year: "2020",
//       title: "Product Launch",
//       description: "Successfully launched our flagship product"
//     },
//     {
//       year: "2021",
//       title: "User Growth",
//       description: "Reached 100,000 active users worldwide"
//     },
//     {
//       year: "2022",
//       title: "Series A",
//       description: "Closed $10M Series A funding round"
//     },
//     {
//       year: "2023",
//       title: "Global Expansion",
//       description: "Expanded operations to 3 new continents"
//     }
//   ];

//   const values = [
//     {
//       icon: "🎯",
//       title: "Excellence",
//       description: "We strive for excellence in everything we do, from product development to customer support."
//     },
//     {
//       icon: "🤝",
//       title: "Integrity",
//       description: "We operate with honesty, transparency, and ethical business practices."
//     },
//     {
//       icon: "🌱",
//       title: "Innovation",
//       description: "We embrace change and continuously seek innovative solutions to complex problems."
//     },
//     {
//       icon: "❤️",
//       title: "Community",
//       description: "We believe in building strong communities and giving back to society."
//     }
//   ];

//   return (
//     <div className={`about-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>About Our Company</h1>
//           <p className="hero-subtitle">
//             We're on a mission to transform the way businesses operate through innovative 
//             technology solutions and exceptional customer experiences.
//           </p>
//           <div className="hero-stats">
//             <div className="stat">
//               <span className="stat-number">50K+</span>
//               <span className="stat-label">Happy Customers</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">15+</span>
//               <span className="stat-label">Countries</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">99.9%</span>
//               <span className="stat-label">Uptime</span>
//             </div>
//           </div>
//         </div>
//         <div className="hero-visual">
//           <div className="floating-elements">
//             <div className="element element-1">🚀</div>
//             <div className="element element-2">💡</div>
//             <div className="element element-3">🌍</div>
//           </div>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="mission-section">
//         <div className="mission-content">
//           <div className="mission-text">
//             <h2>Our Mission</h2>
//             <p>
//               To empower businesses of all sizes with cutting-edge technology solutions 
//               that drive growth, efficiency, and innovation. We believe that every 
//               company deserves access to tools that help them compete and thrive in 
//               the digital age.
//             </p>
//           </div>
//           <div className="mission-visual">
//             <div className="mission-card">
//               <div className="card-icon">🎯</div>
//               <h3>Vision 2030</h3>
//               <p>Become the leading platform for digital transformation globally</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="values-section">
//         <div className="section-header">
//           <h2>Our Values</h2>
//           <p>The principles that guide everything we do</p>
//         </div>
//         <div className="values-grid">
//           {values.map((value, index) => (
//             <div key={index} className="value-card">
//               <div className="value-icon">{value.icon}</div>
//               <h3>{value.title}</h3>
//               <p>{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="team-section">
//         <div className="section-header">
//           <h2>Meet Our Team</h2>
//           <p>The brilliant minds behind our success</p>
//         </div>
//         <div className="team-grid">
//           {teamMembers.map(member => (
//             <div key={member.id} className="team-card">
//               <div className="member-image">
//                 {member.image}
//               </div>
//               <div className="member-info">
//                 <h3>{member.name}</h3>
//                 <p className="member-role">{member.role}</p>
//                 <p className="member-bio">{member.bio}</p>
//                 <div className="social-links">
//                   <a href={member.social.linkedin} className="social-link">LinkedIn</a>
//                   {member.social.github && <a href={member.social.github} className="social-link">GitHub</a>}
//                   {member.social.twitter && <a href={member.social.twitter} className="social-link">Twitter</a>}
//                   {member.social.dribbble && <a href={member.social.dribbble} className="social-link">Dribbble</a>}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Timeline Section */}
//       <section className="timeline-section">
//         <div className="section-header">
//           <h2>Our Journey</h2>
//           <p>Milestones that shaped our company</p>
//         </div>
//         <div className="timeline">
//           {milestones.map((milestone, index) => (
//             <div key={index} className="timeline-item">
//               <div className="timeline-marker"></div>
//               <div className="timeline-content">
//                 <div className="timeline-year">{milestone.year}</div>
//                 <h3>{milestone.title}</h3>
//                 <p>{milestone.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="cta-content">
//           <h2>Join Our Journey</h2>
//           <p>
//             Interested in working with us or learning more about what we do? 
//             We're always looking for talented individuals and great partners.
//           </p>
//           <div className="cta-buttons">
//             <button className="cta-button primary">Careers</button>
//             <button className="cta-button secondary">Contact Us</button>
//             <button className="cta-button outline">Partnerships</button>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="about-footer">
//         <div className="footer-content">
//           <p>© 2024 Your Company Name. All rights reserved.</p>
//           <div className="footer-links">
//             <a href="/privacy-policy">Privacy Policy</a>
//             <a href="/terms">Terms of Service</a>
//             <a href="/contact">Contact</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutUsPage;



import React from 'react';
import { useThemeTrigger } from '../../ThemeTrigger';
import styles from './AboutUsPage.module.css';

const AboutUsPage = () => {
  const { darkMode } = useThemeTrigger();

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      bio: "15+ years of industry experience. Passionate about innovation and customer success.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      image: "👨‍💻",
      bio: "Tech visionary with expertise in AI and cloud computing. Leads our technical strategy.",
      social: {
        linkedin: "#",
        github: "#",
        email: "#"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "👩‍🎨",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
      social: {
        linkedin: "#",
        dribbble: "#",
        email: "#"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Lead Developer",
      image: "👨‍🔧",
      bio: "Full-stack developer specializing in scalable architecture and performance optimization.",
      social: {
        linkedin: "#",
        github: "#",
        email: "#"
      }
    }
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", description: "Started with a vision to revolutionize the industry" },
    { year: "2019", title: "Seed Funding", description: "Raised $2M in seed funding from top investors" },
    { year: "2020", title: "Product Launch", description: "Successfully launched our flagship product" },
    { year: "2021", title: "User Growth", description: "Reached 100,000 active users worldwide" },
    { year: "2022", title: "Series A", description: "Closed $10M Series A funding round" },
    { year: "2023", title: "Global Expansion", description: "Expanded operations to 3 new continents" }
  ];

  const values = [
    { icon: "🎯", title: "Excellence", description: "We strive for excellence in everything we do, from product development to customer support." },
    { icon: "🤝", title: "Integrity", description: "We operate with honesty, transparency, and ethical business practices." },
    { icon: "🌱", title: "Innovation", description: "We embrace change and continuously seek innovative solutions to complex problems." },
    { icon: "❤️", title: "Community", description: "We believe in building strong communities and giving back to society." }
  ];

  return (
    <div className={`${styles["about-container"]} ${darkMode ? styles["dark-mode"] : ""}`}>
      
      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h1>About Our Company</h1>
          <p className={styles["hero-subtitle"]}>
            We're on a mission to transform the way businesses operate through innovative 
            technology solutions and exceptional customer experiences.
          </p>
          <div className={styles["hero-stats"]}>
            <div className={styles["stat"]}>
              <span className={styles["stat-number"]}>50K+</span>
              <span className={styles["stat-label"]}>Happy Customers</span>
            </div>
            <div className={styles["stat"]}>
              <span className={styles["stat-number"]}>15+</span>
              <span className={styles["stat-label"]}>Countries</span>
            </div>
            <div className={styles["stat"]}>
              <span className={styles["stat-number"]}>99.9%</span>
              <span className={styles["stat-label"]}>Uptime</span>
            </div>
          </div>
        </div>
        <div className={styles["hero-visual"]}>
          <div className={styles["floating-elements"]}>
            <div className={styles["element"]}>🚀</div>
            <div className={styles["element"]}>💡</div>
            <div className={styles["element"]}>🌍</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles["mission-section"]}>
        <div className={styles["mission-content"]}>
          <div className={styles["mission-text"]}>
            <h2>Our Mission</h2>
            <p>
              To empower businesses of all sizes with cutting-edge technology solutions 
              that drive growth, efficiency, and innovation. We believe that every 
              company deserves access to tools that help them compete and thrive in 
              the digital age.
            </p>
          </div>
          <div className={styles["mission-visual"]}>
            <div className={styles["mission-card"]}>
              <div className={styles["card-icon"]}>🎯</div>
              <h3>Vision 2030</h3>
              <p>Become the leading platform for digital transformation globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles["values-section"]}>
        <div className={styles["section-header"]}>
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className={styles["values-grid"]}>
          {values.map((value, index) => (
            <div key={index} className={styles["value-card"]}>
              <div className={styles["value-icon"]}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className={styles["team-section"]}>
        <div className={styles["section-header"]}>
          <h2>Meet Our Team</h2>
          <p>The brilliant minds behind our success</p>
        </div>
        <div className={styles["team-grid"]}>
          {teamMembers.map(member => (
            <div key={member.id} className={styles["team-card"]}>
              <div className={styles["member-image"]}>{member.image}</div>
              <div className={styles["member-info"]}>
                <h3>{member.name}</h3>
                <p className={styles["member-role"]}>{member.role}</p>
                <p className={styles["member-bio"]}>{member.bio}</p>
                <div className={styles["social-links"]}>
                  <a href={member.social.linkedin} className={styles["social-link"]}>LinkedIn</a>
                  {member.social.github && <a href={member.social.github} className={styles["social-link"]}>GitHub</a>}
                  {member.social.twitter && <a href={member.social.twitter} className={styles["social-link"]}>Twitter</a>}
                  {member.social.dribbble && <a href={member.social.dribbble} className={styles["social-link"]}>Dribbble</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles["timeline-section"]}>
        <div className={styles["section-header"]}>
          <h2>Our Journey</h2>
          <p>Milestones that shaped our company</p>
        </div>
        <div className={styles["timeline"]}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles["timeline-item"]}>
              <div className={styles["timeline-marker"]}></div>
              <div className={styles["timeline-content"]}>
                <div className={styles["timeline-year"]}>{milestone.year}</div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles["cta-section"]}>
        <div className={styles["cta-content"]}>
          <h2>Join Our Journey</h2>
          <p>
            Interested in working with us or learning more about what we do? 
            We're always looking for talented individuals and great partners.
          </p>
          <div className={styles["cta-buttons"]}>
            <button className={`${styles["cta-button"]} ${styles["primary"]}`}>Careers</button>
            <button className={`${styles["cta-button"]} ${styles["secondary"]}`}>Contact Us</button>
            <button className={`${styles["cta-button"]} ${styles["outline"]}`}>Partnerships</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className={styles["about-footer"]}>
        <div className={styles["footer-content"]}>
          <p>© 2024 Your Company Name. All rights reserved.</p>
          <div className={styles["footer-links"]}>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer> */}

    </div>
  );
};

export default AboutUsPage;   
