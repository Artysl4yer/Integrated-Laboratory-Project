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

// Fictional patient records (20 records)
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
  },
  {
    id: "P005",
    name: "Klarenz Lark",
    age: 24,
    contact: {
      phone: "+65 9286 8498",
      email: "klarenz.lark@example.com",
      address: "15 Bedok North St 1, #09-12, Singapore 469661"
    }
  },
  {
    id: "P006",
    name: "Chloe Lim",
    age: 29,
    contact: {
      phone: "+65 9112 2334",
      email: "chloe.lim@example.com",
      address: "78 Ang Mo Kio Ave 3, #04-18, Singapore 569933"
    }
  },
  {
    id: "P007",
    name: "Noah Fernandez",
    age: 38,
    contact: {
      phone: "+65 8223 3445",
      email: "noah.fernandez@example.com",
      address: "22 Clementi Ave 3, #11-05, Singapore 129905"
    }
  },
  {
    id: "P008",
    name: "Emily Zhang",
    age: 45,
    contact: {
      phone: "+65 9334 4556",
      email: "emily.zhang@example.com",
      address: "14 Bishan St 13, #07-29, Singapore 579790"
    }
  },
  {
    id: "P009",
    name: "Daniel Kumar",
    age: 53,
    contact: {
      phone: "+65 8445 5667",
      email: "daniel.kumar@example.com",
      address: "55 Serangoon Central, #14-02, Singapore 556083"
    }
  },
  {
    id: "P010",
    name: "Grace Ng",
    age: 31,
    contact: {
      phone: "+65 9556 6778",
      email: "grace.ng@example.com",
      address: "33 Woodlands Ave 6, #03-45, Singapore 738991"
    }
  },
  {
    id: "P011",
    name: "Lucas Wong",
    age: 26,
    contact: {
      phone: "+65 8667 7889",
      email: "lucas.wong@example.com",
      address: "60 Punggol Central, #15-30, Singapore 828761"
    }
  },
  {
    id: "P012",
    name: "Mia Santos",
    age: 40,
    contact: {
      phone: "+65 9778 8990",
      email: "mia.santos@example.com",
      address: "18 Bukit Batok Central, #08-11, Singapore 659958"
    }
  },
  {
    id: "P013",
    name: "Ethan Low",
    age: 33,
    contact: {
      phone: "+65 8889 9001",
      email: "ethan.low@example.com",
      address: "9 Sengkang Square, #10-15, Singapore 545078"
    }
  },
  {
    id: "P014",
    name: "Olivia Hassan",
    age: 48,
    contact: {
      phone: "+65 9990 0112",
      email: "olivia.hassan@example.com",
      address: "24 Pasir Ris Drive 1, #06-08, Singapore 519525"
    }
  },
  {
    id: "P015",
    name: "James Teo",
    age: 59,
    contact: {
      phone: "+65 8101 1223",
      email: "james.teo@example.com",
      address: "70 Toa Payoh Lorong 4, #12-33, Singapore 310070"
    }
  },
  {
    id: "P016",
    name: "Hannah Lee",
    age: 22,
    contact: {
      phone: "+65 9212 2334",
      email: "hannah.lee@example.com",
      address: "101 Yishun Ave 5, #02-14, Singapore 760101"
    }
  },
  {
    id: "P017",
    name: "Benjamin Goh",
    age: 36,
    contact: {
      phone: "+65 8323 3445",
      email: "benjamin.goh@example.com",
      address: "40 Choa Chu Kang Loop, #09-20, Singapore 689682"
    }
  },
  {
    id: "P018",
    name: "Sarah Alatas",
    age: 27,
    contact: {
      phone: "+65 9434 4556",
      email: "sarah.alatas@example.com",
      address: "12 Queenstown Road, #16-04, Singapore 148955"
    }
  },
  {
    id: "P019",
    name: "Ryan Tay",
    age: 44,
    contact: {
      phone: "+65 8545 5667",
      email: "ryan.tay@example.com",
      address: "85 Marine Parade Central, #05-19, Singapore 440085"
    }
  },
  {
    id: "P020",
    name: "Isabella Ho",
    age: 39,
    contact: {
      phone: "+65 9656 6778",
      email: "isabella.ho@example.com",
      address: "20 Geylang East Ave 1, #07-03, Singapore 389782"
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
      updatePatient: "PUT /patients/:id",
      deletePatient: "DELETE /patients/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (for ECS/ALB target group)
app.get(['/health', '/patients/health'], (req, res) => {
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

  if (req.body.id && patients.some(p => p.id.toLowerCase() === req.body.id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Patient with ID ${req.body.id} already exists.`
    });
  }

  let nextNum = 1;
  patients.forEach(p => {
    const match = p.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = req.body.id || `P${String(nextNum).padStart(3, '0')}`;
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

// PUT /patients/:id - Update an existing patient
app.put('/patients/:id', (req, res) => {
  const index = patients.findIndex(p => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Patient with ID ${req.params.id} not found.`
    });
  }

  const { name, age, contact } = req.body;
  if (!name && age === undefined && !contact) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('name', 'age', 'contact')."
    });
  }

  let updatedContact = patients[index].contact;
  if (contact !== undefined) {
    if (typeof contact === 'object' && contact !== null) {
      updatedContact = {
        ...patients[index].contact,
        ...contact
      };
    } else if (typeof contact === 'string') {
      updatedContact = {
        ...patients[index].contact,
        phone: contact
      };
    }
  }

  patients[index] = {
    ...patients[index],
    ...(name !== undefined && { name }),
    ...(age !== undefined && { age: Number(age) }),
    ...(contact !== undefined && { contact: updatedContact })
  };

  res.status(200).json({
    success: true,
    message: `Patient with ID ${req.params.id} updated successfully.`,
    data: patients[index]
  });
});

// DELETE /patients/:id - Delete a patient
app.delete('/patients/:id', (req, res) => {
  const index = patients.findIndex(p => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Patient with ID ${req.params.id} not found.`
    });
  }

  const deletedPatient = patients.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Patient with ID ${req.params.id} deleted successfully.`,
    data: deletedPatient
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Patient Service is running on http://${HOST}:${PORT}`);
});
