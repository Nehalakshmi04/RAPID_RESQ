import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button, TextField, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../../hooks/useSocket';
import ProfessionalLayout from '../../components/ProfessionalServices/ProfessionalLayout';

const LegalAid = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [caseDetails, setCaseDetails] = useState({
    type: '',
    description: '',
    documents: []
  });
  const [socket] = useSocket();

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get('/api/professionals/legal');
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const handleBookNow = async (lawyer) => {
    try {
      const response = await axios.post('/api/appointments/create', {
        professional: lawyer._id,
        serviceType: 'legal',
        date: new Date(),
        startTime: '10:00',
        endTime: '11:00',
        caseDetails: caseDetails
      });
      navigate(`/appointment/${response.data._id}`);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('/api/documents/upload', formData);
        setCaseDetails(prev => ({
          ...prev,
          documents: [...prev.documents, response.data]
        }));
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Legal Aid Services
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Case Details
        </Typography>
        <TextField
          fullWidth
          select
          label="Case Type"
          value={caseDetails.type}
          onChange={(e) => setCaseDetails({ ...caseDetails, type: e.target.value })}
          sx={{ mb: 2 }}
        >
          <MenuItem value="civil">Civil Case</MenuItem>
          <MenuItem value="criminal">Criminal Case</MenuItem>
          <MenuItem value="family">Family Law</MenuItem>
          <MenuItem value="property">Property Law</MenuItem>
          <MenuItem value="business">Business Law</MenuItem>
        </TextField>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Case Description"
          value={caseDetails.description}
          onChange={(e) => setCaseDetails({ ...caseDetails, description: e.target.value })}
          sx={{ mb: 2 }}
        />
        <input
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            Upload Documents
          </Button>
        </label>
        {caseDetails.documents.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {caseDetails.documents.map((doc, index) => (
              <Chip
                key={index}
                label={doc.name}
                onDelete={() => {
                  setCaseDetails(prev => ({
                    ...prev,
                    documents: prev.documents.filter((_, i) => i !== index)
                  }));
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      <Grid container spacing={3}>
        {lawyers.map((lawyer) => (
          <Grid item xs={12} md={6} lg={4} key={lawyer._id}>
            <ProfessionalLayout
              professional={lawyer}
              serviceType="Legal Aid"
              onBookNow={() => handleBookNow(lawyer)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LegalAid;
