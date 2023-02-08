
const slugify = require('slugify')

const rxOne = /^[\],:{}\s]*$/;
const rxTwo = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rxFour = /(?:^|:|,)(?:\s*\[)+/g;


export function QueryString(params: any) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[ k ]))
        .join('&');
}


export function Slugify(text: string) {

    return slugify(text, {
        replacement: '-',
        lower: true,
        strict: true,
        trim: true
    });
}

export const isJSON = (input: string) => (
    input.length && rxOne.test(
        input.replace(rxTwo, '@')
            .replace(rxThree, ']')
            .replace(rxFour, '')
    )
);