function Cities() {
  const cities = [
    { name: "Paris", link: "https://goo.gl/maps/yVP1F62Th58gTKEGA" },
    { name: "London", link: "https://goo.gl/maps/ryDEiv749pS4gYw6A" },
    { name: "New-York", link: "https://goo.gl/maps/RTQC58LkuE6uH8nE6" },
    { name: "Milano", link: "https://goo.gl/maps/BV87wvhySGjaJLrg8" },
    { name: "Tokyo", link: "https://goo.gl/maps/FcP9LhMG9BbVZPkd6" },
  ];

  const boutiques = cities.map((e) => (
    <li key={e.name} className="text-start hover:text-slate-300 text-sm">
      <a href={e.link} target="_blank">
        {e.name}
      </a>
    </li>
  ));

  return (
    <div className="flex flex-col items-start justify-start">
      <h4 className="font-bold uppercase">Boutiques</h4>
      <ul className="flex flex-col items-start">{boutiques}</ul>
    </div>
  );
}

export default Cities;
