precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
// varying vec4 gl_FragCoord;

#define TWO_PI 6.28318530718

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    float width = u_resolution.x;
    float halfWidth = width*0.5;

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    toCenter.y = toCenter.y+0.5;
    float angle = atan(toCenter.y*0.5,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    float t = u_time * 0.3;

    vec2 uv = outTexCoord.xy;
    uv.x -= sin((gl_FragCoord.y + u_time) * 0.03) * 0.2;
    // uv.x -= sin((uv.y - u_time) * 2.0) * 0.1;

    vec4 texColor = texture2D(uMainSampler, uv.xy);

    color = hsb2rgb(vec3((angle/TWO_PI)+t,radius, texColor.a));
    
    
    gl_FragColor = vec4(color, texColor.a);

    // vec2 uv = gl_FragCoord.xy/u_resolution;
    // vec3 col = vec3( smoothstep( 0.1, 0.1 - 0.005, length( uv - 0.5 ) ) );
    // gl_FragColor = vec4( col, 1 );
}
