const express = require('express');
const app = express();

const PORT = process.env.PORT || 3007;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Notification-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional notification records (20 records)
let notifications = [
  {
    id: "N001",
    patientId: "P001",
    appointmentId: "A001",
    recipient: "+65 9123 4567",
    notificationType: "SMS",
    message: "Clinic Reminder: Your appointment with Dr. Sarah Tan (Cardiology) is confirmed for 2026-11-02 at 09:30 AM.",
    status: "DELIVERED",
    createdAt: "2026-10-20T08:05:00Z",
    sentAt: "2026-10-20T08:05:12Z"
  },
  {
    id: "N002",
    patientId: "P002",
    appointmentId: "A002",
    recipient: "marcus.tan@example.com",
    notificationType: "EMAIL",
    message: "Appointment Confirmation: Scheduled with Dr. David Lee on 2026-11-02 at 10:30 AM. Clinic Room #03-12.",
    status: "DELIVERED",
    createdAt: "2026-10-20T08:35:00Z",
    sentAt: "2026-10-20T08:35:05Z"
  },
  {
    id: "N003",
    patientId: "P003",
    appointmentId: "A003",
    recipient: "+65 9345 6789",
    notificationType: "SMS",
    message: "Reminder: Neurology consultation scheduled with Dr. Emily Wong on 2026-11-03 at 11:00 AM.",
    status: "DELIVERED",
    createdAt: "2026-10-21T09:05:00Z",
    sentAt: "2026-10-21T09:05:10Z"
  },
  {
    id: "N004",
    patientId: "P004",
    appointmentId: "A004",
    recipient: "liam.patel@example.com",
    notificationType: "EMAIL",
    message: "Billing Statement: Invoice B004 for SGD 280.00 is ready for review.",
    status: "SENT",
    createdAt: "2026-10-21T09:35:00Z",
    sentAt: "2026-10-21T09:35:08Z"
  },
  {
    id: "N005",
    patientId: "P005",
    appointmentId: "A005",
    recipient: "+65 9286 8498",
    notificationType: "SMS",
    message: "Dermatology Appointment: Dr. Benjamin Koh on 2026-11-04 at 10:00 AM. Please arrive 10 minutes early.",
    status: "DELIVERED",
    createdAt: "2026-10-22T10:05:00Z",
    sentAt: "2026-10-22T10:05:15Z"
  },
  {
    id: "N006",
    patientId: "P006",
    appointmentId: "A006",
    recipient: "chloe.lim@example.com",
    notificationType: "EMAIL",
    message: "Receipt Confirmation: Payment of SGD 165.00 for Invoice B006 has been processed successfully.",
    status: "DELIVERED",
    createdAt: "2026-10-22T10:35:00Z",
    sentAt: "2026-10-22T10:35:02Z"
  },
  {
    id: "N007",
    patientId: "P007",
    appointmentId: "A007",
    recipient: "+65 8223 3445",
    notificationType: "SMS",
    message: "Surgical Consultation Alert: Fasting required 6 hours before your appointment on 2026-11-05.",
    status: "DELIVERED",
    createdAt: "2026-10-23T11:05:00Z",
    sentAt: "2026-10-23T11:05:20Z"
  },
  {
    id: "N008",
    patientId: "P008",
    appointmentId: "A008",
    recipient: "emily.zhang@example.com",
    notificationType: "EMAIL",
    message: "Obstetric Care: Routine Week 24 scan scheduled for 2026-11-05 at 01:30 PM with Dr. Priya Nair.",
    status: "DELIVERED",
    createdAt: "2026-10-23T11:35:00Z",
    sentAt: "2026-10-23T11:35:04Z"
  },
  {
    id: "N009",
    patientId: "P009",
    appointmentId: "A009",
    recipient: "+65 8334 4556",
    notificationType: "PUSH_NOTIFICATION",
    message: "Appointment Reminder: Psychiatric consultation on 2026-11-06 at 03:00 PM.",
    status: "DELIVERED",
    createdAt: "2026-10-24T12:05:00Z",
    sentAt: "2026-10-24T12:05:01Z"
  },
  {
    id: "N010",
    patientId: "P010",
    appointmentId: "A010",
    recipient: "hanna.almansoor@example.com",
    notificationType: "EMAIL",
    message: "Lab Results Ready: Your HbA1c panel from Dr. Amanda Teo is now available in your portal.",
    status: "DELIVERED",
    createdAt: "2026-10-24T12:35:00Z",
    sentAt: "2026-10-24T12:35:10Z"
  },
  {
    id: "N011",
    patientId: "P011",
    appointmentId: "A011",
    recipient: "+65 8445 5667",
    notificationType: "SMS",
    message: "Clinic Booking: Pulmonology visit booked for 2026-11-09 at 10:00 AM with Dr. Kenneth Sim.",
    status: "DELIVERED",
    createdAt: "2026-10-25T08:05:00Z",
    sentAt: "2026-10-25T08:05:11Z"
  },
  {
    id: "N012",
    patientId: "P012",
    appointmentId: "A012",
    recipient: "olivia.takahashi@example.com",
    notificationType: "EMAIL",
    message: "Oncology Surveillance: Biopsy review scheduled with Dr. Michelle Gomez on 2026-11-09 at 02:30 PM.",
    status: "DELIVERED",
    createdAt: "2026-10-25T08:35:00Z",
    sentAt: "2026-10-25T08:35:06Z"
  },
  {
    id: "N013",
    patientId: "P013",
    appointmentId: "A013",
    recipient: "+65 8556 6778",
    notificationType: "SMS",
    message: "Appointment Reminder: Gastroenterology checkup on 2026-11-10 at 09:00 AM with Dr. Daniel Fong.",
    status: "DELIVERED",
    createdAt: "2026-10-25T09:05:00Z",
    sentAt: "2026-10-25T09:05:14Z"
  },
  {
    id: "N014",
    patientId: "P014",
    appointmentId: "A014",
    recipient: "maya.santos@example.com",
    notificationType: "EMAIL",
    message: "Payment Reminder: Outstanding balance of SGD 175.00 for Invoice B014.",
    status: "SENT",
    createdAt: "2026-10-25T09:35:00Z",
    sentAt: "2026-10-25T09:35:09Z"
  },
  {
    id: "N015",
    patientId: "P015",
    appointmentId: "A015",
    recipient: "+65 8667 7889",
    notificationType: "SMS",
    message: "ENT Appointment: Dr. Jason Low on 2026-11-11 at 10:30 AM.",
    status: "DELIVERED",
    createdAt: "2026-10-26T10:05:00Z",
    sentAt: "2026-10-26T10:05:12Z"
  },
  {
    id: "N016",
    patientId: "P016",
    appointmentId: "A016",
    recipient: "zoe.dubois@example.com",
    notificationType: "EMAIL",
    message: "Prescription Ready: Antibiotic course is available for pickup at the clinic dispensary.",
    status: "DELIVERED",
    createdAt: "2026-10-26T10:35:00Z",
    sentAt: "2026-10-26T10:35:03Z"
  },
  {
    id: "N017",
    patientId: "P017",
    appointmentId: "A017",
    recipient: "+65 8778 8990",
    notificationType: "PUSH_NOTIFICATION",
    message: "Upcoming Clinic Visit: Rheumatology follow-up with Dr. Marcus Vance on 2026-11-12 at 02:00 PM.",
    status: "DELIVERED",
    createdAt: "2026-10-26T11:05:00Z",
    sentAt: "2026-10-26T11:05:02Z"
  },
  {
    id: "N018",
    patientId: "P018",
    appointmentId: "A018",
    recipient: "chloe.oconnor@example.com",
    notificationType: "EMAIL",
    message: "Allergy Testing Information: Please refrain from taking antihistamines 48 hours prior to your visit.",
    status: "DELIVERED",
    createdAt: "2026-10-26T11:35:00Z",
    sentAt: "2026-10-26T11:35:07Z"
  },
  {
    id: "N019",
    patientId: "P019",
    appointmentId: "A019",
    recipient: "+65 8545 5667",
    notificationType: "SMS",
    message: "Geriatric Assessment: Confirmed for 2026-11-13 at 09:30 AM with Dr. Kelvin Ong.",
    status: "DELIVERED",
    createdAt: "2026-10-26T13:05:00Z",
    sentAt: "2026-10-26T13:05:14Z"
  },
  {
    id: "N020",
    patientId: "P020",
    appointmentId: "A020",
    recipient: "isabella.ho@example.com",
    notificationType: "EMAIL",
    message: "Clinic Reminder: Hematology blood work review on 2026-11-13 at 11:30 AM.",
    status: "QUEUED",
    createdAt: "2026-10-26T13:35:00Z",
    sentAt: null
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: "Notification Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 4",
    assigned: "Group 1",
    endpoints: {
      getAllNotifications: "GET /notifications",
      getNotificationById: "GET /notifications/:id",
      getByPatientId: "GET /notifications/patient/:patientId",
      sendNotification: "POST /notifications",
      updateNotification: "PUT /notifications/:id",
      deleteNotification: "DELETE /notifications/:id",
      healthCheck: "GET /health"
    }
  });
});

// Health check endpoint (supports both /health and API Gateway /notifications/health)
app.get(['/health', '/notifications/health'], (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'notification-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET /notifications - Return all notifications (with optional filters: patientId, notificationType, status)
app.get('/notifications', (req, res) => {
  const { patientId, notificationType, status } = req.query;
  let result = notifications;

  if (patientId) {
    result = result.filter(n => n.patientId.toLowerCase() === patientId.toLowerCase());
  }
  if (notificationType) {
    result = result.filter(n => n.notificationType.toUpperCase() === notificationType.toUpperCase());
  }
  if (status) {
    result = result.filter(n => n.status.toUpperCase() === status.toUpperCase());
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /notifications/:id - Single notification by ID
app.get('/notifications/:id', (req, res) => {
  const notification = notifications.find(n => n.id.toLowerCase() === req.params.id.toLowerCase());
  if (!notification) {
    return res.status(404).json({
      success: false,
      message: `Notification record with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: notification
  });
});

// GET /notifications/patient/:patientId - Filter by patient ID
app.get('/notifications/patient/:patientId', (req, res) => {
  const userNotifications = notifications.filter(
    n => n.patientId.toLowerCase() === req.params.patientId.toLowerCase()
  );
  res.status(200).json({
    success: true,
    count: userNotifications.length,
    patientId: req.params.patientId,
    data: userNotifications
  });
});

// POST /notifications - Record and dispatch simulated notification
// Satisfies Step 41: Store simulated notifications with patient ID, message, notification type, status; return confirmation
app.post('/notifications', (req, res) => {
  const { id, patientId, appointmentId, recipient, notificationType, message } = req.body;

  if (!patientId || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'patientId' and 'message'."
    });
  }

  // Conflict check for ID
  if (id && notifications.some(n => n.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Notification with ID ${id} already exists.`
    });
  }

  // Auto-generate ID if omitted (e.g. N021)
  let nextNum = 1;
  notifications.forEach(n => {
    const match = n.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = id || `N${String(nextNum).padStart(3, '0')}`;

  const validTypes = ["SMS", "EMAIL", "PUSH_NOTIFICATION", "WHATSAPP"];
  const type = notificationType && validTypes.includes(notificationType.toUpperCase())
    ? notificationType.toUpperCase()
    : "SMS";

  const newNotification = {
    id: newId,
    patientId,
    appointmentId: appointmentId || null,
    recipient: recipient || "patient-registered-contact",
    notificationType: type,
    message,
    status: "DELIVERED",
    createdAt: new Date().toISOString(),
    sentAt: new Date().toISOString()
  };

  notifications.push(newNotification);

  res.status(201).json({
    success: true,
    message: "Notification successfully dispatched and recorded.",
    confirmation: {
      deliveryId: `DEL-${Date.now()}`,
      status: "CONFIRMED",
      timestamp: newNotification.sentAt
    },
    data: newNotification
  });
});

// PUT /notifications/:id - Update notification status
app.put('/notifications/:id', (req, res) => {
  const index = notifications.findIndex(n => n.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Notification with ID ${req.params.id} not found.`
    });
  }

  const { status, message } = req.body;
  if (!status && !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'status' or 'message' to update."
    });
  }

  notifications[index] = {
    ...notifications[index],
    ...(status !== undefined && { status: status.toUpperCase() }),
    ...(message !== undefined && { message }),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: `Notification ${req.params.id} updated successfully.`,
    data: notifications[index]
  });
});

// DELETE /notifications/:id - Delete notification
app.delete('/notifications/:id', (req, res) => {
  const index = notifications.findIndex(n => n.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Notification with ID ${req.params.id} not found.`
    });
  }

  const deleted = notifications.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: `Notification ${req.params.id} deleted successfully.`,
    data: deleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Notification Service is running on http://${HOST}:${PORT}`);
});
