import {SearchPanel} from './search-panel'
import {List} from './list'
import {useEffect, useState} from "react";
import qs from "qs";
import {cleanObject} from "../../util";
import {useMountHook} from "../../hooks/useMountHook";
import {useDebounceHook} from "../../hooks/useDebounceHook";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = ()=>{
    console.log('ProjectList')
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });

    const debouncedParam = useDebounceHook(param, 2000)
    const [list, setList] = useState([])

    // 当param变化时，请求数据
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res)=>{
            if (res.ok) {
                // 把数据保存下来
                setList(await res.json())
            }
        })
    }, [debouncedParam])

    useMountHook(()=>{
        fetch(`${apiUrl}/users`).then(async (res)=>{
            if (res.ok) {
                // 把数据保存下来
                setUsers(await res.json())
            }
        })
    })


    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </div>
}