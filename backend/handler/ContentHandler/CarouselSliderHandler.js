// handlers/CarouselSliderHandler.js

import CarouselBanner from '../models/CarouselSlider.js';

const CarouselSliderHandler = (socket, messageProducer, connectedAdmins) => {
  // Handle carousel banner creation
  socket.on('create-carousel-banner', async (bannerData) => {
    try {
      const newBanner = new CarouselBanner(bannerData);
      await newBanner.save();
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishCarouselEvent('carousel_banner_created', {
        banner: newBanner,
        createdBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('carousel-banner-created-success', newBanner);
    } catch (error) {
      console.error('Error creating carousel banner:', error);
      socket.emit('carousel-banner-creation-error', { message: error.message });
    }
  });

  // Handle carousel banner updates
  socket.on('update-carousel-banner', async (updateData) => {
    try {
      const { id, updates } = updateData;
      
      const updatedBanner = await CarouselBanner.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      
      if (!updatedBanner) {
        throw new Error('Carousel banner not found');
      }
      
      // Publish to RabbitMQ instead of direct emit
      await messageProducer.publishCarouselEvent('carousel_banner_updated', {
        banner: updatedBanner,
        updatedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('carousel-banner-updated-success', updatedBanner);
    } catch (error) {
      console.error('Error updating carousel banner:', error);
      socket.emit('carousel-banner-update-error', { message: error.message });
    }
  });

  // Handle carousel banner deletion
  socket.on('delete-carousel-banner', async (bannerId) => {
    try {
      const deletedBanner = await CarouselBanner.findByIdAndDelete(bannerId);
      
      if (!deletedBanner) {
        throw new Error('Carousel banner not found');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishCarouselEvent('carousel_banner_deleted', {
        bannerId: bannerId,
        deletedBy: socket.id
      }, socket.id);
      
      // Send success response directly to sender
      socket.emit('carousel-banner-deleted-success', { bannerId });
    } catch (error) {
      console.error('Error deleting carousel banner:', error);
      socket.emit('carousel-banner-delete-error', { message: error.message });
    }
  });

  // Get all active carousel banners
  socket.on('get-active-carousel-banners', async (filters = {}) => {
    try {
      const query = { isActive: true };
      
      // Add target audience filter if provided
      if (filters.targetAudience) {
        query.$or = [
          { targetAudience: 'all' },
          { targetAudience: filters.targetAudience }
        ];
      }
      
      // Check date validity
      const now = new Date();
      query.$or = [
        { 
          $and: [
            { startDate: { $lte: now } },
            { endDate: { $gte: now } }
          ]
        },
        { 
          $and: [
            { startDate: { $lte: now } },
            { endDate: null }
          ]
        },
        { 
          $and: [
            { startDate: null },
            { endDate: { $gte: now } }
          ]
        },
        { 
          $and: [
            { startDate: null },
            { endDate: null }
          ]
        }
      ];

      const banners = await CarouselBanner.find(query)
        .sort({ order: 1, createdAt: -1 })
        .lean();
      
      socket.emit('active-carousel-banners-retrieved', banners);
    } catch (error) {
      console.error('Error retrieving active carousel banners:', error);
      socket.emit('carousel-banners-retrieval-error', { message: error.message });
    }
  });

  // Get all carousel banners (including inactive - for admin)
  socket.on('get-all-carousel-banners', async () => {
    try {
      const banners = await CarouselBanner.find()
        .sort({ order: 1, createdAt: -1 })
        .lean();
      
      socket.emit('all-carousel-banners-retrieved', banners);
    } catch (error) {
      console.error('Error retrieving all carousel banners:', error);
      socket.emit('carousel-banners-retrieval-error', { message: error.message });
    }
  });

  // Update banner order
  socket.on('update-banner-order', async (orderData) => {
    try {
      const { bannerId, newOrder } = orderData;
      
      const updatedBanner = await CarouselBanner.findByIdAndUpdate(
        bannerId,
        { order: newOrder },
        { new: true }
      );
      
      if (!updatedBanner) {
        throw new Error('Carousel banner not found');
      }
      
      // Publish to RabbitMQ
      await messageProducer.publishCarouselEvent('carousel_banner_order_updated', {
        banner: updatedBanner,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('banner-order-updated-success', updatedBanner);
    } catch (error) {
      console.error('Error updating banner order:', error);
      socket.emit('banner-order-update-error', { message: error.message });
    }
  });

  // Bulk update banner orders
  socket.on('bulk-update-banner-orders', async (ordersData) => {
    try {
      const bulkOperations = ordersData.map(({ bannerId, order }) => ({
        updateOne: {
          filter: { _id: bannerId },
          update: { order }
        }
      }));
      
      const result = await CarouselBanner.bulkWrite(bulkOperations);
      
      // Publish to RabbitMQ
      await messageProducer.publishCarouselEvent('carousel_banner_orders_bulk_updated', {
        updatedCount: result.modifiedCount,
        updatedBy: socket.id
      }, socket.id);
      
      socket.emit('bulk-banner-orders-updated-success', {
        modifiedCount: result.modifiedCount
      });
    } catch (error) {
      console.error('Error bulk updating banner orders:', error);
      socket.emit('bulk-banner-orders-update-error', { message: error.message });
    }
  });

  // Toggle banner active status
  socket.on('toggle-banner-status', async (bannerId) => {
    try {
      const banner = await CarouselBanner.findById(bannerId);
      
      if (!banner) {
        throw new Error('Carousel banner not found');
      }
      
      banner.isActive = !banner.isActive;
      await banner.save();
      
      // Publish to RabbitMQ
      await messageProducer.publishCarouselEvent('carousel_banner_status_toggled', {
        banner: banner,
        toggledBy: socket.id
      }, socket.id);
      
      socket.emit('banner-status-toggled-success', banner);
    } catch (error) {
      console.error('Error toggling banner status:', error);
      socket.emit('banner-status-toggle-error', { message: error.message });
    }
  });

  // Join carousel room for real-time updates
  socket.on('join-carousel-room', (bannerId = 'global') => {
    socket.join(`carousel-${bannerId}`);
  });

  // Leave carousel room
  socket.on('leave-carousel-room', (bannerId = 'global') => {
    socket.leave(`carousel-${bannerId}`);
  });
};

export default CarouselSliderHandler;