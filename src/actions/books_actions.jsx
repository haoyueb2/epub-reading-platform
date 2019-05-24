const Types = {
    CREATE_ITEM: "CREATE_ITEM",
};
// actions
const createItem = task => ({
    type: Types.CREATE_ITEM,
    payload: task
});


export default {
    createItem,
    Types
};