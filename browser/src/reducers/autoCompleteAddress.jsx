export const SAVE_ADDRESS = 'SAVE_ADDRESS';
export const SAVE_ADDRESS_COMPLETE = 'SAVE_ADDRESS_COMPLETE';

export const autoCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};
