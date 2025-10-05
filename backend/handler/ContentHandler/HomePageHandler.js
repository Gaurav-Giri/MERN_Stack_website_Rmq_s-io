// handlers/HomePageHandler.js

import HomePageContent from '../../models/contentModels/HomePageContent.js';

const HomePageHandler = (socket, messageProducer, connectedAdmins) => {
  // Handle homepage content creation
  socket.on('create-homepage-content', async (homepageData) => {
    try {
      // Check if homepage content already exists (we only want one active instance)
      const existingHomepage = await HomePageContent.findOne({ isActive: true });
      if (existingHomepage) {
        throw new Error('Active homepage content already exists. Use update instead.');
      }

      const newHomepage = new HomePageContent(homepageData);
      await newHomepage.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishHomepageEvent('homepage_content_created', {
        homepage: newHomepage,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('homepage-content-created-success', newHomepage);
    } catch (error) {
      console.error('Error creating homepage content:', error);
      socket.emit('homepage-content-creation-error', { message: error.message });
    }
  });

  // Handle homepage content updates
  socket.on('update-homepage-content', async (updateData) => {
    try {
      const { updates } = updateData;
      
      const updatedHomepage = await HomePageContent.findOneAndUpdate(
        { isActive: true },
        updates,
        { new: true }
      );
      
      if (!updatedHomepage) {
        throw new Error('Active homepage content not found.');
      }
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishHomepageEvent('homepage_content_updated', {
        homepage: updatedHomepage,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('homepage-content-updated-success', updatedHomepage);
    } catch (error) {
      console.error('Error updating homepage content:', error);
      socket.emit('homepage-content-update-error', { message: error.message });
    }
  });

  // Get homepage content
  socket.on('get-homepage-content', async () => {
    try {
      const homepage = await HomePageContent.getActiveContent();
      
      if (!homepage) {
        // Return default structure if no homepage exists
        const defaultHomepage = {
          hero: {
            title: "Fresh Meals Delivered to Your Child's School",
            subtitle: "Order nutritious lunch for your child with easy delivery to school",
            authenticatedMessage: "Welcome back! Ready to order?",
            unauthenticatedMessage: "Login to start ordering healthy meals for your child",
            ctaButtonText: "Browse Schools",
            loginButtonText: "Login to Order",
            backgroundImage: null,
            isActive: true
          },
          featuresSection: {
            title: "Why Choose Our Service?",
            features: [
              {
                title: "🍎 Nutritious Meals",
                description: "Healthy, balanced meals prepared by certified nutritionists",
                icon: "🍎",
                order: 0,
                isActive: true
              },
              {
                title: "⏰ Convenient Delivery",
                description: "Fresh meals delivered directly to your child's school",
                icon: "⏰",
                order: 1,
                isActive: true
              },
              {
                title: "📱 Easy Ordering",
                description: "Order and manage meals through our simple platform",
                icon: "📱",
                order: 2,
                isActive: true
              }
            ],
            isActive: true
          },
          metaTitle: "School Lunch Box - Fresh Meals Delivered to School",
          metaDescription: "Order nutritious lunch for your child with easy delivery to school",
          isActive: true
        };
        socket.emit('homepage-content-retrieved', defaultHomepage);
        return;
      }
      
      socket.emit('homepage-content-retrieved', homepage);
    } catch (error) {
      console.error('Error retrieving homepage content:', error);
      socket.emit('homepage-content-retrieval-error', { message: error.message });
    }
  });

  // Update hero section
  socket.on('update-hero-section', async (heroData) => {
    try {
      const updatedHomepage = await HomePageContent.findOneAndUpdate(
        { isActive: true },
        { hero: heroData },
        { new: true }
      );
      
      if (!updatedHomepage) {
        throw new Error('Active homepage content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_hero_updated', {
        homepage: updatedHomepage,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('hero-section-updated-success', updatedHomepage);
    } catch (error) {
      console.error('Error updating hero section:', error);
      socket.emit('hero-section-update-error', { message: error.message });
    }
  });

  // Add feature to features section
  socket.on('add-homepage-feature', async (featureData) => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      homepage.featuresSection.features.push(featureData);
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_feature_added', {
        homepage: updatedHomepage,
        feature: featureData,
        addedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('homepage-feature-added-success', updatedHomepage);
    } catch (error) {
      console.error('Error adding homepage feature:', error);
      socket.emit('homepage-feature-add-error', { message: error.message });
    }
  });

  // Update homepage feature
  socket.on('update-homepage-feature', async (updateData) => {
    try {
      const { featureId, updates } = updateData;
      
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      const feature = homepage.featuresSection.features.id(featureId);
      if (!feature) {
        throw new Error('Homepage feature not found.');
      }

      Object.assign(feature, updates);
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_feature_updated', {
        homepage: updatedHomepage,
        featureId: featureId,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('homepage-feature-updated-success', updatedHomepage);
    } catch (error) {
      console.error('Error updating homepage feature:', error);
      socket.emit('homepage-feature-update-error', { message: error.message });
    }
  });

  // Remove homepage feature
  socket.on('remove-homepage-feature', async (featureId) => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      homepage.featuresSection.features.pull(featureId);
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_feature_removed', {
        homepage: updatedHomepage,
        featureId: featureId,
        removedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('homepage-feature-removed-success', updatedHomepage);
    } catch (error) {
      console.error('Error removing homepage feature:', error);
      socket.emit('homepage-feature-remove-error', { message: error.message });
    }
  });

  // Reorder features
  socket.on('reorder-homepage-features', async (featuresOrder) => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      // Reorder features based on provided order array
      const orderedFeatures = featuresOrder.map(featureId => 
        homepage.featuresSection.features.id(featureId)
      ).filter(feature => feature !== null);

      homepage.featuresSection.features = orderedFeatures;
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_features_reordered', {
        homepage: updatedHomepage,
        reorderedBy: socket.id
      }, socket.id);
      
      socket.emit('homepage-features-reordered-success', updatedHomepage);
    } catch (error) {
      console.error('Error reordering homepage features:', error);
      socket.emit('homepage-features-reorder-error', { message: error.message });
    }
  });

  // Toggle feature active status
  socket.on('toggle-homepage-feature-status', async (featureId) => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      const feature = homepage.featuresSection.features.id(featureId);
      if (!feature) {
        throw new Error('Homepage feature not found.');
      }

      feature.isActive = !feature.isActive;
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_feature_status_toggled', {
        homepage: updatedHomepage,
        featureId: featureId,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('homepage-feature-status-toggled-success', updatedHomepage);
    } catch (error) {
      console.error('Error toggling homepage feature status:', error);
      socket.emit('homepage-feature-status-toggle-error', { message: error.message });
    }
  });

  // Toggle features section active status
  socket.on('toggle-features-section-status', async () => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      homepage.featuresSection.isActive = !homepage.featuresSection.isActive;
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_features_section_status_toggled', {
        homepage: updatedHomepage,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('features-section-status-toggled-success', updatedHomepage);
    } catch (error) {
      console.error('Error toggling features section status:', error);
      socket.emit('features-section-status-toggle-error', { message: error.message });
    }
  });

  // Toggle hero section active status
  socket.on('toggle-hero-section-status', async () => {
    try {
      const homepage = await HomePageContent.findOne({ isActive: true });
      if (!homepage) {
        throw new Error('Active homepage content not found.');
      }

      homepage.hero.isActive = !homepage.hero.isActive;
      await homepage.save();
      
      const updatedHomepage = await HomePageContent.getActiveContent();
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_hero_section_status_toggled', {
        homepage: updatedHomepage,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('hero-section-status-toggled-success', updatedHomepage);
    } catch (error) {
      console.error('Error toggling hero section status:', error);
      socket.emit('hero-section-status-toggle-error', { message: error.message });
    }
  });

  // Update SEO meta data
  socket.on('update-homepage-seo', async (seoData) => {
    try {
      const updatedHomepage = await HomePageContent.findOneAndUpdate(
        { isActive: true },
        {
          metaTitle: seoData.metaTitle,
          metaDescription: seoData.metaDescription
        },
        { new: true }
      );
      
      if (!updatedHomepage) {
        throw new Error('Active homepage content not found.');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishHomepageEvent('homepage_seo_updated', {
        homepage: updatedHomepage,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('homepage-seo-updated-success', updatedHomepage);
    } catch (error) {
      console.error('Error updating homepage SEO:', error);
      socket.emit('homepage-seo-update-error', { message: error.message });
    }
  });

  // Join homepage room for real-time updates
  socket.on('join-homepage-room', () => {
    socket.join('homepage-global');
  });

  // Leave homepage room
  socket.on('leave-homepage-room', () => {
    socket.leave('homepage-global');
  });
};

export default HomePageHandler;