export const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
export const SAVE_CUSTOMER_COMPLETE = 'SAVE_CUSTOMER_COMPLETE';

export const customerReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
};
