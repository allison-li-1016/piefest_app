import React from "react";
import SqlList from "../../components/SqlList/SqlList";

function Home() {
  const [helloRes, setHelloRes] = React.useState(null);
  function handleClick() {
    fetch("/hello")
      .then((res) => res.text())
      .then((helloResponse) => setHelloRes(helloResponse));
  }

  return (
    <div>
    <header>
        <h1>Welcome to Piefest!</h1>
    </header>
    <main>
        <section>
            <h2>About Piefest</h2>
            <p>Piefest is an annual event celebrating all things pie. Join us for a day of delicious pies, fun activities, and great company!</p>
            <p>Response from API: {helloRes}</p>
            <button onClick={handleClick}>Click ME!!</button>
        </section>
        <section>
            <h2>Here's a fun section where we make a call to the db</h2>
            <SqlList />
        </section>
        <section>
            <h2>Event Schedule</h2>
            <ul>
                <li>10:00 AM - Opening Ceremony</li>
                <li>11:00 AM - Pie Tasting</li>
                <li>1:00 PM - Pie Eating Contest</li>
                <li>3:00 PM - Award Ceremony</li>
                <li>11:00 PM - After Party @ Ben's Mom's House</li>
            </ul>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Piefest. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default Home;
