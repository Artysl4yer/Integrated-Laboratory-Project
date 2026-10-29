const express = require('express');
const app = express();

const PORT = process.env.PORT || 3005;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Consultation-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional consultation records (20 records)
let consultations = [
  {
    id: "C001",
    appointmentId: "A001",
    patientId: "P001",
    doctorId: "D001",
    doctorName: "Dr. Sarah Tan",
    date: "2026-11-02",
    diagnosis: "Stage 1 Essential Hypertension",
    prescription: "Amlodipine 5mg once daily, low sodium diet",
    consultationNotes: "Patient reports intermittent morning headaches and mild dizziness. Resting BP measured at 142/90 mmHg. Heart sounds normal. Prescribed calcium channel blocker and advised low sodium diet.",
    followUpDate: "2026-12-02",
    status: "COMPLETED"
  },
  {
    id: "C002",
    appointmentId: "A002",
    patientId: "P002",
    doctorId: "D002",
    doctorName: "Dr. David Lee",
    date: "2026-11-02",
    diagnosis: "Seasonal Allergic Rhinitis",
    prescription: "Cetirizine 10mg once daily at bedtime, Saline nasal spray",
    consultationNotes: "Patient presented with clear nasal discharge, sneezing paroxysms, and ocular pruritus. Chest clear on auscultation. Advised on allergen avoidance.",
    followUpDate: "2026-11-16",
    status: "COMPLETED"
  },
  {
    id: "C003",
    appointmentId: "A003",
    patientId: "P003",
    doctorId: "D003",
    doctorName: "Dr. Emily Wong",
    date: "2026-11-03",
    diagnosis: "Tension-type Headache",
    prescription: "Paracetamol 1g PRN, stress management counseling",
    consultationNotes: "Bilateral, pressing non-pulsatile headache persisting for 3 days. Neurological examination unremarkable. Cranial nerves intact. Recommended ergonomic posture at work.",
    followUpDate: null,
    status: "COMPLETED"
  },
  {
    id: "C004",
    appointmentId: "A004",
    patientId: "P004",
    doctorId: "D004",
    doctorName: "Dr. Rajesh Sharma",
    date: "2026-11-03",
    diagnosis: "Medial Meniscal Strain (Left Knee)",
    prescription: "Celecoxib 200mg daily for 7 days, Physiotherapy referral",
    consultationNotes: "Left knee joint swelling following recreational badminton. Mild tenderness over medial joint line. McMurray test positive. Ordered MRI scan and started NSAID therapy.",
    followUpDate: "2026-11-17",
    status: "COMPLETED"
  },
  {
    id: "C005",
    appointmentId: "A005",
    patientId: "P005",
    doctorId: "D005",
    doctorName: "Dr. Benjamin Koh",
    date: "2026-11-04",
    diagnosis: "Contact Dermatitis",
    prescription: "Hydrocortisone 1% cream BID, Cetaphil gentle cleanser",
    consultationNotes: "Erythematous, itchy papules on bilateral forearms after using a new detergent. Advised discontinuation of suspected trigger and cool compresses.",
    followUpDate: "2026-11-18",
    status: "COMPLETED"
  },
  {
    id: "C006",
    appointmentId: "A006",
    patientId: "P006",
    doctorId: "D006",
    doctorName: "Dr. Jessica Lim",
    date: "2026-11-04",
    diagnosis: "Mild Myopia and Astigmatism",
    prescription: "Corrective eyeglass prescription issued",
    consultationNotes: "Visual acuity 20/40 OD, 20/50 OS. Funduscopic examination normal. Refraction performed and prescription for anti-reflective progressive lenses provided.",
    followUpDate: "2027-11-04",
    status: "COMPLETED"
  },
  {
    id: "C007",
    appointmentId: "A007",
    patientId: "P007",
    doctorId: "D007",
    doctorName: "Dr. Michael Chen",
    date: "2026-11-05",
    diagnosis: "Inguinal Hernia (Right)",
    prescription: "Surgical repair scheduled, avoid heavy lifting",
    consultationNotes: "Palpable reducible right groin bulge with coughing impulse. No signs of strangulation or incarceration. Elective laparoscopic hernioplasty scheduled.",
    followUpDate: "2026-11-20",
    status: "SCHEDULED"
  },
  {
    id: "C008",
    appointmentId: "A008",
    patientId: "P008",
    doctorId: "D008",
    doctorName: "Dr. Priya Nair",
    date: "2026-11-05",
    diagnosis: "Routine Prenatal Care (Week 24)",
    prescription: "Prenatal multivitamins, Ferrous fumarate 200mg daily",
    consultationNotes: "Fundal height concordant with gestational age. Fetal heart rate regular at 144 bpm. Anatomy ultrasound scan reviewed and confirmed normal developmental parameters.",
    followUpDate: "2026-12-03",
    status: "COMPLETED"
  },
  {
    id: "C009",
    appointmentId: "A009",
    patientId: "P009",
    doctorId: "D009",
    doctorName: "Dr. Robert Taylor",
    date: "2026-11-06",
    diagnosis: "Generalized Anxiety Disorder",
    prescription: "Escitalopram 10mg daily, Cognitive Behavioral Therapy (CBT)",
    consultationNotes: "Patient experiencing chronic excessive worry, sleep fragmentation, and muscle tension. Mental status examination reveals cooperative demeanor with anxious affect.",
    followUpDate: "2026-11-27",
    status: "IN_PROGRESS"
  },
  {
    id: "C010",
    appointmentId: "A010",
    patientId: "P010",
    doctorId: "D010",
    doctorName: "Dr. Amanda Teo",
    date: "2026-11-06",
    diagnosis: "Type 2 Diabetes Mellitus - Controlled",
    prescription: "Metformin 500mg BID with meals",
    consultationNotes: "HbA1c level at 6.8%. Fasting blood glucose 6.2 mmol/L. Foot inspection shows no ulcerations or peripheral neuropathy. Monofilament test normal.",
    followUpDate: "2027-02-06",
    status: "COMPLETED"
  },
  {
    id: "C011",
    appointmentId: "A011",
    patientId: "P011",
    doctorId: "D011",
    doctorName: "Dr. Kenneth Sim",
    date: "2026-11-09",
    diagnosis: "Mild Intermittent Asthma",
    prescription: "Salbutamol 100mcg inhaler 2 puffs PRN, Budesonide 200mcg BID",
    consultationNotes: "Spirometry reveals FEV1/FVC ratio 78% with good bronchodilator reversibility (+14%). Inhaler technique verified and corrected with spacer device.",
    followUpDate: "2026-12-09",
    status: "COMPLETED"
  },
  {
    id: "C012",
    appointmentId: "A012",
    patientId: "P012",
    doctorId: "D012",
    doctorName: "Dr. Michelle Gomez",
    date: "2026-11-09",
    diagnosis: "Benign Thyroid Nodule Surveillance",
    prescription: "Thyroxine monitoring, repeat ultrasound in 6 months",
    consultationNotes: "Fine-needle aspiration biopsy reviewed: Bethesda Category II (Benign). TSH and Free T4 within normal physiological limits. No compressive symptoms.",
    followUpDate: "2027-05-09",
    status: "COMPLETED"
  },
  {
    id: "C013",
    appointmentId: "A013",
    patientId: "P013",
    doctorId: "D013",
    doctorName: "Dr. Daniel Fong",
    date: "2026-11-10",
    diagnosis: "Gastroesophageal Reflux Disease (GERD)",
    prescription: "Omeprazole 20mg once daily before breakfast for 4 weeks",
    consultationNotes: "Epigastric burning sensations aggravated by recumbency. Negative red flags (no dysphagia, weight loss, or anemia). Advised elevation of head during sleep.",
    followUpDate: "2026-12-08",
    status: "COMPLETED"
  },
  {
    id: "C014",
    appointmentId: "A014",
    patientId: "P014",
    doctorId: "D014",
    doctorName: "Dr. Rachel Chia",
    date: "2026-11-10",
    diagnosis: "Chronic Kidney Disease Stage 2 (Stable)",
    prescription: "Losartan 50mg daily, Sodium bicarbonate 500mg daily",
    consultationNotes: "eGFR steady at 72 mL/min/1.73m2. Urine albumin-to-creatinine ratio (uACR) slightly elevated at 45 mg/g. Advised hydration and avoiding NSAIDs.",
    followUpDate: "2027-02-10",
    status: "COMPLETED"
  },
  {
    id: "C015",
    appointmentId: "A015",
    patientId: "P015",
    doctorId: "D015",
    doctorName: "Dr. Jason Low",
    date: "2026-11-11",
    diagnosis: "Cerumen Impaction (Right Ear)",
    prescription: "Ear syringing completed, Olive oil ear drops PRN",
    consultationNotes: "Patient experienced right ear fullness and conductive hearing attenuation. Successful irrigation removed cerumen plug with immediate resolution of symptoms.",
    followUpDate: null,
    status: "COMPLETED"
  },
  {
    id: "C016",
    appointmentId: "A016",
    patientId: "P016",
    doctorId: "D016",
    doctorName: "Dr. Grace Neo",
    date: "2026-11-11",
    diagnosis: "Uncomplicated Urinary Tract Infection",
    prescription: "Nitrofurantoin 100mg BID for 5 days, Phenazopyridine for dysuria",
    consultationNotes: "Urine dipstick positive for leukocytes and nitrites. Urine culture sent. Started on targeted oral antimicrobials with instructions to increase fluid intake.",
    followUpDate: "2026-11-18",
    status: "COMPLETED"
  },
  {
    id: "C017",
    appointmentId: "A017",
    patientId: "P017",
    doctorId: "D017",
    doctorName: "Dr. Marcus Vance",
    date: "2026-11-12",
    diagnosis: "Osteoarthritis of Hand Interphalangeal Joints",
    prescription: "Topical Diclofenac gel TID, Hand occupational therapy",
    consultationNotes: "Heberden's and Bouchard's nodes present. Hand X-rays confirm joint space narrowing and subchondral sclerosis without erosive changes.",
    followUpDate: "2027-01-12",
    status: "COMPLETED"
  },
  {
    id: "C018",
    appointmentId: "A018",
    patientId: "P018",
    doctorId: "D018",
    doctorName: "Dr. Stephanie Heng",
    date: "2026-11-12",
    diagnosis: "Mild Allergic Conjunctivitis",
    prescription: "Olopatadine 0.1% ophthalmic solution 1 drop BID",
    consultationNotes: "Cobblestone appearance on palpebral conjunctiva. Cornea clear with fluorescein staining negative for ulcerations.",
    followUpDate: "2026-11-26",
    status: "COMPLETED"
  },
  {
    id: "C019",
    appointmentId: "A019",
    patientId: "P019",
    doctorId: "D019",
    doctorName: "Dr. Kelvin Ong",
    date: "2026-11-13",
    diagnosis: "Age-related Senile Sarcopenia Risk",
    prescription: "High protein dietary regimen, Resistance exercise program",
    consultationNotes: "Grip strength 22kg, timed up-and-go test 11 seconds. Cognitive screen (Mini-Mental State Exam) score 29/30. Advised nutritional supplementation.",
    followUpDate: "2027-02-13",
    status: "COMPLETED"
  },
  {
    id: "C020",
    appointmentId: "A020",
    patientId: "P020",
    doctorId: "D020",
    doctorName: "Dr. Andrea Lim",
    date: "2026-11-13",
    diagnosis: "Mild Microcytic Hypochromic Anemia",
    prescription: "Ferrous sulfate 325mg daily, Vitamin C 500mg daily",
    consultationNotes: "Hemoglobin 10.8 g/dL, Ferritin 14 ng/mL. Normal white blood cell and platelet counts. Stool occult blood negative. Recommended dietary iron enhancement.",
    followUpDate: "2026-12-13",
    status: "COMPLETED"
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Consultation Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 3",
    assigned: "Group 1",
    endpoints: {
      getAllConsultations: "GET /consultations",
      getConsultationById: "GET /consultations/:id",
      getByAppointmentId: "GET /consultations/appointment/:appointmentId",
      getByPatientId: "GET /consultations/patient/:patientId",
      createConsultation: "POST /consultations",
      updateConsultation: "PUT /consultations/:id",
      deleteConsultation: "DELETE /consultations/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (supports both /health and API Gateway /consultations/health)
app.get(['/health', '/consultations/health'], (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'consultation-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET /consultations - Return all consultations with optional filters
app.get('/consultations', (req, res) => {
  const { patientId, doctorId, appointmentId, status } = req.query;
  let result = consultations;

  if (patientId) {
    result = result.filter(c => c.patientId.toLowerCase() === patientId.toLowerCase());
  }
  if (doctorId) {
    result = result.filter(c => c.doctorId.toLowerCase() === doctorId.toLowerCase());
  }
  if (appointmentId) {
    result = result.filter(c => c.appointmentId.toLowerCase() === appointmentId.toLowerCase());
  }
  if (status) {
    result = result.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /consultations/:id - Single consultation by ID
app.get('/consultations/:id', (req, res) => {
  const consultation = consultations.find(c => c.id.toLowerCase() === req.params.id.toLowerCase());
  if (!consultation) {
    return res.status(404).json({
      success: false,
      message: `Consultation record with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: consultation
  });
});

// GET /consultations/appointment/:appointmentId - By Appointment ID
app.get('/consultations/appointment/:appointmentId', (req, res) => {
  const record = consultations.find(
    c => c.appointmentId.toLowerCase() === req.params.appointmentId.toLowerCase()
  );
  if (!record) {
    return res.status(404).json({
      success: false,
      message: `No consultation found for appointment ID ${req.params.appointmentId}.`
    });
  }
  res.status(200).json({
    success: true,
    data: record
  });
});

// GET /consultations/patient/:patientId - Filter by Patient ID
app.get('/consultations/patient/:patientId', (req, res) => {
  const records = consultations.filter(
    c => c.patientId.toLowerCase() === req.params.patientId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: records.length,
    patientId: req.params.patientId,
    data: records
  });
});

// POST /consultations - Create a new consultation record
app.post('/consultations', (req, res) => {
  const { id, appointmentId, patientId, doctorId, doctorName, date, diagnosis, prescription, consultationNotes, followUpDate, status } = req.body;

  if (!appointmentId || !patientId || !doctorId || !diagnosis || !consultationNotes) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'appointmentId', 'patientId', 'doctorId', 'diagnosis', and 'consultationNotes'."
    });
  }

  // Conflict: Prevent duplicate consultation ID
  if (id && consultations.some(c => c.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Consultation record with ID ${id} already exists.`
    });
  }

  // Auto-generate ID if omitted (e.g. C021)
  let nextNum = 1;
  consultations.forEach(c => {
    const match = c.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = id || `C${String(nextNum).padStart(3, '0')}`;

  const newConsultation = {
    id: newId,
    appointmentId,
    patientId,
    doctorId,
    doctorName: doctorName || "Attending Physician",
    date: date || new Date().toISOString().split('T')[0],
    diagnosis,
    prescription: prescription || "None prescribed",
    consultationNotes,
    followUpDate: followUpDate || null,
    status: status || "COMPLETED"
  };

  consultations.push(newConsultation);

  res.status(201).json({
    success: true,
    message: "Consultation record created successfully.",
    data: newConsultation
  });
});

// PUT /consultations/:id - Update consultation
app.put('/consultations/:id', (req, res) => {
  const index = consultations.findIndex(c => c.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Consultation record with ID ${req.params.id} not found.`
    });
  }

  const { diagnosis, prescription, consultationNotes, followUpDate, status } = req.body;
  if (!diagnosis && !prescription && !consultationNotes && !followUpDate && !status) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('diagnosis', 'prescription', 'consultationNotes', 'followUpDate', 'status')."
    });
  }

  consultations[index] = {
    ...consultations[index],
    ...(diagnosis !== undefined && { diagnosis }),
    ...(prescription !== undefined && { prescription }),
    ...(consultationNotes !== undefined && { consultationNotes }),
    ...(followUpDate !== undefined && { followUpDate }),
    ...(status !== undefined && { status }),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: `Consultation ${req.params.id} updated successfully.`,
    data: consultations[index]
  });
});

// DELETE /consultations/:id - Remove consultation record
app.delete('/consultations/:id', (req, res) => {
  const index = consultations.findIndex(c => c.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Consultation record with ID ${req.params.id} not found.`
    });
  }

  const deleted = consultations.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Consultation record ${req.params.id} deleted successfully.`,
    data: deleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Consultation Service is running on http://${HOST}:${PORT}`);
});
