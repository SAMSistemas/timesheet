<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'taskType.label', default: 'TaskType')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <a href="#list-taskType" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div class="nav" role="navigation">
            <ul>
                <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
                <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
            </ul>
        </div>
        <div id="list-taskType" class="content scaffold-list" role="main">
            <g:if test="${flash.message}">
                <div class="message" role="status">${flash.message}</div>
            </g:if>
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>

            <div id="table" ng-app="sortApp" ng-controller="mainController">

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for name" ng-model="search.name">
                        </div>
                    </div>
                </form>

                <table>
                    <thead>
                        <tr>
                            <td>
                                <a href="#" ng-click="sortType = 'name'; sortReverse = !sortReverse">
                                    Client Name
                                    <span ng-show="sortType == 'name' && !sortReverse" class="fa fa-caret-down"></span>
                                    <span ng-show="sortType == 'name' && sortReverse" class="fa fa-caret-up"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'enabled'; sortReverse = !sortReverse">
                                    Enabled
                                    <span ng-show="sortType == 'enabled' && !sortReverse" class="fa fa-caret-down"></span>
                                    <span ng-show="sortType == 'enabled' && sortReverse" class="fa fa-caret-up"></span>
                                </a>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr ng-repeat="tasktype in tasktypes | orderBy:sortType:sortReverse | filter:search:startsWith">
                            <td>{{ tasktype.name }}</td>
                            <td>{{ tasktype.enabled }}</td>
                            <td><a ng-href="/tasktype/edit/{{ tasktype.id }}">Edit</a></td>
                            <td><a href ng-click="disable(tasktype)" ng-show="tasktype.enabled">Disable</a>
                                <a href ng-click="able(tasktype)" ng-hide="tasktype.enabled">Able</a></td>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

    <asset:javascript src="tasktype.js"/>

    </body>
</html>