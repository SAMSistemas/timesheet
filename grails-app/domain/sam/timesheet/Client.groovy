package sam.timesheet

class Client {

    String name
    String short_name
    Boolean enabled

    static hasMany = [projects: Project]

    static constraints = {
        name blank: false, nullable: false, unique: true, maxSize: 30
        short_name blank: false, nullable: false, unique: true, maxSize: 5
    }

    String toString(){
        return name
    }
}
