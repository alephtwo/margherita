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
        <div className="btn-group">
          <button type="button" className="btn btn-danger" onClick={this.removeRow}>
            <i className="fa fa-minus"></i>
          </button>
          <button type="button" className="btn btn-primary" onClick={this.addRow}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
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
      <div className="form-inline">
        <div className="form-group">
          <div className="row" style={{paddingBottom: '1em'}}>
            <div className="col-xs-3">
              <input className="form-control" placeholder="size" type="number" value={this.state.size} onChange={this.changeSize} />
            </div>
            <div className="col-xs-3">
              <input className="form-control" placeholder="price" type="text" value={this.state.price} onChange={this.changePrice} />
            </div>
            <div className="col-xs-3">
              <input className="form-control" placeholder="location" type="text" value={this.state.location} onChange={this.changeLocation} />
            </div>
            <div className="col-xs-3">
              <input className="form-control" type="text" value={this.state.efficiency} disabled />
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
