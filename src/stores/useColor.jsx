import { create } from 'zustand'

export default create((set) =>
{
    return {
        color: 'blue',

        getBlueColor: ()=>
        {
            set((state)=>{
                return {color: 'blue'}
            })
        },

        getPnikColor: ()=>
        {
            set((state)=>{
                return {color: 'pink'}
            })
        }
        
    }
})