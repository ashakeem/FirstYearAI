import Form from "../components/auth/Form"

const Login = () => {
  return (
    <Form route="/api/token/" method="login" />
  )
}

export default Login