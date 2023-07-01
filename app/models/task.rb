class Task < ApplicationRecord
  enum status: [:start, :progress, :done]
end
