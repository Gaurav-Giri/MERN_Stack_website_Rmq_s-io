// routes/FooterRoutes.js
import express from 'express';
import FooterContent from '../../models/contentModels/FooterContent.js';
import MessageProducer from '../../rabbitmq/messageProducer.js';

const router = express.Router();

// GET footer content
router.get('/', async (req, res) => {
  try {
    const footer = await FooterContent.getActiveFooter();
    
    if (!footer) {
      // Return default structure if no footer exists
      const defaultFooter = {
        companyName: 'School Lunch Box',
        tagline: 'Fresh meals delivered to your child\'s school',
        sections: [],
        socialLinks: {},
        copyrightText: '© 2025 School Lunch Box. All rights reserved.',
        themeSettings: {
          allowThemeToggle: true,
          defaultTheme: 'light'
        },
        version: '1.0.0'
      };
      return res.json({ success: true, data: defaultFooter });
    }
    
    res.json({ success: true, data: footer });
  } catch (error) {
    console.error('Error fetching footer content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET footer statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const footer = await FooterContent.findOne();
    
    if (!footer) {
      return res.json({
        success: true,
        data: {
          totalSections: 0,
          activeSections: 0,
          totalLinks: 0,
          hasSocialLinks: false,
          themeSettings: {
            allowThemeToggle: true,
            defaultTheme: 'light'
          }
        }
      });
    }

    const totalSections = footer.sections.length;
    const activeSections = footer.sections.filter(section => section.isActive).length;
    const totalLinks = footer.sections.reduce((acc, section) => acc + (section.links?.length || 0), 0);
    const hasSocialLinks = Object.values(footer.socialLinks || {}).some(value => value && value.trim() !== '');

    res.json({
      success: true,
      data: {
        totalSections,
        activeSections,
        inactiveSections: totalSections - activeSections,
        totalLinks,
        hasSocialLinks,
        companyName: footer.companyName,
        themeSettings: footer.themeSettings,
        lastUpdated: footer.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching footer statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST create footer content
router.post('/', async (req, res) => {
  try {
    const { companyName, tagline, sections, socialLinks, copyrightText, themeSettings } = req.body;
    
    // Check if footer content already exists
    const existingFooter = await FooterContent.findOne();
    if (existingFooter) {
      return res.status(409).json({ 
        success: false, 
        message: 'Footer content already exists. Use PUT to update.' 
      });
    }

    const footerContent = new FooterContent({
      companyName: companyName || 'School Lunch Box',
      tagline: tagline || 'Fresh meals delivered to your child\'s school',
      sections: sections || [],
      socialLinks: socialLinks || {},
      copyrightText: copyrightText || '© 2025 School Lunch Box. All rights reserved.',
      themeSettings: themeSettings || {
        allowThemeToggle: true,
        defaultTheme: 'light'
      }
    });

    const newFooter = await footerContent.save();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_content_created', {
      footer: newFooter,
      createdVia: 'http'
    });
    
    res.status(201).json({ success: true, data: newFooter });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error creating footer content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update footer content
router.put('/', async (req, res) => {
  try {
    const { companyName, tagline, sections, socialLinks, copyrightText, themeSettings, version } = req.body;

    const updatedFooter = await FooterContent.findOneAndUpdate(
      {},
      {
        companyName,
        tagline,
        sections,
        socialLinks,
        copyrightText,
        themeSettings,
        version
      },
      { new: true, upsert: true, runValidators: true }
    );
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_content_updated', {
      footer: updatedFooter,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedFooter });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating footer content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST add footer section
router.post('/sections', async (req, res) => {
  try {
    const { title, content, links, contactInfo, order, isActive } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Section title is required' 
      });
    }

    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found. Create footer first.' 
      });
    }

    const sectionData = {
      title: title.trim(),
      content: content?.trim() || '',
      links: links || [],
      contactInfo: contactInfo || {},
      order: order || footer.sections.length,
      isActive: isActive !== undefined ? isActive : true
    };

    footer.sections.push(sectionData);
    await footer.save();
    
    const updatedFooter = await FooterContent.getActiveFooter();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_section_added', {
      footer: updatedFooter,
      section: sectionData,
      addedVia: 'http'
    });
    
    res.status(201).json({ success: true, data: updatedFooter });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error adding footer section:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update footer section
router.put('/sections/:sectionId', async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { title, content, links, contactInfo, order, isActive } = req.body;

    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }

    const section = footer.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer section not found.' 
      });
    }

    // Update fields
    if (title !== undefined) section.title = title.trim();
    if (content !== undefined) section.content = content?.trim() || '';
    if (links !== undefined) section.links = links;
    if (contactInfo !== undefined) section.contactInfo = contactInfo;
    if (order !== undefined) section.order = order;
    if (isActive !== undefined) section.isActive = isActive;

    await footer.save();
    
    const updatedFooter = await FooterContent.getActiveFooter();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_section_updated', {
      footer: updatedFooter,
      sectionId: sectionId,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedFooter });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating footer section:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE footer section
router.delete('/sections/:sectionId', async (req, res) => {
  try {
    const { sectionId } = req.params;

    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }

    const section = footer.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer section not found.' 
      });
    }

    footer.sections.pull(sectionId);
    await footer.save();
    
    const updatedFooter = await FooterContent.getActiveFooter();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_section_removed', {
      footer: updatedFooter,
      sectionId: sectionId,
      removedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Footer section deleted successfully',
      data: updatedFooter
    });
  } catch (error) {
    console.error('Error deleting footer section:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update social links
router.put('/social-links', async (req, res) => {
  try {
    const { facebook, twitter, instagram, linkedin } = req.body;

    const updatedFooter = await FooterContent.findOneAndUpdate(
      {},
      { 
        socialLinks: {
          facebook: facebook || '',
          twitter: twitter || '',
          instagram: instagram || '',
          linkedin: linkedin || ''
        }
      },
      { new: true }
    );
    
    if (!updatedFooter) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_social_links_updated', {
      footer: updatedFooter,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedFooter });
  } catch (error) {
    console.error('Error updating social links:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update theme settings
router.put('/theme-settings', async (req, res) => {
  try {
    const { allowThemeToggle, defaultTheme } = req.body;

    if (defaultTheme && !['light', 'dark'].includes(defaultTheme)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Default theme must be either "light" or "dark"' 
      });
    }

    const updatedFooter = await FooterContent.findOneAndUpdate(
      {},
      { 
        themeSettings: {
          allowThemeToggle: allowThemeToggle !== undefined ? allowThemeToggle : true,
          defaultTheme: defaultTheme || 'light'
        }
      },
      { new: true }
    );
    
    if (!updatedFooter) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_theme_settings_updated', {
      footer: updatedFooter,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedFooter });
  } catch (error) {
    console.error('Error updating theme settings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH reorder footer sections
router.patch('/sections/reorder', async (req, res) => {
  try {
    const { sectionsOrder } = req.body;

    if (!Array.isArray(sectionsOrder)) {
      return res.status(400).json({ 
        success: false, 
        message: 'sectionsOrder must be an array of section IDs' 
      });
    }

    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }

    // Reorder sections based on provided order array
    const orderedSections = sectionsOrder.map(sectionId => 
      footer.sections.id(sectionId)
    ).filter(section => section !== null);

    // Update order field for each section
    orderedSections.forEach((section, index) => {
      section.order = index;
    });

    footer.sections = orderedSections;
    await footer.save();
    
    const updatedFooter = await FooterContent.getActiveFooter();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_sections_reordered', {
      footer: updatedFooter,
      reorderedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Footer sections reordered successfully',
      data: updatedFooter
    });
  } catch (error) {
    console.error('Error reordering footer sections:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH toggle section active status
router.patch('/sections/:sectionId/toggle-status', async (req, res) => {
  try {
    const { sectionId } = req.params;

    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer content not found.' 
      });
    }

    const section = footer.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Footer section not found.' 
      });
    }

    section.isActive = !section.isActive;
    await footer.save();
    
    const updatedFooter = await FooterContent.getActiveFooter();
    
    // Publish to RabbitMQ
    await MessageProducer.publishFooterEvent('footer_section_status_toggled', {
      footer: updatedFooter,
      sectionId: sectionId,
      toggledVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: `Section ${section.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedFooter
    });
  } catch (error) {
    console.error('Error toggling footer section status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;