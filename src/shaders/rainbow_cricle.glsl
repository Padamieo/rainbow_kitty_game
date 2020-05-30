precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
// varying vec4 gl_FragCoord;

#define TWO_PI 6.28318530718


void main(){
    vec2 coord = (gl_FragCoord.xy / u_resolution);
    vec3 color = vec3(0.5);

    float angle = atan(-coord.y + 0.5, coord.x - 0.5) *0.1;
    float len = length(coord - vec2(0.5, 0.8));

    color.r += sin(len * 8.0 - u_time * 5.0);
    color.g += sin(len * 4.0 - u_time * 5.0);
    color.b += sin(len * 12.0 - u_time * 4.9);
    // color.a = 1.0;

    // vec4 influencing_color_A = vec4(0., 0., 0., 0.);
    vec4 texColor = texture2D(uMainSampler, outTexCoord.xy);
    vec4 influencing_color_B = vec4(color.r, color.g, color.b, 0.9);
    

    vec4 color2 = mix(
    texColor,
    influencing_color_B,
     texColor.a * outTexCoord.y); // * outTexCoord.y

    // vec4 color3 = mix(
    // color2,
    // texColor,
    //  outTexCoord.y *  texColor.a);

    gl_FragColor = color2; // vec4(color, texColor.a); // vec4(color2, 1.0);
}
