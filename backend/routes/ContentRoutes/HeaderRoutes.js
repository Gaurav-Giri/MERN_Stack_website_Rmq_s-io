// routes/HeaderRoutes.js

import express from 'express';
import HeaderContent from '../../models/contentModels/HeaderContent.js';
import MessageProducer from '../../rabbitmq/messageProducer.js';

const router = express.Router();

// GET header content
router.get('/', async (req, res) => {
  try {
    const header = await HeaderContent.getActiveHeader();
    
    if (!header) {
      // Return default structure if no header exists
      const defaultHeader = {
        companyName: 'School Lunch Box',
        logo: {
          url: '',
          altText: 'School Lunch Box Logo'
        },
        navigationLinks: [
          { text: 'About Us', url: '/AboutUs', external: false, order: 0, isActive: true },
          { text: 'Contact', url: '/ContactUs', external: false, order: 1, isActive: true },
          { text: 'FAQ', url: '/FAQ', external: false, order: 2, isActive: true }
        ],
        authSettings: {
          showAuthButtons: true,
          dashboardRoles: {
            admin: { label: 'Admin Dashboard', path: '/AdminDashboard' },
            vendor: { label: 'Vendor Dashboard', path: '/VendorDashboard' },
            user: { label: 'My Dashboard', path: '/UserDashboard' }
          }
        },
        themeSettings: {
          allowThemeToggle: true,
          defaultTheme: 'light'
        },
        notificationSettings: {
          showNotifications: true,
          position: 'right'
        },
        mobileSettings: {
          breakpoint: 768,
          showMobileMenu: true
        }
      };
      return res.json({ success: true, data: defaultHeader });
    }
    
    res.json({ success: true, data: header });
  } catch (error) {
    console.error('Error fetching header content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET header statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const header = await HeaderContent.findOne();
    
    if (!header) {
      return res.json({
        success: true,
        data: {
          totalLinks: 0,
          activeLinks: 0,
          inactiveLinks: 0,
          hasLogo: false,
          themeToggleEnabled: true,
          notificationsEnabled: true,
          mobileMenuEnabled: true
        }
      });
    }

    const totalLinks = header.navigationLinks.length;
    const activeLinks = header.navigationLinks.filter(link => link.isActive).length;
    
    res.json({
      success: true,
      data: {
        totalLinks,
        activeLinks,
        inactiveLinks: totalLinks - activeLinks,
        hasLogo: !!header.logo?.url,
        themeToggleEnabled: header.themeSettings?.allowThemeToggle ?? true,
        notificationsEnabled: header.notificationSettings?.showNotifications ?? true,
        mobileMenuEnabled: header.mobileSettings?.showMobileMenu ?? true,
        companyName: header.companyName
      }
    });
  } catch (error) {
    console.error('Error fetching header statistics:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST create header content
router.post('/', async (req, res) => {
  try {
    const { 
      companyName, 
      logo, 
      navigationLinks, 
      authSettings, 
      themeSettings, 
      notificationSettings, 
      mobileSettings 
    } = req.body;
    
    // Check if header content already exists
    const existingHeader = await HeaderContent.findOne();
    if (existingHeader) {
      return res.status(409).json({ 
        success: false, 
        message: 'Header content already exists. Use update instead.' 
      });
    }

    const header = new HeaderContent({
      companyName: companyName || 'School Lunch Box',
      logo: logo || { url: '', altText: 'School Lunch Box Logo' },
      navigationLinks: navigationLinks || [],
      authSettings: authSettings || {
        showAuthButtons: true,
        dashboardRoles: {
          admin: { label: 'Admin Dashboard', path: '/AdminDashboard' },
          vendor: { label: 'Vendor Dashboard', path: '/VendorDashboard' },
          user: { label: 'My Dashboard', path: '/UserDashboard' }
        }
      },
      themeSettings: themeSettings || {
        allowThemeToggle: true,
        defaultTheme: 'light'
      },
      notificationSettings: notificationSettings || {
        showNotifications: true,
        position: 'right'
      },
      mobileSettings: mobileSettings || {
        breakpoint: 768,
        showMobileMenu: true
      }
    });

    const newHeader = await header.save();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_content_created', {
      header: newHeader,
      createdVia: 'http'
    });
    
    res.status(201).json({ success: true, data: newHeader });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error creating header content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update header content
router.put('/', async (req, res) => {
  try {
    const { updates } = req.body;
    
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ 
        success: false, 
        message: 'Updates object is required' 
      });
    }

    const updatedHeader = await HeaderContent.findOneAndUpdate(
      {},
      updates,
      { new: true, upsert: true, runValidators: true }
    );
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_content_updated', {
      header: updatedHeader,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedHeader });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating header content:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST add navigation link
router.post('/links', async (req, res) => {
  try {
    const { text, url, external = false, order = 0, isActive = true } = req.body;
    
    if (!text || !url) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text and URL are required fields' 
      });
    }

    const header = await HeaderContent.findOne();
    if (!header) {
      return res.status(404).json({ 
        success: false, 
        message: 'Header content not found. Create header first.' 
      });
    }

    // Check for duplicate link text
    const duplicateLink = header.navigationLinks.find(
      link => link.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicateLink) {
      return res.status(409).json({ 
        success: false, 
        message: 'Navigation link with this text already exists' 
      });
    }

    const newLink = {
      text: text.trim(),
      url,
      external,
      order,
      isActive
    };

    header.navigationLinks.push(newLink);
    await header.save();
    
    const updatedHeader = await HeaderContent.getActiveHeader();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_link_added', {
      header: updatedHeader,
      link: newLink,
      addedVia: 'http'
    });
    
    res.status(201).json({ success: true, data: updatedHeader });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error adding navigation link:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update navigation link
router.put('/links/:linkId', async (req, res) => {
  try {
    const { linkId } = req.params;
    const { text, url, external, order, isActive } = req.body;
    
    if (!linkId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid link ID format' 
      });
    }

    const header = await HeaderContent.findOne();
    if (!header) {
      return res.status(404).json({ 
        success: false, 
        message: 'Header content not found.' 
      });
    }

    const link = header.navigationLinks.id(linkId);
    if (!link) {
      return res.status(404).json({ 
        success: false, 
        message: 'Navigation link not found.' 
      });
    }

    // Check for duplicate link text (excluding current link)
    if (text) {
      const duplicateLink = header.navigationLinks.find(
        existingLink => 
          existingLink._id.toString() !== linkId &&
          existingLink.text.toLowerCase() === text.toLowerCase()
      );

      if (duplicateLink) {
        return res.status(409).json({ 
          success: false, 
          message: 'Another navigation link with this text already exists' 
        });
      }
    }

    // Update fields
    if (text) link.text = text.trim();
    if (url) link.url = url;
    if (external !== undefined) link.external = external;
    if (order !== undefined) link.order = order;
    if (isActive !== undefined) link.isActive = isActive;

    await header.save();
    
    const updatedHeader = await HeaderContent.getActiveHeader();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_link_updated', {
      header: updatedHeader,
      linkId: linkId,
      updatedVia: 'http'
    });
    
    res.json({ success: true, data: updatedHeader });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('Error updating navigation link:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE navigation link
router.delete('/links/:linkId', async (req, res) => {
  try {
    const { linkId } = req.params;
    
    if (!linkId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid link ID format' 
      });
    }

    const header = await HeaderContent.findOne();
    if (!header) {
      return res.status(404).json({ 
        success: false, 
        message: 'Header content not found.' 
      });
    }

    const link = header.navigationLinks.id(linkId);
    if (!link) {
      return res.status(404).json({ 
        success: false, 
        message: 'Navigation link not found.' 
      });
    }

    header.navigationLinks.pull(linkId);
    await header.save();
    
    const updatedHeader = await HeaderContent.getActiveHeader();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_link_removed', {
      header: updatedHeader,
      linkId: linkId,
      removedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Navigation link deleted successfully',
      data: updatedHeader
    });
  } catch (error) {
    console.error('Error deleting navigation link:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH update logo
router.patch('/logo', async (req, res) => {
  try {
    const { url, altText } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        message: 'Logo URL is required' 
      });
    }

    const updatedHeader = await HeaderContent.findOneAndUpdate(
      {},
      { 
        logo: {
          url,
          altText: altText || 'School Lunch Box Logo'
        }
      },
      { new: true, upsert: true }
    );
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_logo_updated', {
      header: updatedHeader,
      updatedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Logo updated successfully',
      data: updatedHeader
    });
  } catch (error) {
    console.error('Error updating logo:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH update theme settings
router.patch('/theme-settings', async (req, res) => {
  try {
    const { allowThemeToggle, defaultTheme } = req.body;
    
    const updatedHeader = await HeaderContent.findOneAndUpdate(
      {},
      { themeSettings: { allowThemeToggle, defaultTheme } },
      { new: true, upsert: true }
    );
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_theme_settings_updated', {
      header: updatedHeader,
      updatedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Theme settings updated successfully',
      data: updatedHeader
    });
  } catch (error) {
    console.error('Error updating theme settings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH reorder navigation links
router.patch('/reorder-links', async (req, res) => {
  try {
    const { linksOrder } = req.body;
    
    if (!Array.isArray(linksOrder)) {
      return res.status(400).json({ 
        success: false, 
        message: 'linksOrder must be an array of link IDs' 
      });
    }

    const header = await HeaderContent.findOne();
    if (!header) {
      return res.status(404).json({ 
        success: false, 
        message: 'Header content not found.' 
      });
    }

    // Reorder links based on provided order array
    const orderedLinks = linksOrder.map(linkId => 
      header.navigationLinks.id(linkId)
    ).filter(link => link !== null);

    header.navigationLinks = orderedLinks;
    await header.save();
    
    const updatedHeader = await HeaderContent.getActiveHeader();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_links_reordered', {
      header: updatedHeader,
      reorderedVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: 'Navigation links reordered successfully',
      data: updatedHeader
    });
  } catch (error) {
    console.error('Error reordering navigation links:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH toggle link status
router.patch('/links/:linkId/toggle-status', async (req, res) => {
  try {
    const { linkId } = req.params;
    
    if (!linkId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid link ID format' 
      });
    }

    const header = await HeaderContent.findOne();
    if (!header) {
      return res.status(404).json({ 
        success: false, 
        message: 'Header content not found.' 
      });
    }

    const link = header.navigationLinks.id(linkId);
    if (!link) {
      return res.status(404).json({ 
        success: false, 
        message: 'Navigation link not found.' 
      });
    }

    link.isActive = !link.isActive;
    await header.save();
    
    const updatedHeader = await HeaderContent.getActiveHeader();
    
    // Publish to RabbitMQ
    await MessageProducer.publishHeaderEvent('header_link_status_toggled', {
      header: updatedHeader,
      linkId: linkId,
      toggledVia: 'http'
    });
    
    res.json({ 
      success: true, 
      message: `Link ${link.isActive ? 'enabled' : 'disabled'} successfully`,
      data: updatedHeader
    });
  } catch (error) {
    console.error('Error toggling link status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;