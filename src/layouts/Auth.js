import { Redirect } from 'umi';

export default (props) => {
  // const { isLogin } = useAuth();
  // TODO 路由级别权限判断
  const isLogin = sessionStorage.authToken || true;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/Login" />;
  }
};
