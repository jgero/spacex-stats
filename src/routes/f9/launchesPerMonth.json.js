import fetch from "node-fetch";

export async function get(req, res, next) {
  // get the falcon 9 launches per month starting january 2014
  const result = await fetch(
    "https://api.spacexdata.com/v3/launches/past?rocket=falcon9"
  );
  let launches = await result.json();
  let launchesPerMonthMap = new Map();
  // create empty map starting january 2014
  let d = new Date(2014, 0);
  while (d < new Date()) {
    launchesPerMonthMap.set(`${d.getMonth() + 1}/${d.getFullYear()}`, 0);
    d = new Date(d.getFullYear(), d.getMonth() + 1);
  }
  // filter out launches before january 2014
  launches = launches.filter(
    (launch) => new Date(2014, 0) < new Date(launch.launch_date_utc)
  );
  // count the launches per month
  launches.forEach((launch) => {
    const d = new Date(launch.launch_date_utc);
    launchesPerMonthMap.set(
      `${d.getMonth() + 1}/${d.getFullYear()}`,
      launchesPerMonthMap.get(`${d.getMonth() + 1}/${d.getFullYear()}`) + 1
    );
  });
  // build an array from the map
  const launchesPerMonth = Array.from(launchesPerMonthMap.keys()).map(
    (key) => ({
      month: key,
      launches: launchesPerMonthMap.get(key),
    })
  );

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(launchesPerMonth));
}
