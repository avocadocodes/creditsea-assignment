## **📖 Overview**
This is a **MERN (MongoDB, Express, React, Node.js) stack application** that processes **soft credit pull data from Experian (XML files)**.  
The application allows users to **upload XML files**, **extract relevant credit data**, **store it in MongoDB**, and **display a structured report on the frontend**.

---

## **🛠️ Features**
### **1️⃣ Backend API (Node.js, Express)**
- **XML File Upload**: Users can upload XML files via a RESTful API.
- **Data Extraction & Storage**: Parses XML and stores extracted data in MongoDB.
- **Data Retrieval API**: Fetches stored reports for the frontend.
- **Error Handling**: Handles invalid files, incorrect formats, and server errors.

### **2️⃣ Frontend (React)**
- **User-friendly UI**: Allows users to upload files and view reports.
- **Report Sections**:
  - **Basic Details** (Name, Mobile, PAN, Credit Score)
  - **Report Summary** (Total Accounts, Active Accounts, Current Balance)
  - **Credit Accounts** (Banks, Credit Cards, Amount Overdue)
- **Responsive Design**: Works on desktop and mobile screens.

### **3️⃣ Database (MongoDB)**
- Stores extracted credit data in a structured schema.
- Uses **Mongoose** for efficient data management.

---

## **🛠️ Tech Stack**
| Component  | Technology |
|------------|------------|
| **Frontend** | React, Material UI, Axios |
| **Backend** | Node.js, Express |
| **Database** | MongoDB, Mongoose |
| **File Handling** | Multer, xml2js |
| **Styling** | Custom CSS |

---

## **📦 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/creditsea-app.git
cd creditsea-app
```
### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```
#### Create a .env file inside backend/ and add:
```sh
MONGO_URI=mongodb://localhost:27017/creditseaDB
PORT=5000
```
#### Start the backend server:
```sh
node server.js
```
### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
npm start
```
## 🚀 API Endpoints

| Method | Endpoint       | Description                |
|--------|--------------|---------------------------|
| `POST` | `/api/upload`  | Upload an XML file       |
| `GET`  | `/api/reports` | Fetch stored reports     |

