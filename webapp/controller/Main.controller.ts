/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import formatter from "../model/formatter";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Image from "sap/m/Image";
import CSSGrid from "sap/ui/layout/cssgrid/CSSGrid";

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {
	public formatter = formatter;
onInit(): void {
	const oModel= new JSONModel({
		xVisible: true,
		yVisible: true,
		switchXY: false,
		imagePath :"https://picsum.photos/200/300"
	});
	this.getView().setModel(oModel, "viewModel");
}

updateGrid(oEvent) {
	const oModel = this.getView().getModel("viewModel") as JSONModel;
	const bXVisible = oModel.getProperty("/xVisible");
	let bYVisible = oModel.getProperty("/yVisible");
	oModel.setProperty("/yVisible", !bYVisible);
	bYVisible = oModel.getProperty("/yVisible");

	if (!bYVisible) {
		(this.byId("xBox")as SimpleForm).addStyleClass("fullWidth");
	} else {
		(this.byId("xBox")as SimpleForm).removeStyleClass("fullWidth");
	}
}

switchBoxes(): void {
    const oViewModel = this.getView().getModel("viewModel");
    const switchXY = oViewModel.getProperty("/switchXY");
    
    const oXBox = this.byId("xBox") as SimpleForm;
    const oYBox = this.byId("yBox") as Image;
	const cssgrid = this.byId("cssgrid") as CSSGrid
    
    if (switchXY) {
        oXBox.removeStyleClass("order1").addStyleClass("order2");
        oYBox.removeStyleClass("order2").addStyleClass("order1");
		cssgrid.setGridTemplateColumns("1fr 2fr");
    } else {
        oXBox.removeStyleClass("order2").addStyleClass("order1");
        oYBox.removeStyleClass("order1").addStyleClass("order2");
		cssgrid.setGridTemplateColumns("2fr 1fr");
    }
}

onSwitchToggle(): void {
    const oViewModel = this.getView().getModel("viewModel") as JSONModel;
    oViewModel.setProperty("/switchXY", !oViewModel.getProperty("/switchXY"));
    
    this.switchBoxes();
}

}
