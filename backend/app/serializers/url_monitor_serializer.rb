class UrlMonitorSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :status, :last_checked_at

  has_many :checks
end
