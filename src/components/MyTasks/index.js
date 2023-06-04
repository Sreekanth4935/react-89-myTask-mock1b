import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    activeOptionId: tagsList[0].optionId,
    inputTask: '',
    addedTaskList: [],
  }

  setInputText = event => {
    this.setState({
      inputTask: event.target.value,
    })
  }

  getActiveOption = event => {
    this.setState({
      activeOptionId: event.target.value,
    })
  }

  renderSubmit = event => {
    event.preventDefault()
    const {activeOptionId, inputTask} = this.state
    const newAddedTask = {
      id: uuidv4(),
      taskName: inputTask,
      activeOptionId,
    }
    this.setState(prevState => ({
      addedTaskList: [...prevState.addedTaskList, newAddedTask],
      inputTask: '',
      activeOptionId: tagsList[0].optionId,
    }))
  }

  changeActiveOptionId = newActiveId => {
    this.setState({
      activeOptionId: newActiveId,
    })
  }

  render() {
    const {activeOptionId, addedTaskList, inputTask} = this.state
    console.log(addedTaskList)

    return (
      <div className="task-container">
        <div className="tab1">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.renderSubmit}>
            <label className="label">
              Task
              <input
                value={inputTask}
                onChange={this.setInputText}
                className="input-cls"
                type="text"
                placeholder="Enter the task here"
              />
            </label>
            <label htmlFor="selectTags" className="label">
              Tags
              <select
                onChange={this.getActiveOption}
                id="selectTags"
                value={activeOptionId}
                className="select-cls"
              >
                {tagsList.map(eachTask => (
                  <option value={eachTask.optionId} key={eachTask.optionId}>
                    {eachTask.displayText}
                  </option>
                ))}
              </select>
            </label>
            <div className="btn-container">
              <button className="add-btn" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tab2">
          <h1>Tags</h1>
          <ul className="ul-container">
            {tagsList.map(eachTag => (
              <li key={eachTag.optionId}>
                <button
                  className={
                    eachTag.optionId === activeOptionId
                      ? 'btn active-btn'
                      : 'btn'
                  }
                  onClick={() => this.changeActiveOptionId(eachTag.optionId)}
                  type="button"
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
        </div>
      </div>
    )
  }
}

export default MyTasks
