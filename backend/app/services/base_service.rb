class BaseService
  include ActiveModel::Validations
  include ActiveModel::Validations::Callbacks

  attr_reader :params

  # Base interface for services. It use pattern command to define an uniq point of access to the
  # functionallity of the service
  class NotImplementedMethodException < StandardError
  end

  def initialize(params)
    @params = params
  end

  # Method to be defined in each service
  def execute
    raise NotImplementedMethodException
  end
end
