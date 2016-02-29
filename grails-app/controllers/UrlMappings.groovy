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
        "/jobLogs/projectForHour"(controller: "jobLog", action: "projectForHour")

        "/holiday"(view: "/holiday/index")
        "/holidays"(resources: "holiday")

        "/taskType"(view: "/taskType/index")
        "/taskTypes"(resources: "taskType", excludes: ["delete"])

        "/workPositions"(resources: "workPosition", excludes: ["save", "update", "delete"])

        "/"(view:"/index")

        "404"(view: "/errors/notFound")
        "422"(view: "/errors/entityError")
        "500"(view: "/errors/serverError")

        "/login"(view:"/login")
    }
}
