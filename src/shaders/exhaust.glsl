precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
// varying vec4 gl_FragCoord;

void main( void ) {

    float halfWidth = u_resolution.x*0.5;
    float halfHeight = u_resolution.y*0.5;

    vec2 uv = outTexCoord.xy;
    uv.x -= (sin((uv.y - u_time) * 5.0) * ((gl_FragCoord.x-halfWidth)*0.0005) );
    // uv += sin(u_time) * 0.2;

    vec4 texColor = texture2D(uMainSampler, uv);
    vec4 front = texture2D(uMainSampler, uv.xy);
    
    vec2 innerFlame = outTexCoord.xy;
    innerFlame.x -= (sin((innerFlame.y - u_time) * 8.0) * 0.1);
    
    vec4 front2 = texture2D(uMainSampler, innerFlame.xy);

    vec4 influencing_color_A = vec4(0., 0., 0., 0.);
    vec4 influencing_color_B = vec4(front2.r, front2.g, front2.b, front2.a);
    vec4 influencing_color_C = vec4(front.r*1.2, front.g*0.9, front.b*0.9, 0.0);
    
    vec4 color = vec4(0.0);

    color = mix( influencing_color_C,
                 influencing_color_A,
                 outTexCoord.y);

    vec4 color3 = mix( influencing_color_B*2.5,
                 influencing_color_A,
                 outTexCoord.y);

    vec4 color2 = mix( color,
                 color3,
                 outTexCoord.y * texColor.a);

    gl_FragColor = color2; // vec4(color.rgb + uMainSampler.a);

}