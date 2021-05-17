
export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObject: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObject}
        }
        return u
    })
}








