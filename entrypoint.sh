#!/bin/sh

# Remove existing server PID file to prevent Rails from crashing on restart
rm -f /app/backend/tmp/pids/server.pid

# Run database migrations
cd /app/backend && rails db:migrate

# Start the Rails server and Sidekiq
bundle exec rails server -b 0.0.0.0 & bundle exec sidekiq

cd /app/frontend
npm run dev -- --host
