import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import * as agGrid from 'ag-grid-community'
class GridDetail {
  constructor(params) {
    this.params = params;
    this.rowData = params.data.data;
    if (params.context.newRecords) {
      let continent = this.params.data.continent
      this.rowData = this.rowData.concat(
        params.context.newRecords[continent]
      );
    }
  }

  eGui() {
    var eTemp = document.createElement('div');
    eTemp.innerHTML = this.getTemplate();
    this.eGui = eTemp.firstElementChild;

    this.setupDetailGrid();
    return this.eGui;
  }

  setupDetailGrid() {
    var eDetailGrid = this.eGui.querySelector('.full-width-grid');
    var detailGridOptions = {
      columnDefs: [
        { field: 'country', rowGroup: true },
        { field: 'sales', aggFunc: 'sum' },
        { field: 'cost' },
        { field: 'product', pivot: true },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
      },
      pivotMode: true,
      rowData: this.rowData,
    };

    new agGrid.Grid(eDetailGrid, detailGridOptions);

    this.detailGridApi = detailGridOptions.api;

    var masterGridApi = this.params.api;
    var rowId = this.params.node.id;

    var gridInfo = {
      id: rowId,
      api: detailGridOptions.api,
      columnApi: detailGridOptions.columnApi,
    };
    masterGridApi.addDetailGridInfo(rowId, gridInfo);
  }

  getTemplate() {
    var template = `<div class="full-width-panel">
      <div class="full-width-details"></div>
      <div class="full-width-grid ag-theme-alpine"></div>
    </div>`;

    return template;
  }
}export default GridDetail
