FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json first for better caching
COPY package.json ./

# Install dependencies to ensure Vite exists
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the frontend port
EXPOSE 5173

# Ensure vite is globally available (optional)
RUN npm install -g vite

# Use npm run dev with --host to allow external access
CMD ["npm", "run", "dev", "--", "--host"]
