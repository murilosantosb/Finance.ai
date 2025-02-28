
// Components
import Wrapper from "@/components/Wrapper";
import SubscriptionCard from "@/components/Cards/SubscriptionCard";


export default function Signature() {
    return (
     <Wrapper>
        <main className="signature-container">
          <h1 className="h3 text-white mb-4">Assinaturas</h1>
          <section>
            <SubscriptionCard variant="BASIC"/>
            <SubscriptionCard variant="PRO"/>
          </section>
        </main>
     </Wrapper>
    );
  }
  