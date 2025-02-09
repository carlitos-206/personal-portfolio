// This is a custom hook that allows me to useState in nodejs
// src = https://www.youtube.com/watch?v=Om33AjwtQ_Y&list=LL&index=20

export function UseStateNode(initVal){
    let _val = initVal;

    const state = () => _val;
    
    const setState = (newVal) => {
        _val = newVal;
    }
    
    return [state, setState]
}

/* 

    example usage:
    
    
    const [state, setState] = UseStateNode(null);
    setState('hello world');
    console.log( state() ); // hello world
    
    to get the state value, you must call the state function 


  */