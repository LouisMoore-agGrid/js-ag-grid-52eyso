import rowData from './data.js';
import DetailCellRenderer from './detailCellRenderer';
import './style.css';
import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

import * as ag from 'ag-grid-community'



var columnDefs =  [
    {
      field: 'continent',
      cellRenderer: (params) => {
        return makeButtonCellRenderer(params, 'continent');
      },
    },
    {
      field: 'sales',
      cellRenderer: (params) => {
        return makeButtonCellRenderer(params, 'sales');
      },
    },
    {
      field: 'cost',
      cellRenderer: (params) => {
        return makeButtonCellRenderer(params, 'cost');
      },
    },
    {
      field: 'orders',
      cellRenderer: (params) => {
        return makeButtonCellRenderer(params, 'orders');
      },
    },
  ],

const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  masterDetail: true,
  detailCellRenderer: 'myDetailCellRenderer',
  detailCellRendererParams: {
    myObj: {},
  },
  components: {
    myDetailCellRenderer: DetailCellRenderer,
  },
}

function makeButtonCellRenderer(params, col) {
  let isExpanded = params.node.expanded;
  let container = document.createElement('div');
  let button = document.createElement('img');
  //have to use regex to trim because some continents have spaces
  button.classList.add(`${params.node.data.continent.replace(/ /g, '')}-row`);
  let openCol = null;
  if (params.context) {
    openCol = params.context.chevKeyMap[button.className];
  }
  let chevronState =
    isExpanded && col == openCol ? 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/50413f659cdfbe903ec14d9a5d4b7cf175b76637/tree-open.svg' : 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/aacef9f45dae7ea5822c4b76bf1c981a74451435/tree-closed.svg';
  button.setAttribute('src', chevronState);
  let span = document.createElement('span');
  container.style.alignItems = 'center';
  container.style.display = 'flex';

  switch (col) {
    case 'continent':
      span.innerText = params.value;
      break;
    case 'sales':
      span.innerText = params.value;
      container.appendChild(button);
      break;
    case 'cost':
      span.innerText = params.value;
      container.appendChild(button);
      break;
    case 'orders':
      span.innerText = 'orders form';
      container.appendChild(button);
      break;
  }

  button.addEventListener('click', (event) => {
    let target = event.target;
    if (col === 'continent') {
      params.node.setExpanded(false);
    } else {
      openDetail(params, col, target);
    }
  });

  container.appendChild(span);
  return container;
}

const openDetail = (params, column, container) => {
  if (
    gridOptions.context &&
    gridOptions.context.chevKeyMap[container.className] === column
  ) {
    if (params.node.expanded) {
      params.node.setExpanded(false);
      container.setAttribute('src', 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/aacef9f45dae7ea5822c4b76bf1c981a74451435/tree-closed.svg');
      return;
    }
  }
  gridOptions.context = { ...gridOptions.context, selectedDetail: column };
  params.node.setExpanded(false);
  let className = '';
  container.classList.forEach((cssClass) => {
    if (cssClass.indexOf('row') != -1) {
      className = cssClass;
    }
  });
  let nodeRenderers = document.querySelectorAll(`.${className}`);
  nodeRenderers.forEach((renderer) => {
    renderer.setAttribute('src', 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/aacef9f45dae7ea5822c4b76bf1c981a74451435/tree-closed.svg');
  });
  params.node.setExpanded(true);
  if (gridOptions.context.chevKeyMap) {
    gridOptions.context.chevKeyMap[container.className] = column;
  } else {
    gridOptions.context.chevKeyMap = {};
    gridOptions.context.chevKeyMap[container.className] = column;
  }
  container.setAttribute('src', 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/50413f659cdfbe903ec14d9a5d4b7cf175b76637/tree-open.svg');

  if (column == 'orders') {
    params.node.detailNode.setRowHeight(70);
    params.api.onRowHeightChanged();
  } else {
    params.node.detailNode.setRowHeight(310);
    params.api.onRowHeightChanged();
  }
};

new ag.Grid(document.querySelector('#myGrid'), gridOptions);

