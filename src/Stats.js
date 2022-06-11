import React from "react";
import Loader from "./Loader";
import { getTrainerStats } from "./services/trainer.servise";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ReactToPdf from "react-to-pdf";

const Stats = () => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState([]);

  const fetchStats = async () => {
    setLoading(true);
    const res = await getTrainerStats();
    setStats(res);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const ref = React.createRef();

  const name = "stats_" + Date.now();

  return (
    <div className="stats">
      <ReactToPdf
        targetRef={ref}
        filename={`${name}.pdf`}
        options={{ orientation: "landscape" }}
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <div className="stats" ref={ref}>
        <h1>Trainers and their contract counts</h1>
        <BarChart width={1000} height={400} data={stats}>
          <CartesianGrid />
          <Legend />
          <Tooltip />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Stats;
