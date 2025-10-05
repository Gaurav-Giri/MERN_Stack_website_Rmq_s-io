// handlers/HeaderHandler.js

import HeaderContent from '../../models/contentModels/HeaderContent.js';

const HeaderHandler = (socket, messageProducer, connectedAdmins) => {
  // Handle header content creation
  socket.on('create-header-content', async (headerData) => {
    try {
      // Check if header content already exists (we only want one instance)
      const existingHeader = await HeaderContent.findOne();
      if (existingHeader) {
        throw new Error('Header content already exists. Use update instead.');
      }

      const newHeader = new HeaderContent(headerData);
      await newHeader.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishHeaderEvent('header_content_created', {
        header: newHeader,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('header-content-created-success', newHeader);
    } catch (error) {
      console.error('Error creating header content:', error);
      socket.emit('header-content-creation-error', { message: error.message });
    }
  });

  // Handle header content updates
  socket.on('update-header-content', async (updateData) => {
    try {
      const { updates } = updateData;
      
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        updates,
        { new: true, upsert: true } // Create if doesn't exist
      );
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishHeaderEvent('header_content_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('header-content-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating header content:', error);
      socket.emit('header-content-update-error', { message: error.message });
    }
  });

  // Get header content
  socket.on('get-header-content', async () => {
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
        socket.emit('header-content-retrieved', defaultHeader);
        return;
      }
      
      socket.emit('header-content-retrieved', header);
    } catch (error) {
      console.error('Error retrieving header content:', error);
      socket.emit('header-content-retrieval-error', { message: error.message });
    }
  });

  // Add navigation link to header
  socket.on('add-header-link', async (linkData) => {
    try {
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found. Create header first.');
      }

      header.navigationLinks.push(linkData);
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_link_added', {
        header: updatedHeader,
        link: linkData,
        addedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('header-link-added-success', updatedHeader);
    } catch (error) {
      console.error('Error adding header link:', error);
      socket.emit('header-link-add-error', { message: error.message });
    }
  });

  // Update header link
  socket.on('update-header-link', async (updateData) => {
    try {
      const { linkId, updates } = updateData;
      
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found.');
      }

      const link = header.navigationLinks.id(linkId);
      if (!link) {
        throw new Error('Header link not found.');
      }

      Object.assign(link, updates);
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_link_updated', {
        header: updatedHeader,
        linkId: linkId,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('header-link-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating header link:', error);
      socket.emit('header-link-update-error', { message: error.message });
    }
  });

  // Remove header link
  socket.on('remove-header-link', async (linkId) => {
    try {
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found.');
      }

      header.navigationLinks.pull(linkId);
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_link_removed', {
        header: updatedHeader,
        linkId: linkId,
        removedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('header-link-removed-success', updatedHeader);
    } catch (error) {
      console.error('Error removing header link:', error);
      socket.emit('header-link-remove-error', { message: error.message });
    }
  });

  // Update logo
  socket.on('update-header-logo', async (logoData) => {
    try {
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        { logo: logoData },
        { new: true }
      );
      
      if (!updatedHeader) {
        throw new Error('Header content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_logo_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-logo-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating logo:', error);
      socket.emit('header-logo-update-error', { message: error.message });
    }
  });

  // Update auth settings
  socket.on('update-header-auth-settings', async (authSettings) => {
    try {
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        { authSettings },
        { new: true }
      );
      
      if (!updatedHeader) {
        throw new Error('Header content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_auth_settings_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-auth-settings-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating auth settings:', error);
      socket.emit('header-auth-settings-update-error', { message: error.message });
    }
  });

  // Update theme settings
  socket.on('update-header-theme-settings', async (themeSettings) => {
    try {
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        { themeSettings },
        { new: true }
      );
      
      if (!updatedHeader) {
        throw new Error('Header content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_theme_settings_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-theme-settings-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating theme settings:', error);
      socket.emit('header-theme-settings-update-error', { message: error.message });
    }
  });

  // Update notification settings
  socket.on('update-header-notification-settings', async (notificationSettings) => {
    try {
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        { notificationSettings },
        { new: true }
      );
      
      if (!updatedHeader) {
        throw new Error('Header content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_notification_settings_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-notification-settings-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      socket.emit('header-notification-settings-update-error', { message: error.message });
    }
  });

  // Update mobile settings
  socket.on('update-header-mobile-settings', async (mobileSettings) => {
    try {
      const updatedHeader = await HeaderContent.findOneAndUpdate(
        {},
        { mobileSettings },
        { new: true }
      );
      
      if (!updatedHeader) {
        throw new Error('Header content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_mobile_settings_updated', {
        header: updatedHeader,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-mobile-settings-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating mobile settings:', error);
      socket.emit('header-mobile-settings-update-error', { message: error.message });
    }
  });

  // Reorder header links
  socket.on('reorder-header-links', async (linksOrder) => {
    try {
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found.');
      }

      // Reorder links based on provided order array
      const orderedLinks = linksOrder.map(linkId => 
        header.navigationLinks.id(linkId)
      ).filter(link => link !== null);

      header.navigationLinks = orderedLinks;
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_links_reordered', {
        header: updatedHeader,
        reorderedBy: socket.id
      }, socket.id);
      
      socket.emit('header-links-reordered-success', updatedHeader);
    } catch (error) {
      console.error('Error reordering header links:', error);
      socket.emit('header-links-reorder-error', { message: error.message });
    }
  });

  // Toggle link active status
  socket.on('toggle-header-link-status', async (linkId) => {
    try {
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found.');
      }

      const link = header.navigationLinks.id(linkId);
      if (!link) {
        throw new Error('Header link not found.');
      }

      link.isActive = !link.isActive;
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_link_status_toggled', {
        header: updatedHeader,
        linkId: linkId,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('header-link-status-toggled-success', updatedHeader);
    } catch (error) {
      console.error('Error toggling header link status:', error);
      socket.emit('header-link-status-toggle-error', { message: error.message });
    }
  });

  // Update dashboard settings for specific role
  socket.on('update-header-dashboard-settings', async (roleSettings) => {
    try {
      const { role, settings } = roleSettings;
      
      const header = await HeaderContent.findOne();
      if (!header) {
        throw new Error('Header content not found.');
      }

      if (!header.authSettings.dashboardRoles[role]) {
        throw new Error(`Invalid role: ${role}`);
      }

      Object.assign(header.authSettings.dashboardRoles[role], settings);
      await header.save();
      
      const updatedHeader = await HeaderContent.getActiveHeader();
      
      // Publish to RabbitMQ
      await messageProducer.publishHeaderEvent('header_dashboard_settings_updated', {
        header: updatedHeader,
        role: role,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('header-dashboard-settings-updated-success', updatedHeader);
    } catch (error) {
      console.error('Error updating dashboard settings:', error);
      socket.emit('header-dashboard-settings-update-error', { message: error.message });
    }
  });

  // Join header room for real-time updates
  socket.on('join-header-room', () => {
    socket.join('header-global');
  });

  // Leave header room
  socket.on('leave-header-room', () => {
    socket.leave('header-global');
  });
};

export default HeaderHandler;