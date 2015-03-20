function calcEfficiency(size, price){
  var radius = size / 2.0;
  return ( price / (Math.PI * Math.pow(radius, 2)) ).toFixed(6);
}

function checkInput(size, price){
  var numbersOnly = /[^0-9]/g;
  return (size !== ""
          && price !== ""
          && size.toString().match(numbersOnly) == null
          && price.toString().match(numbersOnly) == null);
}

var Margherita = React.createClass({
  render: function() {
    return (
      <App />
    );
  }
});

var numbersOnly = /[^0-9]/g;

var App = React.createClass({

  getInitialState: function() {
    return {
      rowCount: 1
    }
  },

  addRow: function() {
    this.setState({
      rowCount: this.state.rowCount + 1
    })
  },

  removeRow: function() {
    this.setState({
      rowCount: Math.max(this.state.rowCount - 1, 1)
    })
  },

  render: function() {

    rows = []
    for (i = 0; i < this.state.rowCount; i++){
      rows.push(<DataRow key={i}/>);
    }

    return (
      <form className="text-center">
        {rows}
        <ul className="button-group">
          <li><a href="#" className="alert button tiny" onClick={this.removeRow}><i className="fa fa-minus"></i></a></li>
          <li><a href="#" className="button tiny" onClick={this.addRow}><i className="fa fa-plus"></i></a></li>
        </ul>
      </form>
    );
  }
});

var DataRow = React.createClass({
  getInitialState: function() {
    return {
      size: "",
      price: "",
      location: "",
      efficiency: "",
    }
  },

  changeSize: function(e) {
    eff = "";
    if(checkInput(e.target.value, this.state.price)){
      eff = calcEfficiency(e.target.value, this.state.price);
    }

    this.setState({
      size: e.target.value,
      efficiency: eff
    });
  },

  changePrice: function(e) {
    eff = "";
    if(checkInput(this.state.size, e.target.value)){
      eff = calcEfficiency(this.state.size, e.target.value);
    }

    this.setState({
      price: e.target.value,
      efficiency: eff
    });
  },

  changeLocation: function(e) {
    this.setState({
      location: e.target.value
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="small-3 columns">
          <input placeholder="size" type="number" value={this.state.size} onChange={this.changeSize} />
        </div>
        <div className="small-3 columns">
          <div className="row collapse">
            <div className="small-3 large-2 columns">
              <span className="prefix">$</span>
            </div>
            <div className="small-9 large-10 columns">
              <input placeholder="price" type="text" value={this.state.price} onChange={this.changePrice} />
            </div>
          </div>
        </div>
        <div className="small-3 columns">
          <input placeholder="location" type="text" value={this.state.location} onChange={this.changeLocation} />
        </div>
        <div className="small-3 columns">
          <div className="small-12 columns">
            <div className="row collapse">
              <div className="small-8 columns">
                <input type="text" value={this.state.efficiency} disabled />
              </div>
              <div className="small-4 columns">
                <span className="postfix">$/in<sup>2</sup></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

React.render(
  <Margherita />,
  document.getElementById("app")
);
