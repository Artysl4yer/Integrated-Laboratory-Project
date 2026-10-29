const express = require('express');
const app = express();

const PORT = process.env.PORT || 3003;
const HOST = '0.0.0.0';

const PATIENT_SERVICE_URL = process.env.PATIENT_SERVICE_URL || 'http://localhost:3001';
const DOCTOR_SERVICE_URL = process.env.DOCTOR_SERVICE_URL || 'http://localhost:3002';
const SCHEDULE_SERVICE_URL = process.env.SCHEDULE_SERVICE_URL || 'http://localhost:3004';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Appointment-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional appointment records (20 records)
let appointments = [
  {
    id: "A001",
    patientId: "P001",
    doctorId: "D001",
    date: "2026-11-02",
    time: "09:30",
    status: "CONFIRMED",
    reason: "Cardiology Follow-up",
    createdAt: "2026-10-20T08:00:00Z"
  },
  {
    id: "A002",
    patientId: "P002",
    doctorId: "D002",
    date: "2026-11-02",
    time: "10:30",
    status: "SCHEDULED",
    reason: "Pediatric Wellness Exam",
    createdAt: "2026-10-20T08:30:00Z"
  },
  {
    id: "A003",
    patientId: "P003",
    doctorId: "D003",
    date: "2026-11-03",
    time: "11:00",
    status: "CONFIRMED",
    reason: "Neurology Consultation",
    createdAt: "2026-10-21T09:00:00Z"
  },
  {
    id: "A004",
    patientId: "P004",
    doctorId: "D004",
    date: "2026-11-03",
    time: "14:00",
    status: "COMPLETED",
    reason: "Orthopedic Knee Assessment",
    createdAt: "2026-10-21T09:30:00Z"
  },
  {
    id: "A005",
    patientId: "P005",
    doctorId: "D005",
    date: "2026-11-04",
    time: "10:00",
    status: "SCHEDULED",
    reason: "Dermatology Skin Rash Evaluation",
    createdAt: "2026-10-22T10:00:00Z"
  },
  {
    id: "A006",
    patientId: "P006",
    doctorId: "D006",
    date: "2026-11-04",
    time: "11:30",
    status: "CONFIRMED",
    reason: "Ophthalmology Eye Screening",
    createdAt: "2026-10-22T10:30:00Z"
  },
  {
    id: "A007",
    patientId: "P007",
    doctorId: "D007",
    date: "2026-11-05",
    time: "09:00",
    status: "SCHEDULED",
    reason: "Pre-surgery Consultation",
    createdAt: "2026-10-23T11:00:00Z"
  },
  {
    id: "A008",
    patientId: "P008",
    doctorId: "D008",
    date: "2026-11-05",
    time: "13:30",
    status: "CONFIRMED",
    reason: "Prenatal Ultrasound Check",
    createdAt: "2026-10-23T11:30:00Z"
  },
  {
    id: "A009",
    patientId: "P009",
    doctorId: "D009",
    date: "2026-11-06",
    time: "15:00",
    status: "SCHEDULED",
    reason: "Psychiatric Therapy Session",
    createdAt: "2026-10-24T12:00:00Z"
  },
  {
    id: "A010",
    patientId: "P010",
    doctorId: "D010",
    date: "2026-11-06",
    time: "08:30",
    status: "CONFIRMED",
    reason: "Endocrine Diabetes Management",
    createdAt: "2026-10-24T12:30:00Z"
  },
  {
    id: "A011",
    patientId: "P011",
    doctorId: "D011",
    date: "2026-11-09",
    time: "10:00",
    status: "SCHEDULED",
    reason: "Pulmonology Asthma Assessment",
    createdAt: "2026-10-25T08:00:00Z"
  },
  {
    id: "A012",
    patientId: "P012",
    doctorId: "D012",
    date: "2026-11-09",
    time: "14:30",
    status: "CONFIRMED",
    reason: "Oncology Biopsy Review",
    createdAt: "2026-10-25T08:30:00Z"
  },
  {
    id: "A013",
    patientId: "P013",
    doctorId: "D013",
    date: "2026-11-10",
    time: "09:00",
    status: "SCHEDULED",
    reason: "Gastroenterology Endoscopy Follow-up",
    createdAt: "2026-10-25T09:00:00Z"
  },
  {
    id: "A014",
    patientId: "P014",
    doctorId: "D014",
    date: "2026-11-10",
    time: "11:00",
    status: "CONFIRMED",
    reason: "Nephrology Kidney Function Check",
    createdAt: "2026-10-25T09:30:00Z"
  },
  {
    id: "A015",
    patientId: "P015",
    doctorId: "D015",
    date: "2026-11-11",
    time: "10:30",
    status: "SCHEDULED",
    reason: "ENT Hearing Evaluation",
    createdAt: "2026-10-26T10:00:00Z"
  },
  {
    id: "A016",
    patientId: "P016",
    doctorId: "D016",
    date: "2026-11-11",
    time: "13:00",
    status: "CONFIRMED",
    reason: "Urology Ultrasound Review",
    createdAt: "2026-10-26T10:30:00Z"
  },
  {
    id: "A017",
    patientId: "P017",
    doctorId: "D017",
    date: "2026-11-12",
    time: "14:00",
    status: "SCHEDULED",
    reason: "Rheumatology Joint Pain Consultation",
    createdAt: "2026-10-26T11:00:00Z"
  },
  {
    id: "A018",
    patientId: "P018",
    doctorId: "D018",
    date: "2026-11-12",
    time: "15:30",
    status: "CONFIRMED",
    reason: "Allergy and Immunology Patch Testing",
    createdAt: "2026-10-26T11:30:00Z"
  },
  {
    id: "A019",
    patientId: "P019",
    doctorId: "D019",
    date: "2026-11-13",
    time: "09:30",
    status: "SCHEDULED",
    reason: "Geriatric Health Assessment",
    createdAt: "2026-10-26T13:00:00Z"
  },
  {
    id: "A020",
    patientId: "P020",
    doctorId: "D020",
    date: "2026-11-13",
    time: "11:30",
    status: "CONFIRMED",
    reason: "Hematology Blood Work Review",
    createdAt: "2026-10-26T13:30:00Z"
  }
];

// Helper: Check if external service is reachable and validates entity
async function verifyExternalEntity(baseUrl, path, idName) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const response = await fetch(`${baseUrl}${path}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.status === 404) {
      return { exists: false, error: `${idName} was not found in external service.` };
    }
    if (response.ok) {
      const data = await response.json();
      return { exists: true, data: data.data || data };
    }
    return { exists: true }; // Permissive if service gives non-404 status
  } catch (err) {
    // If external service is offline during unit testing, fallback to permissive validation
    return { exists: true, offline: true };
  }
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Appointment Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 2",
    assigned: "Group 1 and 9",
    endpoints: {
      getAllAppointments: "GET /appointments",
      getAppointmentById: "GET /appointments/:id",
      getAppointmentsByPatient: "GET /appointments/patient/:patientId",
      getAppointmentsByDoctor: "GET /appointments/doctor/:doctorId",
      createAppointment: "POST /appointments",
      updateAppointment: "PUT /appointments/:id",
      deleteAppointment: "DELETE /appointments/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (supports both /health and API Gateway /appointments/health)
app.get(['/health', '/appointments/health'], (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'appointment-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET /appointments - Return all appointments (optional query filters: patientId, doctorId, status, date)
app.get('/appointments', (req, res) => {
  const { patientId, doctorId, status, date } = req.query;
  let result = appointments;

  if (patientId) {
    result = result.filter(a => a.patientId.toLowerCase() === patientId.toLowerCase());
  }
  if (doctorId) {
    result = result.filter(a => a.doctorId.toLowerCase() === doctorId.toLowerCase());
  }
  if (status) {
    result = result.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }
  if (date) {
    result = result.filter(a => a.date === date);
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /appointments/:id - Return appointment by ID
app.get('/appointments/:id', (req, res) => {
  const appointment = appointments.find(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: `Appointment with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: appointment
  });
});

// GET /appointments/patient/:patientId - Filter by patient ID
app.get('/appointments/patient/:patientId', (req, res) => {
  const patientAppointments = appointments.filter(
    a => a.patientId.toLowerCase() === req.params.patientId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: patientAppointments.length,
    patientId: req.params.patientId,
    data: patientAppointments
  });
});

// GET /appointments/doctor/:doctorId - Filter by doctor ID
app.get('/appointments/doctor/:doctorId', (req, res) => {
  const doctorAppointments = appointments.filter(
    a => a.doctorId.toLowerCase() === req.params.doctorId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: doctorAppointments.length,
    doctorId: req.params.doctorId,
    data: doctorAppointments
  });
});

// POST /appointments - Book a new appointment
// Satisfies Step 21, Step 29 (integration with Patient & Doctor), and Step 30 (duplicate prevention)
app.post('/appointments', async (req, res) => {
  const { id, patientId, doctorId, date, time, status, reason } = req.body;

  // Validation: Required fields
  if (!patientId || !doctorId || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'patientId', 'doctorId', 'date', and 'time'."
    });
  }

  // Conflict check: Check if appointment ID already exists
  if (id && appointments.some(a => a.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Appointment with ID ${id} already exists.`
    });
  }

  // Step 30: Prevent duplicate bookings for the same doctor, date, and time
  const isDuplicate = appointments.some(
    a => a.doctorId.toLowerCase() === doctorId.toLowerCase() &&
         a.date === date &&
         a.time === time &&
         a.status !== 'CANCELLED'
  );

  if (isDuplicate) {
    return res.status(409).json({
      success: false,
      message: `Conflict: Doctor ${doctorId} already has a confirmed booking on ${date} at ${time}.`
    });
  }

  // Step 30: Check Schedule Service before booking if reachable
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const schedRes = await fetch(`${SCHEDULE_SERVICE_URL}/schedules?doctorId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (schedRes.ok) {
      const schedData = await schedRes.json();
      if (schedData && Array.isArray(schedData.data) && schedData.data.length > 0) {
        const availableSlots = schedData.data.filter(s => s.isAvailable);
        if (availableSlots.length === 0) {
          return res.status(409).json({
            success: false,
            message: `Conflict: Doctor ${doctorId} has no available schedule slots on ${date}.`
          });
        }
      }
    }
  } catch (err) {
    // Permissive fallback if Schedule Service is offline
  }

  // Step 29: Verify referenced patient and doctor exist
  const patientCheck = await verifyExternalEntity(PATIENT_SERVICE_URL, `/patients/${patientId}`, `Patient '${patientId}'`);
  if (!patientCheck.exists) {
    return res.status(404).json({
      success: false,
      message: `Referenced patient '${patientId}' does not exist in Patient Service.`
    });
  }

  const doctorCheck = await verifyExternalEntity(DOCTOR_SERVICE_URL, `/doctors/${doctorId}`, `Doctor '${doctorId}'`);
  if (!doctorCheck.exists) {
    return res.status(404).json({
      success: false,
      message: `Referenced doctor '${doctorId}' does not exist in Doctor Service.`
    });
  }

  // Auto-generate ID if not provided (e.g., A021)
  let nextNum = 1;
  appointments.forEach(a => {
    const match = a.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = id || `A${String(nextNum).padStart(3, '0')}`;

  const newAppointment = {
    id: newId,
    patientId,
    doctorId,
    date,
    time,
    status: status || 'CONFIRMED',
    reason: reason || 'General Consultation',
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully.",
    data: newAppointment
  });
});

// PUT /appointments/:id - Update an appointment
app.put('/appointments/:id', async (req, res) => {
  const index = appointments.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Appointment with ID ${req.params.id} not found.`
    });
  }

  const { patientId, doctorId, date, time, status, reason } = req.body;
  if (!patientId && !doctorId && !date && !time && !status && !reason) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('patientId', 'doctorId', 'date', 'time', 'status', 'reason')."
    });
  }

  const targetDoctorId = doctorId || appointments[index].doctorId;
  const targetDate = date || appointments[index].date;
  const targetTime = time || appointments[index].time;
  const targetStatus = status || appointments[index].status;

  // Prevent duplicate booking if slot parameters are modified
  if ((doctorId || date || time) && targetStatus !== 'CANCELLED') {
    const isDuplicate = appointments.some(
      (a, i) => i !== index &&
                a.doctorId.toLowerCase() === targetDoctorId.toLowerCase() &&
                a.date === targetDate &&
                a.time === targetTime &&
                a.status !== 'CANCELLED'
    );

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: `Conflict: Doctor ${targetDoctorId} already has an active booking on ${targetDate} at ${targetTime}.`
      });
    }
  }

  // Update record
  appointments[index] = {
    ...appointments[index],
    ...(patientId !== undefined && { patientId }),
    ...(doctorId !== undefined && { doctorId }),
    ...(date !== undefined && { date }),
    ...(time !== undefined && { time }),
    ...(status !== undefined && { status }),
    ...(reason !== undefined && { reason }),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: `Appointment ${req.params.id} updated successfully.`,
    data: appointments[index]
  });
});

// DELETE /appointments/:id - Cancel/remove appointment
app.delete('/appointments/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Appointment with ID ${req.params.id} not found.`
    });
  }

  const deleted = appointments.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Appointment ${req.params.id} deleted successfully.`,
    data: deleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Appointment Service is running on http://${HOST}:${PORT}`);
});
