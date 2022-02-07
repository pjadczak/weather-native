import { LocalStateType } from './Home'; 

type actionsType = {
    type: string,
    data?: object|string|number|null,
    dataType?: string
}

const Store = (state: LocalStateType, action: actionsType) => {

    switch (action.type){

        case 'SET_DATA':

            return {
                ...state,
                [action.dataType]: action.data
            }

        case 'RELOAD':

            return {
                ...state,
                reload: state.reload + 1
            }

    }

    return state;

}

export default Store;