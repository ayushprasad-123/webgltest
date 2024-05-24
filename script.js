var gl,colorUniformLocation;
var then=0;
var loaded=0;
main();
function main(){
  var canvas=document.getElementById("c");
  gl=canvas.getContext('webgl');
  var vertexShaderSource=document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource=document.querySelector("#fragment-shader-2d").text;
  var vertexShader=createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
  var fragmentShader=createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);
  var program=createProgram(gl,vertexShader,fragmentShader);
  var positionAttributeLocation=gl.getAttribLocation(program,"a_position");
  var resolutionUniformLocation=gl.getUniformLocation(program,"u_resolution");
  colorUniformLocation=gl.getUniformLocation(program,"u_color");
  var positionBuffer=gl.createBuffer();
  var positions = [];
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation,2,gl.FLOAT,false,0,0);
  var flag=new Image();
  flag.src="./Flag-India.webp";
  flag.onload=imgOnLoad;
  requestAnimationFrame(drawScene);
}

function createShader(gl,type,source){
  var shader=gl.createShader(type);
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  var success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
  if(success){
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl,vert,frag){
  var program=gl.createProgram();
  gl.attachShader(program,vert);
  gl.attachShader(program,frag);
  gl.linkProgram(program);
  var success=gl.getProgramParameter(program,gl.LINK_STATUS);
  if(success){
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function drawRect(x,y,width,height,col){
  var positions=[x,y,x,y-height,x+width,y-height,x,y,x+width,y-height,x+width,y];
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
  gl.uniform4f(colorUniformLocation,col[0],col[1],col[2],1);
  gl.drawArrays(gl.TRIANGLES,0,6);
}

function drawScene(now){
  var time=now/1000;
  gl.canvas.width=gl.canvas.clientWidth;
  gl.canvas.height=gl.canvas.clientHeight;
  gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
  var delta=now-then;
  if(loaded){
    drawRect(-1,1,2,2,[1,0.5,0]);
  }else if(1){
    drawRect(-1,1,2,2,[0,0,0]);
  }
  then=now;
  requestAnimationFrame(drawScene);
}
function imgOnLoad(){
  loaded=1;
}
