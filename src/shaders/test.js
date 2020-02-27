const frag = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D uMainSampler;
    varying vec2 outTexCoord;

    void main( void ) {
    vec2 coordinates = fragCoord/resolution.xy;
    const float blurSize = 25.0;
    const int range = int(floor(blurSize/2.0));

    vec4 colors = vec4(0);

    for (int x = -range; x <= range; x++) {
        for(int y = -range; y <= range; y++){
            vec4 color = texture(
                iChannel0,
                coordinates+vec2(
                    float(x)/resolution.x,
                    float(y)/resolution.y
                )
            );
            colors += color;
        }
    }

    vec4 finalColor = colors/pow(blurSize,2.);
    fragColor = finalColor;
}

    // void main( void ) {
        // vec2 uvv = resolution;
        // vec2 uv = outTexCoord;
        // // uv.x += (sin((u_mouse.y - (time * 1.0)) * 10.0) * 0.1);
        // uv.x += (sin((uv.y - (time * 0.005)) * 6.0) * 0.1);
        // uv.y += (sin((uv.y - (time * 0.005)) * 1.0) * 0.1);
        // //uv.x += (sin((gl_FragCoord.y - time) * 0.5) * 0.05);
        // //uv.y += cos(time) * 0.05;
        // // uv.y = gl_FragCoord.y;
        // //uv.y += (sin((uv.y - (gl_FragCoord.y)) * 6.0) * 0.1);
        // // uv.y += (sin((gl_FragCoord.x - (time * 0.1)) * 0.1) * 0.1);
        // vec4 texColor = texture2D(uMainSampler, uv);
        // gl_FragColor = texColor;
    // }
`;

export default frag;