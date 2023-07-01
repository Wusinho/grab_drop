// app/javascript/controllers/drag_and_drop_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['item', 'container'];

  connect() {
    this.itemTargets.forEach((item) => {
      item.setAttribute('draggable', 'true');
      item.addEventListener('dragstart', this.dragStart.bind(this));
    });

    this.containerTarget.addEventListener('dragover', this.dragOver.bind(this));
    this.containerTarget.addEventListener('dragenter', this.dragEnter.bind(this));
    this.containerTarget.addEventListener('dragleave', this.dragLeave.bind(this));
    this.containerTarget.addEventListener('drop', this.drop.bind(this));
  }

  dragStart(event) {
    const taskId = event.target.dataset.taskId;
    event.dataTransfer.setData('text/plain', taskId);
    event.target.classList.add('dragging');
  }

  dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  dragEnter(event) {
    event.target.classList.add('dragover');
  }

  dragLeave(event) {
    event.target.classList.remove('dragover');
  }

  drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const newStatus = event.target.dataset.taskStatus;
    const item = document.querySelector(`[data-task-id="${taskId}"]`);
    const container = event.currentTarget;

    if (item && container) {
      const currentItems = this.itemTargets
      const targetItem = event.target.parentNode.querySelector('[data-drag-and-drop-target="item"]');


      if (currentItems.includes(item) && targetItem !== item) {

        targetItem.append(item)
        // const targetIndex = currentItems.indexOf(targetItem);

        // container.insertBefore(item, currentItems[targetIndex + 1]);
        // item.classList.remove('dragover');
        // this.updateTaskStatus(taskId, newStatus);
      }
    }

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
