class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update]
  def index
    @tasks = Task.all
  end

  def update
    if @task.update(status: params[:status].to_i)
      render json: {
        msg: 'Exito'
      }
    else
      render json: {
        error: @task.message
      }
    end
  end

  def show
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end
end
