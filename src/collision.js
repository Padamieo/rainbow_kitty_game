import SAT from 'sat';

var c = {

  alculate_rotated_square: function(obj){
    var V = SAT.Vector;
    var P = SAT.Polygon;

    var x = obj.x;
    var y = obj.y;
    var a = obj.angle;

    //console.log(obj.getTopLeft().x);

    var tl = obj.getTopLeft();
    var tr = obj.getTopRight();
    var br = obj.getBottomRight();
    var bl = obj.getBottomLeft();

    //console.log(l,r,t,b);

    //var tl = c.rotate(x, y, l, t, a);
    // var tr = c.rotate(x, y, r, t, a);
    // var br = c.rotate(x, y, r, b, a);
    // var bl = c.rotate(x, y, l, b, a);
    //
    // obj.poly = new P(new V(x, y), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);

    obj.poly = new P(new V(x, y), [ new V(tl.x, tl.y), new V(tr.x, tr.y), new V(br.x, br.y), new V(bl.x, bl.y) ]);
  },

  ollision_square_square: function(obj_a, obj_b){
    //return SAT.testPolygonPolygon(obj_a.poly, obj_b.poly/*, response*/); //response object is optional, will contain all the points that overlap
    var response = new SAT.Response();
    return SAT.testPolygonPolygon(obj_b.poly, obj_a.poly, response);
  },

  // ollision_circle_square: function(obj_a, obj_b){
  //   var V = SAT.Vector;
  //   var C = SAT.Circle;
  //
  //   var circle = new C(new V(obj_b.x,obj_b.y), 0);
  //
  //   c.alculate_rotated_square(obj_a);
  //
  //   var collided = SAT.testPolygonCircle(obj_a.poly, circle );
  //
  //   if (collided){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // },

  // rotate: function(cx, cy, x, y, angle){
  //
  //   // var posangle = (angle < 0 ? angle+Math.PI*2 : angle);
  //   // var radians = (Math.PI / 180) * posangle;
  //   var cos = Math.cos(angle);
  //   var sin = Math.sin(angle);
  //   var nx = (x - cx) * cos - (y - cy) * sin;
  //   var ny = (y - cy) * cos + (x - cx) * sin;
  //
  //   return [nx, ny];
  // },
  //
  // alculate_cordinates: function(object){
  //   for (var i = 0, l = object.length; i < l; i++){
  //     if(object[i].alive){
  //       c.alculate_rotated_square(object[i]);
  //     }
  //   }
  // }

};

module.exports = c;
