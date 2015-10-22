package sam.timesheet.domain

class Person {

    String name
    String lastname
    String username
    String password
    Byte[] picture
    Boolean enabled

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false
        lastname blank: false, nullable: false
        username blank: false, nullable: false, unique: true
        password blank: false, matches: "[a-zA-Z]{8}", nullable: false
        picture nullable: true, maxSize: 32768 //32k
    }

    String toString(){
        return username + lastname
    }
}
