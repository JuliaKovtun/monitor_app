Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redis_cache:6379/0' }
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://redis_cache:6379/0' }
end