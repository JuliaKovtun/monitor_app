# Use Ruby base image for Rails
FROM ruby:3.3.0

# Install required dependencies
RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client redis && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Verify Node.js and npm installation
RUN node -v && npm -v

# Set working directory
WORKDIR /app

# Copy entire project first (ensures backend and frontend exist)
COPY . /app

# Verify that the `backend/` and `frontend/` directories exist
RUN ls -l /app

# Set working directory for backend
WORKDIR /app/backend

# Install Rails dependencies
RUN bundle install

# Set working directory for frontend
WORKDIR /app/frontend

# Install React dependencies
RUN npm install

# Reset to main working directory
WORKDIR /app

# Expose necessary ports
EXPOSE 3000 5173

CMD ["sh", "-c", "rm -rf /app/backend/tmp/pids/server.pid && cd /app/backend && rails db:migrate && bundle exec sidekiq -C config/sidekiq.yml & bundle exec rails server -b 0.0.0.0 & cd /app/frontend && npm run dev -- --host"]
