# **URL Health Monitor**

This repository contains a [**frontend** (React)](https://github.com/JuliaKovtun/url_monitor_react_app) and a [**backend** (Ruby on Rails)](https://github.com/JuliaKovtun/url_health_monitor) application, both connected via **Docker**. 

## **🛠 Tech Stack**
- **Frontend:** React (Vite)
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL
- **Background Jobs:** Sidekiq (Redis)
- **Containerization:** Docker + Docker Compose

---

## **🚀 Getting Started**

### **🔹 Step 1: Clone the Repository**
```sh
git clone https://github.com/JuliaKovtun/monitor_app.git
cd monitor_app
```

### **🔹 Step 2: Build the Docker Containers**
Run the following command to build the services:
```sh
docker-compose build
```

### **🔹 Step 3: Start the Application**
```sh
docker-compose up
```
This will:
- Start the **Rails API** on port `3000`
- Start the **React (Vite) frontend** on port `5173`
- Start **PostgreSQL & Redis** in the background
- Start **Sidekiq** for background jobs

---

## **🔗 Access the Application**
- **Frontend (React):** [http://localhost:5173](http://localhost:5173)
- **Backend (Rails API):** [http://localhost:3000](http://localhost:3000)
- **Sidekiq Dashboard:** [http://localhost:3000/sidekiq](http://localhost:3000/sidekiq)

