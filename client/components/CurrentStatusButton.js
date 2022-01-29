import React from 'react'

const CurrentStatusButton = ({
  tasks,
  status,
  setActiveStatus,
  isActive,
  setFilteredTasksByStatus
}) => {
  const quantityOfTasksByStatus = {}

  tasks
    ?.map((task) => task.status)
    .forEach((x) => {
      quantityOfTasksByStatus[x] = (quantityOfTasksByStatus[x] || 0) + 1
    })

  const inProgressStatus = 'in progress'
  const allStatuses = 'all'

  const quantityOfTasks =
    Number(quantityOfTasksByStatus?.new ?? 0) +
    Number(quantityOfTasksByStatus?.[inProgressStatus] ?? 0) +
    Number(quantityOfTasksByStatus?.done ?? 0)

  const tasksByStatus = tasks?.filter((task) => task.status === status)

  const onClickStatusFilter = () => {
    if (status === allStatuses) {
      setFilteredTasksByStatus(tasks)
    } else {
      setFilteredTasksByStatus(tasksByStatus)
    }
    setActiveStatus(status)
  }

  return (
    <button
      className={`${
        isActive ? 'bg-gray-500 text-gray-100' : 'bg-gray-100 text-gray-600'
      } relative rounded-l-none rounded-r-none focus:outline-none flex justify-center items-center px-4 font-bold cursor-pointer hover:bg-gray-600 hover:text-gray-100 border duration-200 ease-in-out border-gray-600 transition`}
      type="button"
      onClick={onClickStatusFilter}
    >
      {status}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 px-3 py-1 bg-blue-400 rounded-full z-50">
        {status === allStatuses ? quantityOfTasks : quantityOfTasksByStatus?.[status] || 0}
      </div>
    </button>
  )
}

export default CurrentStatusButton
