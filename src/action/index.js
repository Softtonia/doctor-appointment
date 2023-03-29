export const  incNumber  =  (number = 1) =>{
    return {
            type : 'INCREMENT',
            payload : number
        }
    
}


export const  decNumber  =  () =>{
    return {
            type : 'DECREMENT'
        }
    
}