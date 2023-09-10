import { Result, Button } from "antd";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}