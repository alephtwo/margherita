var Margherita = React.createClass({
  render: function() {
    return (
      <App />
    );
  }
});

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
      location: ""
    }
  },

  changeSize: function(e) {
    this.setState({
      size: e.target.value
    });
  },

  changePrice: function(e) {
    this.setState({
      price: e.target.value
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
        <div className="small-2 columns">
          <input placeholder="size" type="text" className="size" value={this.state.size} onChange={this.changeSize} />
        </div>
        <div className="small-4 columns">
          <input placeholder="price" type="text" className="price" value={this.state.price} onChange={this.changePrice} />
        </div>
        <div className="small-6 columns">
          <input placeholder="location" type="text" className="location" value={this.state.location} onChange={this.changeLocation} />
        </div>
      </div>
    )
  }
});

React.render(
  <Margherita />,
  document.getElementById("app")
);
