// interop when using babel
module.exports = getDefaultExport
function getDefaultExport (obj) { return obj && obj.__esModule ? obj.default : obj }
