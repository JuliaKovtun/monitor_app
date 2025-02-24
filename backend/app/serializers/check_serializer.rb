class CheckSerializer < ActiveModel::Serializer
  attributes :id, :status_code, :response_time,
             :checked_at, :success, :url_monitor_id,
             :error_message
end