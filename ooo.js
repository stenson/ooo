var _ = require("underscore")._;

var ooo = (function() {
  // the functions state variables
  var stack = [],
    // the master of ceremonies
    oooo = function(value) {
      stack.push(value);
      // helpers could be arbitrary length
      if(value.is) {
        stack.pop();
        var helpers = _.toArray(arguments).slice(1),
          args = stack.slice(-(value.is.length-helpers.length));
        // add helpers to the end
        args = args.concat(helpers);
        var _value = value.is.apply(null,args);
        stack.push(_value);
      }
      else if(_.isFunction(value)) {
        stack.pop();
        value(stack.slice(-1)[0]);
      }
      else {
        var args = _.toArray(arguments),
          length = args.length;
        // pushing a list-style array
        if(length > 1) {
          stack.pop();
          stack.push(args);
        }
      }
      return oooo;
    };
  // give it back!
  return oooo;
})();

// add control statements
_.extend(ooo,{
  branch: {
    is: function(a,b,condition) {
      return condition ? a : b;
    }
  },
  map: {
    is: function(xs,fn) {
      _.map(xs,fn);
    }
  },
  log: {
    is: function(x) {
      console.log(x);
    }
  }
});

with(ooo) {
  var x = 1;
  // ooo it!
  ooo
    (1, 2, 3)
    (4, 5, 6)
    (branch, x === 3)
    (log)
    
    // (map,function(n){
    //   return n + 1;
    // })
    // (filter,function(n){
    //   return n === 3;
    // })
    // (log)
}