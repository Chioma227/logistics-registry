import RegisterComponent from "@/components/pages/register/RegisterComponent"

const Register = () => {
  
  if (typeof window === "undefined") return null; 
  
  return <RegisterComponent/>
}

export default Register
