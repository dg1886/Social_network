import React from 'react'

export type maxLengthCreatorType = ReturnType<typeof maxLengthCreator>

export const requiredField = (value: string) => {
    if(value) return undefined
    else {
        return 'Field is required'
    }
}



export const maxLengthCreator = (maxLength: number) => (value: any) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    else {
        return undefined
    }
}
// export const maxLength30: maxLengthCreatorType = maxLengthCreator(30)
