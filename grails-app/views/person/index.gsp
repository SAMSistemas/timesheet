<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'person.label', default: 'Person')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <a href="#list-person" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div class="nav" role="navigation">
            <ul>
                <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
                <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
            </ul>
        </div>
        <div id="list-person" class="content scaffold-list" role="main">

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

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for lastname" ng-model="search.lastname">
                        </div>
                    </div>
                </form>

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for username" ng-model="search.username">
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
                            <a href="#" ng-click="sortType = 'lastname'; sortReverse = !sortReverse">
                                Last Name
                                <span ng-show="sortType == 'lastname' && !sortReverse" class="fa fa-caret-down"></span>
                                <span ng-show="sortType == 'lastname' && sortReverse" class="fa fa-caret-up"></span>
                            </a>
                        </td>
                        <td>
                            <a href="#" ng-click="sortType = 'username'; sortReverse = !sortReverse">
                                User Name
                                <span ng-show="sortType == 'username' && !sortReverse" class="fa fa-caret-down"></span>
                                <span ng-show="sortType == 'username' && sortReverse" class="fa fa-caret-up"></span>
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
                    <tr ng-repeat="person in people | orderBy:sortType:sortReverse | filter:search:startsWith">
                        <td>{{ person.name }}</td>
                        <td>{{ person.lastname }}</td>
                        <td>{{ person.username }}</td>
                        <td>{{ person.enabled }}</td>
                        <td><a ng-href="/person/edit/{{ person.id }}">Edit</a></td>
                        <td><a href ng-click="disable(person)" ng-show="person.enabled">Disable</a>
                            <a href ng-click="able(person)" ng-hide="person.enabled">Able</a></td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>

    <asset:javascript src="person.js"/>
    </body>
</html>