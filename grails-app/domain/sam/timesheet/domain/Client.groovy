package sam.timesheet.domain

class Client {

    String name
    String short_name
    Boolean enabled

    /** Override toString method **/
    String toString(){
        return name
    }

    static hasMany = [projects: Project]

    static constraints = {
        name blank: false, nullable: false, unique: true
        short_name blank: false, nullable: false, unique: true
    }
}
