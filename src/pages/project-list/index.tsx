import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useEffect, useState } from "react";
// import { cleanObject } from "../../util";
// import { useMountHook } from "../../hooks/useMountHook";
import { useDebounceHook } from "../../hooks/useDebounceHook";
// import { useHttpHook } from "../../util/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
// import {useAsyncHook} from "../../hooks/useAsyncHook";
import { useProjectsHook } from "../../hooks/useProjectsHook";
import { useUserHook } from "../../hooks/useUserHook";
import { useDocumentTitleHook } from "../../hooks/useDocumentTitleHook";
import { useUrlQueryParam } from "../../util/url";

export const ProjectList = () => {
  useDocumentTitleHook("任务列表");

  // const [users, setUsers] = useState([]);
  /*const [, setParam] = useState({
    name: "",
    personId: "",
  });*/
  // 注：传入的参数是普通对象，重新渲染时会重新定义，这种对象不能用来作为依赖项
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  const debouncedParam = useDebounceHook(param, 500);

  const {
    data: list,
    error,
    isError,
    isLoading,
  } = useProjectsHook(debouncedParam);
  const { users } = useUserHook();

  // const [list, setList] = useState([]);
  // const http = useHttpHook();
  // const {run, data:list, error, isError, isLoading} = useAsyncHook<Project[]>()

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  // 当param变化时，请求数据
  /*useEffect(() => {
    run(http("projects", { data: cleanObject(debouncedParam) }))


    /!*setLoading(true);
    http("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((err) => {
        setList([]);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });*!/
    /!*fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        // 把数据保存下来
        setList(await res.json());
      }
    });*!/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);
*/
  /*useMountHook(() => {
    http("users").then(setUsers);
    /!*fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        // 把数据保存下来
        setUsers(await res.json());
      }
    });*!/
  });*/

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {isError && error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users}
        pagination={false}
        rowKey={"id"}
      />
    </Container>
  );
};

// ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
