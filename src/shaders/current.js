const frag = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D uMainSampler;
    varying vec2 outTexCoord;

    void main( void ) {
        vec2 uvv = resolution;
        vec2 uv = outTexCoord;
        vec2 coordinates = outTexCoord/resolution.xy;

        const float blurSize = 1.0;
        const int range = int(floor(blurSize/2.0));

        vec4 colors = vec4(0);

        for (int x = -range; x <= range; x++) {
            for (int y = -range; y <= range; y++) {
                vec4 color = texture2D(uMainSampler,
                       coordinates+vec2(float(x)*resolution.x),
                       float(y)/resolution.y
                );
                colors += color;
            }
        }
        vec4 finalColor = colors/pow(blurSize, 2.);
        // vec4 texColor = texture2D(uMainSampler, uv);
        gl_FragColor = finalColor;
    }
`;

export default frag;