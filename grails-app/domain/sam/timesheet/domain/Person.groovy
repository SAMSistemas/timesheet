package sam.timesheet.domain

class Person {

    String name
    String lastname
    String username
    String password
    Byte[] picture
    Boolean enabled

    static belongsTo = [work_position: WorkPosition]

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, maxSize: 30
        lastname blank: false, nullable: false, maxSize: 30
        username blank: false, nullable: false, unique: true, maxSize: 15
        password blank: false, nullable: false, matches: "[a-zA-Z]{8}"
        picture nullable: true
    }

    String toString(){
        return username + lastname
    }
}
