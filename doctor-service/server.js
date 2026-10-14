const express = require('express');
const app = express();

const PORT = process.env.PORT || 3002;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Doctor-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional doctor records
let doctors = [
  {
    id: "D001",
    name: "Dr. Sarah Tan",
    specialization: "Cardiology",
    availability: "Monday - Wednesday, 09:00 - 16:00"
  },
  {
    id: "D002",
    name: "Dr. David Lee",
    specialization: "Pediatrics",
    availability: "Tuesday - Friday, 10:00 - 18:00"
  },
  {
    id: "D003",
    name: "Dr. Emily Wong",
    specialization: "Neurology",
    availability: "Thursday - Saturday, 08:30 - 15:30"
  },
  {
    id: "D004",
    name: "Dr. Rajesh Sharma",
    specialization: "Orthopedics",
    availability: "Monday - Thursday, 09:00 - 17:00"
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Doctor Service",
    status: "Healthy",
    version: "1.0.0",
    endpoints: {
      getAllDoctors: "GET /doctors",
      getDoctorById: "GET /doctors/:id",
      createDoctor: "POST /doctors",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (for ECS/ALB target group)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'doctor-service', timestamp: new Date() });
});

// GET /doctors - Return all fictional doctor records
app.get('/doctors', (req, res) => {
  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors
  });
});

// GET /doctors/:id - Return doctor by ID
app.get('/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id.toLowerCase() === req.params.id.toLowerCase());
  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: `Doctor with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: doctor
  });
});

// POST /doctors - Add a new doctor
app.post('/doctors', (req, res) => {
  const { name, specialization, availability } = req.body;
  if (!name || !specialization || !availability) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'name', 'specialization', and 'availability'."
    });
  }

  const newId = req.body.id || `D${String(doctors.length + 1).padStart(3, '0')}`;
  const newDoctor = {
    id: newId,
    name,
    specialization,
    availability
  };

  doctors.push(newDoctor);
  res.status(201).json({
    success: true,
    message: "Doctor created successfully.",
    data: newDoctor
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Doctor Service is running on http://${HOST}:${PORT}`);
});
