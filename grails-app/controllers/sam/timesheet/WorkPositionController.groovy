package sam.timesheet

import grails.rest.RestfulController

class WorkPositionController extends RestfulController {

    static responseFormats = ['json']

    WorkPositionController() {
        super(WorkPosition)
    }

}
