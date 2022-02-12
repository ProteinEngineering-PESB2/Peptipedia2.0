import { ALIGNMENT } from './AppConstants'

const AppReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ALIGNMENT:
            return {
                ...state,
                alignmentType: payload.alignmentType,
                data: payload.data
            }
        default:
            return state;
    }
}

export default AppReducer