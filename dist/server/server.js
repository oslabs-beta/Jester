"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const tests_1 = __importDefault(require("./routes/tests"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/tests', tests_1.default);
app.use('/dist', express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.get('/', (req, res) => {
    return res.status(200).sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' }
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(err);
    return res.status(errorObj.status).json(errorObj.log);
});
app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`);
});
exports.default = app;
