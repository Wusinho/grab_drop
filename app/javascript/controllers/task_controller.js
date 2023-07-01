import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="task"
export default class extends Controller {
  connect() {
    console.log(this.element)
  }
  dragstart(event) {
    event.dataTransfer.setData("application/drag-key", event.target.getAttribute("data-task-id"))
    event.dataTransfer.effectAllowed = "move"
  }

  dragover(event) {
    event.preventDefault()
    return true
  }

  dragenter(event) {
    event.preventDefault();
  }

  dragend(event) {
    event.preventDefault();
    console.log(this.element)
  }

  drop(event) {
    var data = event.dataTransfer.getData("application/drag-key")
    const dropTarget = event.target
    const draggedItem = this.element.querySelector(`[data-task-id='${data}']`);
    const positionComparison = dropTarget.compareDocumentPosition(draggedItem)
    if ( positionComparison & 4) {
      event.target.insertAdjacentElement('beforebegin', draggedItem);
    } else if ( positionComparison & 2) {
      event.target.insertAdjacentElement('afterend', draggedItem);
    }
    event.preventDefault()
  }
}
