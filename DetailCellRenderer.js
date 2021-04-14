import SalesDetail from "./SalesDetail.js";
import OrdersFormDetail from "./OrdersFormDetail.js";
import CostDetail from "./CostDetail.js";

class DetailCellRenderer {
  init(params) {
    this.params = params;
    var colId = params.context.selectedDetail;

    if (colId === "cost") {
      var costDetail = new CostDetail(params);
      this.eGui = costDetail.eGui();
    } else if (colId === "orders") {
      var ordersFormDetail = new OrdersFormDetail(params);
      this.eGui = ordersFormDetail.eGui();
    } else if (colId === "sales") {
      var salesDetail = new SalesDetail(params);
      this.eGui = salesDetail.eGui();
    }
  }
  getGui() {
    return this.eGui;
  }
}
export default DetailCellRenderer;
