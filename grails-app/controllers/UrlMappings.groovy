class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/client"(view: "/client/index")
        "/clients"(resources: "client", excludes: ["delete"])

        "/project"(view: "/project/index")
        "/projects"(resources: "project", excludes: ["delete"])
        "/projects/assignation"(view: "/project/assignation")
        "/projects/$id/assign"(controller: "project", action: "assign")

        "/person"(view: "/person/index")
        "/people"(resources: "person", excludes: ["delete"])

        "/jobLogs"(resources: "jobLog", excludes: ["delete"])

        "/holiday"(view: "/holiday/index")
        "/holidays"(resources: "holiday")

        "/taskType"(view: "/taskType/index")
        "/taskTypes"(resources: "taskType", excludes: ["delete"])

        "/workPositions"(resources: "workPosition", excludes: ["save", "update", "delete"])

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')

        "/login"(view:"/login")
    }
}
