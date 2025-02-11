sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
], function (ManagedObject, MessageBox, Utilities, History) {

    return ManagedObject.extend("com.sap.build.standard.adminEngine.controller.Dialog15_UFBloqueado", {
        constructor: function (oView) {
            this._oView = oView;
            this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.standard.adminEngine.view.Dialog15_UfBloq", this);
            this._bInit = false;
        },

        exit: function () {
            delete this._oView;
        },

        getView: function () {
            return this._oView;
        },

        getControl: function () {
            return this._oControl;
        },

        getOwnerComponent: function () {
            return this._oView.getController().getOwnerComponent();
        },

        open: function () {
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

        close: function () {
            this._oControl.close();
        },

        setRouter: function (oRouter) {
            this.oRouter = oRouter;

        },
        getBindingParameters: function () {
            return {};

        },
        _onButtonPress: function () {

            this.close();

        },
        _onButtonPress1: function () {

            this.close();

        },
        onInit: function () {

            this._oDialog = this.getControl();

        },
        onExit: function () {
            this._oDialog.destroy();

            // to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
            var aControls = [{
                "controlId": "sap_m_Dialog_4-content-build_simple_form_Form-1605901539681-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1605901750490-fields-sap_m_ComboBox-1",
                "groups": ["items"]
            }];
            for (var i = 0; i < aControls.length; i++) {
                var oControl = this.getView().byId(aControls[i].controlId);
                if (oControl) {
                    for (var j = 0; j < aControls[i].groups.length; j++) {
                        var sAggregationName = aControls[i].groups[j];
                        var oBindingInfo = oControl.getBindingInfo(sAggregationName);
                        if (oBindingInfo) {
                            var oTemplate = oBindingInfo.template;
                            oTemplate.destroy();
                        }
                    }
                }
            }

        },

        handleValueHelpUF: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogUFBloq) {
                this.DialogUFBloq = this.DialogUFBloq = sap.ui.xmlfragment(
                    "DialogUFBloq",
                    "com.sap.build.standard.adminEngine.view.DialogUFBloq",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogUFBloq);
                sap.ui.core.Fragment.byId("DialogUFBloq", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogUFBloq", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            //var oJsonModel = new sap.ui.model.json.JSONModel();
            // abre o value help dialog filtrando pelo input value
            this.DialogUFBloq.open();
            //	oGlobalBusyDialog.open();
        },
        handleValueHelpCodIBGE: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCodIbge) {
                this.DialogCodIbge = this.DialogCodIbge = sap.ui.xmlfragment(
                    "DialogCodIbge",
                    "com.sap.build.standard.adminEngine.view.DialogCodIbge",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCodIbge);
                sap.ui.core.Fragment.byId("DialogCodIbge", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCodIbge", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            //var oJsonModel = new sap.ui.model.json.JSONModel();
            // abre o value help dialog filtrando pelo input value
            this.DialogCodIbge.open();
            //	oGlobalBusyDialog.open();
        },

        handleValueHelpBloqueado: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogUF_Bloqueado) {

                var oModel2 = new sap.ui.model.json.JSONModel({
                    Bloqueadas: [
                        { Nome: "Sim" },
                        { Nome: "Não" }
                    ]
                });

                this.getView().setModel(oModel);
                this.DialogUF_Bloqueado = this.DialogUF_Bloqueado = sap.ui.xmlfragment(
                    "DialogUF_Bloqueado",
                    "com.sap.build.standard.adminEngine.view.DialogUF_Bloqueado",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogUF_Bloqueado);
                sap.ui.core.Fragment.byId("DialogUF_Bloqueado", "Listtt").setModel(oModel2);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogUF_Bloqueado", "Listtt").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            //var oJsonModel = new sap.ui.model.json.JSONModel();
            // abre o value help dialog filtrando pelo input value
            this.DialogUF_Bloqueado.open();
            //	oGlobalBusyDialog.open();
        },
        _handleValueHelpCloseUF: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("uf").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchUF: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("uf", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogUFBloq ", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseCodIBGE: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("codIBGE").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchCodIBGE: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("codIBGE", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCodIbge ", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseBloq: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("bloqueada").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchBloq: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("bloqueada", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogUF_Bloqueado ", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },
        _setUIChanges: function (bHasUIChanges) {
            if (this._bTechnicalErrors) {
                // If there is currently a technical error, then force 'true'.
                bHasUIChanges = true;
            } else if (bHasUIChanges === undefined) {
                bHasUIChanges = this.getView().getModel().hasPendingChanges();
            }
            var oModel = this.getView().getModel();
            oModel.setProperty("/hasUIChanges", bHasUIChanges);
        },
        onCreate: function () {
            if (this.getView().byId("uf").getValue() == "") {
                sap.m.MessageBox.show(
                    "Preencha todos os Campos antes de gravar!.",
                    sap.m.MessageBox.Icon.ERROR,
                    "Erro ao atualizar os dados"
                );
            } else {
                var oList = this.getView().byId("regioTable"),
                    oBinding = oList.getBinding("items");
                var exists = false;
                if (oList.getItems()[0]) {
                    var sPath = "";
                    for (var i = 0; i < oList.getItems()[0].getBindingContext().getBinding().aContexts.length; i++) {
                        sPath = oList.getItems()[0].getBindingContext().getBinding().aContexts[i].sPath.split("('");
                        sPath = sPath[0].replaceAll('%20', ' ');
                        sPath = sPath.replace("')", "");
                        if (sPath == this.getView().byId("uf").getValue()) {
                            exists = true;
                            break;
                        }
                    }
                }
                if (exists == false) {
                    var valueBloq;
                    if( this.getView().byId("bloqueada").getValue() == "Yes" || this.getView().byId("bloqueada").getValue() == "Sim" ){
                        valueBloq = true;
                    }else{
                        valueBloq = false;
                    }
                    var oContext = oBinding.create({
                        "uf": this.getView().byId("uf").getValue(),
                        "codIBGE": this.getView().byId("codIBGE").getValue(),
                        "bloqueada": valueBloq
                    });
                    var that = this;

                    //this._setUIChanges();
                    //this.getView().getModel("appView").setProperty("/usernameEmpty", true);

                    oList.getItems().some(function (oItem) {
                        if (oItem.getBindingContext() === oContext) {
                            oItem.focus();
                            oItem.setSelected(true);
                            that.getView().getController().onSave();
                            return true;
                        }
                    });
                    this.close();
                } else {
                    sap.m.MessageBox.show(
                        "UF já cadastrado, favor verificar.",
                        sap.m.MessageBox.Icon.ERROR,
                        "Erro ao atualizar os dados"
                    );
                }
            }
        }

    });
}, /* bExport= */ true);