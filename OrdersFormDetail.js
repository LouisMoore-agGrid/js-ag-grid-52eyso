class OrdersFormDetail {
  constructor(params) {
    this.params = params;

    this.continents = {
      Europe: {
        countries: [
          'Denmark',
          'United Kingdom',
          'Bulgaria',
          'France',
          'Germany',
          'Latvia',
          'Hungary',
          'Ireland',
          'Italy',
          'Lithuania',
        ],
      },
      'South America': {
        countries: [
          'Argentina',
          'Bolivia',
          'Brazil',
          'Chile',
          'Colombia',
          'Ecuador',
          'Falkland Islands',
          'French Guiana',
          'Guyana',
          'Paraguay',
        ],
      },
      'North America': {
        countries: [
          'United States',
          'Mexico',
          'Canada',
          'Jamaica',
          'Barbados',
          'Dominica',
          'Belize',
          'Guadalupe',
          'Trinidad and Tobago',
          'Saint Vincent and the Grenadines',
        ],
      },
      Asia: {
        countries: [
          'China',
          'Japan',
          'India',
          'Pakistan',
          'Russia',
          'Sri-Lanka',
          'Iran',
          'Vietnam',
          'Bangladesh',
          'Philippines',
        ],
      },
      Africa: {
        countries: [
          'Nigeria',
          'Ethiopia',
          'Egypt',
          'Democratic Republic of the Congo',
          'Tanzania',
          'South Africa',
          'Kenya',
          'Uganda',
          'Algeria',
          'Sudan',
        ],
      },
      Australia: {
        countries: [
          'Australia',
          'Micronesia',
          'Fiji',
          'Kiribati',
          'Marshall Islands',
          'Nauru',
          'New Zealand',
          'Palau',
          'Papua New Guinea',
          'Samoa',
        ],
      },
      Antarctica: {
        countries: [
          'Adélie Land',
          'British Antarctic Territory',
          'Ross Dependency',
          'Peter I Island and Queen Maud Land',
          'Australian Antarctic Territory',
          'Chilean Antarctic Territory',
          'Argentine Antarctica',
        ],
      },
    };
  }

  eGui() {
    let eGui = document.createElement('div');
    eGui.innerHTML = `<form id="formElement">
      <div style="height:70px;">
      <p>
       <label>
        Country: <br>
        ${this.getDropDownList()}
       </label>
      </p>
      <p>
        <label>
         Product:<br>
         <select name="products" id="productDropdown">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
       </label>
      </p>
      <p>
        <label>
          Sales:<br>
          <input id="salesInput" type="number" min="0" placeholder="enter new sales here">
        </label>
      </p>
      <p>
        <label>
          Cost:<br>
          <input id="costInput" type="number" min="0" placeholder="enter new cost here">
        </label>
      </p>
      <p>
        <label>
          button:<br>
          <button type="button" id="applyBtn">add record</button>
        </label>
      </p>
    </form>
</div>`;

    let button = eGui.querySelector('#applyBtn');
    button.addEventListener('click', () => {
      this.buttonHandler();
    });

    return eGui;
  }

  buttonHandler() {
    let chosenCountry = document.getElementById(
      this.params.data.continent + 'Countries'
    ).value;
    let chosenProduct = document.getElementById('productDropdown').value;
    let chosenCost = document.getElementById('costInput').value;
    let chosenSale = document.getElementById('salesInput').value;
    let continent = this.params.data.continent;

    if (!this.params.context.newRecords) {
      this.params.context.newRecords = {
        Europe: [],
        'South America': [],
        'North America': [],
        Asia: [],
        Africa: [],
        Australia: [],
        Antarctica: [],
      };
    }
    let newRecord = {
      country: chosenCountry,
      sales: Number(chosenSale),
      cost: Number(chosenCost),
      product: chosenProduct,
    };

    this.params.context.newRecords[continent].push(newRecord);

    const setNewMasterVal = (chosenVal, col) => {
      let chosenNumber = Number(chosenVal);
      if (chosenVal) {
        if (isNaN(chosenNumber)) {
          return;
        }
        let newVal = chosenNumber + Number(this.params.node.data[col]);
        this.params.node.setDataValue(col, newVal);
      }
    };
    setNewMasterVal(chosenCost, 'cost');
    setNewMasterVal(chosenSale, 'sales');
  }

  getDropDownList() {
    let continent = this.params.data.continent;
    let countryList = this.continents[continent].countries;

    let dropDownHtml = `<select name="countries" style="width: 100px;" id="${continent}Countries">`;
    countryList.forEach((country) => {
      dropDownHtml += `<option value="${country}">${country}</option>`;
    });
    dropDownHtml += '</select>';

    return dropDownHtml;
  }

  getGui() {
    return this.eGui;
  }
}export default OrdersFormDetail