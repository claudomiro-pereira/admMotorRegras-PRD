sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(ManagedObject, MessageBox, Utilities, History) {

	return ManagedObject.extend("com.sap.build.standard.adminEngine.controller.Dialog9", {
		constructor: function(oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.standard.adminEngine.view.Dialog9", this);
			this._bInit = false;
		},

		exit: function() {
			delete this._oView;
		},

		getView: function() {
			return this._oView;
		},

		getControl: function() {
			return this._oControl;
		},

		getOwnerComponent: function() {
			return this._oView.getController().getOwnerComponent();
		},

		open: function() {
			var oView = this._oView;
			var oControl = this._oControl;

			if (!this._bInit) {

				// Initialize our fragment
				this.onInit();

				this._bInit = true;

				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}

			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
		},

		close: function() {
			this._oControl.close();
		},

		setRouter: function(oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function() {
			return {};

		},
		onInit: function() {

			this._oDialog = this.getControl();

		},
		onExit: function() {
			this._oDialog.destroy();

		},
        onCreate: function () {
            var oList = this.getView().byId("TecTable"),
                oBinding = oList.getBinding("items"),
                oContext = oBinding.create({
                    "loginTecnico": this.getView().byId("idLogin").getValue(),
                    "CodFornecedorSAP": this.getView().byId("idEpo").getValue(),
                });
                var that = this;
            oList.getItems().some(function (oItem) {
                if (oItem.getBindingContext() === oContext) {
                    oItem.focus();
                    oItem.setSelected(true);
                    that.getView().getController().onSave();
                    return true;
                }
            });
            this._oControl.close();
        },
        onCreate2: function () {      
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/workflow/",
            });
            var oListBinding = oModel.bindList("/Aprovadores", undefined, undefined, undefined, { $$updateGroupId: "aprovadoresGroup" });
            var that = this;
            var oGlobalBusyDialog = new sap.m.BusyDialog();
            oGlobalBusyDialog.open();
            sap.ui.getCore().getMessageManager().removeAllMessages();
            oListBinding.attachCreateCompleted(function (oEvent) {
                    oGlobalBusyDialog.close();
                    if (oEvent.getParameter("success")) {
                        MessageBox.show(
                            "Dados atualizados com sucesso", {
                            icon: MessageBox.Icon.SUCCESS,
                            title: "Dados gravados!",
                            onClose: function (oAction) {
                                var oTable = that.getView().byId("aprovadoresTable"),
                                    oBinding = oTable.getBinding("items"),
                                    aFilters = [];
                                    
                                var oFilter = new sap.ui.model.Filter("alcada", sap.ui.model.FilterOperator.EQ, that.getView().byId("alcadaInput").getValue());
                                aFilters.push(oFilter);
                               // var oFilter = new sap.ui.model.Filter("fornecedorSAP", sap.ui.model.FilterOperator.EQ, that.getView().byId("fornecInput").getValue());
                               // aFilters.push(oFilter);
                                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                                oBinding.filter(aFilters);
                                that.close();
                            }
                        }
                        );
                    } else {
                        sap.m.MessageBox.show(
                            sap.ui.getCore().getMessageManager().getMessageModel().getData()[0].message,
                            sap.m.MessageBox.Icon.ERROR,
                            "Erro ao atualizar os dados"
                        );
                        oListBinding.resetChanges();
                        //sap.ui.getCore().getMessageManager().removeAllMessages();
                    }
                }.bind(this));
                var oContext = oListBinding.create({
                    "alcada": that.getView().byId("alcadaInput").getValue(),
                    "fornecedorSAP": that.getView().byId("idFornecedor").getValue(),
                    "user": that.getView().byId("idUser").getValue(),
                });
                oModel.submitBatch("aprovadoresGroup");
            this._oControl.close();
        },
        handleValueHelp: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogFornecedor2) {
                this.DialogFornecedor2 = this.DialogFornecedor2 = sap.ui.xmlfragment(
                    "DialogFornecedor2",
                    "com.sap.build.standard.adminEngine.view.DialogFornecedor",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogFornecedor2);
                sap.ui.core.Fragment.byId("DialogFornecedor2", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogFornecedor2", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            //var oJsonModel = new sap.ui.model.json.JSONModel();
            // abre o value help dialog filtrando pelo input value
            this.DialogFornecedor2.open();
            //	oGlobalBusyDialog.open();
        },
        _handleValueHelpSearch: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("fornecedor", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("nomeFornecedor", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilternomeFornecedor = new sap.ui.model.Filter("nomeFornecedor", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogFornecedor2", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },
        _handleValueHelpClose: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                //var arrayId = that.inputId.split("TpOS");
                // var idTpOs = arrayId[0] + "TpOS";
               // that.getView().byId(that.inputId).setValue(oSelectedItem.getDescription());
                that.getView().byId("idFornecedor").setValue(oSelectedItem.getTitle());
                that.onSearch();
            }
            //evt.getSource().getBinding("items").filter([]);
        }

	});
}, /* bExport= */ true);
