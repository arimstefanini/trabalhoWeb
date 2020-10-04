import {updatePage} from "../../ControllerGuests.js";

export default class ControllerTableHead {

    observer;
    lassOrder;

    constructor(observer) {
        this.observer = observer
        let ups = document.querySelectorAll('.up')
        let downs = document.querySelectorAll('.down')
        const order = ['id', 'phone', 'firstName', 'lastName', 'email']
        for (let i = 0; i < ups.length; i++) {
            ups[i].addEventListener('click', () => this.update(order[i], 1, ups[i]))
        }
        for (let i = 0; i < downs.length; i++) {
            downs[i].addEventListener('click', () => this.update(order[i], -1, downs[i]))
        }
        this.lassOrder = ups[0]
    }

    update(field, order, button) {
        this.observer.orderBy(field, order)
        this.updateColor(this.lassOrder, "#C0C0C0")
        this.lassOrder = button
        this.updateColor(button, "#2880FB")
        updatePage(1)
    }

    reorder = () => { this.lassOrder.dispatchEvent(new Event('click')) };

    updateColor = (button, color) => (button.getAttribute('class').includes('up')) ? button.style.borderBottomColor = color : button.style.borderTopColor = color

}
