import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from './Head'
import { getTasks } from '../redux/reducers/tasks'
import Task from './Task'
import CreateTask from './CreateTask'
import CurrentStatusButton from './CurrentStatusButton'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((s) => s.tasks.listOfTasks)
  const [filteredTasksByStatus, setFilteredTasksByStatus] = useState(tasks)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  useEffect(() => {
    setFilteredTasksByStatus(tasks)
  }, [tasks])

  const statuses = ['new', 'in progress', 'done']

  const [activeStatus, setActiveStatus] = useState('all')

  return (
    <div>
      <Head title="TODO List" />
      <div className="flex lg:py-8">
        <div className="w-full grid justify-items-center bg-blue-50">
          <h1 className="text-gray-900 text-4xl pt-4">ToDo List</h1>
          <div className="bg-white rounded shadow p-6 m-4 lg:w-3/4 lg:max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-4 px-3 lg:gap-1 gap-3">
              {['all', ...statuses].map((status) => (
                <CurrentStatusButton
                  tasks={tasks}
                  status={status}
                  key={status}
                  isActive={activeStatus === status}
                  setActiveStatus={setActiveStatus}
                  setFilteredTasksByStatus={setFilteredTasksByStatus}
                />
              ))}
            </div>
            <CreateTask />
            <div className="mb-4">
              {filteredTasksByStatus?.map((item) => (
                <Task task={item} key={item.taskId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList
