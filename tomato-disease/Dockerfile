# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only requirements first to cache dependencies
COPY api/requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy rest of the app
COPY api/ ./api
COPY models/ ./models

# Set working dir inside api folder
WORKDIR /app/api

# Expose port FastAPI runs on
EXPOSE 8000

# Start FastAPI app using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
