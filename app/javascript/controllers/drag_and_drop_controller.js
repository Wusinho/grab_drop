import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="drag-and-drop"
export default class extends Controller {
  static targets = ['item'];
  connect() {
    this.itemTargets.forEach((item) => {
      item.setAttribute('draggable', 'true');
      item.addEventListener('dragstart', this.dragStart.bind(this));
      item.addEventListener('dragover', this.dragOver.bind(this));
      item.addEventListener('drop', this.drop.bind(this));
      item.addEventListener('dragend', this.dragEnd.bind(this));
    });
  }

  dragStart(event) {
    const taskId = event.target.dataset.taskId;
    event.dataTransfer.setData('text/plain', taskId);
    console.log('start')
  }

  dragOver(event) {
    event.preventDefault();
    event.target.classList.add('dragover');
    console.log('dragover')
  }

  drop(event) {
    console.log('drop')
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const newStatus = event.target.dataset.taskStatus;
    const item = document.querySelector(`[data-task-id="${taskId}"]`);
    console.log(item)

    if (item) {
      item.parentNode.insertBefore(item, event.target.nextSibling);
      item.classList.remove('dragover');
      this.updateTaskStatus(taskId, newStatus);
    }
  }

  dragEnd(event) {
    event.target.classList.remove('dragover');
  }


  async updateTaskStatus(taskId, newStatus) {
    try {
      const response = await fetch(`/tasks/${taskId}/update_status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ new_status: newStatus }),
      });

      if (response.ok) {
        // Task status updated successfully
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error(error);
    }
  }

}
