sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
], function (ManagedObject, MessageBox, Utilities, History) {

    return ManagedObject.extend("com.sap.build.standard.adminEngine.controller.Dialog17_CadastroToa", {
        constructor: function (oView) {
            this._oView = oView;
            this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.standard.adminEngine.view.DialogCadastroToa", this);
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
i
        },
        handleValueHelpFornecCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaFornec) {
                this.DialogCadToaFornec = this.DialogCadToaFornec = sap.ui.xmlfragment(
                    "DialogCadToaFornec",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaFornec",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaFornec);
                sap.ui.core.Fragment.byId("DialogCadToaFornec", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaFornec", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaFornec.open();
        },

        _handleValueHelpFornecCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("fornecedorr").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchFornecCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("fornecedorr", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaFornec", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseFornecCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("fornecedorr").setValue(oSelectedItem.getTitle());
            }
        },
        /*--------------------------------------------------------------------------------------------------------------------*/ 
        handleValueHelpLoginTecCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaLoginTec) {
                this.DialogCadToaLoginTec = this.DialogCadToaLoginTec = sap.ui.xmlfragment(
                    "DialogCadToaLoginTec",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaLoginTec",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaLoginTec);
                sap.ui.core.Fragment.byId("DialogCadToaLoginTec", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaLoginTec", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaLoginTec.open();
        },

        _handleValueHelpLoginTecCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("loginTecnico").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchLoginTecCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("loginTecnico", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaLoginTec", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseLoginTecCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("loginTecnico").setValue(oSelectedItem.getTitle());
            }
        },
        /*--------------------------------------------------------------------------------------------------------------------*/
        handleValueHelpGrupoCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaGrupo) {
                this.DialogCadToaGrupo = this.DialogCadToaGrupo = sap.ui.xmlfragment(
                    "DialogCadToaGrupo",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaGrupo",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaGrupo);
                sap.ui.core.Fragment.byId("DialogCadToaGrupo", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaGrupo", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaGrupo.open();
        },

        _handleValueHelpGrupoCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("grupo").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchGrupoCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("grupo", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaGrupo", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseGrupoCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("grupo").setValue(oSelectedItem.getTitle());
            }
        },
        /*--------------------------------------------------------------------------------------------------------------------*/
        handleValueHelpClusterCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaCluster) {
                this.DialogCadToaCluster = this.DialogCadToaCluster = sap.ui.xmlfragment(
                    "DialogCadToaCluster",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaCluster",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaCluster);
                sap.ui.core.Fragment.byId("DialogCadToaCluster", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaCluster", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaCluster.open();
        },

        _handleValueHelpClusterCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("cluster").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchClusterCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("cluster", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaCluster", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseClusterCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("cluster").setValue(oSelectedItem.getTitle());
            }
        },
        /*--------------------------------------------------------------------------------------------------------------------*/

        handleValueHelpSubClusterCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaSubCluster) {
                this.DialogCadToaSubCluster = this.DialogCadToaSubCluster = sap.ui.xmlfragment(
                    "DialogCadToaSubCluster",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaSubCluster",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaSubCluster);
                sap.ui.core.Fragment.byId("DialogCadToaSubCluster", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaSubCluster", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaSubCluster.open();
        },

        _handleValueHelpsubClusterCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("subCluster").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchSubClusterCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("subCluster", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaSubCluster", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpClosesubClusterCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("subCluster").setValue(oSelectedItem.getTitle());
            }
        },
         /*--------------------------------------------------------------------------------------------------------------------*/
         
        handleValueHelpMunicipioCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaMunicipio) {
                this.DialogCadToaCluster = this.DialogCadToaMunicipio = sap.ui.xmlfragment(
                    "DialogCadToaMunicipio",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaMunicipio",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaMunicipio);
                sap.ui.core.Fragment.byId("DialogCadToaMunicipio", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaMunicipio", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaMunicipio.open();
        },

        _handleValueHelpMunicipioCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("municipioo").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchMunicipioCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("municipioo", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaMunicipio", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseMunicipioCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("municipio").setValue(oSelectedItem.getTitle());
            }
        },

         /*--------------------------------------------------------------------------------------------------------------------*/
         handleValueHelpUFCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaUF) {
                this.DialogCadToaUF = this.DialogCadToaUF = sap.ui.xmlfragment(
                    "DialogCadToaUF",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaUF",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaUF);
                sap.ui.core.Fragment.byId("DialogCadToaUF", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaUF", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogCadToaUF.open();
        },

        _handleValueHelpUFCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("uff").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchUFCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("uff", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaUF", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseUFCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("uff").setValue(oSelectedItem.getTitle());
            }
        },

         /*--------------------------------------------------------------------------------------------------------------------*/
         handleValueHelpSegMunicipCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogSegMunicipUF) {
                this.DialogSegMunicipUF = this.DialogSegMunicipUF = sap.ui.xmlfragment(
                    "DialogSegMunicipUF",
                    "com.sap.build.standard.adminEngine.view.DialogSegMunicipUF",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogSegMunicipUF);
                sap.ui.core.Fragment.byId("DialogSegMunicipUF", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogSegMunicipUF", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogSegMunicipUF.open();
        },

        _handleValueHelpSegMunicipCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("segMunicipio").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchSegMunicipCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("segMunicipio", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogSegMunicipUF", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseSegMunicipCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("segMunicipio").setValue(oSelectedItem.getTitle());
            }
        },
         /*--------------------------------------------------------------------------------------------------------------------*/
         handleValueHelpGrupoServCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogGrupoServico) {
                this.DialogGrupoServico = this.DialogGrupoServico = sap.ui.xmlfragment(
                    "DialogGrupoServico",
                    "com.sap.build.standard.adminEngine.view.DialogGrupoServico",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogGrupoServico);
                sap.ui.core.Fragment.byId("DialogGrupoServico", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogGrupoServico", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogGrupoServico.open();
        },

        _handleValueHelpGrupoServCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("grupoServicos").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchGrupoServCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("grupoServicos", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogGrupoServico", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseGrupoServCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("grupoServicos").setValue(oSelectedItem.getTitle());
            }
        },
         /*--------------------------------------------------------------------------------------------------------------------*/
         handleValueHelpUnidNegocCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogSegUnidNegoc) {
                this.DialogSegUnidNegoc = this.DialogSegUnidNegoc = sap.ui.xmlfragment(
                    "DialogSegUnidNegoc",
                    "com.sap.build.standard.adminEngine.view.DialogSegUnidNegoc",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogSegUnidNegoc);
                sap.ui.core.Fragment.byId("DialogSegUnidNegoc", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogSegUnidNegoc", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogSegUnidNegoc.open();
        },

        _handleValueHelpUnidNegocCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("unidadeNegocio").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchUnidNegocCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("unidadeNegocio", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogSegUnidNegoc", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseUnidNegocCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("unidadeNegocio").setValue(oSelectedItem.getTitle());
            }
        },
        /*--------------------------------------------------------------------------------------------------------------------*/
        handleValueHelpWOCadToa: function (oEvent) {
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            this.inputId = oEvent.getSource().getId();
            // cria o value help dialog
            if (!this.DialogCadToaWO) {
                this.DialogCadToaWO = this.DialogCadToaWO = sap.ui.xmlfragment(
                    "DialogCadToaWO",
                    "com.sap.build.standard.adminEngine.view.DialogCadToaWO",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogCadToaWO);
                sap.ui.core.Fragment.byId("DialogCadToaWO", "List").setModel(oModel);
            } else {
                var aFilters = []
                var oBind = sap.ui.core.Fragment.byId("DialogCadToaWO", "List").getBinding("items");
                oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBind.filter(aFilters, sap.ui.model.FilterType.Application);
            }
            this.DialogSegUnidNegoc.open();
        },

        _handleValueHelpWOCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("wo").setValue(oSelectedItem.getTitle());
            }
        },
        _handleValueHelpSearchWOCadToa: function (evt) {
            var sValue = evt.getParameter("value").toUpperCase();
            var filter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("wo", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            })
            //var FilterdescricaoOs = new sap.ui.model.Filter("descricaoOs", sap.ui.model.FilterOperator.Contains, sValue);
            var oBind = sap.ui.core.Fragment.byId("DialogCadToaWO", "List").getBinding("items");
            oBind.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBind.filter(filter, sap.ui.model.FilterType.Application);
            //evt.getSource().getBinding("items").filter([FilterdescricaoOs]);
        },

        _handleValueHelpCloseWOCadToa: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            var that = this;
            if (oSelectedItem) {
                that.getView().byId("wo").setValue(oSelectedItem.getTitle());
            }
        }, 

        onLiveChangeUF: function (oEvent) {
            var sValue = oEvent.getSource().getValue();
            var regex = /^[A-Za-zÀ-ÿ\s]+$/; // Aceita apenas letras (incluindo acentuadas)
        
            if (!regex.test(sValue)) {
                oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
                oEvent.getSource().setValueStateText("Apenas letras são permitidas.");
            } else {
                oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
            }
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
       /*********************************************************************************************************************/
        onCreate: function () {
            if (this.getView().byId("fornecedorr").getValue() == "" && this.getView().byId("loginTecnico").getValue() == "" ) {
                sap.m.MessageBox.show( 
                    "Preencha os campo Fornecedor e Login Técnico antes de gravar!.",
                    sap.m.MessageBox.Icon.ERROR,
                    "Erro ao atualizar os dados"
                );
            } else {
            if(this.getView().byId("uff").getValue()){ 
            var oUFField = this.getView().byId("uff");
            var sUFValue = oUFField.getValue().trim();;
            var regex = /^[A-Za-zÀ-ÿ\s]+$/;

            if (!regex.test(sUFValue)) {
                oUFField.setValueState(sap.ui.core.ValueState.Error);
                oUFField.setValueStateText("Apenas letras são permitidas no campo UF.");

                sap.m.MessageBox.show( 
                    "Apenas letras são permitidas no campo UF.",
                    sap.m.MessageBox.Icon.ERROR,
                    "Erro ao atualizar os dados"
                );
                return;
                }
            }
                var oList = this.getView().byId("regioTable"),
                    oBinding = oList.getBinding("items");
                var exists = false;
                if (oList.getItems()[0]) {
                    var sPath = "";
                    for (var i = 0; i < oList.getItems()[0].getBindingContext().getBinding().aContexts.length; i++) {
                        sPath = oList.getItems()[0].getBindingContext().getBinding().aContexts[i].sPath.split("('");
                        sPath = sPath[0].replaceAll('%20', ' ');
                        sPath = sPath.replace("')", "");
                        if (sPath == this.getView().byId("fornecedorr").getValue() && sPath == this.getView().byId("loginTecnico").getValue()) {
                            exists = true;
                            break;
                        }
                    }
                }
                if (exists == false) {
                    var oContext = oBinding.create({
                       "fornecedor":     this.getView().byId("fornecedorr").getValue(),
                       "loginTecnico":   this.getView().byId("loginTecnico").getValue(),
                       "grupo":          this.getView().byId("grupo").getValue(),
                       "cluster":        this.getView().byId("cluster").getValue(),
                       "subCluster":     this.getView().byId("subCluster").getValue(),
                       "municipio":      this.getView().byId("municipioo").getValue(),
                       "uf":             this.getView().byId("uff").getValue(),
                       "segMunicipio":   this.getView().byId("segMunicipio").getValue(),
                       "grupoServicos":  this.getView().byId("grupoServicos").getValue(),
                       "unidadeNegocio": this.getView().byId("unidadeNegocio").getValue()
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
                    this.close();
                } else {
                    sap.m.MessageBox.show(
                        "Fornecedor / Login Técnico já cadastrado, favor verificar.",
                        sap.m.MessageBox.Icon.ERROR,
                        "Erro ao atualizar os dados"
                    );
                }
            }
        }
    });
}, /* bExport= */ true);