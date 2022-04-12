import {applyMiddleware, combineReducers, createStore} from 'redux'
import { auth } from './reducers/auth'
import { chat } from './reducers/chat'
import { profile } from './reducers/profile'
import { users } from './reducers/users'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    chat,
    profile,
    users,
    auth
})




export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch