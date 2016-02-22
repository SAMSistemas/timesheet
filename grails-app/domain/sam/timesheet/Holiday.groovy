package sam.timesheet

class Holiday {

    String title
    Date date

    static constraints = {
        title blank: false, nullable: false, unique: true, maxSize: 40
        date nullable: false
    }
}
