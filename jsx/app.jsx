var nonNumbers = /[^0-9\.]/g;

function calcEfficiency(size, price){
  var radius = size / 2.0;
  var calc = (price / (Math.PI * Math.pow(radius, 2)))
  var result = calc.toString().substring(0, 9);

  if (calc > Math.pow(10, 9)){
    result = "just don't";
  } else if (calc < Math.pow(10, -7)){
    result = "buy it!";
  }
  return result;
}

function checkInput(size, price){
  return (size !== ""
          && price !== ""
          && size.toString().match(nonNumbers) == null
          && price.toString().match(nonNumbers) == null
          && size > 0);
}

function evalBest(){
  window.requestAnimationFrame(function(){
    var absMin = _.min($.makeArray($(" .efficiency ")).filter(function(a){ return a.value !== ""}).map(function(a){ return Number(a.value) }));
    $(" .efficiency" ).each(function(){
      if (($(this).val() == "just buy it!" || $(this).val() == absMin) && $(this).val() != ""){
        $(" #row-" + $(this).data("index")).addClass("has-success");
      } else {
        $(" #row-" + $(this).data("index")).removeClass("has-success");
      }
    });
  });
}

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
      rows: Immutable.List.of(<DataRow key="0" index="0" />)
    }
  },

  addRow: function() {
    this.setState({
      rows: this.state.rows.push(<DataRow key={this.state.rows.size} index={this.state.rows.size} />)
    });
  },

  removeRow: function() {
    if(this.state.rows.size > 1){
      this.setState({
        rows: this.state.rows.pop()
      });
    }
  },

  render: function() {
    return (
      <form className="text-center">
        {this.state.rows}
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
    this.setState({
      size: e.target.value,
      efficiency: checkInput(e.target.value, this.state.price) ? calcEfficiency(e.target.value, this.state.price) : "",
    });
  },

  changePrice: function(e) {
    this.setState({
      price: e.target.value,
      efficiency: checkInput(this.state.size, e.target.value) ? calcEfficiency(this.state.size, e.target.value) : "",
    });
  },

  changeLocation: function(e) {
    this.setState({
      location: e.target.value
    });
  },

  render: function() {

    var sizeClass = "col-xs-2 col-xs-offset-1 form-group" + (this.state.size.toString().match(nonNumbers) || this.state.size === "0" ? " has-error" : "");
    var priceClass = "col-xs-2 form-group" + (this.state.price.toString().match(nonNumbers) ? " has-error" : "");
    var locationClass = "col-xs-3 form-group";
    var efficiencyClass = "col-xs-2 form-group";

    return (
      <div className="row" id={'row-' + this.props.index}>

        <div className={sizeClass}>
          <div className="input-group">
            <input className="form-control" placeholder="size" type="text" value={this.state.size} onChange={this.changeSize} />
            <div className="input-group-addon">in</div>
          </div>
        </div>

        <div className={priceClass}>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input className="form-control has-success" placeholder="price" type="text" value={this.state.price} onChange={this.changePrice} />
          </div>
        </div>

        <div className={locationClass}>
          <input className="form-control" placeholder="location" type="text" value={this.state.location} onChange={this.changeLocation} />
        </div>

        <div className={efficiencyClass}>
          <div className="input-group">
            <input className="efficiency form-control" type="text" value={this.state.efficiency} onChange={evalBest()} data-index={this.props.index} readOnly />
            <div className="input-group-addon">$/in<sup>2</sup></div>
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
