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
    const statusId = event.target.dataset.taskStatusId;
    event.dataTransfer.setData('text/plain', statusId);
    // event.target.classList.add('dragging');
  }

  dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  dragEnter(event) {
    // event.target.classList.add('dragover');
  }

  dragLeave(event) {
    // event.target.classList.remove('dragover');
  }

  drop(event) {
    event.preventDefault();
    const statusId = event.dataTransfer.getData('text/plain');
    const item = this.itemTargets.find((item) => item.dataset.taskStatusId === statusId);
    const container = event.currentTarget;
    if (item && container) {
      const parent = event.target.parentNode
      const targetItem = parent.querySelector('[data-drag-and-drop-target="item"]');

      if (this.itemTargets.includes(targetItem) && targetItem !== item) {
        targetItem.innerHTML = item.innerHTML
        item.innerHTML = ''
        const newStatusId =  targetItem.dataset.taskStatusId
        const taskId = targetItem.dataset.taskId
        this.updateTaskStatus(newStatusId, taskId)
      }
    }
  }

  async updateTaskStatus(status, taskId) {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ status: status }),
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
