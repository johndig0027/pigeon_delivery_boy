import * as actionTypes from '../action';

import {cloneDeep, findIndex} from 'lodash';
import {storeCurrentOrderDetails} from '../../storage';

const initialState = {
  orderList: [],
  selectedOrder: undefined,
  locationTracking: false,
  completedOrderList: [],
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIVE_ORDER_LIST: {
      return {
        ...state,
        orderList: action.payload,
      };
    }
    case actionTypes.COMPLETED_ORDER_LIST: {
      return {
        ...state,
        completedOrderList: action.payload,
      };
    }
    case actionTypes.UPDATE_SELECTED_ORDER_STATUS: {
      let tempOrder = action.payload;
      const tempOrderList = cloneDeep(state.orderList);
      const index = findIndex(tempOrderList, orderObj => {
        return tempOrder.pigeonId === orderObj.pigeonId;
      });
      tempOrderList[index].orderStatus = tempOrder.orderStatus;
      return {
        ...state,
        selectedOrder: tempOrder,
        orderList: tempOrderList,
      };
    }
    case actionTypes.SET_SELECTED_ORDER: {
      return {
        ...state,
        selectedOrder: action.payload,
      };
    }
    case actionTypes.START_LOCATION_TRACKING: {
      return {
        ...state,
        locationTracking: true,
      };
    }
    case actionTypes.STOP_LOCATION_TRACKING: {
      return {
        ...state,
        locationTracking: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducers;
