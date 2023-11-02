/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import formatter from "../model/formatter";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import HBox from "sap/m/HBox";

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {
	public formatter = formatter;
onInit(): void {
	const oModel= new JSONModel({
		formVisible: true,
		imageVisible: true,
		switchXY: false,
		imagePath :"https://picsum.photos/200/300"
	});
	this.getView().setModel(oModel, "viewModel");
}

updateGrid() {
	const oModel = this.getView().getModel("viewModel") as JSONModel;
	// const bformVisible = oModel.getProperty("/formVisible");
	let bimageVisible = oModel.getProperty("/imageVisible");
	oModel.setProperty("/imageVisible", !bimageVisible);
	bimageVisible = oModel.getProperty("/imageVisible");
}

switchBoxes(): void {
    const oViewModel = this.getView().getModel("viewModel");
    const switchXY = oViewModel.getProperty("/switchXY");
    
    const oHBox = this.byId("cBoxHBox") as HBox;
    
    if (switchXY) {
        oHBox.setDirection("Row");
    } else {
        oHBox.setDirection("RowReverse");
    }
}

onSwitchToggle(): void {
    const oViewModel = this.getView().getModel("viewModel") as JSONModel;
    oViewModel.setProperty("/switchXY", !oViewModel.getProperty("/switchXY"));
    
    this.switchBoxes();
}

}
