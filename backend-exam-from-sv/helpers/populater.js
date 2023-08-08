const populateModel = (populates = []) => {
    return populates.map(populate => {
        if (typeof populate === 'string') {
            return {path: populate};
        }

        if (populate instanceof Object) {
            return populate;
        }
        return '';
    });
};

module.exports = populateModel;
