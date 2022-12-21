interface Action{
    type:string;
    payload?:any;
}

interface Reducer<T>{
    (oldState:T, action:Action) :T;
}

export let reducer:Reducer<number> = (state:number=0 , action:Action) =>{
    if(!action){
        return state;
    }
    switch(action.type){
        case 'INCREMENT':
            return state +1
        case 'DECREMENT':
            return state - 1
        case 'PLUS':
            return state + action.payload
        default:
           return state
    }
}

const actionIncrement: Action = {
    type:"INCREMENT"
}

const actionDecrement: Action = {
    type:"DECREMENT"
}

const actionPlus: Action = {
    type:"PLUS",
    payload:12
}

console.log(reducer(0, actionIncrement));




// let reducer:Reducer<number> = (state:number=0 , action:Action) =>{
//     if(!action){
//         return 10;
//     }
//     if(action.type==='INCREMENT'){
//         return state+1;
//     }
//     if(action.type==='DECREMENT'){
//         return state-1;
//     }
//     if(action.type==='PLUS'){
//         return state + action.payload;
//     }
//     return state;
// }