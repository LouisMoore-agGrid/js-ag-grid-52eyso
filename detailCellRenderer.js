import GridDetail from "./gridDetail.js";
import CostFormDetail from "./costFormDetail.js";
import PieChartDetail from "./pieChartDetail.js";
class DetailCellRenderer {
  init(params) {
    this.params = params;
    var colId = params.context.selectedDetail;

    if (colId === "cost") {
      var chartDetail = new PieChartDetail(params);
      this.eGui = chartDetail.eGui();
    } else if (colId === "orders") {
      var costFormDetail = new CostFormDetail(params);
      this.eGui = costFormDetail.eGui();
    } else if (colId === "sales") {
      var gridDetail = new GridDetail(params);
      this.eGui = gridDetail.eGui();
    }
  }
  getGui() {
    return this.eGui;
  }
}
export default DetailCellRenderer;
