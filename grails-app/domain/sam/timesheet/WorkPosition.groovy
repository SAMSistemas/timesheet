package sam.timesheet

class WorkPosition {

    String description

    static hasMany = [people: Person, task_types_x_work_position: TaskType_x_WorkPosition]

    static constraints = {
        description blank: false, nullable: false, unique: true
    }
}
