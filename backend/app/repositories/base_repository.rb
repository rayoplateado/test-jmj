class BaseRepository
  # Repository base for project. This layer will abstract persistence layer from domain layer.
  # In this case, I am going to replicate activeRecord methods for simplicity

  attr_reader :data

  class NotimplementedMethod < StandardError
  end

  class NotFoundRecord < StandardError
  end

  def initialize(data = nil)
    @data = data
  end

  def all
    entity_dataset
  end

  def find(id:)
    entity_dataset.find(id)
  end

  def build(attributes = {})
    entity.new attributes
  end

  delegate :create, :find_or_create_by, :create!, :find_or_initialize_by, :where, :new,
           :find_by, :destroy_all, :all, to: :entity
  delegate :update, :update!, :save, :save!, to: :data

  private

  def entity
    raise NotimplementedMethod
  end

  def entity_dataset
    entity.all
  end
end
