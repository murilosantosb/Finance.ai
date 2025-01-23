
// Components
import Login from "@/components/Login";
import Image from "next/image";
import { Container } from "react-bootstrap"

export default function Home() {
  return (
   <div className="d-flex">
      <Container className="vh-100 d-flex align-items-center p-5">
        <Login />
      </Container>
      <div className='login-desktop'>
          <Image 
            src="/images/loginfundo.png"
            width={900}
            height={960}
            alt='Imagem login fundo'
          />
      </div>
   </div>
  );
}
