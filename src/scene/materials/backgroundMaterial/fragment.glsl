precision lowp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
varying vec2 vUv;

mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
    p.xz*= m(uTime*0.4);p.xy*= m(uTime*0.3);
    vec3 q = p*2.+uTime;
    return length(p+vec3(sin(uTime*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void main() {
    vec2 uv = vUv;
    // vec2 p = gl_FragCoord.xy/uResolution.y - vec2(.9,.5);
    vec2 p = (uv - vec2(0.7, 0.5)) ;
    vec3 cl = vec3(0.);
    float d = 2.5;
    for(int i=0; i<=5; i++)	{
		vec3 p = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p);
		float f =  clamp((rz - map(p+.1))*0.5, -.1, 1. );
        vec3 l = vec3(0.1,0.3,.4) + vec3(5., 2.5, 3.)*f;
        cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
		d += min(rz, 1.);
	}
    gl_FragColor = vec4(vec3(cl - uColor), 1.0);
}