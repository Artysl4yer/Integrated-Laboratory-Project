# Integrated Laboratory Project
**Section Code:** BSIT 4C | **Course:** IT 204 – System Integration and Architecture 2  
**Platform:** Clinic Appointment and Patient Services Platform  
**Deployment Target:** Docker + Amazon ECR + Amazon ECS/Fargate  
**Assigned Role (Group 1):** Microservice Development & Docker Containerization

---

## Laboratory Rules
- Each group develops one continuous project for four weeks.
- Add two microservices per week, reaching eight services by Week 4.
- Use Node.js, Express, Docker, Amazon ECR, Amazon ECS/Fargate, and Postman.
- Retain all previous services when adding new ones.
- Use fictional test data only.
- Test locally before deploying to AWS.
- Record API results, deployment evidence, errors, and solutions in a project journal (`PROJECT_JOURNAL.md`).
- Use the AWS Region `ap-southeast-1` (Singapore) consistently.

---

## Complete Microservices Roadmap (All 8 Services Completed)

| Week | Service | Port | Directory | Main Endpoints | Status |
| :---: | :--- | :---: | :--- | :--- | :---: |
| **Week 1** | Patient Service | `3001` | `patient-service/` | `/patients`, `/patients/:id` | **Completed & Verified** |
| **Week 1** | Doctor Service | `3002` | `doctor-service/` | `/doctors`, `/doctors/:id` | **Completed & Verified** |
| **Week 2** | Appointment Service | `3003` | `appointment-service/` | `/appointments`, `/appointments/:id` | **Completed & Verified** |
| **Week 2** | Schedule Service | `3004` | `schedule-service/` | `/schedules`, `/schedules/:id` | **Completed & Verified** |
| **Week 3** | Consultation Service | `3005` | `consultation-service/` | `/consultations`, `/consultations/:id` | **Completed & Verified** |
| **Week 3** | Billing Service | `3006` | `billing-service/` | `/billing`, `/billing/:id`, `/billing/:id/pay` | **Completed & Verified** |
| **Week 4** | Notification Service | `3007` | `notification-service/` | `/notifications`, `/notifications/:id` | **Completed & Verified** |
| **Week 4** | Authentication Service | `3008` | `auth-service/` | `/login` (`/auth/login`), `/register` (`/auth/register`), `/profile` (`/auth/profile`), `/health` (`/auth/health`) | **Completed & Verified** |

---

## Local Development & Testing

### Running Services Locally:
```bash
# Week 1
cd patient-service && node server.js
cd doctor-service && node server.js

# Week 2
cd appointment-service && node server.js
cd schedule-service && node server.js

# Week 3
cd consultation-service && node server.js
cd billing-service && node server.js

# Week 4
cd notification-service && node server.js
cd auth-service && node server.js
```

### Docker Builds:
```bash
# Build all 8 Docker images (Node.js 20 Alpine)
docker build -t patient-service ./patient-service
docker build -t doctor-service ./doctor-service
docker build -t appointment-service ./appointment-service
docker build -t schedule-service ./schedule-service
docker build -t consultation-service ./consultation-service
docker build -t billing-service ./billing-service
docker build -t notification-service ./notification-service
docker build -t auth-service ./auth-service
```

### Testing with Postman
Import [postman_collection.json](./postman_collection.json) into Postman to run automated request suites across all 8 microservices.
