package sam.timesheet.domain

class JobLog {

    Date date
    Float hours

    static belongsTo = [project: Project, person: Person, task_type: TaskType]

    static constraints = {
    }
}
