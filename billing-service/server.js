const express = require('express');
const app = express();

const PORT = process.env.PORT || 3006;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Billing-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional billing records (20 records)
let billings = [
  {
    id: "B001",
    appointmentId: "A001",
    patientId: "P001",
    patientName: "Avery Chen",
    amount: 145.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    invoiceDate: "2026-11-02",
    paidAt: "2026-11-02T10:15:00Z",
    items: [
      { description: "Specialist Consultation (Cardiology)", amount: 110.00 },
      { description: "Prescription Medication (Amlodipine 5mg)", amount: 35.00 }
    ]
  },
  {
    id: "B002",
    appointmentId: "A002",
    patientId: "P002",
    patientName: "Marcus Tan",
    amount: 90.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "PayNow",
    invoiceDate: "2026-11-02",
    paidAt: "2026-11-02T11:00:00Z",
    items: [
      { description: "Pediatric Consultation", amount: 75.00 },
      { description: "Nasal Spray & Antihistamines", amount: 15.00 }
    ]
  },
  {
    id: "B003",
    appointmentId: "A003",
    patientId: "P003",
    patientName: "Sofia Rodriguez",
    amount: 120.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Insurance Claim",
    invoiceDate: "2026-11-03",
    paidAt: "2026-11-03T11:45:00Z",
    items: [
      { description: "Neurology Consultation", amount: 105.00 },
      { description: "Analgesic Medication", amount: 15.00 }
    ]
  },
  {
    id: "B004",
    appointmentId: "A004",
    patientId: "P004",
    patientName: "Liam Patel",
    amount: 280.00,
    currency: "SGD",
    paymentStatus: "PENDING",
    paymentMethod: null,
    invoiceDate: "2026-11-03",
    paidAt: null,
    items: [
      { description: "Orthopedic Examination & Joint Test", amount: 130.00 },
      { description: "Knee X-Ray & MRI Referral", amount: 150.00 }
    ]
  },
  {
    id: "B005",
    appointmentId: "A005",
    patientId: "P005",
    patientName: "Klarenz Lark",
    amount: 115.00,
    currency: "SGD",
    paymentStatus: "UNPAID",
    paymentMethod: null,
    invoiceDate: "2026-11-04",
    paidAt: null,
    items: [
      { description: "Dermatology Specialist Fee", amount: 85.00 },
      { description: "Topical Ointments & Lotions", amount: 30.00 }
    ]
  },
  {
    id: "B006",
    appointmentId: "A006",
    patientId: "P006",
    patientName: "Chloe Lim",
    amount: 165.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    invoiceDate: "2026-11-04",
    paidAt: "2026-11-04T12:15:00Z",
    items: [
      { description: "Ophthalmology Eye Examination", amount: 95.00 },
      { description: "Refraction & Prescription Verification", amount: 70.00 }
    ]
  },
  {
    id: "B007",
    appointmentId: "A007",
    patientId: "P007",
    patientName: "Noah Fernandez",
    amount: 350.00,
    currency: "SGD",
    paymentStatus: "PENDING",
    paymentMethod: null,
    invoiceDate: "2026-11-05",
    paidAt: null,
    items: [
      { description: "General Surgical Pre-op Assessment", amount: 150.00 },
      { description: "Diagnostic Ultrasound Scan", amount: 200.00 }
    ]
  },
  {
    id: "B008",
    appointmentId: "A008",
    patientId: "P008",
    patientName: "Emily Zhang",
    amount: 220.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "PayNow",
    invoiceDate: "2026-11-05",
    paidAt: "2026-11-05T14:15:00Z",
    items: [
      { description: "Obstetric Consultation & Ultrasound", amount: 180.00 },
      { description: "Prenatal Supplements & Iron Pack", amount: 40.00 }
    ]
  },
  {
    id: "B009",
    appointmentId: "A009",
    patientId: "P009",
    patientName: "Daniel Kumar",
    amount: 195.00,
    currency: "SGD",
    paymentStatus: "UNPAID",
    paymentMethod: null,
    invoiceDate: "2026-11-06",
    paidAt: null,
    items: [
      { description: "Psychiatric Consultation & Evaluation", amount: 160.00 },
      { description: "Prescription Medication", amount: 35.00 }
    ]
  },
  {
    id: "B010",
    appointmentId: "A010",
    patientId: "P010",
    patientName: "Hanna Al-Mansoor",
    amount: 130.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    invoiceDate: "2026-11-06",
    paidAt: "2026-11-06T09:30:00Z",
    items: [
      { description: "Endocrine Diabetes Checkup", amount: 95.00 },
      { description: "HbA1c Blood Panel & Strip Pack", amount: 35.00 }
    ]
  },
  {
    id: "B011",
    appointmentId: "A011",
    patientId: "P011",
    patientName: "Lucas Meyer",
    amount: 155.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Cash",
    invoiceDate: "2026-11-09",
    paidAt: "2026-11-09T10:45:00Z",
    items: [
      { description: "Pulmonology Spirometry Assessment", amount: 110.00 },
      { description: "Inhaler Canister & Chamber Device", amount: 45.00 }
    ]
  },
  {
    id: "B012",
    appointmentId: "A012",
    patientId: "P012",
    patientName: "Olivia Takahashi",
    amount: 320.00,
    currency: "SGD",
    paymentStatus: "PENDING",
    paymentMethod: null,
    invoiceDate: "2026-11-09",
    paidAt: null,
    items: [
      { description: "Oncology Review & Lab Surveillance", amount: 200.00 },
      { description: "Biopsy Histopathology Fee", amount: 120.00 }
    ]
  },
  {
    id: "B013",
    appointmentId: "A013",
    patientId: "P013",
    patientName: "Ethan Wright",
    amount: 140.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    invoiceDate: "2026-11-10",
    paidAt: "2026-11-10T09:45:00Z",
    items: [
      { description: "Gastroenterology Consultation", amount: 100.00 },
      { description: "Proton Pump Inhibitors Supply", amount: 40.00 }
    ]
  },
  {
    id: "B014",
    appointmentId: "A014",
    patientId: "P014",
    patientName: "Maya Santos",
    amount: 175.00,
    currency: "SGD",
    paymentStatus: "UNPAID",
    paymentMethod: null,
    invoiceDate: "2026-11-10",
    paidAt: null,
    items: [
      { description: "Nephrology Assessment", amount: 115.00 },
      { description: "Renal Function Blood & Urine Test", amount: 60.00 }
    ]
  },
  {
    id: "B015",
    appointmentId: "A015",
    patientId: "P015",
    patientName: "Gabriel Rossi",
    amount: 85.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "PayNow",
    invoiceDate: "2026-11-11",
    paidAt: "2026-11-11T11:15:00Z",
    items: [
      { description: "ENT Consultation & Ear Irrigation", amount: 75.00 },
      { description: "Otic Drops", amount: 10.00 }
    ]
  },
  {
    id: "B016",
    appointmentId: "A016",
    patientId: "P016",
    patientName: "Zoe Dubois",
    amount: 105.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Insurance Claim",
    invoiceDate: "2026-11-11",
    paidAt: "2026-11-11T13:45:00Z",
    items: [
      { description: "Urology Clinic Consultation", amount: 80.00 },
      { description: "Antibiotic Therapy & Urine Dip", amount: 25.00 }
    ]
  },
  {
    id: "B017",
    appointmentId: "A017",
    patientId: "P017",
    patientName: "Aarav Sharma",
    amount: 210.00,
    currency: "SGD",
    paymentStatus: "PENDING",
    paymentMethod: null,
    invoiceDate: "2026-11-12",
    paidAt: null,
    items: [
      { description: "Rheumatology Consultation", amount: 120.00 },
      { description: "Bilateral Hand Radiography", amount: 90.00 }
    ]
  },
  {
    id: "B018",
    appointmentId: "A018",
    patientId: "P018",
    patientName: "Chloe O'Connor",
    amount: 95.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    invoiceDate: "2026-11-12",
    paidAt: "2026-11-12T16:15:00Z",
    items: [
      { description: "Allergy Consultation", amount: 75.00 },
      { description: "Anti-allergy Eye Drops", amount: 20.00 }
    ]
  },
  {
    id: "B019",
    appointmentId: "A019",
    patientId: "P019",
    patientName: "Ryan Tay",
    amount: 110.00,
    currency: "SGD",
    paymentStatus: "PAID",
    paymentMethod: "Cash",
    invoiceDate: "2026-11-13",
    paidAt: "2026-11-13T10:15:00Z",
    items: [
      { description: "Geriatric Health Evaluation", amount: 85.00 },
      { description: "Nutritional Supplement Pack", amount: 25.00 }
    ]
  },
  {
    id: "B020",
    appointmentId: "A020",
    patientId: "P020",
    patientName: "Isabella Ho",
    amount: 135.00,
    currency: "SGD",
    paymentStatus: "UNPAID",
    paymentMethod: null,
    invoiceDate: "2026-11-13",
    paidAt: null,
    items: [
      { description: "Hematology Consultation", amount: 90.00 },
      { description: "Full Blood Count & Iron Supplement", amount: 45.00 }
    ]
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Billing Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 3",
    assigned: "Group 1",
    endpoints: {
      getAllBills: "GET /billing",
      getBillById: "GET /billing/:id",
      getByAppointmentId: "GET /billing/appointment/:appointmentId",
      getByPatientId: "GET /billing/patient/:patientId",
      createBill: "POST /billing",
      updateBill: "PUT /billing/:id",
      payBill: "PUT /billing/:id/pay",
      deleteBill: "DELETE /billing/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (supports both /health and API Gateway /billing/health)
app.get(['/health', '/billing/health'], (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'billing-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET /billing - Return all billing records with optional filters (paymentStatus, patientId, appointmentId)
app.get('/billing', (req, res) => {
  const { paymentStatus, patientId, appointmentId } = req.query;
  let result = billings;

  if (paymentStatus) {
    result = result.filter(b => b.paymentStatus.toUpperCase() === paymentStatus.toUpperCase());
  }
  if (patientId) {
    result = result.filter(b => b.patientId.toLowerCase() === patientId.toLowerCase());
  }
  if (appointmentId) {
    result = result.filter(b => b.appointmentId.toLowerCase() === appointmentId.toLowerCase());
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /billing/:id - Single billing record by ID
app.get('/billing/:id', (req, res) => {
  const bill = billings.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!bill) {
    return res.status(404).json({
      success: false,
      message: `Billing record with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: bill
  });
});

// GET /billing/appointment/:appointmentId - Filter by appointment ID
app.get('/billing/appointment/:appointmentId', (req, res) => {
  const bill = billings.find(
    b => b.appointmentId.toLowerCase() === req.params.appointmentId.toLowerCase()
  );
  if (!bill) {
    return res.status(404).json({
      success: false,
      message: `Billing record for appointment ID ${req.params.appointmentId} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: bill
  });
});

// GET /billing/patient/:patientId - Filter by patient ID
app.get('/billing/patient/:patientId', (req, res) => {
  const bills = billings.filter(
    b => b.patientId.toLowerCase() === req.params.patientId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: bills.length,
    patientId: req.params.patientId,
    data: bills
  });
});

// POST /billing - Create a new billing record
app.post('/billing', (req, res) => {
  const { id, appointmentId, patientId, patientName, amount, currency, paymentStatus, paymentMethod, items } = req.body;

  if (!appointmentId || !patientId || amount === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'appointmentId', 'patientId', and 'amount'."
    });
  }

  // Conflict check for ID
  if (id && billings.some(b => b.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Billing record with ID ${id} already exists.`
    });
  }

  // Auto-generate ID if omitted (e.g. B021)
  let nextNum = 1;
  billings.forEach(b => {
    const match = b.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = id || `B${String(nextNum).padStart(3, '0')}`;

  const status = (paymentStatus || "UNPAID").toUpperCase();
  const newBill = {
    id: newId,
    appointmentId,
    patientId,
    patientName: patientName || "Patient",
    amount: Number(amount),
    currency: currency || "SGD",
    paymentStatus: ["PAID", "UNPAID", "PENDING"].includes(status) ? status : "UNPAID",
    paymentMethod: paymentMethod || null,
    invoiceDate: new Date().toISOString().split('T')[0],
    paidAt: status === "PAID" ? new Date().toISOString() : null,
    items: items || [{ description: "Standard Consultation Fee", amount: Number(amount) }]
  };

  billings.push(newBill);

  res.status(201).json({
    success: true,
    message: "Billing record generated successfully.",
    data: newBill
  });
});

// PUT /billing/:id - Update billing record
app.put('/billing/:id', (req, res) => {
  const index = billings.findIndex(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Billing record with ID ${req.params.id} not found.`
    });
  }

  const { amount, paymentStatus, paymentMethod, items } = req.body;
  if (amount === undefined && paymentStatus === undefined && paymentMethod === undefined && items === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('amount', 'paymentStatus', 'paymentMethod', 'items')."
    });
  }

  let newStatus = billings[index].paymentStatus;
  let paidAt = billings[index].paidAt;
  if (paymentStatus) {
    newStatus = paymentStatus.toUpperCase();
    if (newStatus === "PAID" && !paidAt) {
      paidAt = new Date().toISOString();
    }
  }

  billings[index] = {
    ...billings[index],
    ...(amount !== undefined && { amount: Number(amount) }),
    ...(paymentStatus !== undefined && { paymentStatus: newStatus }),
    ...(paymentMethod !== undefined && { paymentMethod }),
    ...(items !== undefined && { items }),
    paidAt,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: `Billing record ${req.params.id} updated successfully.`,
    data: billings[index]
  });
});

// PUT /billing/:id/pay - Convenience endpoint to pay bill
app.put('/billing/:id/pay', (req, res) => {
  const index = billings.findIndex(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Billing record with ID ${req.params.id} not found.`
    });
  }

  const { paymentMethod } = req.body;
  billings[index].paymentStatus = "PAID";
  billings[index].paymentMethod = paymentMethod || "PayNow";
  billings[index].paidAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: `Billing record ${req.params.id} paid successfully via ${billings[index].paymentMethod}.`,
    data: billings[index]
  });
});

// DELETE /billing/:id - Delete billing record
app.delete('/billing/:id', (req, res) => {
  const index = billings.findIndex(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Billing record with ID ${req.params.id} not found.`
    });
  }

  const deleted = billings.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Billing record ${req.params.id} deleted successfully.`,
    data: deleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Billing Service is running on http://${HOST}:${PORT}`);
});
