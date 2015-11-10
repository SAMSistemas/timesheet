package sam.timesheet.domain

class Holiday {

    String description
    Date holiday_date

    static constraints = {
        description unique: true, nullable: false, blank: false
        holiday_date nullable: false
    }
}
