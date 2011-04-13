var _ = require("underscore")._;

var ooo = (function() {
  // the functions state variables
  var saves = {},
    stack = [],
    // the master of ceremonies
    oooo = function(value,depth) {
      
      if(value === oooo.unbox) return oooo.unbox();
      // if it's a function, we should do something
      else if(_.isFunction(value)) {
        var helpers = _.toArray(arguments).slice(2),
          args = stack.slice(-depth).concat(helpers),
          _value = value.apply(null,args);
        stack.push(_value);
      }
      // otherwise it's a value to throw on the stack
      else {
        var args = _.toArray(arguments);
        stack.push(args);
      }
      // always (except for unbox) the function itself
      console.log("\n\n",saves,"\n\n",stack,"\n\n");
      return oooo;
    };
  // add some standard control flow methods
  _.extend(oooo,{
    unbox: function(name) {
      return (name) ? saves[name] : stack.slice(-1)[0];
    },
    save: function(value,name) {
      saves[name] = value;
    },
    branch: function(a,b,condition) {
      return condition ? a : b;
    }
  });
  // now give it up!
  return oooo;
})();

with(ooo) {
  var x = 1;
  
  ooo
    (1, 2, 3)
    (4, 5, 6)
    (branch, 2, x === 3)
    (_.map, 1, function(n){
      return n + 1;
    })
    (save, 1, "x")
}