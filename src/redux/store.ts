import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {AuthActionsType, authReducer} from './reducers/auth'
import {ChatActionsType, chatReducer} from './reducers/chat'
import {ProfileActionsType, profileReducer} from './reducers/profile'
import {UsersActionsType, usersReducer} from './reducers/users'
import thunk, {ThunkAction} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {AppActionsType, appReducer} from './reducers/app'

const rootReducer = combineReducers({
    chat: chatReducer,
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export type RootStateType = ReturnType<typeof rootReducer>
export type RootAppActionsType =
    AuthActionsType
    | ChatActionsType
    | ProfileActionsType
    | UsersActionsType
    | AppActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    RootAppActionsType>


export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type Nullable<T> = null | T