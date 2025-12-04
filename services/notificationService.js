const { Notification } = require('../models/Notification');
const { User } = require('../models/User');
const { Professional } = require('../models/Professional');
const { Appointment } = require('../models/Appointment');
const { EmergencyRequest } = require('../models/EmergencyRequest');

const sendPushNotification = async (user, type, title, message, data = {}) => {
  try {
    const notification = new Notification({
      user: user._id,
      type,
      title,
      message,
      data
    });

    await notification.save();

    // Send push notification based on user's platform preference
    if (user.platform === 'web') {
      // Web push notification implementation
      // This would typically use a service like Firebase Cloud Messaging
      // For now, we'll just log the notification
      console.log('Web notification sent:', notification);
    } else if (user.platform === 'mobile') {
      // Mobile push notification implementation
      // This would typically use APNs for iOS or FCM for Android
      console.log('Mobile notification sent:', notification);
    }

    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

const sendEmergencyNotification = async (request) => {
  try {
    // Get nearby volunteers
    const volunteers = await request.findNearbyVolunteers();

    // Send notifications to nearby volunteers
    for (const volunteer of volunteers) {
      await sendPushNotification(volunteer, 'emergency', 
        'Emergency Request Nearby',
        `New emergency request in your area: ${request.domain}`,
        { requestId: request._id }
      );
    }

    // Send notification to user
    await sendPushNotification(request.user, 'emergency',
      'Request Received',
      'Your emergency request has been received and help is on the way',
      { requestId: request._id }
    );
  } catch (error) {
    console.error('Error sending emergency notifications:', error);
    throw error;
  }
};

const sendAppointmentNotification = async (appointment) => {
  try {
    // Notify client
    await sendPushNotification(appointment.client, 'appointment',
      'Appointment Confirmation',
      `Your appointment with ${appointment.professional.name} is confirmed`,
      { appointmentId: appointment._id }
    );

    // Notify professional
    await sendPushNotification(appointment.professional.user, 'appointment',
      'New Appointment',
      `You have a new appointment with ${appointment.client.name}`,
      { appointmentId: appointment._id }
    );
  } catch (error) {
    console.error('Error sending appointment notifications:', error);
    throw error;
  }
};

const sendPaymentNotification = async (user, amount, status) => {
  try {
    await sendPushNotification(user, 'payment',
      status === 'paid' ? 'Payment Successful' : 'Payment Failed',
      `Your payment of ${amount} has been ${status}`,
      { amount, status }
    );
  } catch (error) {
    console.error('Error sending payment notification:', error);
    throw error;
  }
};

module.exports = {
  sendPushNotification,
  sendEmergencyNotification,
  sendAppointmentNotification,
  sendPaymentNotification
};
