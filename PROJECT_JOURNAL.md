# Project Journal — Week 1

**Assigned:** Group 1 — Docker/Image Team  
**AWS Region:** `ap-southeast-1` (Singapore)  
**Microservices Added:**
1. Patient Service (`patient-service` — Port 3001)
2. Doctor Service (`doctor-service` — Port 3002)

---

## Step 1 — Verify the Development Environment

### Command Executions & Version Evidence

| Tool | Verification Command | Version / Output Evidence | Status |
| :--- | :--- | :--- | :--- |
| **Node.js** | `node -v` | `v25.6.1` | Pass |
| **NPM** | `npm -v` | `11.17.0` | Pass |
| **Docker Engine** | `docker -v` | `Docker version 29.8.0, build 88096ef` | Pass |
| **Docker Desktop** | `docker ps` | Responsive daemon, table returned cleanly | Pass |
| **AWS CLI** | `aws --version` | `aws-cli/2.37.8 Python/3.14.6 Windows/11 exe/AMD64` | Pass |

### Errors & Solutions Encountered
- **AWS CLI Verification:** Verified installed AWS CLI (`aws-cli/2.37.8 Python/3.14.6 Windows/11 exe/AMD64`) located in system PATH. Configured target region `ap-southeast-1` (Singapore) as instructed.

---

## Step 2 — Create Patient Service

- **Directory:** `patient-service/`
- **Port:** `3001`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`

### Sample Request: `GET /patients`
```http
GET http://localhost:3001/patients
```

### JSON Response:
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": "P001",
      "name": "Avery Chen",
      "age": 28,
      "contact": {
        "phone": "+65 9123 4567",
        "email": "avery.chen@example.com",
        "address": "123 Orchard Road, #08-01, Singapore 238888"
      }
    },
    {
      "id": "P002",
      "name": "Marcus Tan",
      "age": 42,
      "contact": {
        "phone": "+65 8234 5678",
        "email": "marcus.tan@example.com",
        "address": "45 Tampines Ave 5, #12-14, Singapore 529653"
      }
    },
    {
      "id": "P003",
      "name": "Sofia Rodriguez",
      "age": 35,
      "contact": {
        "phone": "+65 9345 6789",
        "email": "sofia.rodriguez@example.com",
        "address": "88 Jurong West Central, #05-22, Singapore 648351"
      }
    },
    {
      "id": "P004",
      "name": "Liam Patel",
      "age": 50,
      "contact": {
        "phone": "+65 8456 7890",
        "email": "liam.patel@example.com",
        "address": "10 Marina Boulevard, #20-03, Singapore 018983"
      }
    },
    {
      "id": "P005",
      "name": "Klarenz Lark",
      "age": 24,
      "contact": {
        "phone": "+65 9286 8498",
        "email": "klarenz.lark@example.com",
        "address": "15 Bedok North St 1, #09-12, Singapore 469661"
      }
    }
  ]
}
```

---

## Step 3 — Create Doctor Service

- **Directory:** `doctor-service/`
- **Port:** `3002`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`

### Sample Request: `GET /doctors`
```http
GET http://localhost:3002/doctors
```

### JSON Response:
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": "D001",
      "name": "Dr. Sarah Tan",
      "specialization": "Cardiology",
      "availability": "Monday - Wednesday, 09:00 - 16:00"
    },
    {
      "id": "D002",
      "name": "Dr. David Lee",
      "specialization": "Pediatrics",
      "availability": "Tuesday - Friday, 10:00 - 18:00"
    },
    {
      "id": "D003",
      "name": "Dr. Emily Wong",
      "specialization": "Neurology",
      "availability": "Thursday - Saturday, 08:30 - 15:30"
    },
    {
      "id": "D004",
      "name": "Dr. Rajesh Sharma",
      "specialization": "Orthopedics",
      "availability": "Monday - Thursday, 09:00 - 17:00"
    },
    {
      "id": "D005",
      "name": "Dr. Benjamin Koh",
      "specialization": "Dermatology",
      "availability": "Wednesday - Friday, 10:00 - 17:00"
    }
  ]
}
```

---

## Step 4 — Create Dockerfiles

Both services use the lightweight **Node.js 20** (`node:20-alpine`) base image, bind to `0.0.0.0`, install production dependencies, and execute `CMD ["node", "server.js"]`.

### `patient-service/Dockerfile`
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

### `doctor-service/Dockerfile`
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "server.js"]
```

---

## Step 5 — Build Docker Images

### Commands Executed:
```bash
# Patient Service
cd patient-service
docker build -t patient-service .

# Doctor Service
cd doctor-service
docker build -t doctor-service .
```

### Verification Output (`docker images`):
```text
IMAGE                      ID             DISK USAGE   CONTENT SIZE
doctor-service:latest      0909b2be770b        202MB         49.9MB
patient-service:latest     cafed8e2790f        202MB         49.9MB
```

### Container Runtime Verification
Both containers were initiated in detached mode:
- `patient-service` mapped on host port `3001`
- `doctor-service` mapped on host port `3002`

Both endpoints successfully responded with HTTP 200 and expected payload data.

---

## Step 6 — Full CRUD Implementation (POST, PUT, DELETE)

Expanded both microservices to support full CRUD operations alongside input validation, conflict detection, and automated sequential ID assignment:

### Endpoint Matrix

| Microservice | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Patient Service** | `GET` | `/patients` | Retrieve all patient records |
| | `GET` | `/patients/:id` | Retrieve single patient by ID |
| | `POST` | `/patients` | Create a new patient record (auto or custom ID, duplicate check) |
| | `PUT` | `/patients/:id` | Update patient details (`name`, `age`, `contact`) |
| | `DELETE` | `/patients/:id` | Delete patient by ID |
| | `GET` | `/health` | Health check probe |
| **Doctor Service** | `GET` | `/doctors` | Retrieve all doctor records |
| | `GET` | `/doctors/:id` | Retrieve single doctor by ID |
| | `POST` | `/doctors` | Create a new doctor record (auto or custom ID, duplicate check) |
| | `PUT` | `/doctors/:id` | Update doctor details (`name`, `specialization`, `availability`) |
| | `DELETE` | `/doctors/:id` | Delete doctor by ID |
| | `GET` | `/health` | Health check probe |

### Verification
All endpoints (happy path, validation failures, 404 not found, 409 conflict) tested and verified against both services and synchronized with `postman_collection.json`.

---

# Project Journal — Week 2

**Assigned:** Group 1 & 9 (Microservices), Group 1 (Docker/Image Team)  
**AWS Region:** `ap-southeast-1` (Singapore)  
**Microservices Added:**
1. Appointment Service (`appointment-service` — Port 3003)
2. Schedule Service (`schedule-service` — Port 3004)

---

## Step 21 — Create Appointment Service

- **Directory:** `appointment-service/`
- **Port:** `3003`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 records (`A001` - `A020`) referencing patients (`P001` - `P020`) and doctors (`D001` - `D020`)

### Sample Request: `GET /appointments`
```http
GET http://localhost:3003/appointments
```

### JSON Response:
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": "A001",
      "patientId": "P001",
      "doctorId": "D001",
      "date": "2026-11-02",
      "time": "09:30",
      "status": "CONFIRMED",
      "reason": "Cardiology Follow-up",
      "createdAt": "2026-10-20T08:00:00Z"
    },
    {
      "id": "A002",
      "patientId": "P002",
      "doctorId": "D002",
      "date": "2026-11-02",
      "time": "10:30",
      "status": "SCHEDULED",
      "reason": "Pediatric Wellness Exam",
      "createdAt": "2026-10-20T08:30:00Z"
    }
  ]
}
```

### Integration & Duplicate Booking Prevention (Steps 29 & 30)
- **Step 29 Integration:** Queries Patient Service (`/patients/:id`) and Doctor Service (`/doctors/:id`). Rejects booking with HTTP 404 if patient or doctor does not exist.
- **Step 30 Conflict Prevention:** Validates doctor schedule conflicts. Rejects simultaneous bookings for the same doctor at the same date and time with HTTP 409 Conflict.

---

## Step 22 — Create Schedule Service

- **Directory:** `schedule-service/`
- **Port:** `3004`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 doctor schedule slots (`S001` - `S020`)

### Sample Request: `GET /schedules?available=true`
```http
GET http://localhost:3004/schedules?available=true
```

### JSON Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "S002",
      "doctorId": "D001",
      "doctorName": "Dr. Sarah Tan",
      "specialization": "Cardiology",
      "dayOfWeek": "Monday",
      "date": "2026-11-02",
      "timeSlot": "10:00 - 11:00",
      "isAvailable": true,
      "bookedAppointmentId": null
    }
  ]
}
```

### Slot Booking and Release Endpoints
- `PUT /schedules/:id/book` — Marks slot unavailable and tags active appointment ID.
- `PUT /schedules/:id/release` — Restores slot availability upon appointment cancellation.

---

## Step 23 — Create Dockerfiles for Week 2 Services

Both services utilize the lightweight **Node.js 20** (`node:20-alpine`) base image, bind to `0.0.0.0`, install production dependencies, and execute `CMD ["node", "server.js"]`.

### `appointment-service/Dockerfile`
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["node", "server.js"]
```

### `schedule-service/Dockerfile`
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["node", "server.js"]
```

---

## Week 2 Endpoint Matrix

| Microservice | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Appointment Service** | `GET` | `/appointments` | Retrieve all appointments (supports filtering) |
| | `GET` | `/appointments/:id` | Retrieve single appointment by ID |
| | `GET` | `/appointments/patient/:patientId` | Filter appointments by patient |
| | `GET` | `/appointments/doctor/:doctorId` | Filter appointments by doctor |
| | `POST` | `/appointments` | Create appointment (validates doctor/patient & checks conflicts) |
| | `PUT` | `/appointments/:id` | Update appointment details |
| | `DELETE` | `/appointments/:id` | Cancel/delete appointment |
| | `GET` | `/health` | Health check probe |
| **Schedule Service** | `GET` | `/schedules` | Retrieve doctor schedules (`?available=true`, etc.) |
| | `GET` | `/schedules/:id` | Retrieve single schedule slot |
| | `GET` | `/schedules/doctor/:doctorId` | Retrieve schedule for specific doctor |
| | `POST` | `/schedules` | Create new schedule slot |
| | `PUT` | `/schedules/:id` | Update schedule slot |
| | `PUT` | `/schedules/:id/book` | Book slot for an appointment |
| | `PUT` | `/schedules/:id/release` | Release slot back to available |
| | `DELETE` | `/schedules/:id` | Delete schedule slot |
| | `GET` | `/health` | Health check probe |

### Verification Evidence
All endpoints tested locally via automated test suites. HTTP 200, 201, 400, 404, and 409 conflict checks verified. Integrated with `postman_collection.json`.

---

# Project Journal — Week 3

**Assigned:** Group 1 (Microservice Creation & Docker/Image Team)  
**AWS Region:** `ap-southeast-1` (Singapore)  
**Microservices Added:**
1. Consultation Service (`consultation-service` — Port 3005)
2. Billing Service (`billing-service` — Port 3006)

---

## Step 31 — Create Consultation Service

- **Directory:** `consultation-service/`
- **Port:** `3005`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 clinical consultation records (`C001` - `C020`) referencing appointments (`A001` - `A020`), patients (`P001` - `P020`), and doctors (`D001` - `D020`).

### Sample Request: `GET /consultations/appointment/A001`
```http
GET http://localhost:3005/consultations/appointment/A001
```

### JSON Response:
```json
{
  "success": true,
  "data": {
    "id": "C001",
    "appointmentId": "A001",
    "patientId": "P001",
    "doctorId": "D001",
    "doctorName": "Dr. Sarah Tan",
    "date": "2026-11-02",
    "diagnosis": "Stage 1 Essential Hypertension",
    "prescription": "Amlodipine 5mg once daily, low sodium diet",
    "consultationNotes": "Patient reports intermittent morning headaches. Resting BP measured at 142/90 mmHg. Heart sounds normal.",
    "followUpDate": "2026-12-02",
    "status": "COMPLETED"
  }
}
```

---

## Step 32 — Create Billing Service

- **Directory:** `billing-service/`
- **Port:** `3006`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 billing records (`B001` - `B020`) with simulated statuses `PAID`, `UNPAID`, and `PENDING`.

### Sample Request: `GET /billing/appointment/A001`
```http
GET http://localhost:3006/billing/appointment/A001
```

### JSON Response:
```json
{
  "success": true,
  "data": {
    "id": "B001",
    "appointmentId": "A001",
    "patientId": "P001",
    "patientName": "Avery Chen",
    "amount": 145.00,
    "currency": "SGD",
    "paymentStatus": "PAID",
    "paymentMethod": "Credit Card",
    "invoiceDate": "2026-11-02",
    "paidAt": "2026-11-02T10:15:00Z",
    "items": [
      { "description": "Specialist Consultation (Cardiology)", "amount": 110.00 },
      { "description": "Prescription Medication (Amlodipine 5mg)", "amount": 35.00 }
    ]
  }
}
```

---

## Step 33 — Dockerize Week 3 Services

Both services use `node:20-alpine`, bind to `0.0.0.0`, and execute `CMD ["node", "server.js"]`.

### `consultation-service/Dockerfile`
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
CMD ["node", "server.js"]
```

### `billing-service/Dockerfile`
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3006
CMD ["node", "server.js"]
```

---

## Week 3 Endpoint Matrix

| Microservice | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Consultation Service** | `GET` | `/consultations` | Retrieve all consultations (supports query filters) |
| | `GET` | `/consultations/:id` | Retrieve consultation by ID |
| | `GET` | `/consultations/appointment/:appointmentId` | Retrieve clinical notes by appointment |
| | `GET` | `/consultations/patient/:patientId` | Filter consultation history by patient |
| | `POST` | `/consultations` | Record new clinical consultation |
| | `PUT` | `/consultations/:id` | Update consultation diagnosis, notes, prescription |
| | `DELETE` | `/consultations/:id` | Delete consultation record |
| | `GET` | `/health` | Health check probe |
| **Billing Service** | `GET` | `/billing` | Retrieve all invoices (supports `?paymentStatus=`) |
| | `GET` | `/billing/:id` | Retrieve invoice by ID |
| | `GET` | `/billing/appointment/:appointmentId` | Retrieve invoice by appointment |
| | `GET` | `/billing/patient/:patientId` | Retrieve invoices by patient |
| | `POST` | `/billing` | Generate invoice for appointment |
| | `PUT` | `/billing/:id` | Update billing status / amount |
| | `PUT` | `/billing/:id/pay` | Process simulated payment (PayNow, Credit Card, etc.) |
| | `DELETE` | `/billing/:id` | Cancel/delete invoice |
| | `GET` | `/health` | Health check probe |

---

# Project Journal — Week 4

**Assigned:** Group 1 (Microservice Creation & Docker/Image Team)  
**AWS Region:** `ap-southeast-1` (Singapore)  
**Microservices Added:**
1. Notification Service (`notification-service` — Port 3007)
2. Authentication Service (`auth-service` — Port 3008)

---

## Step 41 — Create Notification Service

- **Directory:** `notification-service/`
- **Port:** `3007`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 notification records (`N001` - `N020`) covering `SMS`, `EMAIL`, and `PUSH_NOTIFICATION`.
- **Confirmation Mechanism:** Returns structured confirmation object (`deliveryId`, `status: CONFIRMED`, `timestamp`) upon recording.

### Sample Request: `POST /notifications`
```http
POST http://localhost:3007/notifications
Content-Type: application/json

{
  "patientId": "P001",
  "appointmentId": "A001",
  "notificationType": "SMS",
  "message": "Clinic Reminder: Your appointment with Dr. Sarah Tan is confirmed for 2026-11-02 at 09:30 AM."
}
```

### JSON Response:
```json
{
  "success": true,
  "message": "Notification successfully dispatched and recorded.",
  "confirmation": {
    "deliveryId": "DEL-1793066405530",
    "status": "CONFIRMED",
    "timestamp": "2026-10-27T02:00:05.530Z"
  },
  "data": {
    "id": "N021",
    "patientId": "P001",
    "appointmentId": "A001",
    "recipient": "+65 9123 4567",
    "notificationType": "SMS",
    "message": "Clinic Reminder: Your appointment with Dr. Sarah Tan is confirmed for 2026-11-02 at 09:30 AM.",
    "status": "DELIVERED"
  }
}
```

---

## Step 42 — Create Authentication Service

- **Directory:** `auth-service/`
- **Port:** `3008`
- **Host Binding:** `0.0.0.0`
- **Dependencies:** `express@^4.21.2`
- **Fictional Data:** 20 user accounts across 4 distinct roles: `patient`, `doctor`, `staff`, and `admin`.
- **Role Demonstration:** Implements role-based claims in simulated JWT bearer tokens and profile access inspection (`GET /profile`).

### Sample Request: `POST /login`
```http
POST http://localhost:3008/login
Content-Type: application/json

{
  "email": "avery.chen@example.com",
  "password": "Password123!"
}
```

### JSON Response:
```json
{
  "success": true,
  "message": "Authentication successful. Welcome Avery Chen (patient).",
  "token": "ey-simulated-jwt.eyJ1c2VySWQiOiJVMDA4IiwiZW1haWwiOiJhdmVyeS5jaGVuQGV4YW1wbGUuY29tIiwicm9sZSI6InBhdGllbnQiLCJwYXRpZW50SWQiOiJQMDAxIn0...",
  "user": {
    "id": "U008",
    "email": "avery.chen@example.com",
    "name": "Avery Chen",
    "role": "patient",
    "patientId": "P001",
    "permissions": ["patient:self", "appointment:book", "billing:self", "notification:self"],
    "status": "ACTIVE"
  }
}
```

---

## Step 43 — Dockerize Week 4 Services

Both services use `node:20-alpine`, bind to `0.0.0.0`, and execute `CMD ["node", "server.js"]`.

### `notification-service/Dockerfile`
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3007
CMD ["node", "server.js"]
```

### `auth-service/Dockerfile`
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3008
CMD ["node", "server.js"]
```

---

## Week 4 Endpoint Matrix

| Microservice | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Notification Service** | `GET` | `/notifications` | Retrieve all notifications |
| | `GET` | `/notifications/:id` | Retrieve single notification by ID |
| | `GET` | `/notifications/patient/:patientId` | Filter notifications for specific patient |
| | `POST` | `/notifications` | Record simulated notification and issue delivery confirmation |
| | `PUT` | `/notifications/:id` | Update notification status |
| | `DELETE` | `/notifications/:id` | Remove notification record |
| | `GET` | `/health` | Health check probe |
| **Authentication Service** | `POST` | `/login` | Authenticate fictional account, verify password, return Bearer token |
| | `POST` | `/register` | Register new fictional patient or staff account |
| | `GET` | `/profile` | Protected route: verify Bearer token and return role profile |
| | `GET` | `/users` | List fictional accounts (with safe field projection) |
| | `GET` | `/users/:id` | Single user account lookup |
| | `DELETE` | `/users/:id` | Remove test user account |
| | `GET` | `/health` | Health check probe |

### End-to-End Workflow Demonstration Status (Weeks 1 - 4)
All 8 microservices created and containerized by Group 1 are tested and locally verified. Complete simulated appointment workflow (Patient $\rightarrow$ Doctor $\rightarrow$ Schedule $\rightarrow$ Appointment $\rightarrow$ Consultation $\rightarrow$ Billing $\rightarrow$ Notification $\rightarrow$ Authentication) is fully operational.



