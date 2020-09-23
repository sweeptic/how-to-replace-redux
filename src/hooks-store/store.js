
//goal : other components to re-render when state changed.
//useState manages state and when ever update the state.
//any component that use that states -> comp re render.

// components uses -> custom hook -> custom hook uses state
// -> components re-render when state in the custom hook trigger re render.
const { useState, useEffect } = require("react");


//custom hook -> share logic not the data.
//custom hook + usestate -> share logic and data

//OUTSIDE!!!!
//SHARE DATA!! 
let globalState = {};
//shared listener array
let listeners = [];
let actions = {};

//every components that using this shared comp. 
export const useStore = (shouldListen = true) => {
   //when ever called, useState the useStore (function) components (recreated) re-rendered.
   const setState = useState(globalState)[1]; //just updating function.

   const dispatch = (actionIdentifier, payload) => {
      //same concept as redux
      const newState = actions[actionIdentifier](globalState, payload); //call action
      globalState = { ...globalState, ...newState };

      //re render all component with new state
      for (const listener of listeners) {
         listener(globalState);
      }
   }

   useEffect(() => {
      //all components own setState function put into global listeners array;

      if (shouldListen) {
         listeners.push(setState);
      }

      //azert mivel ez egy closure, minden usestore compnak egy es ugyanaz setstate metodusa lesz.
      //ezert kell egyesevel unmountolni.
      //2. setstate ugyanaz lesz amikor a komponens mountolodik és unmountolodik.
      if (shouldListen) {
         return () => {
            listeners = listeners.filter(li => li !== setState)
         }
      }

   }, [setState, shouldListen]); //setState because setState never changes. 
   //this state only run once when mount or unmount.


   //same as the useReducer function returns
   return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
   if (initialState) {
      globalState = { ...globalState, ...initialState }
   }

   actions = { ...actions, ...userActions }
}