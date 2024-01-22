class CreateMetrics < ActiveRecord::Migration[7.0]
  def change
    create_table :analytics_metrics do |t|
      t.string :name
      t.decimal :value

      t.timestamps
    end
  end
end
