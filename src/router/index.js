import Router from "vue-router";

import Table from "../components/Table";

export default new Router({
    mode: 'history',
    routers: [
        {
            path: "table",
            component: Table, meta: {
                title: 'table'
            }
        }
    ]
})