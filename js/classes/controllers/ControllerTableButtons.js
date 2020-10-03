import controller from "../../ControllerGuests.js"

const buttons = document.querySelectorAll(".page-button")
buttons[0].addEventListener('click', ()=>actionButton(0))
buttons[1].addEventListener('click', ()=>actionButton(1))
buttons[2].addEventListener('click', ()=> actionButton(2))

const regress = document.querySelector("#regress")
regress.addEventListener('click', ()=>actionText(-1))

const next = document.querySelector("#next")
next.addEventListener('click', ()=>actionText(1))

export default class ControllerTableButtons {

    updateButtons() {
        let page = controller.getPage()
        this.updateButton(0, (page < 2 ) ? 1 : (page === controller.getNumberPages() - 1) ? page - 1 : page)
        this.updateButton(1, (page < 2 ) ? 2 : (page === controller.getNumberPages() - 1) ? page : page + 1)
        this.updateButton(2, (page < 2 ) ? 3 : (page === controller.getNumberPages() - 1) ? page + 1 : page + 2)

        regress.style.color = controller.isFirstPage() ? "#C0C0C0" : "black"
        next.style.color = controller.asNextPage() ? "black" : "#C0C0C0"

    }

    updateButton(index, number) {
        buttons[index].textContent = number
        buttons[index].blur()
        buttons[index].disabled = number > controller.getNumberPages()
        buttons[index].setAttribute('class','page-button' + (number - 1 === controller.getPage() ? ' current-page' : ''))
    }


}

function actionButton(index) {
    controller.setPage(Number(buttons[index].textContent) - 1)
}

function actionText(value){
    controller.setPage(controller.getPage() + value)
}
