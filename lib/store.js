import { getSession } from 'next-auth/client'
import create from 'zustand'
import produce from 'immer'

// todo: get values from cache first
export const useStore = create((set, get) => { 

  return ({
    currentUser: {},
    set: (fn => set(produce(fn)))
  })

})

