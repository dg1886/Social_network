import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";


let state = {
    posts: [
        {id: Date.now().toString(), message: 'hello', likesCount: 1},
        {id: Date.now().toString(), message: 'i', likesCount: 0},
        {id: Date.now().toString(), message: 'lol', likesCount: 0}
    ],
    profile: null,
    status: ''
}

it ('length of post should be incremented', () => {
    let action = addPostActionCreator('all cops are bastards')

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(4)
})

it('after deleting length of messages should be decrement', () => {
    let action = deletePostActionCreator('1')
    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(2)
})

it('after deleting length shouldnt be decrement if id is incorrect', () => {
    let action = deletePostActionCreator('1000')
    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(3)
})