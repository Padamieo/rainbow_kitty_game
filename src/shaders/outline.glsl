precision mediump float;

uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

uniform float time;
uniform float delta;
uniform vec2 resolution;

void main(void) {
    vec2 uvv = resolution;
    vec2 uv = outTexCoord;
    vec2 uv2 = resolution;
    // // uv.x += (sin((u_mouse.y - (time * 1.0)) * 10.0) * 0.1);
    uv.x += (sin((uv.y - (time * 0.002)) * 6.0) * 0.1);
    // uv.y += (sin((uv.y - (time * 0.005)) * 1.0) * 0.1);
    // //uv.x += (sin((gl_FragCoord.y - time) * 0.5) * 0.05);
    // //uv.y += cos(time) * 0.05;
    // // uv.y = gl_FragCoord.y;
    // //uv.y += (sin((uv.y - (gl_FragCoord.y)) * 6.0) * 0.1);
    // // uv.y += (sin((gl_FragCoord.x - (time * 0.1)) * 0.1) * 0.1);
    // vec4 texColor = texture2D(uMainSampler, uv);
    // gl_FragColor = texColor;

    uv2.y += (sin((uv2.y - (time * 0.005)) * 1.0) * 0.1);

    vec4 front = texture2D(uMainSampler, uv2);

    vec4 color = texture2D(uMainSampler, uv);
    vec4 colorU = texture2D(uMainSampler, vec2(outTexCoord.x, outTexCoord.y - 0.001));
    vec4 colorD = texture2D(uMainSampler, vec2(outTexCoord.x, outTexCoord.y + 0.1));
    vec4 colorL = texture2D(uMainSampler, vec2(uv2.x + 0.1, outTexCoord.y));
    vec4 colorR = texture2D(uMainSampler, vec2(outTexCoord.x - 0.1, outTexCoord.y));

    gl_FragColor = color;

    if (color.a == 0.0 && (colorU.a != 0.0 || colorD.a != 0.0 || colorL.a != 0.0 || colorR.a != 0.0)  ) {
        gl_FragColor = vec4(front.r, front.g, front.b, 1.0);
    }
}
// https://phaser.discourse.group/t/sprite-outline-via-shader-showcase-looking-for-improvements/2375