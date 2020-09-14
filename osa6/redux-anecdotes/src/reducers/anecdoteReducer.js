import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const modifiedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== modifiedAnecdote.id ? anecdote : modifiedAnecdote
      ).sort((a, b) => b.votes - a.votes)

    case 'ADD':
      return [...state, action.data]
    case 'INITIALIZE':
      return action.data.sort((a,b) => b.votes - a.votes)

    default:
      return state
  }

}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.modifyAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: modifiedAnecdote
    })

  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })

  }
}



export default reducer