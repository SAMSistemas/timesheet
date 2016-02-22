package sam.timesheet

class TaskType {

    String name
    Boolean enabled

    static hasMany = [tasks_type_x_work_position: TaskType_x_WorkPosition, job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, unique: true, maxSize: 30
        enabled nullable: false
    }

    String toString() {
        return name
    }

}
