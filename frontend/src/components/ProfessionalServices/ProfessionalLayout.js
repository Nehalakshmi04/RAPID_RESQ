import React from 'react';
import { Box, Paper, Typography, Grid, Avatar, Rating, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';

const ProfessionalLayout = ({ professional, serviceType, onBookNow }) => {
  const navigate = useNavigate();
  const [socket] = useSocket();
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', {
        professionalId: professional._id,
        message,
        serviceType
      });
      setMessage('');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              bgcolor: 'primary.main',
              mb: 2
            }}
          >
            {professional.name.charAt(0)}
          </Avatar>
          <Typography variant="h6" gutterBottom>
            {professional.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {professional.specialties.join(', ')}
          </Typography>
          <Rating
            value={professional.rating.average}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {professional.rating.count} reviews
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              {serviceType} Services
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={onBookNow}
            >
              Book Now
            </Button>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {professional.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Experience
          </Typography>
          {professional.experience.map((exp, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
              {exp.position} at {exp.organization}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Specialties
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {professional.specialties.map((specialty, index) => (
              <Chip
                key={index}
                label={specialty}
                size="small"
              />
            ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Message Professional
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfessionalLayout;
