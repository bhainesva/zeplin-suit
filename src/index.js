/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

const cross = (a, b) => {
    return [a[1]*b[2] - a[2]*b[1],
            a[2]*b[0] - a[0]*b[2],
            a[0]*b[1] - a[1]*b[0]];
}

const darkness = (color) => mag(diff([color.r, color.g, color.b], [255, 255, 255]));

const getOrdinal = (number) => {
    const ords = [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
        "quinary",
        "senary",
        "septenary",
        "octonary",
        "nonary",
        "denary"
    ]

    if (number < 10) {
        return ords[number];
    }

    return "" + number;
}

const diff = (x1, x2) => pairify(x1, x2).map((pair) => pair[0] - pair[1]);

const mag = (arr) => Math.sqrt(arr.map(x => x**2).reduce((total, num) => total + num));

const pairify = (x, y) => {
    let out = [];
    x.forEach((val, i) => {
        out.push([val, y[i]]);
    });
    return out;
}

const isGray = (color) => {
    const x_1 = [0, 0, 0];
    const x_2 = [1, 1, 1];
    const x_0 = [color.r, color.g, color.b];
    return (mag(cross(diff(x_0, x_1), diff(x_0, x_2))) / mag(diff(x_2, x_1))) < 25;
}
 
function layer(context, selectedLayer) {

}

function styleguideColors(context, colors) {
    const brandColors = colors.filter(color => !isGray(color));
    const grays = colors.filter(isGray);

    let out = "";

    for (const [idx, color] of brandColors.entries()) {
        const hexRep = color.toHex();
        out += `$brand-${getOrdinal(idx)}: `;
        out += `#${hexRep.r}${hexRep.g}${hexRep.b};`;
        out += "\n";
    }
    out += "\n";

    for (const [idx, color] of grays.entries()) {
        const hexRep = color.toHex();
        out += `$gray-${idx}: `;
        out += `#${hexRep.r}${hexRep.g}${hexRep.b};`;
        out += "\n";
    }

    return {
        code: out,
        language: 'scss'
    };
}

const getPrimaryFontFamily = (textStyles) => {
    let min = 0;
    let minFamily = "";
    
    for (const style of textStyles) {
        if (!min || style.fontSize < min) {
            min = style.fontSize;
            minFamily = style.fontFace;
        }
    }

    return minFamily;
}

const defaultVal = (prop) => {
    const vals = {
        'fontStyle': 'normal',
        'letterSpacing': 'normal',
        'lineHeight': 'normal',
        'fontWeight': 'normal'
    }

    if (prop in vals) {
        return vals[prop];
    }

    return '';
}

const getBase = (textStyles) => {
    const props = ['fontStyle', 'letterSpacing', 'fontFamily', 'fontSize', 'lineHeight', 'fontWeight'];
    let baseStyle = new Map(['fontStyle', 'letterSpacing', 'fontFamily', 'fontSize', 'lineHeight', 'fontWeight'].map((prop) => [prop, defaultVal(prop)]));

    for (const prop of props) {
        baseStyle.set(prop, mostCommonVal(textStyles, prop));
    }

    return baseStyle;
}

const mostCommonVal = (textStyles, prop) => {
    let counts = new Map();
    for (const style of textStyles) {
        const val = style[prop] ? style[prop] : defaultVal(prop);
        if (counts.has(val)) {
            counts.set(val, counts.get(val)+1);
        } else {
            counts.set(val, 1);
        }
    }

    let maxCount = 0;
    let maxVal = "";

    for (const val of counts.keys()) {
        if (!maxCount || counts.get(val) > maxCount) {
            maxCount = counts.get(val);
            maxVal = val;
        }
    }

    return maxVal;
}

function styleguideTextStyles(context, textStyles) {
    const headingStyles = textStyles.filter((style) => /H[1-9]+/.test(style.name));
    let baseToStyles = new Map();
    for (const style of headingStyles) {
        const bases = style.name.match(/H[1-9]+/gi);
        for (const base of bases) {
            if (!baseToStyles.has(base)) {
                baseToStyles.set(base, {mobile: null, desktop: null});
            }

            const mobileRegex = new RegExp(base + "-mobile", "ig");
            const desktopRegex = new RegExp(base + "-desktop", "ig");

            const isMobile = mobileRegex.test(style.name);
            const isDesktop = desktopRegex.test(style.name);

            if (isMobile || !baseToStyles.get(base).mobile) {
                baseToStyles.get(base).mobile = style;
            }

            if (isDesktop || !baseToStyles.get(base).desktop) {
                baseToStyles.get(base).desktop = style;
            }
        }
    }

    const baseStyling = getBase(textStyles);
    let out = "";
    out += generateJSONMixin("Heading", mapToJson(baseStyling));
    out += "\n";
    out += "\n";

    for (const [base, styles] of baseToStyles.entries()) {
        console.log("STYLES: ", styles);
        const name = `Heading--${base}`;
        out += `@mixin ${name} {\n`;

        let content = "  @include Heading;\n\n";

        const commonStyles = diffStyle(baseStyling, common(styles.mobile, styles.desktop));
        const diffStyles = diffStyle(styles.mobile, styles.desktop);

        content += mapToLines(commonStyles, 2);
        const insideBPG = mapToLines(diffStyles, 4);
        if (insideBPG.length) {
            content += "\n  @include bpgte(sm) {\n"
            content += insideBPG;
            content += "  }\n";
        }
        out += content;
        out += "}\n\n";
    }

    return {
        code: out,
        language: 'scss'
    };
    // return getPrimaryFontFamily(textStyles);
}

function buildMap(obj) {
    if (obj instanceof Map) return obj;

    let map = new Map();
    Object.keys(obj).forEach(key => {
        map.set(key, obj[key]);
    });
    return map;
}

const diffStyle = (base, comp) => {
    base = buildMap(base);
    comp = buildMap(comp);
    console.log("base: ", base);
    console.log("comp: ", comp);

    let diff = new Map();

    for (const [prop, val] of comp.entries()) {
        if (base.get(prop) != val) {
            diff.set(prop, val);
        }
    }

    console.log("diff: ", diff);
    return diff;
}

const common = (style1, style2) => {
    style1 = buildMap(style1);
    style2 = buildMap(style2);

    let common = new Map();

    for (const [prop, val] of style2.entries()) {
        if (style1.get(prop) == val) {
            common.set(prop, val);
        }
    }

    return common;
}

function mapToJson(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        if (k == 'name' || k == 'color') {
            continue;
        }
        obj[k] = v;
    }
    return JSON.stringify(obj, null, 2).replace(/\"([^(\")"]+)\"/g,"$1");
}

const mapToLines = (map, depth) => {
    let out = '';

    for (const [key, val] of map.entries()) {
        if (key == 'name' || key == 'color') {
            continue;
        }
        out += ' '.repeat(depth) + `${key}: ${val};\n`;
    }

    return out;
}

const generateJSONMixin = (title, content) => {
    let str = `@mixin ${title} `;
    str += content;

    return str;
}

const generateMixin = (title, content) => {
    let str = `@mixin ${title} {
      ${content}
    }`;

    return str;
}

export default {
    styleguideTextStyles
};