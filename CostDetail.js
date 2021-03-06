import * as agCharts from "ag-charts-community";
class CostDetail {
  constructor(params) {
    this.params = params;
  }

  eGui() {
    return this.createChart();
  }

  createChart() {
    let continent = this.params.data.continent;
    let rowData = this.params.data.data;
    let newRecords = this.params.context.newRecords;
    let productACost = 0;
    let productBCost = 0;
    let productCCost = 0;

    if (newRecords) {
      rowData = rowData.concat(newRecords[continent]);
    }

    rowData.map(row => {
      switch (row.product) {
        case "A":
          productACost += row.cost;
          break;
        case "B":
          productBCost += row.cost;
          break;
        case "C":
          productCCost += row.cost;
          break;
      }
      return;
    });

    let container = document.createElement("div");
    container.style.height = "310px"
    var options = {
      container: container,
      autoSize: true,
      title: {
        text: `(${continent}) Costs by Product`,
        fontSize: 18
      },
      series: [
        {
          data: [
            {
              product: "Product A",
              cost: productACost
            },
            {
              product: "Product B",
              cost: productBCost
            },
            {
              product: "Product C",
              cost: productCCost
            }
          ],
          type: "pie",
          labelKey: "product",
          angleKey: "cost",
          label: {
            minAngle: 0
          },
          callout: {
            strokeWidth: 1,
            length: 5
          }
        }
      ],
      legend: {
        enabled: false
      }
    };

    var chart = agCharts.AgChart.create(options);
    return container;
  }
}
export default CostDetail;
