precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

uniform vec2 texSize;

uniform vec2 center;

float wobble(float p, float amplitude, float frequence, float speed) {
    return amplitude * sin(p * frequence + u_time * speed);
}

vec2 zoom(vec2 uv, float amt) {
    return 0.5 + ((uv - 0.5) * amt);	
}


void main( void ) {

    // // float halfWidth = u_resolution.x*0.5;
    // // float halfHeight = u_resolution.y*0.5;

    // vec2 uv = outTexCoord.xy;
    // // uv.x -= (sin((uv.y - u_time) * 1.0) * ((gl_FragCoord.x)*0.0005) );
    // // uv += sin(u_time) * 0.2;

    // vec4 texColor = texture2D(uMainSampler, uv);
    // vec4 front = texture2D(uMainSampler, uv.xy);
    
    // vec2 innerFlame = outTexCoord.xy;
    // // innerFlame.x -= (sin((innerFlame.y - u_time) * 1.0) * 0.1);
    
    // vec4 front2 = texture2D(uMainSampler, innerFlame.xy);

    // vec4 influencing_color_A = vec4(0., 0., 0., 0.);
    // vec4 influencing_color_B = vec4(front2.r, front2.g, front2.b, front2.a);
    // vec4 influencing_color_C = vec4(front.r*1.2, front.g*0.9, front.b*0.9, 0.0);
    
    // vec4 color = vec4(0.0);

    // color = mix( influencing_color_C,
    //              influencing_color_A,
    //              outTexCoord.y);

    // vec4 color3 = mix( influencing_color_B * sin(u_time) * 5.0,
    //              influencing_color_A,
    //              0.9 );

    // vec4 color2 = mix( color,
    //              color3,
    //              outTexCoord.y * texColor.a);

    // gl_FragColor = color3; // vec4(color.rgb + uMainSampler.a);


    float a = 0.01;
	float f = 50.0;
	float s = 8.0;
 
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    vec2 uv2 = outTexCoord.xy;
    
    uv.x += wobble(uv.y, a, f, s);
    uv2.y += wobble(uv.x, a, f, s) + u_time * 0.1;
    
    // uv = zoom(uv, 1.0 - a*3.);

    vec4 blank = vec4(0., 0., 0., 0.);

    vec4 blanks = vec4(sin(uv2.y*20.0), sin(uv2.y*15.0), sin(uv2.y*18.0), 0.);
    vec4 wobble = texture2D(uMainSampler, uv);
    vec4 normal = texture2D(uMainSampler, outTexCoord.xy);
    vec4 color = vec4(0.0);
    

    vec2 tc = outTexCoord * texSize;
    tc.y += sin(tc.y * 0.5);
    tc.x += sin(tc.y * 0.2 + uv.y);

    vec4 x = texture2D(uMainSampler, tc / texSize);

    color = mix(
    blank,
    x,
    x.y);

        //    blank.r * normal.a);
    // color = mix(normal,
    //     wobble,
    //     normal.a / color.r);
    // color = mix(
    //     wobble,
    //     color,
    //     wobble.a
    // );


    

	//tc = center;
    gl_FragColor = color;//color;
}