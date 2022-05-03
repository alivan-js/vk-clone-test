import {followUser, UsersInitialStateType, usersReducer} from "./users";

let state: UsersInitialStateType

beforeEach(() => {

    state = {
        users: [
            {
                id: 1,
                status: "status1",
                followed: false,
                name: "John",
                photos: {small: "", large: ""},
                uniqueUrlName: "John"
            },
            {
                id: 2,
                status: "status2",
                followed: true,
                name: "Mike",
                photos: {small: "", large: ""},
                uniqueUrlName: "Mike"
            },
            {
                id: 3,
                status: "status3",
                followed: false,
                name: "Alex",
                photos: {small: "", large: ""},
                uniqueUrlName: "Alex"
            },
        ],
        isFollowingInProgress: {
            id: null
        },
        page: 1,
        totalItems: 1,
        filter: {
            term: "",
            friend: null
        }
    }
})

test("user should be followed/unfollowed", () => {

    // action

    const newStateFollow = usersReducer(state, followUser(1))
    const newStateUnfollow = usersReducer(state, followUser(2))

    // result

    expect(newStateFollow.users[0].followed).toBeTruthy()
    expect(newStateUnfollow.users[1].followed).toBeFalsy()

})