// // scripts/SeedFooter.js
// import mongoose from 'mongoose';
// import FooterContent from '../models/contentModels/FooterContent.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const dummyFooterData = {
//   companyName: "School Lunch Box",
//   tagline: "Fresh meals delivered to your child's school",
//   sections: [
//     {
//       title: "About Us",
//       content: "We provide nutritious and delicious meals to schools across India, ensuring every child gets the best lunch experience.",
//       order: 0,
//       isActive: true
//     },
//     {
//       title: "Quick Links",
//       links: [
//         { 
//           text: "Home", 
//           url: "/", 
//           external: false 
//         },
//         { 
//           text: "About Us", 
//           url: "/about", 
//           external: false 
//         },
//         { 
//           text: "Services", 
//           url: "/services", 
//           external: false 
//         },
//         { 
//           text: "Contact", 
//           url: "/contact", 
//           external: false 
//         },
//         { 
//           text: "Privacy Policy", 
//           url: "/privacy-policy", 
//           external: false 
//         },
//         { 
//           text: "Terms & Conditions", 
//           url: "/terms-conditions", 
//           external: false 
//         }
//       ],
//       order: 1,
//       isActive: true
//     },
//     {
//       title: "Our Services",
//       links: [
//         { 
//           text: "Meal Plans", 
//           url: "/meal-plans", 
//           external: false 
//         },
//         { 
//           text: "School Programs", 
//           url: "/school-programs", 
//           external: false 
//         },
//         { 
//           text: "Nutrition Guide", 
//           url: "/nutrition-guide", 
//           external: false 
//         },
//         { 
//           text: "Parent Portal", 
//           url: "/parent-portal", 
//           external: false 
//         },
//         { 
//           text: "School Portal", 
//           url: "/school-portal", 
//           external: false 
//         }
//       ],
//       order: 2,
//       isActive: true
//     },
//     {
//       title: "Contact Information",
//       contactInfo: {
//         email: "support@schoollunchbox.com",
//         phone: "+91 9876543210",
//         address: "123 Education Street, Learning District, Mumbai, Maharashtra 400001"
//       },
//       order: 3,
//       isActive: true
//     },
//     {
//       title: "School Partners",
//       content: "Partnering with 50+ schools across India to deliver quality meals.",
//       order: 4,
//       isActive: true
//     }
//   ],
//   socialLinks: {
//     facebook: "https://facebook.com/schoollunchbox",
//     twitter: "https://twitter.com/schoollunchbox",
//     instagram: "https://instagram.com/schoollunchbox",
//     linkedin: "https://linkedin.com/company/schoollunchbox"
//   },
//   copyrightText: "© 2025 School Lunch Box. All rights reserved.",
//   themeSettings: {
//     allowThemeToggle: true,
//     defaultTheme: "light"
//   },
//   version: "1.0.0"
// };

// const alternativeFooterData = {
//   companyName: "School Lunch Box",
//   tagline: "Nutrition Made Delicious for Growing Minds",
//   sections: [
//     {
//       title: "Why Choose Us",
//       content: "Over 5 years of experience in providing healthy, tasty, and balanced meals to schools.",
//       order: 0,
//       isActive: true
//     },
//     {
//       title: "For Parents",
//       links: [
//         { 
//           text: "Menu of the Week", 
//           url: "/weekly-menu", 
//           external: false 
//         },
//         { 
//           text: "Allergy Information", 
//           url: "/allergy-info", 
//           external: false 
//         },
//         { 
//           text: "Payment Options", 
//           url: "/payment-options", 
//           external: false 
//         },
//         { 
//           text: "FAQ", 
//           url: "/faq", 
//           external: false 
//         },
//         { 
//           text: "Feedback", 
//           url: "/feedback", 
//           external: false 
//         }
//       ],
//       order: 1,
//       isActive: true
//     },
//     {
//       title: "For Schools",
//       links: [
//         { 
//           text: "Partnership", 
//           url: "/school-partnership", 
//           external: false 
//         },
//         { 
//           text: "Menu Customization", 
//           url: "/menu-customization", 
//           external: false 
//         },
//         { 
//           text: "Nutrition Standards", 
//           url: "/nutrition-standards", 
//           external: false 
//         },
//         { 
//           text: "Safety Protocols", 
//           url: "/safety-protocols", 
//           external: false 
//         }
//       ],
//       order: 2,
//       isActive: true
//     },
//     {
//       title: "Get In Touch",
//       contactInfo: {
//         email: "info@schoollunchbox.com",
//         phone: "+91 9876543210",
//         phone2: "+91 9876543211",
//         address: "456 Learning Avenue, Knowledge Park, Delhi 110001"
//       },
//       order: 3,
//       isActive: true
//     },
//     {
//       title: "Operating Hours",
//       content: "Customer Support: Mon-Sat: 8:00 AM - 8:00 PM\nDelivery: Monday-Friday: 11:00 AM - 2:00 PM",
//       order: 4,
//       isActive: true
//     }
//   ],
//   socialLinks: {
//     facebook: "https://facebook.com/schoollunchboxindia",
//     instagram: "https://instagram.com/schoollunchboxindia",
//     youtube: "https://youtube.com/schoollunchbox",
//     linkedin: "https://linkedin.com/company/schoollunchbox-india"
//   },
//   copyrightText: "© 2025 School Lunch Box Pvt. Ltd. All rights reserved. | Made with ❤️ for healthier school days",
//   themeSettings: {
//     allowThemeToggle: true,
//     defaultTheme: "light"
//   },
//   version: "1.1.0"
// };

// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');
    
//     // Clear existing footer data
//     await FooterContent.deleteMany({});
//     console.log('🗑️ Cleared existing footer content');
    
//     // Insert new footer data
//     const footerContent = new FooterContent(dummyFooterData);
//     await footerContent.save();
//     console.log('✅ Added default footer content to database');
    
//     // Display footer statistics
//     const totalFooter = await FooterContent.countDocuments();
//     const savedFooter = await FooterContent.findOne();
    
//     console.log('\n📊 Footer Database Statistics:');
//     console.log(`Total Footer Documents: ${totalFooter}`);
//     console.log(`Company Name: ${savedFooter.companyName}`);
//     console.log(`Tagline: ${savedFooter.tagline}`);
//     console.log(`Total Sections: ${savedFooter.sections.length}`);
    
//     const activeSections = savedFooter.sections.filter(section => section.isActive).length;
//     const totalLinks = savedFooter.sections.reduce((acc, section) => acc + (section.links?.length || 0), 0);
//     const socialLinksCount = Object.values(savedFooter.socialLinks).filter(link => link && link.trim() !== '').length;
    
//     console.log(`Active Sections: ${activeSections}`);
//     console.log(`Total Links: ${totalLinks}`);
//     console.log(`Social Media Links: ${socialLinksCount}`);
//     console.log(`Copyright Text: ${savedFooter.copyrightText}`);
//     console.log(`Theme Toggle Enabled: ${savedFooter.themeSettings.allowThemeToggle}`);
//     console.log(`Default Theme: ${savedFooter.themeSettings.defaultTheme}`);
//     console.log(`Version: ${savedFooter.version}`);
    
//     console.log('\n📋 Section Details:');
//     savedFooter.sections.forEach((section, index) => {
//       console.log(`\n${index + 1}. ${section.title}`);
//       console.log(`   Order: ${section.order}`);
//       console.log(`   Active: ${section.isActive}`);
//       console.log(`   Type: ${section.links ? 'Links' : section.contactInfo ? 'Contact' : 'Content'}`);
      
//       if (section.links) {
//         console.log(`   Links Count: ${section.links.length}`);
//         section.links.forEach(link => {
//           console.log(`     - ${link.text} → ${link.url}`);
//         });
//       }
      
//       if (section.contactInfo) {
//         console.log(`   Contact Info:`);
//         if (section.contactInfo.email) console.log(`     Email: ${section.contactInfo.email}`);
//         if (section.contactInfo.phone) console.log(`     Phone: ${section.contactInfo.phone}`);
//         if (section.contactInfo.address) console.log(`     Address: ${section.contactInfo.address}`);
//       }
      
//       if (section.content && !section.links && !section.contactInfo) {
//         console.log(`   Content: ${section.content.substring(0, 50)}...`);
//       }
//     });
    
//     console.log('\n🔗 Social Media Links:');
//     Object.entries(savedFooter.socialLinks).forEach(([platform, url]) => {
//       if (url && url.trim() !== '') {
//         console.log(`   ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
//       }
//     });
    
//     console.log('\n🎨 Theme Settings:');
//     console.log(`   Allow Theme Toggle: ${savedFooter.themeSettings.allowThemeToggle}`);
//     console.log(`   Default Theme: ${savedFooter.themeSettings.defaultTheme}`);
    
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Error seeding footer database:', error);
//     process.exit(1);
//   }
// };

// // Run the seed function if this file is executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   seedDatabase();
// }

// export { dummyFooterData, alternativeFooterData, seedDatabase };
// export default seedDatabase;











// scripts/SeedFooter.js
import mongoose from 'mongoose';
import FooterContent from '../models/contentModels/FooterContent.js';
import dotenv from 'dotenv';
dotenv.config();

const dummyFooterData = {
  companyName: "School Lunch Box",
  tagline: "Fresh meals delivered to your child's school",
  sections: [
    {
      title: "About Us",
      content: "We provide nutritious and delicious meals to schools across India, ensuring every child gets the best lunch experience.",
      order: 0,
      isActive: true
    },
    {
      title: "Quick Links",
      links: [
        { 
          text: "Home", 
          url: "/", 
          external: false 
        },
        { 
          text: "About Us", 
          url: "/about", 
          external: false 
        },
        { 
          text: "Services", 
          url: "/services", 
          external: false 
        },
        { 
          text: "Contact", 
          url: "/contact", 
          external: false 
        },
        { 
          text: "Privacy Policy", 
          url: "/privacy-policy", 
          external: false 
        },
        { 
          text: "Terms & Conditions", 
          url: "/terms-conditions", 
          external: false 
        }
      ],
      order: 1,
      isActive: true
    },
    {
      title: "Our Services",
      links: [
        { 
          text: "Meal Plans", 
          url: "/meal-plans", 
          external: false 
        },
        { 
          text: "School Programs", 
          url: "/school-programs", 
          external: false 
        },
        { 
          text: "Nutrition Guide", 
          url: "/nutrition-guide", 
          external: false 
        },
        { 
          text: "Parent Portal", 
          url: "/parent-portal", 
          external: false 
        },
        { 
          text: "School Portal", 
          url: "/school-portal", 
          external: false 
        }
      ],
      order: 2,
      isActive: true
    },
    {
      title: "Contact Information",
      contactInfo: {
        email: "support@schoollunchbox.com",
        phone: "+91 9876543210",
        address: "123 Education Street, Learning District, Mumbai, Maharashtra 400001"
      },
      order: 3,
      isActive: true
    },
    {
      title: "School Partners",
      content: "Partnering with 50+ schools across India to deliver quality meals.",
      order: 4,
      isActive: true
    }
  ],
  socialLinks: {
    facebook: "https://facebook.com/schoollunchbox",
    twitter: "https://twitter.com/schoollunchbox",
    instagram: "https://instagram.com/schoollunchbox",
    linkedin: "https://linkedin.com/company/schoollunchbox"
  },
  copyrightText: "© 2025 School Lunch Box. All rights reserved.",
  themeSettings: {
    allowThemeToggle: true,
    defaultTheme: "light"
  },
  version: "1.0.0"
};

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting footer database seeding...');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing footer data
    await FooterContent.deleteMany({});
    console.log('🗑️ Cleared existing footer content');
    
    // Insert new footer data
    const footerContent = new FooterContent(dummyFooterData);
    await footerContent.save();
    console.log('✅ Added default footer content to database');
    
    // Display footer statistics
    const totalFooter = await FooterContent.countDocuments();
    const savedFooter = await FooterContent.findOne();
    
    console.log('\n📊 Footer Database Statistics:');
    console.log(`Total Footer Documents: ${totalFooter}`);
    console.log(`Company Name: ${savedFooter.companyName}`);
    console.log(`Tagline: ${savedFooter.tagline}`);
    console.log(`Total Sections: ${savedFooter.sections.length}`);
    
    const activeSections = savedFooter.sections.filter(section => section.isActive).length;
    const totalLinks = savedFooter.sections.reduce((acc, section) => acc + (section.links?.length || 0), 0);
    const socialLinksCount = Object.values(savedFooter.socialLinks).filter(link => link && link.trim() !== '').length;
    
    console.log(`Active Sections: ${activeSections}`);
    console.log(`Total Links: ${totalLinks}`);
    console.log(`Social Media Links: ${socialLinksCount}`);
    console.log(`Copyright Text: ${savedFooter.copyrightText}`);
    console.log(`Theme Toggle Enabled: ${savedFooter.themeSettings.allowThemeToggle}`);
    console.log(`Default Theme: ${savedFooter.themeSettings.defaultTheme}`);
    console.log(`Version: ${savedFooter.version}`);
    
    console.log('\n📋 Section Details:');
    savedFooter.sections.forEach((section, index) => {
      console.log(`\n${index + 1}. ${section.title}`);
      console.log(`   Order: ${section.order}`);
      console.log(`   Active: ${section.isActive}`);
      console.log(`   Type: ${section.links ? 'Links' : section.contactInfo ? 'Contact' : 'Content'}`);
      
      if (section.links) {
        console.log(`   Links Count: ${section.links.length}`);
        section.links.forEach(link => {
          console.log(`     - ${link.text} → ${link.url}`);
        });
      }
      
      if (section.contactInfo) {
        console.log(`   Contact Info:`);
        if (section.contactInfo.email) console.log(`     Email: ${section.contactInfo.email}`);
        if (section.contactInfo.phone) console.log(`     Phone: ${section.contactInfo.phone}`);
        if (section.contactInfo.address) console.log(`     Address: ${section.contactInfo.address}`);
      }
      
      if (section.content && !section.links && !section.contactInfo) {
        console.log(`   Content: ${section.content.substring(0, 50)}...`);
      }
    });
    
    console.log('\n🔗 Social Media Links:');
    Object.entries(savedFooter.socialLinks).forEach(([platform, url]) => {
      if (url && url.trim() !== '') {
        console.log(`   ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
      }
    });
    
    console.log('\n🎨 Theme Settings:');
    console.log(`   Allow Theme Toggle: ${savedFooter.themeSettings.allowThemeToggle}`);
    console.log(`   Default Theme: ${savedFooter.themeSettings.defaultTheme}`);
    
    console.log('\n✅ Footer seeding completed successfully!');
    
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding footer database:', error);
    process.exit(1);
  }
};

// Simple execution - remove the complex import.meta check
seedDatabase();