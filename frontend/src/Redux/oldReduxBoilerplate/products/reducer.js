// import * as types from './actionType';

// const initialState = {
//     products: [],
//     dropdownResults: [],
//     error: '',
//     CurrentProduct: {},
//     loading: false,
//     cart: [],
//     orders: []

// }

// const reducer = (state = initialState, action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case types.START_LOADING:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case types.STOP_LOADING:
//             return {
//                 ...state,
//                 loading: false
//             }


//         case types.FETCH_DATA_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case types.FETCH_DATA_SUCCESS:
//             return {
//                 ...state,
//                 products: payload,
//                 loading: false,
//                 error: '',
//             }

//         case types.FETCH_DATA_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }


//         case types.FETCH_FILTER_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case types.FETCH_FILTER_SUCCESS:
//             return {
//                 ...state,
//                 products: payload,
//                 error: '',
//                 loading: false
//             }

//         case types.FETCH_FILTER_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }


//         case types.FETCH_SEARCH_DROPDOWN_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case types.FETCH_SEARCH_DROPDOWN_SUCCESS:
//             return {
//                 ...state,
//                 dropdownResults: payload,
//                 error: '',
//                 loading: false
//             }
//         case types.FETCH_SEARCH_DROPDOWN_FAILURE:
//             return {
//                 ...state,
//                 loading: false
//             }


//         case types.FETCH_SEARCH_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case types.FETCH_SEARCH_SUCCESS:
//             return {
//                 ...state,
//                 products: payload,
//                 error: '',
//                 loading: false
//             }

//         case types.FETCH_SEARCH_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }



//         case types.GET_SINGLE_PRODUCT_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }

//         case types.GET_SINGLE_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 CurrentProduct: payload,
//                 loading: false
//             }

//         case types.GET_SINGLE_PRODUCT_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }



//         case types.EDIT_PRODUCT_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }

//         case types.EDIT_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 products: payload,
//                 loading: false
//             }

//         case types.EDIT_PRODUCT_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }




//         case types.ADD_PRODUCT_CART_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }

//         case types.ADD_PRODUCT_CART_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 cart: [...state.cart, payload],
//                 loading: false

//             }

//         case types.ADD_PRODUCT_CART_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }



//         case types.FETCH_CART_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case types.FETCH_CART_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 cart: [...payload],
//                 loading: false
//                 // const payload = [1, 2, 3];
//                 // const cart = [...payload]; Creates a new array [1, 2, 3]

//                 // const payload = [1, 2, 3];
//                 // const cart = [payload]; Creates a new array containing the `payload` array as a single element: [[1, 2, 3]]

//             }
//         case types.FETCH_CART_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }



//         case types.REMOVE_PRODUCT_CART_REQUEST:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: true,
//             }
//         case types.REMOVE_PRODUCT_CART_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false,
//             }



//         case types.FETCH_ORDER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }

//         case types.FETCH_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 orders: payload,
//                 loading: false
//             }

//         case types.FETCH_ORDER_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }



//         case types.ADD_ORDER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }

//         case types.ADD_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 error: '',
//                 orders: payload,
//                 loading: false
//             }

//         case types.ADD_ORDER_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             }


//         // add product
//         case types.ADD_PRODUCT_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: '',
//             }

//         case types.ADD_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 products: [...state.products, payload], 
//                  loading: false,
//                 error: ''
//             }

//         case types.ADD_PRODUCT_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false,
//             }


//         case types.DELETE_ORDER_REQUEST:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: true,
//             }
//         case types.DELETE_ORDER_FAILURE:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false,
//             }

//         default:
//             return state;
//     }

// }

// export { reducer }




