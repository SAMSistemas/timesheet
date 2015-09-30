package sam.timesheet.domain

class TaskType {

    String name
    Boolean enabled

    /** Override toString method **/
    String toString(){
        return name
    }

    static constraints = {
        name blank: false, nullable: false, unique: true
    }
}
