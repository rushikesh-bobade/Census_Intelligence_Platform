# Census Intelligence Platform

A comprehensive full-stack application for census data analysis and income prediction using machine learning. This platform provides real-time data quality assessment, predictive analytics, and interactive dashboards.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Census Intelligence Platform is a data-driven solution that combines:

- **Machine Learning**: Income prediction models using Logistic Regression
- **Data Quality Assessment**: Real-time validation and quality metrics for census datasets
- **Interactive Dashboard**: Visual analytics and insights from census data
- **RESTful API**: Comprehensive backend services for predictions and analytics

### Key Features

- 📊 Interactive data visualization dashboard
- 🤖 ML-powered income prediction
- ✅ Data quality scoring and validation
- 📈 Historical analytics and trends
- 🔄 Real-time data processing
- 🎨 Responsive UI with modern design

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Dotenv** - Environment configuration
- **Cors** - Cross-origin resource sharing
- **Axios** - HTTP client for ML service

### Machine Learning

- **Python 3.8+** - Programming language
- **Pandas** - Data manipulation
- **Scikit-learn** - Machine learning
- **Joblib** - Model serialization

## 📁 Project Structure

```
Census_Intelligence_Platform/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js/Express server
│   ├── controllers/         # Request handlers
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── config/              # Configuration
│   ├── server.js            # Entry point
│   └── package.json
│
├── ml-service/              # Python ML service
│   ├── app.py               # Flask/API server
│   ├── train_model.py       # Model training script
│   ├── data/                # Datasets
│   │   └── cleaned_census.csv
│   └── model/               # Trained models
│       ├── income_model.pkl
│       ├── encoders.pkl
│       └── target_encoder.pkl
│
├── dataset/                 # Raw census data
│   └── census_data.csv
│
├── .gitignore
└── README.md
```

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org))
- **Python** 3.8 or higher ([Download](https://www.python.org))
- **Git** for version control
- **npm** or **yarn** for Node package management
- **pip** for Python package management

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version

# Check pip version
pip --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rushikesh-bobade/Census_Intelligence_Platform.git
cd Census_Intelligence_Platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # If exists, otherwise create manually
```

**Backend .env configuration:**

```env
PORT=5000
NODE_ENV=development
ML_SERVICE_URL=http://localhost:8000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # If exists, otherwise create manually
```

**Frontend .env configuration:**

```env
VITE_API_URL=http://localhost:5000
```

### 4. ML Service Setup

```bash
cd ../ml-service

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install pandas scikit-learn joblib flask flask-cors

# Train the model (optional, if model files don't exist)
python train_model.py
```

## ⚙️ Configuration

### Backend Configuration

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
ML_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### ML Service Configuration

The ML service runs on port 8000 by default. Modify in `ml-service/app.py` if needed.

## 📱 Running the Application

### Start All Services

Open three terminal windows and run each service:

#### Terminal 1: Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend runs on: `http://localhost:5000`

#### Terminal 2: Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### Terminal 3: ML Service

```bash
cd ml-service

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run the service
python app.py
```

ML Service runs on: `http://localhost:8000`

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

## 📚 API Documentation

### Backend API Endpoints

#### Prediction Routes (`/api/predict`)

**POST** `/api/predict/income`

- Predict income based on user features
- Request body:
  ```json
  {
    "age": 35,
    "education_level": "Bachelors",
    "occupation": "Tech-support",
    "hours_per_week": 40
  }
  ```
- Response:
  ```json
  {
    "prediction": ">50K",
    "confidence": 0.85
  }
  ```

#### Analytics Routes (`/api/analytics`)

**GET** `/api/analytics/dashboard`

- Get dashboard statistics and metrics
- Response:
  ```json
  {
    "total_records": 30162,
    "quality_score": 0.92,
    "avg_age": 38.5,
    "avg_hours": 40.2
  }
  ```

**GET** `/api/analytics/quality`

- Get data quality report
- Response:
  ```json
  {
    "completeness": 0.98,
    "uniqueness": 0.95,
    "validity": 0.9
  }
  ```

### ML Service API

**POST** `/predict`

- ML model prediction endpoint
- Requires preprocessed input data

## 🔧 Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test
```

### Code Quality

```bash
# Lint JavaScript
npm run lint

# Format code
npm run format
```

### Build for Production

#### Frontend Build

```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

#### Backend Production Setup

```bash
cd backend
NODE_ENV=production npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Branch Naming**: Use descriptive names
   - `feature/feature-name` for new features
   - `bugfix/bug-name` for bug fixes
   - `chore/task-name` for maintenance tasks

2. **Commit Messages**: Follow conventional commits

   ```
   feat: add income prediction feature
   fix: resolve data validation issue
   chore: update dependencies
   docs: update README
   ```

3. **Pull Request Process**:
   - Create a feature branch
   - Make your changes
   - Write/update tests
   - Ensure all tests pass
   - Submit a pull request with description

4. **Code Standards**:
   - Follow ESLint rules for JavaScript
   - Use PEP 8 for Python
   - Keep functions small and focused
   - Add meaningful comments

## 🐛 Troubleshooting

### Port Already in Use

If ports 5000, 5173, or 8000 are already in use:

```bash
# Find process using the port (macOS/Linux)
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env files
```

### Module Not Found Errors

```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd ../frontend
rm -rf node_modules
npm install

# ML Service
cd ../ml-service
pip install --upgrade pip
pip install -r requirements.txt
```

### Python Virtual Environment Issues

```bash
# Deactivate and recreate
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
```

## 📋 Environment Checklist

- [ ] Node.js and npm installed
- [ ] Python 3.8+ installed
- [ ] Git repository cloned
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] ML service virtual environment created
- [ ] Python dependencies installed (`pip install ...`)
- [ ] .env files configured
- [ ] All three services running

## 📈 Performance Tips

- Use production builds for deployment
- Enable CORS only for trusted origins
- Implement request rate limiting
- Cache frequently accessed data
- Monitor model accuracy over time
- Use environment-specific configurations

## 🔐 Security Considerations

- Never commit `.env` files with sensitive data
- Validate all user inputs
- Use HTTPS in production
- Implement authentication for sensitive endpoints
- Regularly update dependencies
- Use environment variables for secrets

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Rushikesh Bobade** - Initial work

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on [GitHub Issues](https://github.com/rushikesh-bobade/Census_Intelligence_Platform/issues)
- Contact the development team

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Scikit-learn Guide](https://scikit-learn.org)
- [Vite Guide](https://vitejs.dev)
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html)

---

**Last Updated**: May 2026
**Repository**: [Census_Intelligence_Platform](https://github.com/rushikesh-bobade/Census_Intelligence_Platform)
