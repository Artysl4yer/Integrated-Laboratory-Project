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
| **Node.js** | `node -v` | `v24.11.1` | Pass |
| **NPM** | `npm -v` | `11.18.0` | Pass |
| **Docker Engine** | `docker -v` | `Docker version 29.8.0, build 88096ef` | Pass |
| **Docker Desktop** | `docker ps` | Responsive daemon, table returned cleanly | Pass |
| **AWS CLI** | `aws --version` | `aws-cli/2.38.0 Python/3.14.6 Windows/10 exe/AMD64` | Pass |

### Errors & Solutions Encountered
- **Issue:** AWS CLI was initially not found in the environment path (`CommandNotFoundException: The term 'aws' is not recognized`).
- **Resolution:** Successfully installed AWS CLI via `winget install --id Amazon.AWSCLI -e --silent --accept-package-agreements --accept-source-agreements` (`aws-cli/2.38.0`). Verified execution via refreshed PATH.

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

