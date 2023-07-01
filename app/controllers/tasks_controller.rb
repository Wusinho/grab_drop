class TasksController < ApplicationController
  before_action :set_task, only: [:show]
  def index
    @tasks = Task.all
  end

  def update_status
    @task = Task.find(params[:id])
    new_status = params[:new_status]
    @task.update_status(new_status)

    render json: { message: 'Task status updated' }
  end

  def show
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end
end
