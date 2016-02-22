package sam.timesheet

class JobLog {

    Date date
    String hours
    String solicitude
    String observation
    Integer date_month
    Integer date_year

    static belongsTo = [project: Project, person: Person, task_type: TaskType]

    static constraints = {
        date nullable: false
        hours inList: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"]
        observation blank: true, nullable: false, maxSize: 100
        solicitude blank: false, nullable: false, maxSize: 6
    }

    static mapping = {
        date_month formula: 'MONTH(DATE)'
        date_year formula: 'YEAR(DATE)'
    }


}
