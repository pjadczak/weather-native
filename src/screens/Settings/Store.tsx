import { LocalStateType } from './Settings';

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

    }

    return state;

}

export default Store;