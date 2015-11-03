import sam.timesheet.domain.Client
import sam.timesheet.domain.Person
import sam.timesheet.domain.Project
import sam.timesheet.domain.JobLog
import sam.timesheet.domain.TaskType

class BootStrap {

    def init = { servletContext ->
        def client1 = (new Client(name:"Santiago", short_name:"S", enabled: true)).save flush: true
        (new Client(name:"Federico", short_name:"F", enabled: true)).save flush: true
        (new Client(name:"Jonatan", short_name:"J", enabled: false)).save flush: true
        def person1 = (new Person(name:"Santiago", lastname:"Perez Torre", username: "spereztorre", password: "AAAAAAAA", enabled: true)).save flush: true
        def person2 = (new Person(name:"Federico", lastname:"Catinello", username: "fcatinello", password: "BBBBBBBB", enabled: true)).save flush: true
        (new Person(name:"Jonatan", lastname:"Salas", username: "jsalas", password: "CCCCCCCC", enabled: false)).save flush: true
        def project1 = (new Project(name:"Chat", client: client1, short_name: "C", enabled: true, start_date: new Date())).save flush: true
        def asignacion = (new TaskType(name: "Asignacion", enabled: true)).save flush: true
        (new JobLog(person: person1, project: project1, task_type: asignacion, hours: "3", solicitude: 1,observation: "TEST 2",date: new Date())).save flush: true
        (new JobLog(person: person2, project: project1, task_type: asignacion, hours: "3", solicitude: 2,observation: "TEST 2",date: new Date())).save flush: true

    }

    def destroy = {
    }
}