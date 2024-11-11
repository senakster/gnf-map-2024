import { getGnfGrupperREST } from "@/_libs/_data";
import Map from "../components/Map/Map";


export default async function Home() {
  const groups = await getGnfGrupperREST()

  return (
    <main>
      <Map groups={groups} />
    </main>
  );
}
