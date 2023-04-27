import asyncHandler from '../utils/async-handler.js';
const useCollection = (collection) => asyncHandler(async (req, _res, next) => {
    req.collection = collection;
    next();
});
export default useCollection;
