class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/client"(view: "/client/index")
        "/clients"(resources: "client", excludes: ["delete"])

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
