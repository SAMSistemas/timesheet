package sam.timesheet.domain

class TaskType {

    String name
    Boolean enabled

    static constraints = {
        name blank: false, nullable: false, unique: true
    }

    String toString(){
        return name
    }
}
