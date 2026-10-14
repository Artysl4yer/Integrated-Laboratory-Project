const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Patient-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional patient records
let patients = [
  {
    id: "P001",
    name: "Avery Chen",
    age: 28,
    contact: {
      phone: "+65 9123 4567",
      email: "avery.chen@example.com",
      address: "123 Orchard Road, #08-01, Singapore 238888"
    }
  },
  {
    id: "P002",
    name: "Marcus Tan",
    age: 42,
    contact: {
      phone: "+65 8234 5678",
      email: "marcus.tan@example.com",
      address: "45 Tampines Ave 5, #12-14, Singapore 529653"
    }
  },
  {
    id: "P003",
    name: "Sofia Rodriguez",
    age: 35,
    contact: {
      phone: "+65 9345 6789",
      email: "sofia.rodriguez@example.com",
      address: "88 Jurong West Central, #05-22, Singapore 648351"
    }
  },
  {
    id: "P004",
    name: "Liam Patel",
    age: 50,
    contact: {
      phone: "+65 8456 7890",
      email: "liam.patel@example.com",
      address: "10 Marina Boulevard, #20-03, Singapore 018983"
    }
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Patient Service",
    status: "Healthy",
    version: "1.0.0",
    endpoints: {
      getAllPatients: "GET /patients",
      getPatientById: "GET /patients/:id",
      createPatient: "POST /patients",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (for ECS/ALB target group)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'patient-service', timestamp: new Date() });
});

// GET /patients - Return all fictional patients
app.get('/patients', (req, res) => {
  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients
  });
});

// GET /patients/:id - Return patient by ID
app.get('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (!patient) {
    return res.status(404).json({
      success: false,
      message: `Patient with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: patient
  });
});

// POST /patients - Add a new patient
app.post('/patients', (req, res) => {
  const { name, age, contact } = req.body;
  if (!name || age === undefined || !contact) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'name', 'age', and 'contact' information."
    });
  }

  const newId = req.body.id || `P${String(patients.length + 1).padStart(3, '0')}`;
  const newPatient = {
    id: newId,
    name,
    age: Number(age),
    contact: typeof contact === 'string' ? { phone: contact, email: "", address: "" } : contact
  };

  patients.push(newPatient);
  res.status(201).json({
    success: true,
    message: "Patient created successfully.",
    data: newPatient
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Patient Service is running on http://${HOST}:${PORT}`);
});
