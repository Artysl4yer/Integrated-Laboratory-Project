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

// Fictional doctor records (20 records)
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
  },
  {
    id: "D005",
    name: "Dr. Benjamin Koh",
    specialization: "Dermatology",
    availability: "Wednesday - Friday, 10:00 - 17:00"
  },
  {
    id: "D006",
    name: "Dr. Jessica Lim",
    specialization: "Ophthalmology",
    availability: "Monday - Friday, 08:30 - 16:30"
  },
  {
    id: "D007",
    name: "Dr. Michael Chen",
    specialization: "General Surgery",
    availability: "Tuesday - Thursday, 09:00 - 17:00"
  },
  {
    id: "D008",
    name: "Dr. Priya Nair",
    specialization: "Gynecology & Obstetrics",
    availability: "Monday - Thursday, 09:30 - 16:30"
  },
  {
    id: "D009",
    name: "Dr. Robert Taylor",
    specialization: "Psychiatry",
    availability: "Wednesday - Saturday, 11:00 - 19:00"
  },
  {
    id: "D010",
    name: "Dr. Amanda Teo",
    specialization: "Endocrinology",
    availability: "Monday - Wednesday, 08:00 - 15:00"
  },
  {
    id: "D011",
    name: "Dr. Kenneth Sim",
    specialization: "Pulmonology",
    availability: "Tuesday - Friday, 09:00 - 16:00"
  },
  {
    id: "D012",
    name: "Dr. Michelle Gomez",
    specialization: "Oncology",
    availability: "Monday - Thursday, 09:00 - 17:30"
  },
  {
    id: "D013",
    name: "Dr. Daniel Fong",
    specialization: "Gastroenterology",
    availability: "Wednesday - Saturday, 08:30 - 16:00"
  },
  {
    id: "D014",
    name: "Dr. Rachel Chia",
    specialization: "Nephrology",
    availability: "Tuesday - Friday, 09:30 - 17:00"
  },
  {
    id: "D015",
    name: "Dr. Victor Seah",
    specialization: "Otolaryngology (ENT)",
    availability: "Monday - Wednesday, 10:00 - 18:00"
  },
  {
    id: "D016",
    name: "Dr. Stephanie Neo",
    specialization: "Rheumatology",
    availability: "Thursday - Saturday, 09:00 - 15:00"
  },
  {
    id: "D017",
    name: "Dr. Andrew Kwan",
    specialization: "Urology",
    availability: "Monday - Thursday, 08:30 - 16:30"
  },
  {
    id: "D018",
    name: "Dr. Beatrice Low",
    specialization: "Hematology",
    availability: "Tuesday - Friday, 10:00 - 17:00"
  },
  {
    id: "D019",
    name: "Dr. Jonathan Yeo",
    specialization: "Anesthesiology",
    availability: "Monday - Friday, 07:30 - 15:30"
  },
  {
    id: "D020",
    name: "Dr. Kimberly Chua",
    specialization: "Emergency Medicine",
    availability: "Rotating Shifts, 24/7 On-Call"
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
      updateDoctor: "PUT /doctors/:id",
      deleteDoctor: "DELETE /doctors/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (for ECS/ALB target group)
app.get(['/health', '/doctors/health'], (req, res) => {
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

  if (req.body.id && doctors.some(d => d.id.toLowerCase() === req.body.id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Doctor with ID ${req.body.id} already exists.`
    });
  }

  let nextNum = 1;
  doctors.forEach(d => {
    const match = d.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = req.body.id || `D${String(nextNum).padStart(3, '0')}`;
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

// PUT /doctors/:id - Update an existing doctor
app.put('/doctors/:id', (req, res) => {
  const index = doctors.findIndex(d => d.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Doctor with ID ${req.params.id} not found.`
    });
  }

  const { name, specialization, availability } = req.body;
  if (!name && !specialization && !availability) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('name', 'specialization', 'availability')."
    });
  }

  doctors[index] = {
    ...doctors[index],
    ...(name !== undefined && { name }),
    ...(specialization !== undefined && { specialization }),
    ...(availability !== undefined && { availability })
  };

  res.status(200).json({
    success: true,
    message: `Doctor with ID ${req.params.id} updated successfully.`,
    data: doctors[index]
  });
});

// DELETE /doctors/:id - Delete a doctor
app.delete('/doctors/:id', (req, res) => {
  const index = doctors.findIndex(d => d.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Doctor with ID ${req.params.id} not found.`
    });
  }

  const deletedDoctor = doctors.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Doctor with ID ${req.params.id} deleted successfully.`,
    data: deletedDoctor
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Doctor Service is running on http://${HOST}:${PORT}`);
});
