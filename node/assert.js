"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs_1 = require("rxfs");
const fs_1 = require("./util/fs");
const nodeAssert = require("assert");
const mock_1 = require("./mock");
const renderMessage = (subj, expectation, negate = false) => {
    return `Expected ${subj}${negate ? ' not' : ''} to ${expectation}.`;
};
const assertFn = (negate, expected, actual, message) => {
    if ('undefined' === typeof negate) {
        negate = false;
    }
    if (negate) {
        nodeAssert.notEqual(actual, expected, message);
    }
    else {
        nodeAssert.equal(actual, expected, message);
    }
};
exports.assert = (expected, actual, message) => {
    assertFn(false, expected, actual, message);
};
exports.assertNot = (expected, actual, message) => {
    assertFn(true, expected, actual, message);
};
exports.compare = (left, other, typeCheck = false) => {
    if (typeCheck && (typeof left !== typeof other)) {
        return false;
    }
    return left === other;
};
class File {
    constructor(filepath) {
        this.filepath = filepath;
    }
    renderMessage(negate = false, expectation) {
        return renderMessage(`file at "${this.filepath}"`, expectation, negate);
    }
    exists(negate = false) {
        return () => assertFn(negate, true, rxfs_1.existsSync(this.filepath), renderMessage(`file at "${this.filepath}"`, 'exist', negate));
    }
    contains(negate, data) {
        return fs_1.readFile(this.filepath)
            .map(contents => {
            return (contents instanceof Buffer
                ? contents.toString('utf8')
                : contents);
        })
            .toPromise()
            .then(contents => {
            negate
                ? nodeAssert.ok(exports.compare(contents, data), this.renderMessage(negate, 'contains'))
                : nodeAssert.notEqual(exports.compare(contents, data), true, this.renderMessage(negate, 'contains'));
        });
    }
}
exports.File = File;
//const boundFile = <M extends keyof File>( methodName:M ) => ( filepath:string ) => (new File(filepath))[methodName]
var file;
(function (file) {
    function renderMessage(negate, filepath, expectation) {
        return (new File(filepath)).renderMessage(negate, expectation);
    }
    file.renderMessage = renderMessage;
    function exists(negate, filepath) {
        return (new File(filepath)).exists(negate);
    }
    file.exists = exists;
    function contains(negate, filepath, content) {
        return (new File(filepath)).contains(negate, content);
    }
    file.contains = contains;
})(file = exports.file || (exports.file = {}));
exports.json = (value) => {
    if ('string' !== typeof value) {
        return exports.json(mock_1.toJSONValue(value));
    }
    return {
        equal: (negate, other) => {
            negate
                ? nodeAssert.ok(exports.compare(value, other), renderMessage('json', 'contains', negate))
                : nodeAssert.notEqual(exports.compare(value, other), true, renderMessage('json', 'contains', negate));
        }
    };
};
exports.assertJSON = (expectedValue) => {
    const expectedJSON = mock_1.toJSONValue(expectedValue);
    return (value) => {
        const jsonValue = mock_1.toJSON(value);
        exports.json(jsonValue).equal(expectedValue);
    };
};
//# sourceMappingURL=assert.js.map