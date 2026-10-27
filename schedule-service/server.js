const express = require('express');
const app = express();

const PORT = process.env.PORT || 3004;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Schedule-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional doctor schedules and available time slots (20 records)
let schedules = [
  {
    id: "S001",
    doctorId: "D001",
    doctorName: "Dr. Sarah Tan",
    specialization: "Cardiology",
    dayOfWeek: "Monday",
    date: "2026-11-02",
    timeSlot: "09:00 - 10:00",
    isAvailable: false,
    bookedAppointmentId: "A001"
  },
  {
    id: "S002",
    doctorId: "D001",
    doctorName: "Dr. Sarah Tan",
    specialization: "Cardiology",
    dayOfWeek: "Monday",
    date: "2026-11-02",
    timeSlot: "10:00 - 11:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S003",
    doctorId: "D001",
    doctorName: "Dr. Sarah Tan",
    specialization: "Cardiology",
    dayOfWeek: "Monday",
    date: "2026-11-02",
    timeSlot: "14:00 - 15:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S004",
    doctorId: "D002",
    doctorName: "Dr. David Lee",
    specialization: "Pediatrics",
    dayOfWeek: "Tuesday",
    date: "2026-11-02",
    timeSlot: "10:00 - 11:00",
    isAvailable: false,
    bookedAppointmentId: "A002"
  },
  {
    id: "S005",
    doctorId: "D002",
    doctorName: "Dr. David Lee",
    specialization: "Pediatrics",
    dayOfWeek: "Tuesday",
    date: "2026-11-02",
    timeSlot: "11:00 - 12:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S006",
    doctorId: "D002",
    doctorName: "Dr. David Lee",
    specialization: "Pediatrics",
    dayOfWeek: "Tuesday",
    date: "2026-11-02",
    timeSlot: "15:00 - 16:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S007",
    doctorId: "D003",
    doctorName: "Dr. Emily Wong",
    specialization: "Neurology",
    dayOfWeek: "Wednesday",
    date: "2026-11-03",
    timeSlot: "09:00 - 10:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S008",
    doctorId: "D003",
    doctorName: "Dr. Emily Wong",
    specialization: "Neurology",
    dayOfWeek: "Wednesday",
    date: "2026-11-03",
    timeSlot: "11:00 - 12:00",
    isAvailable: false,
    bookedAppointmentId: "A003"
  },
  {
    id: "S009",
    doctorId: "D004",
    doctorName: "Dr. Rajesh Sharma",
    specialization: "Orthopedics",
    dayOfWeek: "Wednesday",
    date: "2026-11-03",
    timeSlot: "14:00 - 15:00",
    isAvailable: false,
    bookedAppointmentId: "A004"
  },
  {
    id: "S010",
    doctorId: "D004",
    doctorName: "Dr. Rajesh Sharma",
    specialization: "Orthopedics",
    dayOfWeek: "Wednesday",
    date: "2026-11-03",
    timeSlot: "15:00 - 16:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S011",
    doctorId: "D005",
    doctorName: "Dr. Benjamin Koh",
    specialization: "Dermatology",
    dayOfWeek: "Thursday",
    date: "2026-11-04",
    timeSlot: "10:00 - 11:00",
    isAvailable: false,
    bookedAppointmentId: "A005"
  },
  {
    id: "S012",
    doctorId: "D005",
    doctorName: "Dr. Benjamin Koh",
    specialization: "Dermatology",
    dayOfWeek: "Thursday",
    date: "2026-11-04",
    timeSlot: "11:00 - 12:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S013",
    doctorId: "D006",
    doctorName: "Dr. Jessica Lim",
    specialization: "Ophthalmology",
    dayOfWeek: "Thursday",
    date: "2026-11-04",
    timeSlot: "11:00 - 12:00",
    isAvailable: false,
    bookedAppointmentId: "A006"
  },
  {
    id: "S014",
    doctorId: "D006",
    doctorName: "Dr. Jessica Lim",
    specialization: "Ophthalmology",
    dayOfWeek: "Thursday",
    date: "2026-11-04",
    timeSlot: "14:00 - 15:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S015",
    doctorId: "D007",
    doctorName: "Dr. Michael Chen",
    specialization: "General Surgery",
    dayOfWeek: "Friday",
    date: "2026-11-05",
    timeSlot: "09:00 - 10:00",
    isAvailable: false,
    bookedAppointmentId: "A007"
  },
  {
    id: "S016",
    doctorId: "D008",
    doctorName: "Dr. Priya Nair",
    specialization: "Gynecology & Obstetrics",
    dayOfWeek: "Friday",
    date: "2026-11-05",
    timeSlot: "13:00 - 14:00",
    isAvailable: false,
    bookedAppointmentId: "A008"
  },
  {
    id: "S017",
    doctorId: "D009",
    doctorName: "Dr. Robert Taylor",
    specialization: "Psychiatry",
    dayOfWeek: "Friday",
    date: "2026-11-06",
    timeSlot: "15:00 - 16:00",
    isAvailable: false,
    bookedAppointmentId: "A009"
  },
  {
    id: "S018",
    doctorId: "D010",
    doctorName: "Dr. Amanda Teo",
    specialization: "Endocrinology",
    dayOfWeek: "Friday",
    date: "2026-11-06",
    timeSlot: "08:00 - 09:00",
    isAvailable: false,
    bookedAppointmentId: "A010"
  },
  {
    id: "S019",
    doctorId: "D001",
    doctorName: "Dr. Sarah Tan",
    specialization: "Cardiology",
    dayOfWeek: "Monday",
    date: "2026-11-09",
    timeSlot: "09:00 - 10:00",
    isAvailable: true,
    bookedAppointmentId: null
  },
  {
    id: "S020",
    doctorId: "D002",
    doctorName: "Dr. David Lee",
    specialization: "Pediatrics",
    dayOfWeek: "Tuesday",
    date: "2026-11-10",
    timeSlot: "10:00 - 11:00",
    isAvailable: true,
    bookedAppointmentId: null
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Schedule Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 2",
    assigned: "Groups 1 and 9",
    endpoints: {
      getAllSchedules: "GET /schedules",
      getScheduleById: "GET /schedules/:id",
      getSchedulesByDoctor: "GET /schedules/doctor/:doctorId",
      createSchedule: "POST /schedules",
      updateSchedule: "PUT /schedules/:id",
      bookScheduleSlot: "PUT /schedules/:id/book",
      releaseScheduleSlot: "PUT /schedules/:id/release",
      deleteSchedule: "DELETE /schedules/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (for ECS/ALB target group)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'schedule-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET /schedules - Retrieve doctor schedules (with optional filters: doctorId, date, available)
app.get('/schedules', (req, res) => {
  const { doctorId, date, available } = req.query;
  let result = schedules;

  if (doctorId) {
    result = result.filter(s => s.doctorId.toLowerCase() === doctorId.toLowerCase());
  }
  if (date) {
    result = result.filter(s => s.date === date);
  }
  if (available !== undefined) {
    const isAvail = available === 'true';
    result = result.filter(s => s.isAvailable === isAvail);
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /schedules/:id - Retrieve single schedule slot by ID
app.get('/schedules/:id', (req, res) => {
  const schedule = schedules.find(s => s.id.toLowerCase() === req.params.id.toLowerCase());
  if (!schedule) {
    return res.status(404).json({
      success: false,
      message: `Schedule slot with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: schedule
  });
});

// GET /schedules/doctor/:doctorId - Retrieve all schedules for a specific doctor
app.get('/schedules/doctor/:doctorId', (req, res) => {
  const doctorSchedules = schedules.filter(
    s => s.doctorId.toLowerCase() === req.params.doctorId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: doctorSchedules.length,
    doctorId: req.params.doctorId,
    data: doctorSchedules
  });
});

// POST /schedules - Add a new schedule slot
app.post('/schedules', (req, res) => {
  const { id, doctorId, doctorName, specialization, dayOfWeek, date, timeSlot, isAvailable } = req.body;

  if (!doctorId || !doctorName || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'doctorId', 'doctorName', 'date', and 'timeSlot'."
    });
  }

  if (id && schedules.some(s => s.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Schedule with ID ${id} already exists.`
    });
  }

  // Prevent duplicate schedule slot for same doctor, date, and timeSlot
  const conflict = schedules.some(
    s => s.doctorId.toLowerCase() === doctorId.toLowerCase() &&
         s.date === date &&
         s.timeSlot.toLowerCase() === timeSlot.toLowerCase()
  );
  if (conflict) {
    return res.status(409).json({
      success: false,
      message: `Conflict: Schedule slot for doctor ${doctorId} on ${date} during ${timeSlot} already exists.`
    });
  }

  let nextNum = 1;
  schedules.forEach(s => {
    const match = s.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = id || `S${String(nextNum).padStart(3, '0')}`;

  const newSchedule = {
    id: newId,
    doctorId,
    doctorName,
    specialization: specialization || "General Medicine",
    dayOfWeek: dayOfWeek || "Monday",
    date,
    timeSlot,
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
    bookedAppointmentId: null
  };

  schedules.push(newSchedule);

  res.status(201).json({
    success: true,
    message: "Doctor schedule slot created successfully.",
    data: newSchedule
  });
});

// PUT /schedules/:id - Update schedule slot
app.put('/schedules/:id', (req, res) => {
  const index = schedules.findIndex(s => s.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Schedule slot with ID ${req.params.id} not found.`
    });
  }

  const { doctorName, specialization, dayOfWeek, date, timeSlot, isAvailable, bookedAppointmentId } = req.body;
  if (
    doctorName === undefined &&
    specialization === undefined &&
    dayOfWeek === undefined &&
    date === undefined &&
    timeSlot === undefined &&
    isAvailable === undefined &&
    bookedAppointmentId === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one valid field to update."
    });
  }

  schedules[index] = {
    ...schedules[index],
    ...(doctorName !== undefined && { doctorName }),
    ...(specialization !== undefined && { specialization }),
    ...(dayOfWeek !== undefined && { dayOfWeek }),
    ...(date !== undefined && { date }),
    ...(timeSlot !== undefined && { timeSlot }),
    ...(isAvailable !== undefined && { isAvailable: Boolean(isAvailable) }),
    ...(bookedAppointmentId !== undefined && { bookedAppointmentId })
  };

  res.status(200).json({
    success: true,
    message: `Schedule slot ${req.params.id} updated successfully.`,
    data: schedules[index]
  });
});

// PUT /schedules/:id/book - Book schedule slot
app.put('/schedules/:id/book', (req, res) => {
  const index = schedules.findIndex(s => s.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Schedule slot with ID ${req.params.id} not found.`
    });
  }

  if (!schedules[index].isAvailable) {
    return res.status(409).json({
      success: false,
      message: `Schedule slot ${req.params.id} is already booked.`
    });
  }

  const appointmentId = req.body.appointmentId || "BOOKED";
  schedules[index].isAvailable = false;
  schedules[index].bookedAppointmentId = appointmentId;

  res.status(200).json({
    success: true,
    message: `Schedule slot ${req.params.id} successfully booked for appointment ${appointmentId}.`,
    data: schedules[index]
  });
});

// PUT /schedules/:id/release - Release booked schedule slot
app.put('/schedules/:id/release', (req, res) => {
  const index = schedules.findIndex(s => s.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Schedule slot with ID ${req.params.id} not found.`
    });
  }

  schedules[index].isAvailable = true;
  schedules[index].bookedAppointmentId = null;

  res.status(200).json({
    success: true,
    message: `Schedule slot ${req.params.id} has been released and is now available.`,
    data: schedules[index]
  });
});

// DELETE /schedules/:id - Delete a schedule slot
app.delete('/schedules/:id', (req, res) => {
  const index = schedules.findIndex(s => s.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Schedule slot with ID ${req.params.id} not found.`
    });
  }

  const deleted = schedules.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Schedule slot ${req.params.id} deleted successfully.`,
    data: deleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Schedule Service is running on http://${HOST}:${PORT}`);
});
