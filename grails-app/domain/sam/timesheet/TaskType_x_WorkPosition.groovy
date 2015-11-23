package sam.timesheet

class TaskType_x_WorkPosition {

    static belongsTo = [work_position: WorkPosition, task_type: TaskType]

    static constraints = {
    }
}
