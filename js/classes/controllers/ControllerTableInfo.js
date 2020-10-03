import controller from "../../ControllerGuests.js";

const infoIndexStart = document.querySelector("#indexStart")
const infoIndexEnd = document.querySelector("#indexEnd")
const infoIndexAll = document.querySelector("#indexAll")

export default class ControllerTableInfo{

    update(){
        infoIndexStart.textContent = controller.getIndexStart() + 1
        infoIndexEnd.textContent = controller.getIndexEnd() + 1
        infoIndexAll.textContent = controller.getNumberGuests()
    }

}