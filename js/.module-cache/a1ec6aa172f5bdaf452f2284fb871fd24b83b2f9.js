var nonNumbers = /[^0-9\.]/g;
var bestAvailable = "buy it";

function calcEfficiency(size, price){
  var radius = size / 2.0;
  var calc = (price / (Math.PI * Math.pow(radius, 2)))
  var result = calc.toString().substring(0, 9);

  if (calc > Math.pow(10, 9)){
    result = "i can't even";
  } else if (calc < Math.pow(10, -7)){
    result = bestAvailable;
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

    var effArray = $.makeArray($(" .efficiency ")).filter(function(a){ return a.value !== ""});
    var absMin = _.min(effArray.map(function(a){ return Number(a.value) }));
    if (_.any(effArray, function(e) { return e.value == bestAvailable })){
      absMin = bestAvailable;
    }

    $( ".efficiency" ).each(function(){
      if ($(this).val() == absMin && $(this).val() != ""){
        $(" #row-" + $(this).data("index")).addClass("has-success");
      } else {
        $(" #row-" + $(this).data("index")).removeClass("has-success");
      }
    });

  });
}

var Margherita = React.createClass({displayName: "Margherita",
  render: function() {
    return (
      React.createElement(App, null)
    );
  }
});

var App = React.createClass({displayName: "App",

  getInitialState: function() {
    return {
      rows: Immutable.List.of(React.createElement(DataRow, {key: "0", index: "0"}))
    }
  },

  addRow: function() {
    this.setState({
      rows: this.state.rows.push(React.createElement(DataRow, {key: this.state.rows.size, index: this.state.rows.size}))
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
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"}, 
          React.createElement("div", {className: "btn-group"}, 
            React.createElement("button", {type: "button", className: "btn btn-danger", onClick: this.removeRow}, 
              React.createElement("i", {className: "fa fa-minus"})
            ), 
            React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.addRow}, 
              React.createElement("i", {className: "fa fa-plus"})
            )
          )
        ), 
        React.createElement("div", {className: "panel-body"}, 
          this.state.rows
        ), 
        React.createElement("div", {className: "panel-footer"}, 
          React.createElement("audio", {controls: true, autoPlay: true, loop: true}, 
            React.createElement("source", {src: "assets/willamette-mall.mp3", type: "audio/mp3"})
          ), 
          React.createElement("br", null), 
          React.createElement("span", null, React.createElement("em", null, "Willamette Mall Music is ", React.createElement("i", {className: "fa fa-copyright"}), " Capcom 2006"))
        )
      )
    );
  }
});

var DataRow = React.createClass({displayName: "DataRow",
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

    var sizeClass = "col-xs-12 col-sm-6 col-md-3 form-group" + (this.state.size.toString().match(nonNumbers) || this.state.size === "0" ? " has-error" : "");
    var priceClass = "col-xs-12 col-sm-6 col-md-3 form-group" + (this.state.price.toString().match(nonNumbers) ? " has-error" : "");
    var locationClass = "col-xs-12 col-sm-6 col-md-3 form-group";
    var efficiencyClass = "col-xs-12 col-sm-6 col-md-3 form-group";

    return (
      React.createElement("div", {className: "row", id: 'row-' + this.props.index}, 

        React.createElement("div", {className: locationClass}, 
          React.createElement("input", {className: "form-control", placeholder: "location", type: "text", value: this.state.location, onChange: this.changeLocation})
        ), 

        React.createElement("div", {className: sizeClass}, 
          React.createElement("div", {className: "input-group"}, 
            React.createElement("input", {className: "form-control", placeholder: "size", type: "text", value: this.state.size, onChange: this.changeSize}), 
            React.createElement("div", {className: "input-group-addon"}, "in")
          )
        ), 

        React.createElement("div", {className: priceClass}, 
          React.createElement("div", {className: "input-group"}, 
            React.createElement("div", {className: "input-group-addon"}, "$"), 
            React.createElement("input", {className: "form-control has-success", placeholder: "price", type: "text", value: this.state.price, onChange: this.changePrice})
          )
        ), 

        React.createElement("div", {className: efficiencyClass}, 
          React.createElement("div", {className: "input-group"}, 
            React.createElement("input", {className: "efficiency form-control", type: "text", value: this.state.efficiency, onChange: evalBest(), "data-index": this.props.index, readOnly: true}), 
            React.createElement("div", {className: "input-group-addon"}, "$/in", React.createElement("sup", null, "2"))
          )
        )

      )
    )
  }
});

React.render(
  React.createElement(Margherita, null),
  document.getElementById("app")
);
