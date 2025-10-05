// handlers/FooterHandler.js

import FooterContent from '../../models/contentModels/FooterContent.js';

const FooterHandler = (socket, messageProducer, connectedAdmins) => {
  // Handle footer content creation
  socket.on('create-footer-content', async (footerData) => {
    try {
      // Check if footer content already exists (we only want one instance)
      const existingFooter = await FooterContent.findOne();
      if (existingFooter) {
        throw new Error('Footer content already exists. Use update instead.');
      }

      const newFooter = new FooterContent(footerData);
      await newFooter.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishFooterEvent('footer_content_created', {
        footer: newFooter,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('footer-content-created-success', newFooter);
    } catch (error) {
      console.error('Error creating footer content:', error);
      socket.emit('footer-content-creation-error', { message: error.message });
    }
  });

  // Handle footer content updates
  socket.on('update-footer-content', async (updateData) => {
    try {
      const { updates } = updateData;
      
      const updatedFooter = await FooterContent.findOneAndUpdate(
        {},
        updates,
        { new: true, upsert: true } // Create if doesn't exist
      );
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishFooterEvent('footer_content_updated', {
        footer: updatedFooter,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('footer-content-updated-success', updatedFooter);
    } catch (error) {
      console.error('Error updating footer content:', error);
      socket.emit('footer-content-update-error', { message: error.message });
    }
  });

  // Get footer content
  socket.on('get-footer-content', async () => {
    try {
      const footer = await FooterContent.getActiveFooter();
      
      if (!footer) {
        // Return default structure if no footer exists
        const defaultFooter = {
          companyName: 'School Lunch Box',
          tagline: 'Fresh meals delivered to your child\'s school',
          sections: [],
          socialLinks: {},
          copyrightText: '© 2023 School Lunch Box. All rights reserved.',
          themeSettings: {
            allowThemeToggle: true,
            defaultTheme: 'light'
          }
        };
        socket.emit('footer-content-retrieved', defaultFooter);
        return;
      }
      
      socket.emit('footer-content-retrieved', footer);
    } catch (error) {
      console.error('Error retrieving footer content:', error);
      socket.emit('footer-content-retrieval-error', { message: error.message });
    }
  });

  // Add section to footer
  socket.on('add-footer-section', async (sectionData) => {
    try {
      const footer = await FooterContent.findOne();
      if (!footer) {
        throw new Error('Footer content not found. Create footer first.');
      }

      footer.sections.push(sectionData);
      await footer.save();
      
      const updatedFooter = await FooterContent.getActiveFooter();
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_section_added', {
        footer: updatedFooter,
        section: sectionData,
        addedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('footer-section-added-success', updatedFooter);
    } catch (error) {
      console.error('Error adding footer section:', error);
      socket.emit('footer-section-add-error', { message: error.message });
    }
  });

  // Update footer section
  socket.on('update-footer-section', async (updateData) => {
    try {
      const { sectionId, updates } = updateData;
      
      const footer = await FooterContent.findOne();
      if (!footer) {
        throw new Error('Footer content not found.');
      }

      const sectionIndex = footer.sections.id(sectionId);
      if (!sectionIndex) {
        throw new Error('Footer section not found.');
      }

      Object.assign(sectionIndex, updates);
      await footer.save();
      
      const updatedFooter = await FooterContent.getActiveFooter();
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_section_updated', {
        footer: updatedFooter,
        sectionId: sectionId,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('footer-section-updated-success', updatedFooter);
    } catch (error) {
      console.error('Error updating footer section:', error);
      socket.emit('footer-section-update-error', { message: error.message });
    }
  });

  // Remove footer section
  socket.on('remove-footer-section', async (sectionId) => {
    try {
      const footer = await FooterContent.findOne();
      if (!footer) {
        throw new Error('Footer content not found.');
      }

      footer.sections.pull(sectionId);
      await footer.save();
      
      const updatedFooter = await FooterContent.getActiveFooter();
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_section_removed', {
        footer: updatedFooter,
        sectionId: sectionId,
        removedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('footer-section-removed-success', updatedFooter);
    } catch (error) {
      console.error('Error removing footer section:', error);
      socket.emit('footer-section-remove-error', { message: error.message });
    }
  });

  // Update social links
  socket.on('update-footer-social-links', async (socialLinks) => {
    try {
      const updatedFooter = await FooterContent.findOneAndUpdate(
        {},
        { socialLinks },
        { new: true }
      );
      
      if (!updatedFooter) {
        throw new Error('Footer content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_social_links_updated', {
        footer: updatedFooter,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('footer-social-links-updated-success', updatedFooter);
    } catch (error) {
      console.error('Error updating social links:', error);
      socket.emit('footer-social-links-update-error', { message: error.message });
    }
  });

  // Update theme settings
  socket.on('update-footer-theme-settings', async (themeSettings) => {
    try {
      const updatedFooter = await FooterContent.findOneAndUpdate(
        {},
        { themeSettings },
        { new: true }
      );
      
      if (!updatedFooter) {
        throw new Error('Footer content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_theme_settings_updated', {
        footer: updatedFooter,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('footer-theme-settings-updated-success', updatedFooter);
    } catch (error) {
      console.error('Error updating theme settings:', error);
      socket.emit('footer-theme-settings-update-error', { message: error.message });
    }
  });

  // Reorder footer sections
  socket.on('reorder-footer-sections', async (sectionsOrder) => {
    try {
      const footer = await FooterContent.findOne();
      if (!footer) {
        throw new Error('Footer content not found.');
      }

      // Reorder sections based on provided order array
      const orderedSections = sectionsOrder.map(sectionId => 
        footer.sections.id(sectionId)
      ).filter(section => section !== null);

      footer.sections = orderedSections;
      await footer.save();
      
      const updatedFooter = await FooterContent.getActiveFooter();
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_sections_reordered', {
        footer: updatedFooter,
        reorderedBy: socket.id
      }, socket.id);
      
      socket.emit('footer-sections-reordered-success', updatedFooter);
    } catch (error) {
      console.error('Error reordering footer sections:', error);
      socket.emit('footer-sections-reorder-error', { message: error.message });
    }
  });

  // Toggle section active status
  socket.on('toggle-footer-section-status', async (sectionId) => {
    try {
      const footer = await FooterContent.findOne();
      if (!footer) {
        throw new Error('Footer content not found.');
      }

      const section = footer.sections.id(sectionId);
      if (!section) {
        throw new Error('Footer section not found.');
      }

      section.isActive = !section.isActive;
      await footer.save();
      
      const updatedFooter = await FooterContent.getActiveFooter();
      
      // Publish to RabbitMQ
      await messageProducer.publishFooterEvent('footer_section_status_toggled', {
        footer: updatedFooter,
        sectionId: sectionId,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('footer-section-status-toggled-success', updatedFooter);
    } catch (error) {
      console.error('Error toggling footer section status:', error);
      socket.emit('footer-section-status-toggle-error', { message: error.message });
    }
  });

  // Join footer room for real-time updates
  socket.on('join-footer-room', () => {
    socket.join('footer-global');
  });

  // Leave footer room
  socket.on('leave-footer-room', () => {
    socket.leave('footer-global');
  });
};

export default FooterHandler;