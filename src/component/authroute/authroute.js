import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(null,
    { loadData }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }


        //获取用户信息
        Axios.get('/user/info').
            then(res => {
                if (res.status == 200) {
                    if (res.data.code == 0) {
                        //有登录信息
                        this.props.loadData(res.data.data)
                        this.props.history.push('/info')
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}
    export default AuthRoute
