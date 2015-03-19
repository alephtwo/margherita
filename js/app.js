$("#calculate").click(function(){

  prices = $(".price").map(function(){ return this.value }).get();
  sizes = $(".size").map(function(){ return this.value }).get();

  calcs = [];
  for (i = 0; i < prices.length; i++){
    calcs[i] = prices[i] / (Math.PI * Math.pow(sizes[i] / 2.0, 2));
  }
});