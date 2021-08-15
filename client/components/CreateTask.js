import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/reducers/tasks'

const CreateTask = () => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const onChange = (e) => {
    setTitle(e.target.value)
    setError(false)
  }
  const onClickAddTask = () => {
    if (title.length <= 15 && title.length >= 3) {
      dispatch(addTask(title))
    } else {
      setError(true)
    }
  }
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }

  return (
    <div className="grid justify-items-center py-4">
      <div className="flex rounded-lg overflow-hidden">
        <input
          className="py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100"
          type="text"
          value={title}
          onChange={onChange}
          placeholder="Add new task"
          onKeyPress={handleKeypress}
        />
        {!error && (
          <button type="button" className="addTaskButton" onClick={onClickAddTask}>
            +
          </button>
        )}
        {error && (
          <button type="button" className="addTaskButton opacity-50" disabled>
            +
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-600 pt-3 text-center">
          <div> The task length must not be shorter than 3 characters</div>
          <div>and</div>
          <div>must not exceed 15 characters.</div>
        </div>
      )}
    </div>
  )
}

export default React.memo(CreateTask)
