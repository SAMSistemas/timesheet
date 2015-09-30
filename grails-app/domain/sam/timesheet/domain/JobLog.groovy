package sam.timesheet.domain

class JobLog {

    Date date
    String hours

    static belongsTo = [project: Project, person: Person, task_type: TaskType]

    static constraints = {
        hours inList: ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"]
    }
}
