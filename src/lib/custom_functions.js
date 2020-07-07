function angle(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return radToDeg(Math.atan2(y, x));
}

function radToDeg (rad){
  return (rad * 180) / Math.PI;
}

export function rotationAngle(oldCoord = {x:0, y:0}, currentCoord = {x:0, y:0}, newCoord = {x:0, y:0}) {
  if (
    Object.prototype.hasOwnProperty.call(oldCoord, "x") && Object.prototype.hasOwnProperty.call(oldCoord, "y") && 
    Object.prototype.hasOwnProperty.call(currentCoord, "x") && Object.prototype.hasOwnProperty.call(currentCoord, "y") && 
    Object.prototype.hasOwnProperty.call(newCoord, "x") && Object.prototype.hasOwnProperty.call(newCoord, "y")
  ) {
    let oldAngle = angle(oldCoord.x, oldCoord.y, currentCoord.x, currentCoord.y)
    let newAngle = angle(currentCoord.x, currentCoord.y, newCoord.x, newCoord.y)
    return Math.abs(newAngle - oldAngle);
  }
} 