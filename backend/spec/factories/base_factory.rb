class BaseFactory
  class NotImplementedMethod < StandardError
  end

  def repository
    raise NotImplementedMethod
  end

  def default_values_for_params
    raise NotImplementedMethod
  end

  def create(params)
    repository.new.create(default_values_for_params.merge(params))
  end

  def build(params)
    repository.new.new(default_values_for_params.merge(params))
  end
end
