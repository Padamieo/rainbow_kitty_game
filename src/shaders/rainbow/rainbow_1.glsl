precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main(){
    // fixed position for now to keep calc simple
    float x = 0.5;
    float y = 0.9;

    vec2 coord = gl_FragCoord.xy / u_resolution;

    vec2 iMouse = vec2(300.0, 1.0);

	vec2 uv = gl_FragCoord.xy / u_resolution;
	vec2 mousePos = vec2(x, y - 0.8);
	float radio = 0.8;
    
	uv.y *= u_resolution.y / u_resolution.x;
	mousePos.y *= u_resolution.y / u_resolution.x;
	
	if(length(uv - mousePos) <= radio) { // Fish eye effect!!
		float newLength;
		
		uv -= mousePos;
        
		newLength = 1.0 * pow(length(uv) / radio,  0.5) * length(uv); // Change exponent value and see!!
        
		uv /= length(uv);
		uv *= newLength;
		uv += mousePos;
	}


    float len = length(coord - vec2(x, y)) - (u_time * 0.6);

    //vec4 textureColor = texture2D(uMainSampler, outTexCoord.xy);
    vec4 textureColor = texture2D(uMainSampler, vec2(uv.x, outTexCoord.y));
    
    vec4 no_colour = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 rainbow_colour = vec4(hsv2rgb(vec3(len, 1.0, 1.0)), 1.0);

    vec4 solid_colour = mix(
    no_colour,
    rainbow_colour,
    textureColor.a);

    vec4 fade_based_height = mix(
    no_colour,
    rainbow_colour,
    textureColor.a * outTexCoord.y);

    vec4 final_colour = mix(
    fade_based_height,
    solid_colour,
    coord.y);

    gl_FragColor = final_colour;
}