const frag = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D uMainSampler;
    varying vec2 outTexCoord;

    void main( void ) {
        vec2 uvv = resolution;
        vec2 uv = outTexCoord;
        // // uv.x += (sin((u_mouse.y - (time * 1.0)) * 10.0) * 0.1);
        uv.x += (sin((uv.y - (time * 0.002)) * 6.0) * 0.1);
        // uv.y += (sin((uv.y - (time * 0.005)) * 1.0) * 0.1);
        // //uv.x += (sin((gl_FragCoord.y - time) * 0.5) * 0.05);
        // //uv.y += cos(time) * 0.05;
        // // uv.y = gl_FragCoord.y;
        // //uv.y += (sin((uv.y - (gl_FragCoord.y)) * 6.0) * 0.1);
        // // uv.y += (sin((gl_FragCoord.x - (time * 0.1)) * 0.1) * 0.1);
        vec4 texColor = texture2D(uMainSampler, uv);
        gl_FragColor = texColor;
    }
`;

export default frag;