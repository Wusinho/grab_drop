class Task < ApplicationRecord
  enum status: [:start, :progress, :done]
  def update_status(new_status)
    self.status = new_status.to_sym
    save
  end
end
