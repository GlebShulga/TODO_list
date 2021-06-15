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
          <button
            type="button"
            className="py-3 px-4 bg-green-500 font-semibold uppercase hover:bg-green-400"
            onClick={onClickAddTask}
          >
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              />
            </svg>
          </button>
        )}
        {error && (
          <button
            type="button"
            className="py-3 px-4 bg-green-500 font-semibold uppercase hover:bg-green-400 opacity-50"
            disabled
          >
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              />
            </svg>
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
