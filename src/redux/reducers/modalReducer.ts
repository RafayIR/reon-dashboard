// modalReducer.ts
import { MODAL_SHOW, MODAL_HIDE } from '../actionType';

interface ModalState {
  isVisible: boolean;
}

const initialState: ModalState = {
  isVisible: false,
};

const modalReducer = (state = initialState, action: any): ModalState => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, isVisible: true };
    case MODAL_HIDE:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

export default modalReducer;
