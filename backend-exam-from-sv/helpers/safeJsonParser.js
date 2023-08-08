const parse = (text, reviver) => {
    if (Buffer.isBuffer(text)) {
        text = text.toString('utf8');
    }
    if (text.charCodeAt(0) === 0xfeff) {
        text = text.slice(1);
    }
    try {
        return JSON.parse(text, reviver);
    } catch (err) {
        err.message = `Invalid JSON: ${err.message}`;
    }
};

function serializer(replacer, cycleReplacer) {
    const stack = [];
    const keys = [];
    if (cycleReplacer == null) {
        cycleReplacer = (key, value) => {
            if (stack[0] === value) {
                return '[Circular ~]';
            }
            return `[Circular ~.${keys.slice(0, stack.indexOf(value)).join('.')}]`;
        };
    }
    return (key, value) => {
        if (stack.length > 0) {
            const thisPos = stack.indexOf(this);
            if (~thisPos) {
                stack.splice(thisPos + 1);
                keys.splice(thisPos, Infinity, key);
            } else {
                stack.push(this);
                keys.push(key);
            }
            if (~stack.indexOf(value)) {
                value = cycleReplacer.call(this, key, value);
            }
        } else {
            stack.push(value);
        }

        return replacer == null ? value : replacer.call(this, key, value);
    };
}

const stringify = (value, replacer, space, cycleReplacer) =>
    JSON.stringify(value, serializer(replacer, cycleReplacer), space);

module.exports = {
    parse,
    stringify,
};
