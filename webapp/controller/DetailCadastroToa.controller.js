sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./Dialog17_CadastroToa",
    "./utilities",
    "sap/ui/core/routing/History",
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "../libs/jszip",
    "../libs/xlsx",
    'sap/ui/model/Sorter',
    'sap/ui/model/Filter'
], function (BaseController, MessageBox, Dialog17_CadastroToa, Utilities, History, Export, ExportTypeCSV, exportLibrary, Spreadsheet, jszipjs, xlsxjs, Sorter, Filter) {
    "use strict";
    var EdmType = exportLibrary.EdmType;
    var excelImported = "";
    return BaseController.extend("com.sap.build.standard.adminEngine.controller.DetailCadastroToa", {
        handleRouteMatched: function (oEvent) {
            var sAppId = "App5f74baded5dbc32ead99b868";

            var oParams = {};

            if (oEvent.mParameters.data.context) {
                this.sContext = oEvent.mParameters.data.context;

            } else {
                if (this.getOwnerComponent().getComponentData()) {
                    var patternConvert = function (oParam) {
                        if (Object.keys(oParam).length !== 0) {
                            for (var prop in oParam) {
                                if (prop !== "sourcePrototype" && prop.includes("Set")) {
                                    return prop + "(" + oParam[prop][0] + ")";
                                }
                            }
                        }
                    };

                    this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

                }
            }

            var oPath;

            if (this.sContext) {
                oPath = {
                    path: "/" + this.sContext,
                    parameters: oParams
                };
                this.getView().bindObject(oPath);
            }

        },
        _onOverflowToolbarButtonPress: function (oEvent) {
            var sDialogName = "Dialog17_CadastroToa";
            this.mDialog17 = this.mDialog17 || {};
            var oDialog = this.mDialog17[sDialogName];
            if (!oDialog) {
                oDialog = new Dialog17_CadastroToa(this.getView());
                this.mDialog17[sDialogName] = oDialog;

                // For navigation.
                oDialog.setRouter(this.oRouter);
            } else {
                this.getView().byId("fornecedorr").setValue("");
                this.getView().byId("loginTecnico").setValue("");
                this.getView().byId("grupo").setValue("");
                this.getView().byId("cluster").setValue("");
                this.getView().byId("subCluster").setValue("");
                this.getView().byId("municipioo").setValue("");
                this.getView().byId("uff").setValue("");
                this.getView().byId("segMunicipio").setValue("");
                this.getView().byId("grupoServicos").setValue("");
                this.getView().byId("unidadeNegocio").setValue("");
            }
            var context = oEvent.getSource().getBindingContext();
            oDialog._oControl.setBindingContext(context);
            oDialog.open();
        },

        onInit: function () {
            this.customForncedorFilter = []
            this.customLoginTecncioFilter = []
			this.customGrupoFilter = []
			this.customClusterFilter = []
			this.customsubClusterFilter = []
	        this.customMunicipioFilter = []
			this.customUfFilter = []
            this.customsegMunicipio = []
            this.customgrupoServicos = []
			this.customUnidNegocio = []
			this.customWoFilter = []


            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getTarget("DetailPage4").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
            var oView = this.getView();
            var sampleModel = new sap.ui.model.json.JSONModel();
            oView.setModel(sampleModel, "sampleModel");

            var columnModel = new sap.ui.model.json.JSONModel();
            oView.setModel(columnModel, "columnModel");
            //this.localModel = new sap.ui.model.json.JSONModel();
            //this.getView().setModel(this.localModel, "/BOM");

            var oModel = new sap.ui.model.odata.v4.ODataModel({
                groupId: "$direct",
                synchronizationMode: "None",
                serviceUrl: "/AdmMotorRegras.comsapbuildstandardadminEngine/motor-de-regras/",
            });
            oView.setModel(oModel);
            oView.getController().setHeaderContext();
            oView.addEventDelegate({
                onBeforeShow: function () {
                    if (sap.ui.Device.system.phone) {
                        var oPage = oView.getContent()[0];
                        if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
                            oPage.setShowNavButton(true);
                            oPage.attachNavButtonPress(function () {
                                this.oRouter.navTo("MasterPage1", {}, true);
                            }.bind(this));
                        }
                    }
                }.bind(this)
            });

        },
        onDataExport: function (oEvent) {
            var oListBinding = this.getView().getModel().bindList("/Regioes", undefined, undefined, undefined, { $select: "*" });
            var oData = [];
            oListBinding.requestContexts().then(function (aContexts) {
                aContexts.forEach(function (oContext) {
                    oData.push(oContext.getObject());
                });

                var oModelo = new sap.ui.model.json.JSONModel({
                    "results": oData
                });
                var oExport = new Export({
                    // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                    exportType: new ExportTypeCSV({
                        separatorChar: ";"
                    }),

                    // Pass in the model created above
                    models: oModelo,

                    // binding information for the rows aggregation
                    rows: {
                        path: "/results"
                    },
                    // column definitions with column name and binding info for the content
                    columns: [{
                        name: "Tipo de WO",
                        template: {
                            content: "{tipoWo}"
                        }
                    }]
                });

                // download exported file
                oExport.saveFile().catch(function (oError) {
                    window.alert("deu erro");
                    //	MessageToast.show("Error when downloading data. Browser might not be supported!\n\n" + oError);
                }).then(function () {
                    oExport.destroy();
                });
            });
        },
        createColumnConfig: function () {
            var aCols = [];
            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'fornecedor',
                type: EdmType.String
            });
            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'loginTecnico',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'grupo',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'cluster',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'subCluster',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'municipio',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'uf',
                type: EdmType.String
            });
            
            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'segMunicipio',
                type: EdmType.String
            });
            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'grupoServicos',
                type: EdmType.String
            });
            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'unidadeNegocio',
                type: EdmType.String
            });

            aCols.push({
                // label: 'Tipo de Inst.',
                property: 'wo',
                type: EdmType.String
            });

            return aCols;
        },
        onExport: function () {
            this.onExportOdataV4();
        },
        onExportJson: function () {
            var aCols, aData, oSettings, oSheet;

            aCols = this.createColumnConfig();
            aData = this.getView().getModel().getProperty('/');

            oSettings = {
                workbook: { columns: aCols },
                dataSource: aData.TipoWoBaixaAutomatica,
                fileName: 'CadastroTOA.xlsx'
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build()
                .then(function () {
                    //  MessageToast.show('Spreadsheet export has finished');
                })
                .finally(oSheet.destroy);
        },
        onExportOdataV4: function () {
            var aCols, oRowBinding, oSettings, oSheet, oTable;

            if (!this._oTable) {
                this._oTable = this.byId('regioTable');
            }

            oTable = this._oTable;
            oRowBinding = oTable.getBinding('items');

            aCols = this.createColumnConfig();

            var oModel = oRowBinding.getModel();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: {
                    type: 'odata',
                    dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
                    serviceUrl: this._sServiceUrl,
                    headers: oModel.getHttpHeaders ? oModel.getHttpHeaders() : null,
                    count: oRowBinding.getLength ? oRowBinding.getLength() : null,
                    useBatch: true, // Default for ODataModel V2
                    sizeLimit: 1000
                },
                fileName:'Cadastro TOA.xlsx',
                worker: false // We need to disable worker because we are using a MockServer as OData Service
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },
        /* Function to Upload the file*/
        onhandleUpload: function (oEvent) {
            var that = this;
            var oFileUploader = that.getView().byId("FileUploaderid");
            var oFile = oFileUploader.getFocusDomRef().files[0];
            //To check the File type of uploaded File.
            if (oFile.type === "application/vnd.ms-excel") {
                //To call the CSV File Function
                that.typeCsv();
            } else {
                //To call the XLSX File Function
                that.typeXLSX();
            }
        },
        typeCsv: function () {
            var that = this;
            var oFileUploader = that.getView().byId("FileUploaderid");
            var oFile = oFileUploader.getFocusDomRef().files[0];
            if (oFile && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var strData = evt.target.result;
                    that.csvJSON(strData);
                    that.getView().getModel("sampleModel").refresh(true);
                };
                reader.onerror = function (exe) {
                    //	console.log(exe);
                };
                reader.readAsText(oFile);
            }
        },
        csvJSON: function (csv) {
            var that = this;
            var lines = csv.split("\n");
            var result = [];
            var colheaders = lines[0].split(",");
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < colheaders.length; j++) {
                    obj[colheaders[j]] = currentline[j];
                }
                result.push(obj);
            }
            that.getView().getModel().setProperty("/", result);
            that.generateTableCsv();
        },
        /*	Function to create the table dynamically for csv File*/
        generateTableCsv: function () {
            var that = this;
            var oTable = that.getView().byId("regioTable");
            var oModel = that.getView().getModel();
            var oModelData = oModel.getProperty("/");
            var ColumnsData = Object.keys(oModelData[0]);
            var oColumnNames = [];
            $.each(ColumnsData, function (i, value) {
                oColumnNames.push({
                    Text: ColumnsData[i]
                });
            });
            oModel.setProperty("/columnNames", oColumnNames);
            var columnmodel = that.getView().getModel("columnModel");
            columnmodel.setProperty("/", oColumnNames);
            var oTemplate = new sap.m.Column({
                header: new sap.m.Label({
                    text: "{Text}"
                })
            });
            oTable.bindAggregation("columns", "/columnNames", oTemplate);
            var oItemTemplate = new sap.m.ColumnListItem();
            var oTableHeaders = oTable.getColumns();
            $.each(oTableHeaders, function (j, value) {
                var oHeaderName = oTableHeaders[j].getHeader().getText();
                oItemTemplate.addCell(new sap.m.Text({
                    text: "{" + oHeaderName + "}"
                }));
            });
            oTable.bindAggregation("items", {
                path: "/",
                template: oItemTemplate

            });

        },
        typeXLSX: function () {
            var that = this;
            var oFileUploader = that.getView().byId("FileUploaderid");
            var file = oFileUploader.getFocusDomRef().files[0];
            var excelData = {};
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var data = evt.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    });
                    that.getView().getModel("sampleModel").setData(excelData);
                    that.getView().getModel("sampleModel").refresh(true);
                    that.generateTablexlsx();
                };
                reader.onerror = function (ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            }
        },
        /*Function to create the table Dynamically for xlsx file*/
        generateTablexlsx: function () {
            var that = this;
            var oTable = that.getView().byId("regioTable");
            var oModel = that.getView().getModel("sampleModel");
            var oModelData = oModel.getProperty("/");
            var oColumns = Object.keys(oModelData[0]);
            var oColumnNames = [];
            $.each(oColumns, function (i, value) {
                oColumnNames.push({
                    Text: oColumns[i]
                });
            });
            var columnmodel = that.getView().getModel("columnModel");
            columnmodel.setProperty("/", oColumnNames);
            var oTemplate = new sap.m.Column({
                header: new sap.m.Label({
                    text: "{columnModel>Text}"
                })
            });
            oTable.bindAggregation("columns", "columnModel>/", oTemplate);
            var oItemTemplate = new sap.m.ColumnListItem();
            var oTableHeaders = oTable.getColumns();
            $.each(oTableHeaders, function (j, value) {
                var oHeaderName = oTableHeaders[j].getHeader().getText();
                oItemTemplate.addCell(new sap.m.Text({
                    text: "{sampleModel>" + oHeaderName + "}"
                }));
            });
            oTable.bindAggregation("items", {
                path: "sampleModel>/",
                template: oItemTemplate
            });
        },
        onUpload: function (e) {
            this._import(e.getParameter("files") && e.getParameter("files")[0]);
        },

        _import: function (file) {
            var that = this;
            var excelData = {};
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object for every sheet in workbook
                        excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                    });
                    // Setting the data to the local model 
                    //	that.localModel.setData({
                    //		BOM: excelData
                    //	});
                    //	that.localModel.refresh(true);
                    var oModelo = new sap.ui.model.json.JSONModel({
                        CadastroFiltrosTOA: excelData
                    });
                    var oModelData = oModelo.getProperty("/");
                    var oColumns = Object.keys(oModelData["CadastroFiltrosTOA"][0]);
                    if (oColumns[0] == "fornecedor" && oColumns[1] == "loginTecnico"){
                        var oGlobalBusyDialog = new sap.m.BusyDialog();
                        oGlobalBusyDialog.open();
                        var oModel = that.getView().getModel();
                        var oListBinding = oModel.bindList("/importCadastroFiltrosTOA", undefined, undefined, undefined, { $$updateGroupId: "CadToaExcel" });

                        sap.ui.getCore().getMessageManager().removeAllMessages();
                        oListBinding.attachCreateCompleted(function (oEvent) {
                            oGlobalBusyDialog.close();
                            if (oEvent.getParameter("success")) {
                                MessageBox.show(
                                    "Dados importados com sucesso", {
                                    icon: MessageBox.Icon.SUCCESS,
                                    title: "Dados gravados!",
                                    onClose: function (oAction) {
                                        var oTable = that.getView().byId("regioTable"),
                                            oBinding = oTable.getBinding("items"),
                                            aFilters = [];
                                        oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                                        oBinding.filter(aFilters);
                                    }
                                });
                                that.onRefresh();
                            } else {
                                sap.m.MessageBox.show(
                                    sap.ui.getCore().getMessageManager().getMessageModel().getData()[0].message,
                                    sap.m.MessageBox.Icon.ERROR,
                                    "Erro ao realizar o upload!"
                                );
                                that.byId("regioTable").getBinding("items").resetChanges();
                                //   sap.ui.getCore().getMessageManager().removeAllMessages();
                            }
                        }.bind(this));
                        //var  oContext = "";
                        var oData = [];
                        $.each(excelData, function (index, value) {
                            oData.push({
                                "fornecedor":     value.fornecedor,
                                "loginTecnico":   value.loginTecnico,
                                "grupo":          value.grupo,
                                "cluster":        value.cluster,
                                "subCluster":     value.subCluster,
                                "municipio":      value.municipio,
                                "uf":             value.uf,
                                "segMunicipio":   value.segMunicipio,
                                "grupoServicos":  value.grupoServicos,
                                "unidadeNegocio": value.unidadeNegocio
                            });
                        });
                        var oContext = oListBinding.create({
                            "fornecedor": oData
                        }, true);

                        if (excelData.length > 0) {
                            //that.onSave();
                            //that.onInit();
                            that.getView().getModel().submitBatch("CadToaExcel");
                        }
                    } else {
                        sap.m.MessageBox.show(
                            "O Layout do arquivo está incorreto. Realize o download e tente novamente.",
                            sap.m.MessageBox.Icon.ERROR,
                            "Erro no upload do arquivo"
                        );
                    }
                };
                reader.onerror = function (ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            }
        },
            onResetChanges: function () {
            this.byId("regioTable").getBinding("items").resetChanges();

        },
        onDelete: function (oEvent) {
            //var oSelected = this.byId("bomTable").getSelectedItem();
            var oList = oEvent.getSource(),
                oItem = oEvent.getParameter("listItem");
            var that = this;
            if (oItem) {
                oItem.getBindingContext().delete("$auto").then(function () {
                    //   window.alert("deu certo");
                    sap.m.MessageBox.show(
                        "Registro excluido com sucesso!",
                        sap.m.MessageBox.Icon.SUCCESS,
                        "Dados gravados!"
                    );
                    that.getView().getController().setHeaderContext();
                }.bind(this), function (oError) {
                    //  window.alert("deu erro");
                    sap.m.MessageBox.show(
                        "Tente novamente.",
                        sap.m.MessageBox.Icon.ERROR,
                        "Erro ao deletar o registro."
                    );
                });
            }
        },
        setHeaderContext: function () {
            var oView = this.getView();
            oView.byId("titleCount").setBindingContext(
                oView.byId("regioTable").getBinding("items").getHeaderContext());
        },

        onDeleteCadToa: function () {
            var that = this;
            MessageBox.warning("Tem certeza que seja excluir toda a lista? É recomendado realizar o download dos dados antes de prosseguir", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: function (sAction) {
                    if (sAction == "OK") {
                        var oGlobalBusyDialog = new sap.m.BusyDialog();
                        oGlobalBusyDialog.open();
                        var oModel = that.getView().getModel();
                        var oListBinding = oModel.bindList("/killCadastroFiltrosTOA", undefined, undefined, undefined, { $select: "*" });
                        setTimeout(() => {
                            that.onRefresh();
                          }, "1000");
                        oListBinding.requestContexts().then(function (aContexts) {
                            oGlobalBusyDialog.close();
                            var oTable = that.getView().byId("regioTable"),
                                oBinding = oTable.getBinding("items"),
                                aFilters = [];
                            oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                            oBinding.filter(aFilters);
                        });
                    }
                }
            });
        },
        handleFilterButtonPressed: function () {
            if (!this.DialogFilter) {
                this.DialogFilter = this.DialogFilter = sap.ui.xmlfragment(
                    "DialogFilterFornec",
                    "com.sap.build.standard.adminEngine.view.ViewSettingsCadToaFilter",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogFilter);
                this.DialogFilter.setModel(this.getView().getModel());

                this.DialogFilter.getModel().setSizeLimit(1500);
                this.getView().addDependent(this.DialogFilter);

            }
            // abre o value help dialog filtrando pelo input value
            this.DialogFilter.open();
        },

        handleFilterDialogConfirm: function (oEvent) {
            var oTable = this.byId("regioTable"),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                aFilters = [];

                if (this.customForncedorFilter) {
                    this.customForncedorFilter.forEach((fornecedor) => {
                        // @ts-ignore
                        var oFilter = new sap.ui.model.Filter("fornecedor", sap.ui.model.FilterOperator.EQ, fornecedor);
                        aFilters.push(oFilter);
                    });
                }

            if (this.customLoginTecncioFilter) {
                this.customLoginTecncioFilter.forEach((loginTecnico) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("loginTecnico", sap.ui.model.FilterOperator.EQ, loginTecnico);
                    aFilters.push(oFilter);
                });
            }

            if (this.customGrupoFilter) {
                this.customGrupoFilter.forEach((grupo) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("grupo", sap.ui.model.FilterOperator.EQ, grupo);
                    aFilters.push(oFilter);
                });
            }

            if (this.customClusterFilter) {
                this.customClusterFilter.forEach((cluster) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("cluster", sap.ui.model.FilterOperator.EQ, cluster);
                    aFilters.push(oFilter);
                });
            }

            if (this.customsubClusterFilter) {
                this.customsubClusterFilter.forEach((subCluster) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("subCluster", sap.ui.model.FilterOperator.EQ, subCluster);
                    aFilters.push(oFilter);
                });
            }

            if (this.customMunicipioFilter) {
                this.customMunicipioFilter.forEach((municipio) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("municipio", sap.ui.model.FilterOperator.EQ, municipio);
                    aFilters.push(oFilter);
                });
            }

            if (this.customUfFilter) {
                this.customUfFilter.forEach((uf) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("uf", sap.ui.model.FilterOperator.EQ, uf);
                    aFilters.push(oFilter);
                });
            }

            if (this.customsegMunicipio) {
                this.customsegMunicipio.forEach((segMunicipio) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("segMunicipio", sap.ui.model.FilterOperator.EQ, segMunicipio);
                    aFilters.push(oFilter);
                });
            }

            if (this.customgrupoServicos) {
                this.customgrupoServicos.forEach((grupoServicos) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("grupoServicos", sap.ui.model.FilterOperator.EQ, grupoServicos);
                    aFilters.push(oFilter);
                });
            }

            if (this.customUnidNegocio) {
                this.customUnidNegocio.forEach((unidadeNegocio) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("unidadeNegocio", sap.ui.model.FilterOperator.EQ, unidadeNegocio);
                    aFilters.push(oFilter);
                });
            }

            if (this.customWoFilter) {
                this.customWoFilter.forEach((wo) => {
                    // @ts-ignore
                    var oFilter = new sap.ui.model.Filter("wo", sap.ui.model.FilterOperator.EQ, wo);
                    aFilters.push(oFilter);
                });
            }

            oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            oBinding.filter(aFilters);

            // update filter bar
            this.byId("vsdFilterBarrr").setVisible(aFilters.length > 0);
            this.byId("vsdFilterLabelll").setText(mParams.filterString);
        },

        handleSortButtonPressed: function () {
            if (!this.DialogSort) {
                this.DialogSort = this.DialogSort = sap.ui.xmlfragment(
                    "DialogSort",
                    "com.sap.build.standard.adminEngine.view.ViewSettingsDialogCadastroToa",
                    this
                );
                //to get access to the global model
                this.getView().addDependent(this.DialogSort);
            }
            this.DialogSort.open();
        },

        onParentClicked: function (oEvent) {
            let seleciona = oEvent.mParameters.selected
            let table = this.getView().byId("regioTable")
            let items  = table.getItems()
            let LenItems = items.length

            for (let i = 0; i < LenItems; i++){
                items[i].getCells()[2].setSelected(seleciona)
            }        
		},

        onSelectionChangeFornec: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customForncedorFilter) {
                this.customForncedorFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customForncedorFilter = [];
                oList.getSelectedContexts().forEach((fornecedor) => {
                    this.customForncedorFilter.push(fornecedor.getProperty("fornecedor"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customForncedorFilter = this.customForncedorFilter.filter(element => element !== sValueDel);
            }

            if (this.customForncedorFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrFornecCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customForncedorFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrFornecCadToa");
                if(this.customFornecFilter){
                    oCustomFilter.setFilterCount(this.customFornecFilter.length);
                 }
            }
        },
        
        onSelectionChangeLogTec: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customLoginTecncioFilter) {
                this.customLoginTecncioFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customLoginTecncioFilter = [];
                oList.getSelectedContexts().forEach((loginTecnico) => {
                    this.customLoginTecncioFilter.push(loginTecnico.getProperty("loginTecnico"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customLoginTecncioFilter = this.customLoginTecncioFilter.filter(element => element !== sValueDel);
            }

            if (this.customLoginTecncioFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrLogTecCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customLoginTecncioFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrLogTecCadToa");
                if(this.customLoginTecncioFilter){
                    oCustomFilter.setFilterCount(this.customLoginTecncioFilter.length);
                 }
            }
        },
		

        onSelectionChangeGrupo: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customGrupoFilter) {
                this.customGrupoFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customGrupoFilter = [];
                oList.getSelectedContexts().forEach((uf) => {
                    this.customGrupoFilter.push(uf.getProperty("grupo"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customGrupoFilter = this.customGrupoFilter.filter(element => element !== sValueDel);
            }

            if (this.customGrupoFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoServCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customGrupoFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoServCadToa");
                if(this.customGrupoFilter){
                    oCustomFilter.setFilterCount(this.customGrupoFilter.length);
                 }
            }

        },

        onSearchDescrCadToaFornec: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("fornecedor", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrFornecCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrFornecCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },
        onSearchDescrCadToaLogTec: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("loginTecnico", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrLogTecCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrLogTecCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },
        
        onSelectionChangeCluster: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customClusterFilter) {
                this.customClusterFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customClusterFilter = [];
                oList.getSelectedContexts().forEach((cluster) => {
                    this.customClusterFilter.push(cluster.getProperty("cluster"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customClusterFilter = this.customClusterFilter.filter(element => element !== sValueDel);
            }

            if (this.customClusterFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrClusterCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customClusterFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrClusterCadToa")
                if(this.customClusterFilter){
                    oCustomFilter.setFilterCount(this.customClusterFilter.length);
                 }
            }

        },

        onSelectionChangeSubCluster: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customsubClusterFilter) {
                this.customsubClusterFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customsubClusterFilter = [];
                oList.getSelectedContexts().forEach((subCluster) => {
                    this.customsubClusterFilter.push(subCluster.getProperty("subCluster"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customsubClusterFilter = this.customsubClusterFilter.filter(element => element !== sValueDel);
            }

            if (this.customsubClusterFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrSubClusterCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customsubClusterFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrSubClusterCadToa")
                if(this.customsubClusterFilter){
                    oCustomFilter.setFilterCount(this.customsubClusterFilter.length);
                 }
            }
        },

        
        onSelectionChangeMunicipio: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customMunicipioFilter) {
                this.customMunicipioFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customMunicipioFilter = [];
                oList.getSelectedContexts().forEach((municipio) => {
                    this.customMunicipioFilter.push(municipio.getProperty("municipio"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customMunicipioFilter = this.customMunicipioFilter.filter(element => element !== sValueDel);
            }

            if (this.customMunicipioFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrMunicipioCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customMunicipioFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrMunicipioCadToa")
                if(this.customMunicipioFilter){
                    oCustomFilter.setFilterCount(this.customMunicipioFilter.length);
                 }
            }
        },

        onSelectionChangeCadToaUf: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customUfFilter) {
                this.customUfFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customUfFilter = [];
                oList.getSelectedContexts().forEach((uf) => {
                    this.customUfFilter.push(uf.getProperty("uf"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customUfFilter = this.customUfFilter.filter(element => element !== sValueDel);
            }

            if (this.customUfFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUfCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customUfFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUfCadToa")
                if(this.customUfFilter){
                    oCustomFilter.setFilterCount(this.customUfFilter.length);
                 }
            }
        },

        onSelectionChangeSegMunic: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customsegMunicipio) {
                this.customsegMunicipio = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customsegMunicipio = [];
                oList.getSelectedContexts().forEach((segMunicipio) => {
                    this.customsegMunicipio.push(segMunicipio.getProperty("segMunicipio"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customsegMunicipio = this.customsegMunicipio.filter(element => element !== sValueDel);
            }

            if (this.customsegMunicipio.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrsegMunicCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customsegMunicipio.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrsegMunicCadToa")
                if(this.customsegMunicipio){
                    oCustomFilter.setFilterCount(this.customsegMunicipio.length);
                 }
            }
        },
        onSelectionChangeGrupoCadToa: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customGrupoFilter) {
                this.customGrupoFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customGrupoFilter = [];
                oList.getSelectedContexts().forEach((grupoServicos) => {
                    this.customGrupoFilter.push(grupoServicos.getProperty("grupo"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customGrupoFilter = this.customGrupoFilter.filter(element => element !== sValueDel);
            }

            if (this.customGrupoFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customGrupoFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoCadToa")
                if(this.customGrupoFilter){
                    oCustomFilter.setFilterCount(this.customGrupoFilter.length);
                 }
            }
        },
        onSelectionChangeGrupoServ: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customgrupoServicos) {
                this.customgrupoServicos = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customgrupoServicos = [];
                oList.getSelectedContexts().forEach((grupoServicos) => {
                    this.customgrupoServicos.push(grupoServicos.getProperty("grupoServicos"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customgrupoServicos = this.customgrupoServicos.filter(element => element !== sValueDel);
            }

            if (this.customgrupoServicos.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoServCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customgrupoServicos.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoServCadToa")
                if(this.customgrupoServicos){
                    oCustomFilter.setFilterCount(this.customgrupoServicos.length);
                 }
            }
        },

        onSelectionChangeUnidNegoc: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customUnidNegocio) {
                this.customUnidNegocio = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customUnidNegocio = [];
                oList.getSelectedContexts().forEach((unidadeNegocio) => {
                    this.customUnidNegocio.push(unidadeNegocio.getProperty("unidadeNegocio"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customUnidNegocio = this.customUnidNegocio.filter(element => element !== sValueDel);
            }

            if (this.customUnidNegocio.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUnidNegocCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customUnidNegocio.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUnidNegocCadToa")
                if(this.customUnidNegocio){
                    oCustomFilter.setFilterCount(this.customUnidNegocio.length);
                 }
            }
        },

        
        onSelectionChangeWO: function (oEvent) {
            var bSelected = oEvent.getParameter('selected');

            if (!this.customWoFilter) {
                this.customWoFilter = [];
            }

            var oList = oEvent.getSource();

            if (bSelected) {
                this.customWoFilter = [];
                oList.getSelectedContexts().forEach((wo) => {
                    this.customWoFilter.push(wo.getProperty("wo"))
                })
            } else {
                let sValueDel = oEvent.getParameter('listItem').getTitle();
                this.customWoFilter = this.customWoFilter.filter(element => element !== sValueDel);
            }

            if (this.customWoFilter.length > 0) {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrWOCadToa")
                // @ts-ignore
                oCustomFilter.setFilterCount(this.customWoFilter.length);
                // @ts-ignore
                oCustomFilter.setSelected(true);
            } else {
                var oCustomFilter = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrWOCadToa")
                if(this.customWoFilter){
                    oCustomFilter.setFilterCount(this.customWoFilter.length);
                 }
            }
        },

        onSearchGrupoCadToa: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("grupo", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchDescrCadCluster: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("cluster", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrClusterToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrClusterToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchDescrCadSubCluster: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("subCluster", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrSubClusterToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrSubClusterToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        
        onSearchDescrCadMunicipio: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("municipio", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrMunicipioToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrMunicipioToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchDescrCadToaUf: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("uf", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUfCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUfCadToaCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchsegMunicCadToa: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("segMunicipio", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrsegMunicCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrsegMunicCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchGrupoServCadToa: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("grupoServicos", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoServCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoServCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        onSearchUnidNegocCadToa: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 1) {
                var filter = new sap.ui.model.Filter("unidadeNegocio", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);

                // update list binding
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUnidNegocCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            } else if (sQuery.length == 0) {
                // @ts-ignore
                var oBinding = sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUnidNegocCustomList").getBinding("items")
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
            }
        },

        bloquearFornec:function(){
            var that = this;
            var fnSuccess = function () {
                sap.m.MessageBox.show(
                    "Dados atualizados com sucesso",
                    sap.m.MessageBox.Icon.SUCCESS,
                    "Dados gravados!"
                );
                var oTable = that.getView().byId("regioTable"),
                    oBinding = oTable.getBinding("items"),
                    aFilters = [];
                oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
                oBinding.filter(aFilters);
                that.getView().getController().setHeaderContext();
            }.bind(this);

            var fnError = function (oError) {

                sap.m.MessageBox.show(
                    "Tente novamente.",
                    sap.m.MessageBox.Icon.ERROR,
                    "Erro ao atualizar os dados"
                );
            }.bind(this);

            //this._setBusy(true); // Lock UI until submitBatch is resolved.
            this.getView().getModel().submitBatch("FornecGroup").then(fnSuccess, fnError);
            //this._bTechnicalErrors = false; // If there were technical errors, a new save resets them.
        },

        onRefresh : function () {
			var oBinding = this.getView().byId("regioTable").getBinding('items');

			if (oBinding.hasPendingChanges()) {
				MessageBox.error(this._getText("refreshNotPossibleMessage"));
                sap.m.MessageBox.show(
                    "Não foi possivel atualizar.",
                    sap.m.MessageBox.Icon.ERROR,
                    "Erro ao Atualizar a pagina."
                );
				return;
			}
			oBinding.refresh();
            sap.m.MessageBox.show(
                "Dados atualizados com sucesso",
                sap.m.MessageBox.Icon.SUCCESS,
                "Dados gravados!"
            );
		},

        handleSortDialogConfirm: function (oEvent) {
            var oTable = this.byId("regioTable"),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];

            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));
            oBinding.sOperationMode = sap.ui.model.odata.OperationMode.Server;
            // apply the selected sort and group settings
            oBinding.sort(aSorters);
        }, 

        onResetFilters: function (oEvent){

            // @ts-ignore
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrFornecCadToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrLogTecCadToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrClusterToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrSubClusterToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrMunicipioToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUfCadToaCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrsegMunicCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoServCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrUnidNegocCustomList").removeSelections();
            sap.ui.core.Fragment.byId("DialogFilterFornec", "DescrGrupoCustomList").removeSelections();
            this.customForncedorFilter = []
            this.customLoginTecncioFilter = []
			this.customGrupoFilter = [] 
			this.customClusterFilter = []
			this.customsubClusterFilter = []
	        this.customMunicipioFilter = []
			this.customUfFilter = []
            this.customsegMunicipio = []
            this.customgrupoServicos = []
			this.customUnidNegocio = []
			this.customWoFilter = []

            var oCustomFilter1 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrFornecCadToa");
            var oCustomFilter2 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrLogTecCadToa");
            var oCustomFilter3 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrClusterCadToa");
            var oCustomFilter4 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrSubClusterCadToa");
            var oCustomFilter5 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrMunicipioCadToa");
            var oCustomFilter6 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUfCadToa");
            var oCustomFilter7 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrsegMunicCadToa");
            var oCustomFilter8 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoServCadToa");
            var oCustomFilter9 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrGrupoCadToa");
            var oCustomFilter10 = sap.ui.core.Fragment.byId("DialogFilterFornec", "customDescrUnidNegocCadToa");

        
            // @ts-ignore
            oCustomFilter1.setFilterCount(0);
            // @ts-ignore
            oCustomFilter1.setSelected(false);
            // @ts-ignore
            oCustomFilter2.setFilterCount(0);
            // @ts-ignore
            oCustomFilter2.setSelected(false);
            // @ts-ignore
            oCustomFilter3.setFilterCount(0);
            // @ts-ignore
            oCustomFilter3.setSelected(false);
             // @ts-ignore
             oCustomFilter4.setFilterCount(0);
             // @ts-ignore
             oCustomFilter4.setSelected(false);
              // @ts-ignore
            oCustomFilter5.setFilterCount(0);
            // @ts-ignore
            oCustomFilter5.setSelected(false);
             // @ts-ignore
             oCustomFilter6.setFilterCount(0);
             // @ts-ignore
             oCustomFilter6.setSelected(false);
              // @ts-ignore
            oCustomFilter7.setFilterCount(0);
            // @ts-ignore
            oCustomFilter7.setSelected(false);
             // @ts-ignore
             oCustomFilter8.setFilterCount(0);
             // @ts-ignore
             oCustomFilter8.setSelected(false);
              // @ts-ignore
            oCustomFilter9.setFilterCount(0);
            // @ts-ignore
            oCustomFilter9.setSelected(false);
             // @ts-ignore
             oCustomFilter10.setFilterCount(0);
             // @ts-ignore
             oCustomFilter10.setSelected(false);

        }
    });
}, /* bExport= */ true);
