
export const addToCart = (item)=>({
    type : 'Add',
    data: item
})


export const removeFromCart = (item)=>({
    type : 'Remove',
    data: item
})


export const emptyCart = ()=>({
    type : 'Empty',
})