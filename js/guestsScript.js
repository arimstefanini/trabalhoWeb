import LocalDatabase from "./classes/LocalDatabase.js";
import ControllerGuests from "./classes/guests/ControllerGuests.js"

const localData = new LocalDatabase();
localData.init()

const controller = new ControllerGuests(localData);
controller.update()
