<p align="center">
  <img src="https://user-images.githubusercontent.com/65200532/167247511-5b9af914-9c6e-4a3d-8b7e-e0f5c9b4b8e0.svg" width="600" alt="Cloud Coder Logo">
</p>

<h1 align="center">✨ KIIT Labs - Cloud Coder ✨</h1>
<h3 align="center">The Serverless IDE Revolutionizing Coding Education</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.3-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js">
  <img src="https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS Lambda">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Judge0-5C2D91?style=for-the-badge&logo=codeigniter&logoColor=white" alt="Judge0">
</p>

<div align="center">
  <a href="#demo">View Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#team">Team</a>
</div>

---

## 🌟 **Introduction**
**Cloud Coder** is not just another IDE - it's a **serverless, collaborative coding platform** designed for the modern developer. Born at KIIT University, this project solves real problems faced by students and educators:

- 🚫 No more local IDE setup headaches
- 🌍 Accessible from any device with a browser
- 👥 Real-time collaboration like Google Docs for code
- ⚡ Blazing fast execution with serverless architecture

[![Live Demo](https://img.shields.io/badge/🌐-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://www.abhishekbishwas.com.np/)

## 🚀 **Key Features**

<div align="center">
  <img src="https://img.icons8.com/clouds/800/000000/code.png" width="400" alt="Cloud Coder Logo">
  <h3>✨ Cloud-Powered IDE Features ✨</h3>
</div>

| Feature | Description | Tech Used |
|---------|------------|-----------|
| **💻 Multi-Language IDE** | Supports 50+ languages with syntax highlighting | Monaco Editor + Judge0 |
| **👥 Live Collaboration** | Multiple users can edit simultaneously | WebSockets + OT Algorithms |
| **🔐 Secure Authentication** | Google OAuth with role-based access | NextAuth.js |
| **☁️ Serverless Backend** | Auto-scaling execution environment | AWS Lambda |
| **📁 Smart File System** | Save, version, and share projects | MongoDB Atlas |

---

## 🛠️ **Tech Stack Architecture**

```mermaid
graph TD
    A[Frontend] -->|Next.js| B[API Gateway]
    B --> C[AWS Lambda]
    C --> D[Judge0 API]
    C --> E[MongoDB Atlas]
    D --> F[DigitalOcean Droplet]
    A --> G[Google OAuth]