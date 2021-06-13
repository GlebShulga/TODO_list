import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeStatus, changeTitle, delTask } from '../redux/reducers/tasks'
import deteteIcon from '../assets/static/images/delete.svg'

const Task = (props) => {
  const { task } = props
  const [isEditingMode, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const dispatch = useDispatch()
  const onTitleChange = (e) => {
    setNewTitle(e.target.value)
  }
  const onClickSaveTitle = () => {
    if (isEditingMode) {
      dispatch(changeTitle(task.taskId, newTitle))
    }
    setEditing(!isEditingMode)
  }
  const onClickStatusChange = () => {
    if (task.status === 'new') {
      dispatch(changeStatus(task.taskId, 'in progress'))
    }
    if (task.status === 'in progress') {
      dispatch(changeStatus(task.taskId, 'done'))
    } else {
      dispatch(changeStatus(task.taskId, 'in progress'))
    }
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onClickSaveTitle()
    }
  }

  const edit = isEditingMode ? (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 20 20"
      className="inline-block pb-1"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg> // save icon
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      enableBackground="new 0 0 20 20"
      className="inline-block"
    >
      <path
        fill="currentColor"
        d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01
                                    l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932
                                    c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881
                                    L5.68,17.217z"
      />
    </svg> // edit icon
  )
  return (
    <div className="flex mb-4 ml-2 items-center bg-gray-100">
      {!isEditingMode && (
        <>
          <button
            type="button"
            className={`p-2 w-full hover:text-black hover:bg-gray-400 font-bold ${
              task.status === 'done' ? 'line-through text-gray-700' : 'text-gray-900'
            }`}
            onClick={onClickStatusChange}
          >
            {task.title}
          </button>
          <div className="w-full text-center">{task.status}</div>
        </>
      )}
      {isEditingMode && (
        <input
          className="text-black w-full border-2 rounded border-gray-900 pl-1"
          type="text"
          value={newTitle}
          onChange={onTitleChange}
          onKeyPress={handleKeypress}
        />
      )}

      <button
        type="button"
        className="p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-400"
        onClick={onClickSaveTitle}
      >
        {edit}
      </button>

      <button
        type="button"
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
        onClick={() => dispatch(delTask(task.taskId))}
      >
        {/* <svg width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
          <path d="M12 12h2v12h-2z" fill="currentColor" />
          <path d="M18 12h2v12h-2z" fill="currentColor" />
          <path
            d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z"
            fill="currentColor"
          />
          <path d="M12 2h8v2h-8z" fill="currentColor" />
        </svg> */}

        <img src={deteteIcon} alt="delete icon" />
        <img alt="wave" src="images/wave.jpg" />
      </button>
    </div>
  )
}

Task.propTypes = {}

export default React.memo(Task)
