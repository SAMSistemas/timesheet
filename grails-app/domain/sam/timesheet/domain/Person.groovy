package sam.timesheet.domain

class Person {

    String name
    String lastname
    String username
    String password
    Byte[] picture
    Boolean enabled

    /** Override toString method **/
    String toString(){
        return username + lastname
    }


    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false
        lastname blank: false, nullable: false
        username blank: false, nullable: false, unique: true
        password blank: false, matches: "[a-zA-Z]{8}", nullable: false, widget: 'passwordField'
        picture nullable: true, maxSize: 32768 //32k
    }
}
