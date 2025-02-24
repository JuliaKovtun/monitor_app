class MonitorCheckJob
  include Sidekiq::Job

  queue_as :default

  # TODO: add here error handling
  def perform(monitor_id)
    monitor = UrlMonitor.find(monitor_id)
    monitor.perform_check
    MonitorCheckJob.perform_in(monitor.check_interval.minutes, monitor_id)
  end
end
