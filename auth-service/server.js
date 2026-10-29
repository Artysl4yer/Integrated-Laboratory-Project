const express = require('express');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 3008;
const HOST = '0.0.0.0';

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [Auth-Service] ${req.method} ${req.url}`);
  next();
});

// Fictional test accounts (20 users across patient, doctor, staff, and admin roles)
// Passwords are simulated demonstration hashes (not real user passwords)
let users = [
  {
    id: "U001",
    email: "admin@clinic.local",
    password: "Password123!",
    name: "System Administrator",
    role: "admin",
    permissions: ["all:read", "all:write", "system:configure", "audit:view"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U002",
    email: "staff.reception@clinic.local",
    password: "Password123!",
    name: "Sarah Lim (Head Receptionist)",
    role: "staff",
    permissions: ["patient:read", "patient:write", "appointment:read", "appointment:write", "billing:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U003",
    email: "dr.sarah.tan@clinic.local",
    password: "Password123!",
    name: "Dr. Sarah Tan",
    role: "doctor",
    doctorId: "D001",
    permissions: ["patient:read", "schedule:manage", "consultation:write", "consultation:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U004",
    email: "dr.david.lee@clinic.local",
    password: "Password123!",
    name: "Dr. David Lee",
    role: "doctor",
    doctorId: "D002",
    permissions: ["patient:read", "schedule:manage", "consultation:write", "consultation:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U005",
    email: "dr.emily.wong@clinic.local",
    password: "Password123!",
    name: "Dr. Emily Wong",
    role: "doctor",
    doctorId: "D003",
    permissions: ["patient:read", "schedule:manage", "consultation:write", "consultation:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U006",
    email: "dr.rajesh.sharma@clinic.local",
    password: "Password123!",
    name: "Dr. Rajesh Sharma",
    role: "doctor",
    doctorId: "D004",
    permissions: ["patient:read", "schedule:manage", "consultation:write", "consultation:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U007",
    email: "dr.benjamin.koh@clinic.local",
    password: "Password123!",
    name: "Dr. Benjamin Koh",
    role: "doctor",
    doctorId: "D005",
    permissions: ["patient:read", "schedule:manage", "consultation:write", "consultation:read"],
    status: "ACTIVE",
    createdAt: "2026-10-01T00:00:00Z"
  },
  {
    id: "U008",
    email: "avery.chen@example.com",
    password: "Password123!",
    name: "Avery Chen",
    role: "patient",
    patientId: "P001",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U009",
    email: "marcus.tan@example.com",
    password: "Password123!",
    name: "Marcus Tan",
    role: "patient",
    patientId: "P002",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U010",
    email: "sofia.rodriguez@example.com",
    password: "Password123!",
    name: "Sofia Rodriguez",
    role: "patient",
    patientId: "P003",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U011",
    email: "liam.patel@example.com",
    password: "Password123!",
    name: "Liam Patel",
    role: "patient",
    patientId: "P004",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U012",
    email: "klarenz.lark@example.com",
    password: "Password123!",
    name: "Klarenz Lark",
    role: "patient",
    patientId: "P005",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U013",
    email: "chloe.lim@example.com",
    password: "Password123!",
    name: "Chloe Lim",
    role: "patient",
    patientId: "P006",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U014",
    email: "noah.fernandez@example.com",
    password: "Password123!",
    name: "Noah Fernandez",
    role: "patient",
    patientId: "P007",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U015",
    email: "emily.zhang@example.com",
    password: "Password123!",
    name: "Emily Zhang",
    role: "patient",
    patientId: "P008",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U016",
    email: "daniel.kumar@example.com",
    password: "Password123!",
    name: "Daniel Kumar",
    role: "patient",
    patientId: "P009",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U017",
    email: "hanna.almansoor@example.com",
    password: "Password123!",
    name: "Hanna Al-Mansoor",
    role: "patient",
    patientId: "P010",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-02T00:00:00Z"
  },
  {
    id: "U018",
    email: "nurse.desk@clinic.local",
    password: "Password123!",
    name: "Nurse Jessica Chen",
    role: "staff",
    permissions: ["patient:read", "consultation:read", "notification:dispatch"],
    status: "ACTIVE",
    createdAt: "2026-10-03T00:00:00Z"
  },
  {
    id: "U019",
    email: "billing.officer@clinic.local",
    password: "Password123!",
    name: "Michael Ong (Finance Officer)",
    role: "staff",
    permissions: ["billing:read", "billing:write", "payment:process"],
    status: "ACTIVE",
    createdAt: "2026-10-03T00:00:00Z"
  },
  {
    id: "U020",
    email: "isabella.ho@example.com",
    password: "Password123!",
    name: "Isabella Ho",
    role: "patient",
    patientId: "P020",
    permissions: ["patient:self", "appointment:book", "billing:self", "notification:self"],
    status: "ACTIVE",
    createdAt: "2026-10-03T00:00:00Z"
  }
];

// Active sessions memory store: token -> user profile
let activeSessions = new Map();

// Helper: Generate simulated auth bearer token
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    patientId: user.patientId || null,
    doctorId: user.doctorId || null,
    issuedAt: Date.now()
  };
  const token = `ey-simulated-jwt.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.${crypto.randomBytes(16).toString('hex')}`;
  activeSessions.set(token, user);
  return token;
}

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Missing or malformed Bearer token."
    });
  }

  const token = authHeader.split(' ')[1];
  const user = activeSessions.get(token);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Invalid or expired session token."
    });
  }

  req.user = user;
  next();
}

// Root / Auth base endpoint
app.get(['/', '/auth'], (req, res) => {
  res.json({
    service: "Authentication Service",
    status: "Healthy",
    version: "1.0.0",
    week: "Week 4",
    assigned: "Group 1",
    endpoints: {
      login: "POST /login or POST /auth/login",
      register: "POST /register or POST /auth/register",
      profile: "GET /profile or GET /auth/profile (Bearer Token)",
      getAllUsers: "GET /users or GET /auth/users",
      getUserById: "GET /users/:id or GET /auth/users/:id",
      updateUser: "PUT /users/:id or PUT /auth/users/:id",
      deleteUser: "DELETE /users/:id or DELETE /auth/users/:id",
      healthCheck: "GET /health or GET /auth/health"
    }
  });
});

// Health check endpoint (supports both direct /health and API Gateway /auth/health)
app.get(['/health', '/auth/health'], (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'auth-service',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// POST /register & /auth/register - Register a new account
app.post(['/register', '/auth/register'], (req, res) => {
  const { email, password, name, role, patientId } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'email', 'password', and 'name'."
    });
  }

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `User with email '${email}' already exists.`
    });
  }

  let nextNum = 1;
  users.forEach(u => {
    const match = u.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= nextNum) nextNum = num + 1;
    }
  });
  const newId = `U${String(nextNum).padStart(3, '0')}`;
  const assignedRole = role && ["patient", "doctor", "staff", "admin"].includes(role.toLowerCase())
    ? role.toLowerCase()
    : "patient";

  const newUser = {
    id: newId,
    email: email.toLowerCase(),
    password: password, // Fictional test lab demonstration
    name,
    role: assignedRole,
    patientId: patientId || null,
    permissions: assignedRole === "admin"
      ? ["all:read", "all:write"]
      : ["patient:self", "appointment:book", "billing:self"],
    status: "ACTIVE",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Auto-generate token on registration
  const token = generateToken(newUser);

  const { password: _, ...safeUser } = newUser;
  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    token,
    user: safeUser
  });
});

// POST /login & /auth/login - Authenticate with email and password
app.post(['/login', '/auth/login'], (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both 'email' and 'password'."
    });
  }

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials: Email or password does not match."
    });
  }

  if (user.status !== "ACTIVE") {
    return res.status(403).json({
      success: false,
      message: "Account is inactive or suspended."
    });
  }

  const token = generateToken(user);

  const { password: _, ...safeUser } = user;
  res.status(200).json({
    success: true,
    message: `Authentication successful. Welcome ${user.name} (${user.role}).`,
    token,
    user: safeUser
  });
});

// GET /profile & /auth/profile - Inspect authenticated profile via Bearer token
app.get(['/profile', '/auth/profile'], authenticate, (req, res) => {
  const { password: _, ...safeUser } = req.user;
  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully.",
    user: safeUser
  });
});

// GET /users & /auth/users - List all fictional user accounts (with safe projection)
app.get(['/users', '/auth/users'], (req, res) => {
  const { role } = req.query;
  let result = users;

  if (role) {
    result = result.filter(u => u.role.toLowerCase() === role.toLowerCase());
  }

  const safeUsers = result.map(({ password, ...u }) => u);
  res.status(200).json({
    success: true,
    count: safeUsers.length,
    data: safeUsers
  });
});

// GET /users/:id & /auth/users/:id - Single user by ID
app.get(['/users/:id', '/auth/users/:id'], (req, res) => {
  const user = users.find(u => u.id.toLowerCase() === req.params.id.toLowerCase());
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`
    });
  }

  const { password, ...safeUser } = user;
  res.status(200).json({
    success: true,
    data: safeUser
  });
});

// PUT /users/:id & /auth/users/:id - Update user account details
app.put(['/users/:id', '/auth/users/:id'], (req, res) => {
  const index = users.findIndex(u => u.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`
    });
  }

  const { email, password, name, role, status, patientId, doctorId } = req.body;
  if (!email && !password && !name && !role && !status && patientId === undefined && doctorId === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('email', 'password', 'name', 'role', 'status')."
    });
  }

  users[index] = {
    ...users[index],
    ...(email !== undefined && { email: email.toLowerCase() }),
    ...(password !== undefined && { password }),
    ...(name !== undefined && { name }),
    ...(role !== undefined && { role: role.toLowerCase() }),
    ...(status !== undefined && { status: status.toUpperCase() }),
    ...(patientId !== undefined && { patientId }),
    ...(doctorId !== undefined && { doctorId }),
    updatedAt: new Date().toISOString()
  };

  const { password: _, ...safeUser } = users[index];
  res.status(200).json({
    success: true,
    message: `User ${req.params.id} updated successfully.`,
    data: safeUser
  });
});

// DELETE /users/:id & /auth/users/:id - Remove test user
app.delete(['/users/:id', '/auth/users/:id'], (req, res) => {
  const index = users.findIndex(u => u.id.toLowerCase() === req.params.id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`
    });
  }

  const deleted = users.splice(index, 1)[0];
  const { password, ...safeDeleted } = deleted;
  res.status(200).json({
    success: true,
    message: `User ${req.params.id} deleted successfully.`,
    data: safeDeleted
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Authentication Service is running on http://${HOST}:${PORT}`);
});
