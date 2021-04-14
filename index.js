import rowData from './data.js';
import DetailCellRenderer from './DetailCellRenderer';
import './style.css';
import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

import * as ag from 'ag-grid-community'

const treeOpen = 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/50413f659cdfbe903ec14d9a5d4b7cf175b76637/tree-open.svg'

const treeClosed = 'https://raw.githubusercontent.com/LouisMoore-agGrid/js-ag-grid-52eyso/aacef9f45dae7ea5822c4b76bf1c981a74451435/tree-closed.svg'

var columnDefs =  [
    {
      field: 'continent',
    },
    {
      field: 'sales',
      cellRenderer: (params) => {
        return makeMasterCellRenderer(params, 'sales');
      },
    },
    {
      field: 'cost',
      cellRenderer: (params) => {
        return makeMasterCellRenderer(params, 'cost');
      },
    },
    {
      field: 'orders',
      cellRenderer: (params) => {
        return makeMasterCellRenderer(params, 'orders');
      },
    },
  ],

const gridOptions = {
  columnDefs: columnDefs,
  detailRowAutoHeight: true,
  rowData: rowData,
  masterDetail: true,
  detailCellRenderer: 'myDetailCellRenderer',
  components: {
    myDetailCellRenderer: DetailCellRenderer,
  },
}

function makeMasterCellRenderer(params, col) {
  let isExpanded = params.node.expanded;
  let container = document.createElement('div');
  let chevron = document.createElement('img');
  let span = document.createElement('span');
  let openCol = null;

  chevron.classList.add(`row-${params.node.data.id}`);
  chevron.classList.add('pointer-class')
  container.classList.add('master-container')

  if (params.context) {
    openCol = params.context.chevKeyMap[chevron.className];
  }
  let chevronState =
    isExpanded && col == openCol ? treeOpen : treeClosed;
  chevron.setAttribute('src', chevronState);

  switch (col) {
    case 'orders':
      span.innerText = 'orders form';
      container.appendChild(chevron);
      break;
    default:
      span.innerText = params.value;
      container.appendChild(chevron);
      break;
  }

  chevron.addEventListener('click', (event) => {
    let chevron= event.target;
      openDetail(params, col, chevron);
  });

  container.appendChild(span);
  return container;
}

const openDetail = (params, column, cellRenderer) => {
  if (gridOptions.context
      && gridOptions.context.chevKeyMap[cellRenderer.className] === column
      && params.node.expanded) {
      params.node.setExpanded(false);
      cellRenderer.setAttribute('src', treeClosed);
      return;
  }
  gridOptions.context = { ...gridOptions.context, selectedDetail: column };
  let className = '';
  cellRenderer.classList.forEach((cssClass) => {
    if (cssClass.indexOf('row') != -1) {
      className = cssClass;
    }
  });
  let nodeRenderers = document.querySelectorAll(`.${className}`);
  nodeRenderers.forEach((renderer) => {
    renderer.setAttribute('src', treeClosed);
  });
  params.node.setExpanded(true);
  if (gridOptions.context.chevKeyMap) {
    gridOptions.context.chevKeyMap[cellRenderer.className] = column;
  } else {
    gridOptions.context.chevKeyMap = {};
    gridOptions.context.chevKeyMap[cellRenderer.className] = column;
  }
  cellRenderer.setAttribute('src', treeOpen);

  if(params.node.detailNode)
    params.api.redrawRows({rowNodes:[params.node.detailNode]})
};

new ag.Grid(document.querySelector('#myGrid'), gridOptions);

