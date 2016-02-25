class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")

        "404"(view: "/errors/notFound")
        "422"(view: "/errors/entityError")
        "500"(view: "/errors/serverError")

        "/login"(view:"/login")
    }
}
