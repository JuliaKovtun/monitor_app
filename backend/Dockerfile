FROM ruby:3.3.0

# Set environment
ENV RAILS_ENV=development
ENV BUNDLE_JOBS=4
ENV BUNDLE_RETRY=3
ENV BUNDLE_PATH=/usr/local/bundle

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client redis && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Install bundler and gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start server
# CMD ["bin/rails", "server", "-b", "0.0.0.0"]
CMD ["sh", "-c", "rm -rf /app/tmp/pids/server.pid && bin/rails db:create db:migrate && bundle exec rails server -b 0.0.0.0"]

