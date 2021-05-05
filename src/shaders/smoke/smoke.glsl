precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

vec3 hash3( vec2 p )
{
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q)*43758.5453);
}

float voronoise( in vec2 p, float u, float v, float u_time )
{
	float k = 1.0+64.0*pow(1.0-v,6.0);
    vec2 i = floor(p);
    vec2 f = fract(p);
	vec2 a = vec2(0.0,0.0);
    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2  g = vec2( x, y );
		vec3  o = hash3( i + g )*vec3(u,u,1.0);
        o = 0.5 + 0.5*sin( u_time + 6.2831*o );
		vec2  d = g - f + o.xy;
		float w = pow( 1.0-smoothstep(0.0,1.414,length(d)), k );
		a += vec2(o.z*w,w);
    }
    return a.x/a.y;
}

void main( void ) {
    //vec2 st = outTexCoord.xy;
    vec4 a = vec4(0,0,0,0);

    vec2 uv = outTexCoord;
    

    vec4 influencing_color_B = texture2D(uMainSampler,  uv.xy);
    //float z = 0.5 - 0.5*sin( u_time*10.5 );
    // vec2 p = vec2(0.1,z); // 0.9 - 0.1*cos( u_time*vec2(1.9,0.5) );
    vec2 p = 0.9 - 0.1*sin( u_time*vec2(1.9,0.5) );
    // p = p*p*(3.0-2.0*p);
	// p = p*p*(3.0-2.0*p);
	//p = p*p*(3.0-2.0*p);

    p.x += sin(u_time * 0.2);

    float f = voronoise( 15.0*uv, p.x, p.y, u_time );

    vec4 b = mix(
        influencing_color_B,
        a,
        f);

    gl_FragColor = b; // bvec4( f, f, f, 1.0 );

    
}
