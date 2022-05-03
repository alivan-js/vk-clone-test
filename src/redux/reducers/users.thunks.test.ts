import {fetchFollowing, fetchUnfollowing, followUser, setFollowingProgress} from "./users";
import {CommonResponseType, ResultCode, usersAPI} from "../../utils/api";

jest.mock("../../utils/api")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: CommonResponseType<{}> = {
    data: {},
    messages: [],
    fieldsErrors: [],
    resultCode: ResultCode.Success
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})

test("user should be followed", async () => {

    // state

    const thunk = fetchFollowing(1)

    // action

    await thunk(dispatchMock, getStateMock, {})

    // result

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setFollowingProgress({id: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followUser(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setFollowingProgress({id: null}))

})


test("user should be unfollowed", async () => {

    // state

    const thunk = fetchUnfollowing(1)

    // action

    await thunk(dispatchMock, getStateMock, {})

    // result

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setFollowingProgress({id: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followUser(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setFollowingProgress({id: null}))

})