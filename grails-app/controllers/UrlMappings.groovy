class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/workPositions"(resources: "workPosition", excludes: ["save", "update", "delete"])

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')

        "/login"(view:"/login")
    }
}
