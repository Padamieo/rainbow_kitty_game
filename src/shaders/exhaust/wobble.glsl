precision mediump float;

uniform float u_time;
uniform vec2 resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main( void ) {
    vec2 uvv = resolution;
    vec2 uv = outTexCoord;

    uv.x += (sin((uv.y - u_time) * 10.0) * 0.1);

    vec4 texColor = texture2D(uMainSampler, uv);
    gl_FragColor = texColor;
}