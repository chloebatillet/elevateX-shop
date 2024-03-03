import { Link } from "react-router-dom";

function About() {
  const list = [
    "Qui sommes-nous ?",
    "Nos engagements",
    "Politique de retours",
    "Confidentialité des données",
    "CGV",
  ];

  const about = list.map((e) => (
    <li key={e} className="text-start hover:text-slate-300 text-sm">
      <Link to={"/"}>{e}</Link>
    </li>
  ));

  return (
    <div className="flex flex-col items-start justify-start">
      <h4 className="font-bold uppercase">A propos</h4>
      <ul className="flex flex-col items-start">{about}</ul>
    </div>
  );
}

export default About;
